import {
  ButtonCustom,
  DrawerCustom,
  LoaderCustom,
  Spacing,
  TextAreaCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AlertWarning from "@/components/Alert/AlertWarning";
import { useAuth } from "@/hooks/use-auth";
import Forum_CommentarBoxSection from "@/screens/Forum/CommentarBoxSection";
import Forum_BoxDetailSection from "@/screens/Forum/DiscussionBoxSection";
import Forum_MenuDrawerBerandaSection from "@/screens/Forum/MenuDrawerSection.tsx/MenuBeranda";
import Forum_MenuDrawerCommentar from "@/screens/Forum/MenuDrawerSection.tsx/MenuCommentar";
import {
  apiForumCreateComment,
  apiForumGetComment,
  apiForumGetOne,
  apiForumUpdateStatus,
} from "@/service/api-client/api-forum";
import { TypeForum_CommentProps } from "@/types/type-forum";
import { isBadContent } from "@/utils/badWordsIndonesia";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";



export default function ForumDetail() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [listComment, setListComment] = useState<TypeForum_CommentProps[] | null>(null);
  const [isLoadingComment, setLoadingComment] = useState(false);

  // Status
  const [status, setStatus] = useState("");
  const [text, setText] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [dataId, setDataId] = useState("");

  // Comentar
  const [openDrawerCommentar, setOpenDrawerCommentar] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [commentAuthorId, setCommentAuthorId] = useState("");

  useFocusEffect(
    useCallback(() => {
      onLoadData(id as string);
    }, [id])
  );

  const onLoadData = async (id: string) => {
    try {
      const response = await apiForumGetOne({ id });
      setData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  useEffect(() => {
    onLoadListComment(id as string);
  }, [id]);

  const onLoadListComment = async (id: string) => {
    try {
      const response = await apiForumGetComment({
        id: id as string,
      });
      setListComment(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  // Update Status
  const handlerUpdateStatus = async (value: any) => {
    try {
      const response = await apiForumUpdateStatus({
        id: id as string,
        data: value,
      });
      if (response.success) {
        setStatus(response.data);
        setData({
          ...data,
          ForumMaster_StatusPosting: {
            status: response.data,
          },
        });
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  // Create Commentar
  const handlerCreateCommentar = async () => {
    if (isBadContent(text)) {
      AlertWarning({});
      return;
    }
    
    const newData = {
      comment: text,
      authorId: user?.id,
    };
    
    try {
      setLoadingComment(true);
      const response = await apiForumCreateComment({
        id: id as string,
        data: newData,
      });

      if (response.success) {
        setText("");
        const newComment = {
          id: response.data.id,
          isActive: response.data.isActive,
          komentar: response.data.komentar,
          createdAt: response.data.createdAt,
          authorId: response.data.authorId,
          Author: response.data.Author,
        };
        setListComment((prev) => [newComment, ...(prev || [])]);
        setData({
          ...data,
          count: data.count + 1,
        });
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingComment(false);
    }
  };

  return (
    <>
      <ViewWrapper>
        {!data && !listComment ? (
          <LoaderCustom />
        ) : (
          <>
            {/* Box Posting */}
            <Forum_BoxDetailSection
              data={data}
              onSetData={() => {
                setOpenDrawer(true);
                setStatus(data.ForumMaster_StatusPosting?.status);
                setAuthorId(data.Author?.id);
                setDataId(data.id);
              }}
            />

            {/* Area Commentar */}
            {data?.ForumMaster_StatusPosting?.status === "Open" && (
              <>
                <TextAreaCustom
                  placeholder="Ketik diskusi anda..."
                  maxLength={1000}
                  showCount
                  value={text}
                  onChangeText={setText}
                  style={{
                    marginBottom: 0,
                  }}
                />
                <ButtonCustom
                  isLoading={isLoadingComment}
                  style={{
                    alignSelf: "flex-end",
                  }}
                  onPress={() => {
                    handlerCreateCommentar();
                  }}
                >
                  Balas
                </ButtonCustom>
              </>
            )}
            <Spacing height={40} />

            {/* List Commentar */}
            {_.isEmpty(listComment) ? (
              <TextCustom align="center" color="gray" size={"small"}>
                Tidak ada komentar
              </TextCustom>
            ) : (
              <TextCustom color="gray">Komentar :</TextCustom>
            )}
            <Spacing height={5} />
            {listComment?.map((item: any, index: number) => (
              <Forum_CommentarBoxSection
                key={index}
                data={item}
                onSetData={(value) => {
                  setCommentId(value.setCommentId);
                  setOpenDrawerCommentar(value.setOpenDrawer);
                  setCommentAuthorId(value.setCommentAuthorId);
                }}
              />
            ))}
          </>
        )}
      </ViewWrapper>

      {/* Posting Drawer */}
      <DrawerCustom
        height={"auto"}
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
      >
        <Forum_MenuDrawerBerandaSection
          id={dataId}
          authorUsername={data?.Author?.username as string}
          status={status}
          setIsDrawerOpen={() => {
            setOpenDrawer(false);
          }}
          authorId={authorId}
          handlerUpdateStatus={(value: any) => {
            handlerUpdateStatus(value);
          }}
        />
      </DrawerCustom>

      {/* Commentar Drawer */}
      <DrawerCustom
        height={"auto"}
        isVisible={openDrawerCommentar}
        closeDrawer={() => setOpenDrawerCommentar(false)}
      >
        <Forum_MenuDrawerCommentar
          id={commentId as string}
          commentId={commentId}
          commentAuthorId={commentAuthorId}
          setIsDrawerOpen={() => {
            setOpenDrawerCommentar(false);
          }}
          listComment={listComment}
          setListComment={setListComment}
          countComment={data?.count}
          setCountComment={(val: any) => {
            setData((prev: any) => ({
              ...prev,
              count: val,
            }));
          }}
        />
      </DrawerCustom>
    </>
  );
}
