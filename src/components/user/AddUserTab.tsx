import React, { useState, useEffect, useMemo} from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ContainerLayout from "../app/ContainerLayout";
import StatusFormWrapper from "../status/StatusFormWrapper";
import StatusTableWrapper from "../status/StatusTableWrapper";
import UserManagerFormWrapper from "./UserManagerFormWrapper";

export default function AddUserTab(){
    // const { tab = "table" } = useParams();
    const [ value, setValue ] = useState(null);
    const [formType, setFormType] = useState("");
    const [search, setSearch] = useSearchParams();
    const navigate = useNavigate();

    const tab = useMemo(()=>search.get("formType")? search.get("formType") : 'table',[search])
    // useEffect(()=>{
    //   setSearch({formType: "table"})
    // },[setSearch])

    console.log(tab)

    return (
        <ContainerLayout>
            <UserManagerFormWrapper/>
        </ContainerLayout>
    )
}