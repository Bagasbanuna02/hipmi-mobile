import { AlertDefaultSystem, MenuDrawerDynamicGrid } from "@/components";
import { useAuth } from "@/hooks/use-auth";
import { router } from "expo-router";
import {
  drawerItemsForumComentarForAuthor,
  drawerItemsForumComentarForNonAuthor,
} from "../ListPage";
import { apiForumDeleteComment } from "@/service/api-client/api-forum";
import Toast from "react-native-toast-message";

export default function Forum_MenuDrawerCommentar({
  id,
  setIsDrawerOpen,
  commentId,
  commentAuthorId,
  listComment,
  setListComment,
  countComment,
  setCountComment,
}: {
  id: string;
  setIsDrawerOpen: (value: boolean) => void;
  commentId: string;
  commentAuthorId: string;
  listComment: any;
  setListComment: (value: any) => void;
  countComment: number;
  setCountComment: (value: number) => void;
}) {
  const { user } = useAuth();
  const handlePress = (item: any) => {
    if (item.label === "Hapus") {
      AlertDefaultSystem({
        title: "Hapus",
        message: "Apakah Anda yakin ingin menghapus komentar ini?",
        textLeft: "Batal",
        textRight: "Hapus",
        onPressLeft: () => {},
        onPressRight: async () => {
          try {
            const response = await apiForumDeleteComment({ id: commentId });

            if (response.success) {
              setListComment(
                listComment.filter((item: any) => item.id !== commentId)
              );

              setCountComment(countComment - 1);

              Toast.show({
                type: "success",
                text1: "Berhasil dihapus",
              });
            } else {
              Toast.show({
                type: "error",
                text1: response.message,
              });
            }
          } catch (error) {
            console.log("[ERROR]", error);
          }
        },
      });
    } else {
      router.push(item.path as any);
    }

    setIsDrawerOpen(false);
  };

  return (
    <>
      <MenuDrawerDynamicGrid
        data={
          commentAuthorId === user?.id
            ? drawerItemsForumComentarForAuthor({ id })
            : drawerItemsForumComentarForNonAuthor({ id })
        }
        columns={4}
        onPressItem={handlePress}
      />
    </>
  );
}
