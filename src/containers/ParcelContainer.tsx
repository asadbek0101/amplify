import React, { useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContainerLayout from "../components/app/ContainerLayout";
import AllParcelsTab from "../components/parcel/AllParcelsTab";
import PlanFormWrapper from "../components/plan/PlanFormWrapper";
import PlanTableWrapper from "../components/plan/PlanTableWrapper";

export default function ParcelContainer(){
    const { tab = "table" } = useParams();
    const [ value, setValue ] = useState(null);
    const navigate = useNavigate();
    return (
        <ContainerLayout>
           {tab === "all-parcels" && (
            <AllParcelsTab/>
           )}
        </ContainerLayout>
    )
}