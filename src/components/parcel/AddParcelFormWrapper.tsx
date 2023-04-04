import { resolve } from "path";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import AddParcelForm from "./AddParcelForm";
import AddParcelUploadImage from "./AddParcelUploadImage";
import AddParcelMessages from "./AddParcelMessages";
import AddParcelCommentares from "./AddParcelCommentares";


export default function AddParcelFormWrapper(){
    
    const [initialValues, setInitialValues] = useState({
        senderId: "",
        recepientId: "",
        parcelBranchFromId: "",
        parcelBranchToId: "",
        weight: "",
        numberOfPoint: "",
        parcelPlanId: "",
        costDeliveryToBranch: "",
        costDeliveryToPoint: "",
        costPickingUp: "",
        paymentMethod: "",
        senderCourierId: "",
        recepientCourierId: "",
    })
    const [users, setUsers] = useState<any[]>([])
    const [branches, setBranches] = useState<any>([]);
    const [costInfoList, setCostInfoList] = useState<any>([]);
    const [plans, setPlans] = useState<any>([]);
    const [couriers, setCouriers] = useState<any>([]);
    const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState("")

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

            setCostInfoList(respon.data.costInfoList)
      
            
        }).catch((error)=>console.log(error.message))
        
    },[request, setCostInfoList, setBranches, setPlans]) 
    
    useEffect(()=>{
        request.get(`/UserManager/SearchUserWithPagination?pageNumber=${scrollTop}&pageSize=${50}&searchText=${searchValue}`,{
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
        
    },[request, toast, setUsers, scrollTop, searchValue])
  
    useEffect(()=>{
        request.get(`/UserManager/GetAll?RoleId=4`,{
          headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} 
        }).then((respon: any)=>{
            respon.data.customers.map((item: any)=>{
                const data = {
                    label: `${item.firstName} ${item.lastName} ${item.phone}`,
                    value: item.id
                }
                setCouriers((prev: any)=>[...prev, data])
            })
        }).catch((error)=>toast.error(error.message))
        
    },[request, toast, setCouriers, scrollTop])

    useEffect(()=>{
        request.get(`/PaymentMethod`,{
          headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} 
        }).then((respon: any)=>{
            respon.data.paymentMethods.map((item: any)=>{
                const data = {
                    label: item.name,
                    value: item.id
                }
                setPaymentMethods((prev: any)=>[...prev, data])
            })
        }).catch((error)=>toast.error(error.message))
        
    },[request, toast, setPaymentMethods, scrollTop])

    return (
        <>
         <AddParcelForm 
                paymentMethods={paymentMethods} 
                customers={couriers} 
                handleScroll={handleScroll} 
                users={users} 
                initialValues={initialValues} 
                setInitialValues={setInitialValues} 
                plans={plans} 
                branchs={branches} 
                costInfo={costInfoList}
                setSearch={setSearchValue}
                />
        <AddParcelUploadImage/>
        <AddParcelMessages/>
        {/* <AddParcelCommentares/> */}
        </>
        )
}