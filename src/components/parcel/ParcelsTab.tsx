import React from "react";
import ContainerLayout from "../app/ContainerLayout";
import ParcelTableWrapper from "./ParcelTableWrapper";

export default function AllParcelsTab(){

    return (
        <ContainerLayout>
            <ParcelTableWrapper selectRow={(value: any)=>console.log(value)}/>
        </ContainerLayout>
    )
}