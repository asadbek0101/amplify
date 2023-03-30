import React, { useState, useEffect, useMemo} from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ContainerLayout from "../app/ContainerLayout";
import StatusFormWrapper from "../status/StatusFormWrapper";
import StatusTableWrapper from "../status/StatusTableWrapper";

export default function AllParcelsTab(){
    // const { tab = "table" } = useParams();
    const [ value, setValue ] = useState(null);
    const [formType, setFormType] = useState("");
    const [search, setSearch] = useSearchParams();
    const navigate = useNavigate();

    return (
        <ContainerLayout>
          <h1>Parcel Tab</h1>
        </ContainerLayout>
    )
}