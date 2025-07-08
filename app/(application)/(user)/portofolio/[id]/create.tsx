import { TextCustom, ViewWrapper } from "@/components";
import { useLocalSearchParams } from "expo-router";

export default function PortofolioCreate() {
    const { id } = useLocalSearchParams();
    return (
        <ViewWrapper>
            <TextCustom>Portofolio Create {id}</TextCustom>
        </ViewWrapper> 
    );
}