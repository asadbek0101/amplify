import { Form, Formik } from "formik";
import { update } from "immupdate";
import { useCallback, useState } from "react";
import { bool, object, string } from "yup";
import GroupBox from "../app/GroupBox";
import InputGroup from "../app/InputGroup";
import Button from "../button/Button";
import CheckBox from "../form/CheckBox";
import InputField from "../form/InputField";
import SelectPicker from "../form/SelectPicker";
import SelectVirtualizedPricek from "../form/SelectVirtualizedPricek";
import { toast } from "react-toastify";
import ImgUpload from "../app/ImgUpload";
import AddParcelShowImages from "./AddParcelShowImages";
import TextAreaField from "../form/TextAreaField";

interface AddParcelFormProps{
    readonly initialValues: any;
    readonly setInitialValues: (value: any) => void;
    readonly users: any[];
    readonly plans: any[];
    readonly customers: any[];
    readonly branchs: any[];
    readonly costInfo: any[];
    readonly paymentMethods: any[];
    readonly handleScroll: (value: any) => void;
    readonly setSearch: (value: any) => void;
    readonly setRundomCode: (value: any) => void;
    readonly onSubmit: (value: any) => void;
}

const validationSchema = object({
    senderId: string(),
    recepientId: string(),
    parcelBranchFromId: string(),
    parcelBranchToId: string(),
    weight: string(),
    numberOfPoint: string(),
    parcelPlanId: string(),
    costDeliveryToBranch: string(),
    costDeliveryToPoint: string(),
    costPickingUp: string(),
    paymentMethod: string(),
    senderCourierId: string(),
    recepientCourierId: string(),
    StateDeliveryToBranch: bool(),
    StatePickingUp: bool(),
    StateDeliveryToPoint: bool(),
})

