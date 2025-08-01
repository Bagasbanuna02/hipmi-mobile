import { ViewWrapper } from "@/components";
import Investment_BoxDetailDocument from "@/screens/Invesment/Document/RecapBoxDetail";

export default function InvestmentListOfDocument() {
  return (
    <ViewWrapper>
      {Array.from({ length: 10 }).map((_, index) => (
        <Investment_BoxDetailDocument
          key={index}
          title={`Judul Dokumen ${index + 1}`}
          href={`/(file)/${index + 1}`}
        />
      ))}
    </ViewWrapper>
  );
}
