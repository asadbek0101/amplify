import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserIcon from "../icons/UserIcon";
import AppMenu from "./AppMenu";
import SideBarItem from "./SideBarItem";
import { SaveActiveItem } from "../../utils/SaveActiveItem";
import "./assets/app-menu.scss";
import AddIcon from "../icons/AddIcon";
import BoxsIcon from "../icons/BoxsIcon";
import EditIcon from "../icons/EditIcon";
import { RouteContainerTabs } from "../../constents/Routes";
import { AdministratorTabs } from "../../containers/AdministratorContainer";
import { UserTabs } from "../../containers/UsersContainer";

export default function SideBarMenu(){

    const location = useLocation();
    const tab = useMemo(()=>SaveActiveItem("tab", location.pathname),[SaveActiveItem, location.pathname])
    const childTab = useMemo(()=>SaveActiveItem("childTab", location.pathname),[SaveActiveItem, location.pathname])
    const navigate = useNavigate();

    return (
        <AppMenu
            activeTab={tab}
            defaultTab={RouteContainerTabs.Administrator}
            onChangeTab={(value: string)=>{
                navigate(`/app/${value}`)
            }}
            >
            <SideBarItem
                key={RouteContainerTabs.Administrator}
                icon={
                    <UserIcon color="white"/>  
                }
                responsiveContent={
                    <AppMenu
                        defaultTab={AdministratorTabs.RoleManagerTab}
                        activeTab={childTab}
                        onChangeTab={(value: any)=>navigate(`/app/administrator/${value}`)}
                        >
                    <SideBarItem
                        key={AdministratorTabs.RoleManagerTab}
                        >
                        Role Manager
                    </SideBarItem>    
                    <SideBarItem
                        key={AdministratorTabs.PlanTab}
                        >
                        Plan
                    </SideBarItem> 
                    <SideBarItem
                        key={AdministratorTabs.StatusTab}
                        >
                        Status
                    </SideBarItem> 
                    <SideBarItem
                        key={AdministratorTabs.BranchesTab}
                        >
                        Branches
                    </SideBarItem>    
                    </AppMenu>
                }
                >
                Administrator
            </SideBarItem>
            <SideBarItem
                key={RouteContainerTabs.Users}
                icon={
                    <UserIcon color="white"/>  
                }
                responsiveContent={
                    <AppMenu
                        activeTab={childTab}
                        defaultTab="add-user"
                        onChangeTab={(value: any)=>navigate(`/app/users/${value}`)}
                        >
                    <SideBarItem
                        key={UserTabs.AddUser}
                        >
                        Add User
                    </SideBarItem> 
                    <SideBarItem
                        key={UserTabs.AllUsers}
                        >
                        All Users
                    </SideBarItem> 
                    <SideBarItem
                        key={UserTabs.Customers}
                        >
                        Customers
                    </SideBarItem>    
                    <SideBarItem
                        key={UserTabs.Staff}
                        >
                        Staff
                    </SideBarItem> 
                    <SideBarItem
                        key={UserTabs.Managers}
                        >
                        Managers
                    </SideBarItem> 
                    <SideBarItem
                        key={UserTabs.Couriers}
                        >
                        Couriers
                    </SideBarItem>    
                    </AppMenu>
                }
                >
                Users
            </SideBarItem>
            <SideBarItem
                key={RouteContainerTabs.Parcels}
                icon={
                    <BoxsIcon color="white"/>
                }
                responsiveContent={
                    <AppMenu
                        activeTab={childTab}
                        defaultTab="all-parcels"
                        onChangeTab={(value: any)=>navigate(`/app/parcel/${value}`)}
                        >
                        <SideBarItem
                            key="all-parcels"
                            >
                            All Parcels
                        </SideBarItem>     
                    </AppMenu>
                }
                >
                Parcels
            </SideBarItem>
            <SideBarItem
                key="add-parcel"
                icon={
                    <AddIcon color="white"/>
                }
                >
                Add Parcel
            </SideBarItem>
            <SideBarItem
                key="edit-parcel"
                icon={
                    <EditIcon color="white"/>
                }
                >
                Edit Parcel
            </SideBarItem>
        </AppMenu>
    )
}