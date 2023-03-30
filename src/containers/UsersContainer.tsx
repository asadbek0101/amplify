import React, { useState, useEffect, useMemo} from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ContainerLayout from "../components/app/ContainerLayout";
import StatusFormWrapper from "../components/status/StatusFormWrapper";
import StatusTableWrapper from "../components/status/StatusTableWrapper";
import AddUserTab from "../components/user/AddUserTab";
import AllUserTab from "../components/user/AllUsersTab";
import CuriersTab from "../components/user/CuriersTab";
import ManagersTab from "../components/user/ManagersTab";

export default function UsersContainer(){
    const { tab = "table" } = useParams();
    const [ value, setValue ] = useState(null);
    const [formType, setFormType] = useState("");
    const [search, setSearch] = useSearchParams();
    const navigate = useNavigate();

    return (
        <ContainerLayout>
          {tab == "add-user" && (
            <AddUserTab/>
          )}
           {tab == "all-users" && (
            <AllUserTab/>
          )}
           {tab == "managers" && (
            <ManagersTab/>
          )}
           {tab == "curiers" && (
            <CuriersTab/>
          )}
        </ContainerLayout>
    )
}