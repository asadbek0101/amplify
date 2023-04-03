import { useParams } from "react-router-dom";
import ContainerLayout from "../components/app/ContainerLayout";
import AllParcelsTab from "../components/parcel/ParcelsTab";

export default function ParcelContainer(){
    const { tab = "all-parcels" } = useParams();
    return (
        <ContainerLayout>
           {tab === "all-parcels" && (
            <AllParcelsTab/>
           )}
        </ContainerLayout>
    )
}