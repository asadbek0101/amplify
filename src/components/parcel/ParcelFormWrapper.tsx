import { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import AddParcelForm from "./ParcelForm";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import TabPage from "../tabs/TabPage";

interface SelectType{
    readonly label: string;
    readonly value: string;
}

const labeValue: SelectType = {
    label: "",
    value: ""
}

export default function AddParcelFormWrapper(){
    
    const [initialValues, setInitialValues] = useState({
        code: 0,
        senderId: labeValue,
        recepientId: labeValue,
        parcelBranchFromId: labeValue,
        parcelBranchToId: labeValue,
        weight: 0,
        images: [],
        description: "",
        pickupAddress: "",
        deliveryAddress: "",
        numberOfPoint: 0,
        parcelPlanId: labeValue,
        costDeliveryToBranch: 0,
        costDeliveryToPoint: 0,
        costPickingUp: 0,
        paymentMethod: labeValue,
        senderCourierId: labeValue,
        recepientCourierId: labeValue   ,
        StateDeliveryToBranch: false,
        StatePickingUp: false,
        StateDeliveryToPoint: false,
        StateSenderCourierId: false,
        StateRecipientCourierId: false,
        sendSmsToRecipient: false,
        sendSmsToSender: false,
        sendSmsToTelegram: false,
    })
    const [senders, setSenders] = useState<any[]>([])
    const [receipents, setReceipents] = useState<any[]>([])
    const [branches, setBranches] = useState<any>([]);
    const [costInfoList, setCostInfoList] = useState<any>([]);
    const [plans, setPlans] = useState<any>([]);
    const [couriers, setCouriers] = useState<any>([]);
    const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
    const [search, setSearch] = useSearchParams();
    const navigator = useNavigate();

    const parcelId = useMemo(()=>search.get("parcelId")?search.get("parcelId"): "",[search])
    const profile = useSelector((state: any)=>state.data.profile)

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
        
    },[request, toast, setCouriers])

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
        
    },[request, toast, setPaymentMethods]);


    const getSendersBySearching = useCallback((value: string)=>{
        if(value != ""){
            request.get(`/UserManager/SearchUserWithSkip?searchText=${value}&Skip=${0}&Top=${20}`,{
                headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} 
              }).then((respon: any)=>{
                  let array: any = []
                  respon.data.customers.map((item: any)=>{
                      const data = {
                          label: `${item.firstName} ${item.lastName} ${item.phone}`,
                          value: item.id
                      }
                      array.push(data);
                  })
                  setSenders(array)
              }).catch((error)=>{
                toast.error(error.message)})
        }
    },[request, setSenders, toast])

    const getReceipentsBySearching = useCallback((value: string)=>{
        if(value != ""){
            request.get(`/UserManager/SearchUserWithSkip?searchText=${value}&Skip=${0}&Top=${20}`,{
                headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} 
              }).then((respon: any)=>{
                  let array: any = []
                  respon.data.customers.map((item: any)=>{
                      const data = {
                          label: `${item.firstName} ${item.lastName} ${item.phone}`,
                          value: item.id
                      }
                      array.push(data);
                  })
                  setReceipents(array)
              }).catch((error)=>{
                toast.error(error.message)})
        }
    },[request, setReceipents, toast])

    useEffect(()=>{
        if(parcelId !== ""){
            request.get(`/Parcel/${parcelId}`).then((response)=>{
                const value = response.data
                console.log("value ", value)
                const data = {
                    code: value.code,
                    senderId: {
                        label: value.sender.firstName + " " + value.sender.lastName + " " + value.sender.phoneNumber,
                        value: value.sender.id
                    },
                    recepientId: {
                        label: value.recepient.firstName + " " + value.recepient.lastName + " " + value.recepient.phoneNumber,
                        value: value.recepient.id
                    },
                    parcelBranchFromId: {
                        label: value.fromBranch.name,
                        value: value.fromBranch.id
                    },
                    parcelBranchToId: {
                        label: value.toBranch.name,
                        value: value.toBranch.id
                    },
                    weight: value.parcelSize.weight,
                    images: value.parcelImage,
                    description: value.parcelDescription.description,
                    pickupAddress: "",
                    deliveryAddress: "",
                    numberOfPoint: value.parcelSize.numberOfPoint,
                    parcelPlanId: {
                        label: value.parcelPlan.name,
                        value: value.parcelPlan.id
                    },
                    costDeliveryToBranch: value.parcelCost.costDeliveryToBranch,
                    costDeliveryToPoint: value.parcelCost.costDeliveryToPoint,
                    costPickingUp: value.parcelCost.costPickingUp,
                    paymentMethod: paymentMethods && paymentMethods.filter((item)=>item.value === value.parcelCost.paymentMethodId)[0],
                    senderCourierId: {
                        label: value.senderCourier.firstName + " " + value.senderCourier.lastName + " " + value.senderCourier.phoneNumber,
                        value: value.senderCourier.id
                    },
                    recepientCourierId: {
                        label: value.recepientCourier.firstName + " " + value.recepientCourier.lastName + " " + value.recepientCourier.phoneNumber,
                        value: value.recepientCourier.id
                    },
                    StateDeliveryToBranch: value.parcelCost.stateDeliveryToBranch,
                    StatePickingUp: value.parcelCost.StatePickingUp,
                    StateDeliveryToPoint: value.parcelCost.StateDeliveryToPoint,
                    StateSenderCourierId: false,
                    StateRecipientCourierId: false,
                    sendSmsToRecipient: false,
                    sendSmsToSender: false,
                    sendSmsToTelegram: false,
                }
                 setInitialValues(data)
            }).catch((error)=>console.log(error))
        }
    },[request, parcelId, setInitialValues, paymentMethods])


    const onSumbit = useCallback((value: any)=>{
        const data = {
            code: value.code,
            parcelCost: {
                StateDeliveryToBranch: value.StateDeliveryToBranch,
                StatePickingUp: value.StatePickingUp,
                StateDeliveryToPoint: value.StateDeliveryToPoint,
                costPickingUp: Number(value.costPickingUp),
                costDeliveryToPoint: Number(value.costDeliveryToPoint),
                costDeliveryToBranch: Number(value.costDeliveryToBranch),
                currencyId: 1,
                paymentMethodId: value.paymentMethod.value,
            },
            senderId: Number(value.senderId.value),
            recepientId: Number(value.recepientId.value),
            senderStaffId: Number(profile.id),
            recepientCourierId: Number(value.recepientCourierId.value),
            senderCourierId: Number(value.senderCourierId.value),
            parcelPlanId: Number(value.parcelPlanId.value),
            parcelBranchFromId: Number(value.parcelBranchFromId.value),
            parcelBranchToId: Number(value.parcelBranchToId.value),
            parcelSize: {
                weight: Number(value.weight),
                numberOfPoint: Number(value.numberOfPoint)
            },
            parcelImage: value.images,
            pickupAddress: value.pickupAddress,
            deliveryAddress: value.deliveryAddress,
            parcelDescription: {
                description: value.description
            },
            sendSmsToRecipient: value.sendSmsToRecipient,
            sendSmsToSender: value.sendSmsToSender,
            sendSmsToTelegram: value.sendSmsToTelegram,
        }
        request.post("/Parcel", data ,{
                headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}
            }).then(()=>{
                navigator('/app/parcels/all-parcels')
            }).catch((err: any)=>toast.error(err.message))
    },[request, toast, profile, navigator])


    return (
        <TabPage
            childrenClassName="p-2"
            >
         <AddParcelForm 
                senders={senders}
                recepients={receipents}
                paymentMethods={paymentMethods} 
                customers={couriers} 
                initialValues={initialValues} 
                setInitialValues={setInitialValues} 
                plans={plans} 
                branchs={branches} 
                costInfo={costInfoList}
                setRundomCode={(value:any)=>console.log(value)}
                onSubmit={(value)=>onSumbit(value)}
                searchSender={(value: string) => getSendersBySearching(value)}
                searchReceipent={(value: string) => getReceipentsBySearching(value)}
                />
          </TabPage>
     )
}