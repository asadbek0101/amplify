import { Form, Formik } from "formik";
import { update } from "immupdate";
import { useCallback, useState } from "react";
import { bool, mixed, object, string } from "yup";
import GroupBox from "../app/GroupBox";
import InputGroup from "../app/InputGroup";
import Button from "../button/Button";
import CheckBox from "../form/CheckBox";
import InputField from "../form/InputField";
import { toast } from "react-toastify";
import ImgUpload from "../app/ImgUpload";
import AddParcelShowImages from "./AddParcelShowImages";
import TextAreaField from "../form/TextAreaField";
import SelectPickerField from "../form/SelectPickerField";

interface SelectType{
    label: string;
    value: string;
}

const validationSchema = object({
    senderId: mixed<SelectType>(),
    recepientId: mixed<SelectType>(),
    parcelBranchFromId: mixed<SelectType>(),
    parcelBranchToId: mixed<SelectType>(),
    weight: string(),
    numberOfPoint: string(),
    parcelPlanId: mixed<SelectType>(),
    costDeliveryToBranch: string(),
    costDeliveryToPoint: string(),
    costPickingUp: string(),
    paymentMethod: string(),
    senderCourierId: mixed<SelectType>(),
    recepientCourierId: mixed<SelectType>(),
    StateDeliveryToBranch: bool(),
    StatePickingUp: bool(),
    StateDeliveryToPoint: bool(),
})

interface AddParcelFormProps{
    readonly initialValues: any;
    readonly setInitialValues: (value: any) => void;
    readonly senders: any[];
    readonly recepients: any[];
    readonly plans: any[];
    readonly customers: any[];
    readonly branchs: any[];
    readonly costInfo: any[];
    readonly paymentMethods: any[];
    readonly setRundomCode: (value: any) => void;
    readonly onSubmit: (value: any) => void;
    readonly searchSender: (value: string) => void;
    readonly searchReceipent: (value: string) => void;
}

