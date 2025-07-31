import { BaseBox, StackCustom, TextCustom, ProgressCustom } from "@/components";

export default function Invesment_BoxProgressSection({status}: {status: string}) {
    return (
      <>
        {status === "publish" && (
          <BaseBox>
            <StackCustom>
              <TextCustom bold>Progress Saham</TextCustom>
              <ProgressCustom value={70} size="lg" />
            </StackCustom>
          </BaseBox>
        )}
      </>
    );
}