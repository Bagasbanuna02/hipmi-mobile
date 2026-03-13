import { useRouter } from "expo-router";
import { BackButton } from "..";

export default function BackButtonFromNotification({
  from,
  category,
}: {
  from: string;
  category?: string;
}) {
  const router = useRouter();
  return (
    <>
      <BackButton

        onPress={() => {
          if (from === "notifications") {
            router.push(`/notifications?category=${category}`);
          } else {
            if (from) {
              router.back();
            } else {
              router.back();
            }
          }
        }}
      />
    </>
  );
}
