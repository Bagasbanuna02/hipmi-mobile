import {
  BoxButtonOnFooter,
  ButtonCustom,
  DrawerCustom,
  LoaderCustom,
  OS_Wrapper,
  Spacing,
  StackCustom,
  TextAreaCustom,
  TextCustom,
  TextInputCustom,
} from "@/components";
import CustomSkeleton from "@/components/_ShareComponent/SkeletonCustom";
import AlertWarning from "@/components/Alert/AlertWarning";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import { usePagination } from "@/hooks/use-pagination";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
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
import { censorText, isBadContent } from "@/utils/badWordsIndonesia";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import ListSkeletonComponent from "@/components/_ShareComponent/ListSkeletonComponent";
import { PADDING_INLINE } from "@/constants/constans-value";

export default function DetailForum2() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState<any | null>(null);
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

  // Initialize pagination for comments
  const commentPagination = usePagination({
    fetchFunction: async (page) => {
      return await apiForumGetComment({
        id: id as string,
        page: String(page), // API expects string
      });
    },
    pageSize: 5,
    dependencies: [id],
    onError: (error) => console.error("[ERROR] Fetch forum comment:", error),
  });

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        onLoadData(id as string);
      }, 3000);
    }, [id]),
  );

  useEffect(() => {
    // Reset and load first page of comments when id changes
    commentPagination.reset();
    commentPagination.onRefresh();
  }, [id]);

  const onLoadData = async (id: string) => {
    try {
      const response = await apiForumGetOne({ id });
      setData(response.data);
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
    const cencorContent = censorText(text);

    const newData = {
      comment: cencorContent,
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

        // Add new comment to the top of the list
        commentPagination.setListData((prev) => [newComment, ...prev]);

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

  const headerComponent = () =>
    // Box Posting
    !data ? (
      <StackCustom>
        <CustomSkeleton height={200} />
        <CustomSkeleton height={100} />
      </StackCustom>
    ) : (
      <>
        {/* Area Posting */}
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
      </>
    );

  // Render individual comment item
  const renderCommentItem = ({ item }: { item: TypeForum_CommentProps }) =>(
      <Forum_CommentarBoxSection
        key={item.id}
        data={item}
        onSetData={(value) => {
          setCommentId(value.setCommentId);
          setOpenDrawerCommentar(value.setOpenDrawer);
          setCommentAuthorId(value.setCommentAuthorId);
        }}
      />
  )

  // Generate pagination components using helper
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: commentPagination.loading,
      refreshing: commentPagination.refreshing,
      listData: commentPagination.listData,
      isInitialLoad: commentPagination.isInitialLoad,
      emptyMessage: "Tidak ada komentar",
      skeletonCount: 3,
      skeletonHeight: 120,
    });

  return (
    <>
      <OS_Wrapper
        contentPadding={PADDING_INLINE}
        disableFlexGrow
        listData={commentPagination.listData}
        renderItem={renderCommentItem}
        refreshControl={
          <RefreshControl
            // IOS
            tintColor={MainColor.yellow}
            // Android
            colors={[MainColor.yellow]}
            progressBackgroundColor={MainColor.yellow}
            refreshing={commentPagination.refreshing}
            onRefresh={commentPagination.onRefresh}
          />
        }
        onEndReached={commentPagination.loadMore}
        ListHeaderComponent={
          <>
            {/* <Spacing height={40} />
            <TextCustom color="gray">Komentar :</TextCustom>
            <Spacing height={5} /> */}
            {headerComponent()}
            <Spacing />
          </>
        }
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
      />

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
          listComment={commentPagination.listData}
          setListComment={commentPagination.setListData}
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
