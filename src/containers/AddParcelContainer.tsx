import React, { useState} from "react";
import ContainerLayout from "../components/app/ContainerLayout";
import AddParcelTab from "../components/parcel/AddParcelTab";

export default function AddParcelContainer(){
    return (
        <ContainerLayout>
            <AddParcelTab/>
        </ContainerLayout>
    )
}