import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ContainerLayout from "../components/app/ContainerLayout";
import AddParcelFormWrapper from "../components/parcel/ParcelFormWrapper";
import ParcelTableWrapper from "../components/parcel/ParcelTableWrapper";

export default function ParcelContainer(){
    const { tab = "parcel-form" } = useParams();
    const navigator = useNavigate();
    const [search, setSearch] = useSearchParams();
    return (
        <ContainerLayout>
           {tab === "all-parcels" && (
            <ParcelTableWrapper selectRow={(value)=>{
                navigator(`/app/parcels/parcel-form?parcelId=${value.id}`);
            }}/>
           )}
           {tab === "parcel-form" && (
            <AddParcelFormWrapper/>
           )}
        </ContainerLayout>
    )
}