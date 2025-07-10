import { Spacing, StackCustom } from "@/components";
import Portofolio_BusinessLocation from "./BusinessLocationSection";
import Portofolio_Data from "./DataPortofolio";
import Portofolio_SocialMediaSection from "./SocialMediaSection";
import Portofolio_ButtonDelete from "./ButtonDelete";

export default function PorfofolioSection() {
  return (
    <StackCustom>
      <Portofolio_Data />
      <Portofolio_BusinessLocation />
      <Portofolio_SocialMediaSection />
      <Portofolio_ButtonDelete/>
      <Spacing/>
    </StackCustom>
  );
}
