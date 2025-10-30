import { BaseBox, StackCustom, TextCustom, ProgressCustom } from "@/components";

export default function Invesment_BoxProgressSection({progress, status}: {progress: number, status: string}) {
    return (
      <>
        {status === "publish" && (
          <BaseBox>
            <StackCustom>
              <TextCustom bold>Progress Saham</TextCustom>
              <ProgressCustom label={(progress || 0) + "%"} value={progress || 0} size="lg" />
            </StackCustom>
          </BaseBox>
        )}
      </>
    );
}