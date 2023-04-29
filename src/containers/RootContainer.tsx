import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { request } from "../api/request";
import { set_user_profile } from "../redux/action";
import { Route, Routes, useNavigate } from "react-router-dom";
import AppContainer from "./AppContainer";
import AuthContainer from "./AuthContainer";
import AddParcelContainer from "./AddParcelContainer";
import AdministratorContainer from "./AdministratorContainer";
import UsersContainer from "./UsersContainer";
import ParcelContainer from "./ParcelContainer";
import { Pages, RouteContainerTabs } from "../constants/Routes";
import EditParcelContainer from "./EditParcelContainer";


export default function RootContainer(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate('/')
        }
    },[navigate, localStorage])

    const onSubmit = useCallback((value: any)=>{
        request.post("/Authentication/Login", { 
    
        "email": value.email,
        "password": value.password
        
            }).then((response: any)=>{
                if(response.data.result){
                    localStorage.setItem("token", response.data.token)
                    dispatch(set_user_profile(response.data.token))
                    toast.success(response.data.message[0])
                    navigate('/app/administrator')
                    window.location.reload();
                }else{
                    alert(response.data.message[0])
                }
          }).catch((erro: any)=>toast.error(erro.response.data.message[0]))
        },[request])

    return (
      <Routes>
        <Route path={Pages.Login} element={<AuthContainer onsubmit={(value:any)=>onSubmit(value)}/>}/>
        <Route path={Pages.App} element={<AppContainer/>}>
                <Route path={RouteContainerTabs.AdministratorPath} element={<AdministratorContainer/>}/>
                <Route path={RouteContainerTabs.UsersPath} element={<UsersContainer/>}/>
                <Route path={RouteContainerTabs.ParcelsPath} element={<ParcelContainer/>}/>
                <Route path={RouteContainerTabs.AddParcel} element={<AddParcelContainer/>}/>
                <Route path={RouteContainerTabs.EditParcel} element={<EditParcelContainer/>}/>
        </Route>
      </Routes>
)
}