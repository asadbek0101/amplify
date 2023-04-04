import { Form, Formik } from "formik";
import { update } from "immupdate";
import React, { useCallback, useState } from "react";
import { object, string } from "yup";
import GroupBox from "../app/GroupBox";
import InputGroup from "../app/InputGroup";
import Button from "../button/Button";
import CheckBox from "../form/CheckBox";
import InputField from "../form/InputField";
import SelectPicker from "../form/SelectPicker";
import SelectVirtualizedPricek from "../form/SelectVirtualizedPricek";

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
    setSearch
}:AddParcelFormProps){

    const [sum, setSum] = useState(0);

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
        setInitialValues((prev: any)=>
            update(prev, {
                parcelBranchFromId: value.label
            })
        )
    },[setInitialValues])

    const onChangeParcelBranchToId = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                parcelBranchToId: value.label
            })
        )
    },[setInitialValues])

    const onChangeWeight = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                weight: value
            })
        )
    },[setInitialValues])

    const onChangeNumberOfPoint = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                numberOfPoint: value
            })
        )
    },[setInitialValues])

    const onChangeParcelPlanId = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                parcelPlanId: value.label
            })
        )
    },[setInitialValues, initialValues])


    const findCost = useCallback(()=>{
        const found = costInfo[costInfo.findIndex(x =>(x.fromBranch == initialValues.parcelBranchFromId && x.toBranch == initialValues.parcelBranchToId && x.planName == initialValues.parcelPlanId))];
        if(found.minimumWeight < Number(initialValues.weight)){
            let a = Number(found.cost) * Number(initialValues.weight);
            setSum(a);
        }else {
            let a = Number(found.cost) * Number(found.minimumWeight);
            setSum(a); 
        }
    },[initialValues, costInfo, sum, setSum])

    console.log("sum ", sum)


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={()=>console.log("Formik is working...")}
            enableReinitialize={true}
            validationSchema={validationSchema}
                >
                {()=>(<Form>
                    <div className="row p-3 mt-3">
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

                        <div className="col-12 d-flex justify-content-end mt-3">
                            <Button className="bg-gold text-light px-2 py-1" onClick={()=>findCost()}>
                                Submit
                            </Button>
                        </div>

                        <div className="col-12 mt-4">
                            <GroupBox title="Courier And Cost">
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <InputGroup label="Cost For Delivery To Branch">
                                            <InputField disabled inputClassName="border-0" value={"Has the shipping cost been paid?"} name="costDeliveryToBranch"/>
                                            <CheckBox name="name"/>
                                            <InputField value={0} type="number"  inputClassName="rounded-0 border-0 h-100" name="costDeliveryToBranch"/>
                                        </InputGroup>
                                    </div>
                                    <div className="col-6">
                                         <InputGroup label="Cost For Delivery To Point">
                                            <InputField disabled inputClassName="border-0" value={"Shipping cost paid?"} name="costDeliveryToBranch"/>
                                            <CheckBox name="name"/>
                                            <InputField value={0} type="number" inputClassName="rounded-0 border-0 h-100" name="costDeliveryToPoint"/>
                                        </InputGroup>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <InputGroup label="Cost For Delivery To Pickingup">
                                            <InputField disabled inputClassName="border-0" value={"Has the cost of the fence been paid?"} name="costDeliveryToBranch"/>
                                            <CheckBox name="name"/>
                                            <InputField  value={0} type="number" inputClassName="rounded-0 border-0 h-100" name="costPickingUp"/>
                                        </InputGroup>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <SelectPicker options={paymentMethods} name="paymentMethod" label="Payment Method"/>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <InputGroup label="Courier For Pickingup">
                                            <InputField disabled inputClassName="border-0" value={"Is it calculated with a courier?"} name="costDeliveryToBranch"/>
                                            <CheckBox name="name"/>
                                            <SelectPicker options={customers} isBgColor={false} isBorder={false} name="senderCourierId"/>
                                        </InputGroup>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <InputGroup label="Courier For Delivery">
                                            <InputField disabled inputClassName="border-0" value={"Is it calculated with a courier?"} name="costDeliveryToBranch"/>
                                            <CheckBox name="name"/>
                                            <SelectPicker options={customers} isBgColor={false} isBorder={false} name="recepientCourierId"/>
                                        </InputGroup>
                                    </div>
                                </div>
                            </GroupBox>
                        </div>
                        
                        </div>
                    </Form>)}
        </Formik>
    )
}