export default function AddParcelForm({
    initialValues, 
    handleScroll, 
    users, 
    costInfo, 
    branchs, 
    plans, 
    customers, 
    paymentMethods, 
    setInitialValues,
    setSearch,
    setRundomCode,
    onSubmit
}:AddParcelFormProps){

    const [randomNum, setRandomNum] = useState<number>();
    const [ imgUrls, setImgUrls ] = useState<any>([])

    const onChangeSenderId = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                senderId: value.value
            })
        )
    },[setInitialValues])

    const onChangeRecepientId = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                recepientId: value.value
            })
        )
    },[setInitialValues])

    const onChangeParcelBranchFromId = useCallback((value: any)=>{

        const found = costInfo[costInfo.findIndex(x =>(x.fromBranch === value.label && x.toBranch === initialValues.parcelBranchToId && x.planName === initialValues.parcelPlanId))];
        let WEIGHT, OVERAL_SUM: Number = 0;
        
        if(found && found.commonCost !== 0){

            WEIGHT = initialValues.weight < found.minimumWeight ? found.minimumWeight : initialValues.weight;

            if(found.firstCost === 0){
                OVERAL_SUM = WEIGHT * found.commonCost
            }else if(found.firstCost !== 0){
                OVERAL_SUM = found.firstCost + found.commonCost*(WEIGHT - 1);
            }
        }

        setInitialValues((prev: any)=>
            update(prev, {
                parcelBranchFromId: value.label,
                parcelBranchFromIdForApi: Number(value.value),
                costDeliveryToBranch: OVERAL_SUM,
            })
        )
    },[setInitialValues, initialValues, costInfo])

    const onChangeParcelBranchToId = useCallback((value: any)=>{

        const found = costInfo[costInfo.findIndex(x =>(x.fromBranch === initialValues.parcelBranchFromId && x.toBranch === value.label && x.planName === initialValues.parcelPlanId))];
        let WEIGHT, OVERAL_SUM: Number = 0;

        if(found && found.commonCost !== 0){
            
            WEIGHT = initialValues.weight < found.minimumWeight ? found.minimumWeight : initialValues.weight;

            if(found.firstCost === 0){
                OVERAL_SUM = WEIGHT * found.commonCost
            }else if(found.firstCost !== 0){
                OVERAL_SUM = found.firstCost + found.commonCost*(WEIGHT - 1);
            }
        }

        setInitialValues((prev: any)=>
            update(prev, {
                parcelBranchToId: value.label,
                parcelBranchToIdForApi: value.value,
                costDeliveryToBranch: OVERAL_SUM,
            })
        )
    },[setInitialValues, initialValues, costInfo])

    const onChangeWeight = useCallback((value: any)=>{

        const found = costInfo[costInfo.findIndex(x =>(x.fromBranch === initialValues.parcelBranchFromId && x.toBranch === initialValues.parcelBranchToId && x.planName === initialValues.parcelPlanId))];
        let WEIGHT, OVERAL_SUM: Number = 0;
        
        if(found && found.commonCost !== 0 && value){
            
            WEIGHT = Number(value) < found.minimumWeight ? found.minimumWeight : Number(value);

            if(found.firstCost === 0){
                OVERAL_SUM = WEIGHT * found.commonCost
            }else if(found.firstCost !== 0){
                OVERAL_SUM = found.firstCost + found.commonCost*(WEIGHT - 1);
            }
        }

        setInitialValues((prev: any)=>
            update(prev, {
                weight: value,
                costDeliveryToBranch: OVERAL_SUM,
            })
        )
    },[setInitialValues, initialValues, costInfo])

    const onChangeNumberOfPoint = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                numberOfPoint: value,
            })
        )
    },[setInitialValues])

    const onChangeParcelPlanId = useCallback((value: any)=>{
        const found = costInfo[costInfo.findIndex(x =>(x.fromBranch === initialValues.parcelBranchFromId && x.toBranch === initialValues.parcelBranchToId && x.planName === value.label))];
        let WEIGHT, OVERAL_SUM: Number = 0;
     
        if(found && found.commonCost !== 0){

            WEIGHT = initialValues.weight < found.minimumWeight ? found.minimumWeight : initialValues.weight;

            if(found.firstCost === 0){
                OVERAL_SUM = WEIGHT * found.commonCost
            }else if(found.firstCost !== 0){
                OVERAL_SUM = found.firstCost + found.commonCost*(WEIGHT - 1);
            }

            setRandomNum(Math.floor(Math.random() * (8999999999 + 1) + 1000000000));

        }else{
            toast.error("Bunday jarayon bizda yo'q!")
        }
        
        setInitialValues((prev: any)=>
            update(prev, {
                parcelPlanId: value.label,
                parcelPlanIdForApi: Number(value.value),
                costDeliveryToBranch: OVERAL_SUM,
            })
        );
        
    },[setInitialValues, initialValues, costInfo, setRandomNum])


    const onChangeCostDeliveryToBranch = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                costDeliveryToBranch: value.target.value
            })
        )
    },[setInitialValues])

    const onChangeCostDeliveryToPoint = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                costDeliveryToPoint: value.target.value
            })
        )
    },[setInitialValues])

    const onChangeCostPickingUp = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                costPickingUp: value.target.value
            })
        )
    },[setInitialValues])
    
    
    const onChangeStateDeliveryToBranch = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                StateDeliveryToBranch: value
            })
        )
    },[setInitialValues])


    const onChangeStateDeliveryToPoint = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                StateDeliveryToPoint: value
            })
        )
    },[setInitialValues])


    const onChangeStatePickingUp = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                StatePickingUp: value
            })
        )
    },[setInitialValues])


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={()=>onSubmit(initialValues)}
            enableReinitialize={true}
            validationSchema={validationSchema}>
                {()=>(<Form>
                    <div className="row p-3 mt-3">
                        <div className="col-12 mb-3 d-flex justify-content-between align-item-center">
                            <div className="d-flex gap-2 align-item-center">
                                <span>New Parcel</span><span> { randomNum} </span>
                            </div>
                        </div>
                        
                        <div className="col-6">
                            <GroupBox title="Sender">
                                <div className="row mt-2">
                                    <div className="col-12">
                                        <SelectVirtualizedPricek setSearch={setSearch} name="senderId" options={users} onChange={(value: any)=>onChangeSenderId(value)} handleScroll={handleScroll} label={"Sender"}/>
                                    </div>
                                    <div className="col-12 mt-2">
                                        <SelectPicker name="parcelBranchFromId" options={branchs} onChange={(value: any)=>onChangeParcelBranchFromId(value)} label="From"/>
                                    </div>
                                 </div>
                             </GroupBox>
                        </div>
                        
                        <div className="col-6">
                            <GroupBox title="Recipent">
                                <div className="row mt-2">
                                    <div className="col-12">
                                        <SelectVirtualizedPricek setSearch={setSearch} name="recepientId" options={users} onChange={(value: any)=>onChangeRecepientId(value)} handleScroll={handleScroll} label={"Recipent"}/>
                                    </div>
                                    <div className="col-12 mt-2">
                                    <SelectPicker name="parcelBranchToId" options={branchs} onChange={(value: any)=>onChangeParcelBranchToId(value)} label="To"/>                                    </div>
                                </div>
                             </GroupBox>
                        </div>
                        
                        <div className="col-12 mt-4">
                            <GroupBox>
                                <div className="row">
                                    <div className="col-4">
                                        <InputField name="weight" value={initialValues.weight} onChange={(event: any)=>onChangeWeight(event.target.value)} type="number" label="Weight"/>
                                    </div>
                                    <div className="col-4">
                                        <InputField name="numberOfPoint" value={initialValues.numberOfPoint} onChange={(event: any)=>onChangeNumberOfPoint(event.target.value)} type="number" label="Number Of Point"/>
                                    </div>
                                    <div className="col-4">
                                        <SelectPicker name="parcelPlanId" onChange={(value: any)=>onChangeParcelPlanId(value)}  options={plans} label="Parcel Plan"/>
                                    </div>
                                </div>
                            </GroupBox>
                        </div>
                        
                        <div className="col-12 mt-4">
                            <GroupBox title="Courier And Cost">
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <InputGroup label="Cost For Delivery To Branch">
                                            <InputField disabled inputClassName="border-0" value={"Has the shipping cost been paid?"} name="costDeliveryToBranch"/>
                                            <CheckBox onChange={(event)=>onChangeStateDeliveryToBranch(event)} value={initialValues.StateDeliveryToBranch} name="name"/>
                                            <InputField value={initialValues.costDeliveryToBranch} type="number" onChange={(event: any)=>onChangeCostDeliveryToBranch(event)}  inputClassName="rounded-0 border-0 h-100" name="costDeliveryToBranch"/>
                                        </InputGroup>
                                    </div>
                                    <div className="col-6">
                                         <InputGroup label="Cost For Delivery To Point">
                                            <InputField disabled inputClassName="border-0" value={"Shipping cost paid?"} name="costDeliveryToBranch"/>
                                            <CheckBox onChange={(event)=>onChangeStateDeliveryToPoint(event)} value={initialValues.StateDeliveryToPoint} name="name"/>
                                            <InputField type="number" value={initialValues.costDeliveryToPoint} onChange={(event: any)=>onChangeCostDeliveryToPoint(event)} inputClassName="rounded-0 border-0 h-100" name="costDeliveryToPoint"/>
                                        </InputGroup>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <InputGroup label="Cost For Delivery To Pickingup">
                                            <InputField disabled inputClassName="border-0" value={"Has the cost of the fence been paid?"} name="costDeliveryToBranch"/>
                                            <CheckBox onChange={(event)=>onChangeStatePickingUp(event)} value={initialValues.StatePickingUp} name="name"/>
                                            <InputField  value={initialValues.costPickingUp} onChange={(event: any)=>onChangeCostPickingUp(event)} type="number" inputClassName="rounded-0 border-0 h-100" name="costPickingUp"/>
                                        </InputGroup>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <SelectPicker options={paymentMethods} name="paymentMethod" label="Payment Method"/>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <InputGroup label="Courier For Pickingup">
                                            <InputField disabled inputClassName="border-0" value={"Is it calculated with a courier?"} name="costDeliveryToBranch"/>
                                            <CheckBox onChange={()=>console.log("Asadbek")} name="name"/>
                                            <SelectPicker options={customers} isBgColor={false} isBorder={false} name="senderCourierId"/>
                                        </InputGroup>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <InputGroup label="Courier For Delivery">
                                            <InputField disabled inputClassName="border-0" value={"Is it calculated with a courier?"} name="costDeliveryToBranch"/>
                                            <CheckBox onChange={()=>console.log("Asadbek")} name="name"/>
                                            <SelectPicker options={customers} isBgColor={false} isBorder={false} name="recepientCourierId"/>
                                        </InputGroup>
                                    </div>
                                </div>
                            </GroupBox>
                        </div>

                <div className="col-12 mt-3">
                        <ImgUpload className="mb-3" setImage={(value: any)=>setImgUrls((prev: any)=>[...prev, {imgUrl: value}])}/>
                        <AddParcelShowImages data={imgUrls}/>
                </div>

                <div className="col-12 mt-3">
                    <GroupBox title="Messages">
                        <div className="row">
                            <div className="col-4 d-flex">
                                <CheckBox onChange={()=>console.log("Asadbek")} className="bg-transparent w-100" name="telegram" rightLabel="Telegram"/>
                            </div>
                            <div className="col-4">
                                <CheckBox onChange={()=>console.log("Asadbek")} className="bg-transparent w-100" name="sms-sender" rightLabel="Sms Sender"/>
                            </div>
                            <div className="col-4 d-flex">
                                <CheckBox onChange={()=>console.log("Asadbek")} className="bg-transparent w-100" name="sms-receipent" rightLabel="Sms-Reseipent"/>
                            </div>
                        </div>
                    </GroupBox>
                </div>

                <div className="col-12 mt-4">
                        <GroupBox title="Pickup and Delivery address">
                            <div className="row">
                                <div className="col-12 mt-2">
                                    <TextAreaField label="Comment" name="comment"/>
                                </div>
                                <div className="col-12 mt-2">
                                    <TextAreaField label="Pickup address" name="pickupAddress"/>
                                </div>
                                <div className="col-12 mt-2">
                                    <TextAreaField label="Delivery address" name="deliveryAddress"/>
                                </div>
                            </div>
                        </GroupBox>
                    </div>
                    <div className="col-12 mt-3 d-flex gap-3">
                        <Button className="bg-gold text-light px-3 py-1" type="submit">
                            Submit
                        </Button>

                        <Button className="text-light bg-green px-3 py-1" onClick={() => {
                                if(randomNum){
                                    setRundomCode(randomNum)
                                }else{
                                    toast.error("Parcel Number Is Not Found")
                                }
                            }}>
                                Print
                    </Button>
                    </div>
                </div>
            </Form>)}
        </Formik>
    )
}