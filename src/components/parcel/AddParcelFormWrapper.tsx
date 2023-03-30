import { resolve } from "path";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import AddParcelForm from "./AddParcelForm";


export default function AddParcelFormWrapper(){
    
    const [initialValues, setInitialValues] = useState({

    })
    const [users, setUsers] = useState<any[]>([])
    const [branches, setBranches] = useState<any>([]);
    const [costInfoList, setCostInfoList] = useState<any>([]);
    const [plans, setPlans] = useState<any>([]);

    const [scrollTop, setScrollTop] = useState(1);
  
    const handleScroll = (event:any) => {
        setScrollTop(scrollTop + 1);
    };
  

    useEffect(()=>{
        request.get('/Parcel/GetInfoParcel',{
          headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} 
        }).then((respon: any)=>{

            respon.data.plan.plans.map((item: any)=>{
                const data = {
                    label: item.name,
                    value: item.id
            }
            setPlans((user: any)=>[...user, data])
            })

            respon.data.branch.branches.map((item: any)=>{
                const data = {
                    label: item.name,
                    value: item.id
            }
            setBranches((user: any)=>[...user, data])
            })  

            respon.data.costInfoList.map((item: any)=>{
                const data = {
                    label: `${item.firstName} ${item.lastName} ${item.phone}`,
                    value: item.id
            }
            setCostInfoList((user: any)=>[...user, data])
    })
      
            
        }).catch((error)=>console.log(error.message))
        
    },[request, setCostInfoList, setBranches, setPlans]) 
    
    useEffect(()=>{
        request.get(`/UserManager/WithPagination?pageNumber=${scrollTop}&pageSize=${50}`,{
          headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} 
        }).then((respon: any)=>{
            respon.data.items.map((item: any)=>{
                const data = {
                    label: `${item.firstName} ${item.lastName} ${item.phone}`,
                    value: item.id
                }
                setUsers((prev: any)=>[...prev, data])
            })
        }).catch((error)=>toast.error(error.message))
        
    },[request, toast, setUsers, scrollTop])
  

    return (<AddParcelForm handleScroll={handleScroll} users={users} initialValues={initialValues}  plans={plans} branchs={branches} costInfo={costInfoList}/>)
}