import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BranchIcon from "../icons/BranchIcon";
import PlanIcon from "../icons/PlanIcon";
import RoleIcon from "../icons/RoleIcon";
import TestIcon from "../icons/TestIcon";
import UserIcon from "../icons/UserIcon";
import UsersIcon from "../icons/UsersIcon";
import AppMenu from "./AppMenu";
import SideBarItem from "./SideBarItem";
import { SaveActiveItem } from "../../utils/SaveActiveItem";
import { useSelector } from "react-redux";
import "./assets/app-menu.scss";
import AddIcon from "../icons/AddIcon";
import BoxsIcon from "../icons/BoxsIcon";
import EditIcon from "../icons/EditIcon";

export default function SideBarMenu(){
    const location = useLocation();
    const tab = useMemo(()=>SaveActiveItem("tab", location.pathname),[SaveActiveItem, location.pathname])
    const childTab = useMemo(()=>SaveActiveItem("childTab", location.pathname),[SaveActiveItem, location.pathname])
    const navigate = useNavigate();
    const menu = useSelector((state: any)=>state.data.menuStatus)
    const profile = useSelector((state: any) =>state.data.profile)

    return (
        <AppMenu
            activeTab={tab}
            defaultTab="administrator"
            onChangeTab={(value: string)=>{
                navigate(`/app/${value}`)
            }}
            >
            <SideBarItem
                key="administrator"
                icon={
                    <UserIcon color="white"/>  
                }
                responsiveContent={
                    <AppMenu
                        defaultTab="role-manager"
                        activeTab={childTab}
                        onChangeTab={(value: any)=>navigate(`/app/administrator/${value}`)}
                        >
                    <SideBarItem
                        key="role-manager"
                        >
                        Role Manager
                    </SideBarItem>    
                    <SideBarItem
                        key="plan"
                        >
                        Plan
                    </SideBarItem> 
                    <SideBarItem
                        key="status"
                        >
                        Status
                    </SideBarItem> 
                    <SideBarItem
                        key="branch"
                        >
                        Branches
                    </SideBarItem>    
                    </AppMenu>
                }
                >
                Administrator
            </SideBarItem>
            <SideBarItem
                key="users"
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
                        key="add-user"
                        >
                        Add User
                    </SideBarItem> 
                    <SideBarItem
                        key="all-users"
                        >
                        All Users
                    </SideBarItem> 
                    <SideBarItem
                        key="customers"
                        >
                        Customers
                    </SideBarItem>    
                    <SideBarItem
                        key="staff"
                        >
                        Staff
                    </SideBarItem> 
                    <SideBarItem
                        key="managers"
                        >
                        Managers
                    </SideBarItem> 
                    <SideBarItem
                        key="curiers"
                        >
                        Curiers
                    </SideBarItem>    
                    </AppMenu>
                }
                >
                Users
            </SideBarItem>
            <SideBarItem
                key="parcel"
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