export default function AddParcelForm({
    initialValues, 
    recepients,
    senders, 
    costInfo, 
    branchs, 
    plans, 
    customers, 
    paymentMethods, 
    setInitialValues,
    setRundomCode,
    onSubmit,
    searchSender,
    searchReceipent
}:AddParcelFormProps){

    const onChangeSenderId = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                senderId: {
                    label: value.label,
                    value: value.value
                }
            })
        )
    },[setInitialValues])

    const onChangeRecepientId = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                recepientId: {
                    label: value.label,
                    value: value.value
                }
            })
        )
    },[setInitialValues])

    const onChangeParcelBranchFromId = useCallback((value: any)=>{

        const found = costInfo[costInfo.findIndex(x =>(x.fromBranch === value.label && x.toBranch === initialValues.parcelBranchToId.label && x.planName === initialValues.parcelPlanId.label))];
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
                parcelBranchFromId: {
                    label: value.label,
                    value: value.value
                },
                costDeliveryToBranch: OVERAL_SUM,
            })
        )
    },[setInitialValues, initialValues, costInfo])

    const onChangeParcelBranchToId = useCallback((value: any)=>{

        const found = costInfo[costInfo.findIndex(x =>(x.fromBranch === initialValues.parcelBranchFromId.label && x.toBranch === value.label && x.planName === initialValues.parcelPlanId.label))];
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
                parcelBranchToId: {
                    label: value.label,
                    value: value.value
                },
                costDeliveryToBranch: OVERAL_SUM,
            })
        )
    },[setInitialValues, initialValues, costInfo])

    const onChangeWeight = useCallback((value: any)=>{

        const found = costInfo[costInfo.findIndex(x =>(x.fromBranch === initialValues.parcelBranchFromId.label && x.toBranch === initialValues.parcelBranchToId.label && x.planName === initialValues.parcelPlanId.label))];
        let WEIGHT, OVERAL_SUM: Number = 0;
        
        if(found && found.commonCost !== 0 && value){
            
            console.log("Salom")

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

        const found = costInfo[costInfo.findIndex(x =>(x.fromBranch === initialValues.parcelBranchFromId.label && x.toBranch === initialValues.parcelBranchToId.label && x.planName === value.label))];
        let WEIGHT, OVERAL_SUM: Number = 0;

        if(found && found.commonCost !== 0){

            WEIGHT = initialValues.weight < found.minimumWeight ? found.minimumWeight : initialValues.weight;

            if(found.firstCost === 0){
                OVERAL_SUM = WEIGHT * found.commonCost
            }else if(found.firstCost !== 0){
                OVERAL_SUM = found.firstCost + found.commonCost*(WEIGHT - 1);
            }

                setInitialValues((prev: any)=>
                    update(prev, {
                        code: Math.floor(Math.random() * (899999999 + 1) + 100000000)
                    })
                );

        }else if(found && found.commonCost === 0){
            toast.warn(found.message)
        }
        else{
            toast.error("Bunday jarayon bizda yo'q!")
        }
        
        setInitialValues((prev: any)=>
            update(prev, {
                parcelPlanId: {
                    label: value.label,
                    value: value.value
                },
                costDeliveryToBranch: OVERAL_SUM,
            })
        );
        
    },[setInitialValues, initialValues, costInfo])


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


    const onChangeSenderCourierId = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                senderCourierId: {
                    label: value.label,
                    value: value.value
                }
            })
        )
    },[setInitialValues])


    const onChangeRecepientCourierId = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                recepientCourierId: {
                    label: value.label,
                    value: value.value
                }
            })
        )
    },[setInitialValues])

    // ====== Checkbox ===== //

    const onChangeStatePickingUp = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                StatePickingUp: value
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
 
 
    const onChangeStateSenderCourierId = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                StateSenderCourierId: value
            })
        )
    },[setInitialValues])


    const onChangeSendSmsToRecipient = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                sendSmsToRecipient: value
            })
        )
    },[setInitialValues])


    const onChangeSendSmsToSender = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                sendSmsToSender: value
            })
        )
    },[setInitialValues])


    const onChangeSendSmsToTelegram = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                sendSmsToTelegram: value
            })
        )
    },[setInitialValues])

    // ==== Textarea ==== //

    const onChangeDescription = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                description: value.target.value
            })
        )
    },[setInitialValues])


    const onChangePickupAddress = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                pickupAddress: value.target.value
            })
        )
    },[setInitialValues])

    
    const onChangeDeliveryAddress = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                deliveryAddress: value.target.value
            })
        )
    },[setInitialValues])

    // ==== Image ==== //

    const onChangeImage = useCallback((value: any)=>{
        let array: any = [...initialValues.images]
        array.push({
            imageBytes: value
        })
        setInitialValues((prev: any)=>
        update(prev, {
            images: array,
        }))
    },[setInitialValues, initialValues.images])

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
                                <span>New Parcel</span><span> { initialValues.code} </span>
                            </div>
                        </div>
                        
                        <div className="col-6">
                            <GroupBox title="Sender">
                                <div className="row mt-2">
                                    <div className="col-12">
                                    <SelectPickerField
                                            name="senderId" 
                                            options={senders} 
                                            onChanges={(value)=>onChangeSenderId(value)}
                                            label="Sender"
                                            isSearchable
                                            onInputChange={(value)=>searchSender(value)}
                                            />
                                        </div>
                                    <div className="col-12 mt-2">
                                        <SelectPickerField 
                                            name="parcelBranchFromId" 
                                            options={branchs} 
                                            onChanges={(value: any)=>onChangeParcelBranchFromId(value)} 
                                            label="From"/>
                                    </div>
                                 </div>
                             </GroupBox>
                        </div>
                        
                        <div className="col-6">
                            <GroupBox title="Recipent">
                                <div className="row mt-2">
                                    <div className="col-12">
                                        <SelectPickerField 
                                            isSearchable={true}
                                            name="recepientId" 
                                            options={recepients} 
                                            onChanges={(value)=>onChangeRecepientId(value)}
                                            label="Recepient"
                                            onInputChange={(value)=>searchReceipent(value)}
                                            />
                                    </div>
                                    <div className="col-12 mt-2">
                                        <SelectPickerField 
                                            name="parcelBranchToId" 
                                            options={branchs} 
                                            onChanges={(value: any)=>onChangeParcelBranchToId(value)} 
                                            label="To"/>                                    
                                    </div>
                                </div>
                             </GroupBox>
                        </div>
                        
                        <div className="col-12 mt-4">
                            <GroupBox>
                                <div className="row">
                                    <div className="col-4">
                                        <InputField 
                                            name="weight" 
                                            value={initialValues.weight} 
                                            onChange={(event: any)=>onChangeWeight(event.target.value)} 
                                            type="number" 
                                            label="Weight"/>
                                    </div>
                                    <div className="col-4">
                                        <InputField 
                                            name="numberOfPoint" 
                                            value={initialValues.numberOfPoint} 
                                            onChange={(event: any)=>onChangeNumberOfPoint(event.target.value)} 
                                            type="number" label="Number Of Point"/>
                                    </div>
                                    <div className="col-4">
                                        <SelectPickerField 
                                            name="parcelPlanId" 
                                            onChanges={(value: any)=>onChangeParcelPlanId(value)}  
                                            options={plans} 
                                            label="Parcel Plan"/>
                                    </div>
                                </div>
                            </GroupBox>
                        </div>
                        
                        <div className="col-12 mt-4">
                            <GroupBox title="Courier And Cost">
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <InputGroup label="Cost For Delivery To Branch">
                                            <InputField 
                                                disabled 
                                                inputClassName="border-0" 
                                                value={"Has the shipping cost been paid?"} 
                                                name="costDeliveryToBranch"/>

                                            <CheckBox 
                                                onChange={(event)=>onChangeStateDeliveryToBranch(event)} 
                                                value={initialValues.StateDeliveryToBranch} 
                                                name="name"/>
                                            <InputField 
                                                value={initialValues.costDeliveryToBranch} 
                                                type="number" 
                                                onChange={(event: any)=>onChangeCostDeliveryToBranch(event)}  
                                                inputClassName="rounded-0 border-0 h-100" 
                                                name="costDeliveryToBranch"/>
                                        </InputGroup>
                                    </div>
                                    <div className="col-6">
                                         <InputGroup label="Cost For Delivery To Point">
                                            <InputField 
                                                disabled 
                                                inputClassName="border-0" 
                                                value={"Shipping cost paid?"} 
                                                name="costDeliveryToBranch"/>
                                            <CheckBox 
                                                onChange={(event)=>onChangeStateDeliveryToPoint(event)} 
                                                value={initialValues.StateDeliveryToPoint} 
                                                name="name"/>
                                            <InputField 
                                                type="number" 
                                                value={initialValues.costDeliveryToPoint} 
                                                onChange={(event: any)=>onChangeCostDeliveryToPoint(event)} 
                                                inputClassName="rounded-0 border-0 h-100" 
                                                name="costDeliveryToPoint"/>
                                        </InputGroup>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <InputGroup label="Cost For Delivery To Pickingup">
                                            <InputField 
                                                disabled 
                                                inputClassName="border-0" 
                                                value={"Has the cost of the fence been paid?"} 
                                                name="costDeliveryToBranch"/>
                                            <CheckBox 
                                                onChange={(event)=>onChangeStatePickingUp(event)} 
                                                value={initialValues.StatePickingUp} 
                                                name="name"/>
                                            <InputField  
                                                value={initialValues.costPickingUp} 
                                                onChange={(event: any)=>onChangeCostPickingUp(event)} 
                                                type="number" 
                                                inputClassName="rounded-0 border-0 h-100" 
                                                name="costPickingUp"/>
                                        </InputGroup>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <SelectPickerField 
                                            options={paymentMethods} 
                                            name="paymentMethod" 
                                            label="Payment Method"/>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <InputGroup label="Courier For Pickingup">
                                            <InputField 
                                                disabled 
                                                inputClassName="border-0" 
                                                value={"Is it calculated with a courier?"} 
                                                name="costDeliveryToBranch"/>
                                            <CheckBox 
                                                onChange={(value: boolean)=>onChangeStateSenderCourierId(value)}
                                                value={initialValues.StateSenderCourierId}
                                                name="name"/>
                                            <SelectPickerField 
                                                className="w-100"
                                                options={customers} 
                                                onChanges={(value)=>onChangeSenderCourierId(value)} 
                                                name="senderCourierId"/>
                                        </InputGroup>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <InputGroup label="Courier For Delivery">
                                            <InputField 
                                                disabled 
                                                inputClassName="border-0" 
                                                value={"Is it calculated with a courier?"} 
                                                name="costDeliveryToBranch"/>
                                            <CheckBox 
                                                onChange={()=>console.log("Asadbek")} 
                                                name="name"/>
                                            <SelectPickerField 
                                                className="w-100"
                                                options={customers}     
                                                onChanges={(value)=>onChangeRecepientCourierId(value)} 
                                                name="recepientCourierId"/>
                                        </InputGroup>
                                    </div>
                                </div>
                            </GroupBox>
                        </div>

                <div className="col-12 mt-3">
                        <ImgUpload 
                            className="mb-3" 
                            setImage={(value: any)=>onChangeImage(value)}/>
                        <AddParcelShowImages 
                            data={initialValues.images}/>
                </div>

                <div className="col-12 mt-3">
                    <GroupBox title="Messages">
                        <div className="row">
                            <div className="col-4 d-flex">
                                <CheckBox 
                                    onChange={(value: boolean)=>onChangeSendSmsToTelegram(value)} 
                                    value={initialValues.sendSmsToTelegram}
                                    className="bg-transparent w-100" 
                                    name="telegram" 
                                    rightLabel="Telegram"/>
                            </div>
                            <div className="col-4">
                                <CheckBox 
                                    onChange={(value: boolean)=>onChangeSendSmsToSender(value)} 
                                    value={initialValues.sendSmsToSender}
                                    className="bg-transparent w-100" 
                                    name="sms-sender" 
                                    rightLabel="Sms Sender"/>
                            </div>
                            <div className="col-4 d-flex">
                                <CheckBox 
                                    onChange={(value: boolean)=>onChangeSendSmsToRecipient(value)}
                                    value={initialValues.sendSmsToRecipient} 
                                    className="bg-transparent w-100" 
                                    name="sms-receipent" 
                                    rightLabel="Sms-Reseipent"/>
                            </div>
                        </div>
                    </GroupBox>
                </div>

                <div className="col-12 mt-4">
                        <GroupBox title="Pickup and Delivery address">
                            <div className="row">
                                <div className="col-12 mt-2">
                                    <TextAreaField 
                                        label="Description" 
                                        name="description"
                                        value={initialValues.description}
                                        onChange={(value: any)=>onChangeDescription(value)}
                                        />
                                </div>
                                <div className="col-12 mt-2">
                                    <TextAreaField 
                                        label="Pickup address" 
                                        name="pickupAddress"
                                        value={initialValues.pickupAddress}
                                        onChange={(value: any)=>onChangePickupAddress(value)}
                                        />
                                </div>
                                <div className="col-12 mt-2">
                                    <TextAreaField 
                                        label="Delivery address" 
                                        name="deliveryAddress"
                                        value={initialValues.deliveryAddress}
                                        onChange={(value: any)=>onChangeDeliveryAddress(value)}
                                        />
                                </div>
                            </div>
                        </GroupBox>
                    </div>
                    <div className="col-12 mt-3 d-flex gap-3">
                        <Button 
                            className="bg-gold text-light px-3 py-1" 
                            type="submit">
                            Submit
                        </Button>

                        <Button 
                            className="text-light bg-green px-3 py-1" 
                            onClick={() => {
                                if(initialValues.code != 0){
                                    setRundomCode(initialValues.code)
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