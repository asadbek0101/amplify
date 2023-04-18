import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import AddParcelForm from "./AddParcelForm";

export default function AddParcelFormWrapper(){
    
    const [initialValues, setInitialValues] = useState({
        senderId: "",
        recepientId: "",
        parcelBranchFromId: "",
        parcelBranchToId: "",
        weight: "",
        numberOfPoint: "",
        parcelPlanId: "",
        parcelPlanIdForApi: "",
        costDeliveryToBranch: "",
        costDeliveryToPoint: "",
        costPickingUp: "",
        paymentMethod: "",
        senderCourierId: "",
        recepientCourierId: "",
        StateDeliveryToBranch: "",
        StatePickingUp: "",
        StateDeliveryToPoint: "",
        parcelBranchFromIdForApi: "",
        parcelBranchToIdForApi: "",
    })
    const [users, setUsers] = useState<any[]>([])
    const [branches, setBranches] = useState<any>([]);
    const [costInfoList, setCostInfoList] = useState<any>([]);
    const [plans, setPlans] = useState<any>([]);
    const [couriers, setCouriers] = useState<any>([]);
    const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState("")

    const [scrollTop, setScrollTop] = useState(1);
  
    const handleScroll = () => {
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
            let array: any = []
            respon.data.items.map((item: any)=>{
                const data = {
                    label: `${item.firstName} ${item.lastName} ${item.phone}`,
                    value: item.id
                }
                array.push(data);
            })
            setUsers(array)
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
        
    },[request, toast, setPaymentMethods, scrollTop]);


    const onSumbit = useCallback((value: any)=>{
        const data = {
            parcelCost: {
                StateDeliveryToBranch: value.StateDeliveryToBranch,
                StatePickingUp: value.StatePickingUp,
                StateDeliveryToPoint: value.StateDeliveryToPoint,
                StateBuyout: true,
                costPickingUp: Number(value.costPickingUp),
                costDeliveryToPoint: Number(value.costDeliveryToPoint),
                costDeliveryToBranch: Number(value.costDeliveryToBranch),
                costBuyout: 10,
                currencyId: 1
            },
            senderId: value.senderId,
            recepientId: value.recepientId,
            recepientStaffId: "3",
            senderStaffId: "1",
            recepientCourierId: value.recepientCourierId,
            senderCourierId: value.senderCourierId,
            parcelPlanId: value.parcelPlanIdForApi,
            parcelBranchFromId: value.parcelBranchFromIdForApi,
            parcelBranchToId: value.parcelBranchToIdForApi,
            parcelSize: {
                weight: value.weight,
                numberOfPoint: value.numberOfPoint
            },
            parcelItem: [
                {
                    name: "Asadbek",
                    cost: 10000,
                    currencyId: 1,
                    description: "asdasdasd"
                }
            ],
            parcelStatusId: 1,
            parcelImage: [],
            parcelSound: [],
            parcelDescription: {
                description: "Create Parcell uchun birinchi urunish"
            }
        }
        request.post("/Parcel", data ,{
                headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}
            }).then(()=>toast.success("Added!")).catch((err: any)=>toast.error(err.message))
    },[request, toast])


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
                setRundomCode={(value:any)=>console.log(value)}
                onSubmit={(value)=>onSumbit(value)}
                />
          </>
     )
}