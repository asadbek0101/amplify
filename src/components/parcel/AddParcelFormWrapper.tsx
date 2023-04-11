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
        
    },[request, toast, setPaymentMethods, scrollTop]);


    const onSumbit = useCallback((value: any)=>{
        const data = {
            parcelCost: {
                StateDeliveryToBranch: true,
                StatePickingUp: true,
                StateDeliveryToPoint: true,
                StateBuyout: true,
                costPickingUp: 10,
                costDeliveryToPoint: 10,
                costDeliveryToBranch: 12,
                costBuyout: 10,
                currencyId: 1
            },
            senderId: "1",
            recepientId: "2",
            recepientStaffId: "3",
            senderStaffId: "1",
            recepientCourierId: "1",
            senderCourierId: "1",
            parcelPlanId: 1,
            parcelBranchFromId: 1,
            parcelBranchToId: 2,
            parcelSize: {
                weight: 10000,
                numberOfPoint: 1
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
            parcelImage: [
                {
                    imageName: "parcel1.jpg",
                    imageBytes: "",
                },
                {
                    imageName: "parcel2.jpg",
                    imageBytes: "",
                }
            ],
            parcelSound: [
                {
                    id: 0,
                    soundName: "sound.ogg",
                    soundBytes: "",
                },
                {
                    "id": 0,
                    soundName: "sound.ogg",
                    soundBytes: "",
                }
            ],
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