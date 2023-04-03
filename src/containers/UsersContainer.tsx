import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ContainerLayout from "../components/app/ContainerLayout";
import AddUserTab from "../components/user/AddUserTab";
import AllUserTab from "../components/user/AllUsersTab";
import CuriersTab from "../components/user/CuriersTab";
import ManagersTab from "../components/user/ManagersTab";
import CustomersTab from "../components/user/Customers";
import StaffTab from "../components/user/StaffTab";

export default function UsersContainer(){
    const { tab = "add-user" } = useParams();
    return (
        <ContainerLayout>
          {tab == "add-user" && (
            <AddUserTab/>
          )}
           {tab == "all-users" && (
            <AllUserTab/>
          )}
          {tab == "customers" && (
            <CustomersTab/>
          )}
          {tab == "staff" && (
            <StaffTab/>
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