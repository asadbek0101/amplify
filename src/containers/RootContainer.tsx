import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { request } from "../api/request";
import { set_user_profile } from "../redux/action";
import { Route, Routes, useNavigate } from "react-router-dom";
import AppContainer from "./AppContainer";
import AuthContainer from "./AuthContainer";
import BranchContainer from "./BranchContainer";
import StatusContainer from "./StatusContainer";
import PlanContainer from "./PlanContainer";
import AccountContainer from "./AccountContainer";
import RoleManagerContainer from "./RoleManagerContainer";
import UserManagerContainer from "./UserManagerContainer";
import AddParcelContainer from "./AddParcelContainer";


export default function RootContainer(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate('/')
        }
    },[navigate])

    const onSubmit = useCallback((value: any)=>{
        request.post("/Authentication/Login", { 
    
        "email": value.email,
        "password": value.password
        
            }).then((response: any)=>{
                if(response.data.result){
                    localStorage.setItem("token", response.data.token)
                    dispatch(set_user_profile(response.data.token))
                    toast.success(response.data.message[0])
                    navigate('/app/branch')
                }else{
                    alert(response.data.message[0])
                }
          }).catch((erro: any)=>toast.error(erro.response.data.message[0]))
        },[request])


    return (
      <Routes>
        <Route path="/" element={<AuthContainer onsubmit={(value:any)=>onSubmit(value)}/>}/>
        <Route path="/app" element={<AppContainer/>}>
                <Route path="branch/:tab?" element={<BranchContainer/>}/>
                <Route path="status/:tab?" element={<StatusContainer/>}/>
                <Route path="plan/:tab?" element={<PlanContainer/>}/>
                <Route path="account/:tab?" element={<AccountContainer/>}/>
                <Route path="role-manager/:tab?" element={<RoleManagerContainer/>}/>
                <Route path="user-manager/:tab?" element={<UserManagerContainer/>}/>
                <Route path="parcel/:tab?" element={<UserManagerContainer/>}/>
                <Route path="add-parcel/:tab?" element={<AddParcelContainer/>}/>
        </Route>
      </Routes>
)
}