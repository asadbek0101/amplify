import { resolve } from "path";
import React, { useEffect, useState } from "react";
import { request } from "../../api/request";
import AddParcelForm from "./AddParcelForm";


export default function AddParcelFormWrapper(){
    
    const [initialValues, setInitialValues] = useState({

    })

    const [users, setUsers] = useState<any>([]);
    const [branches, setBranches] = useState<any>([]);
    const [costInfoList, setCostInfoList] = useState<any>([]);
    const [plans, setPlans] = useState<any>([]);

    useEffect(()=>{
        request.get('/Parcel/GetInfoParcel',{
          headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} 
        }).then((respon: any)=>{
            respon.data.users.customers.map((item: any)=>{
                const data = {
                    label: `${item.firstName} ${item.lastName} ${item.phone}`,
                    value: item.id
                }
                setUsers((user: any)=>[...user, data])
            })

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
        
    },[request, setUsers, setCostInfoList, setBranches, setPlans])  

    return (<AddParcelForm initialValues={initialValues} users={users} plans={plans} branchs={branches} costInfo={costInfoList}/>)
}