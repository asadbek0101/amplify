import {useCallback, useRef, useState} from "react";
import { Form, Formik } from "formik";
import { mixed, object, string } from "yup";
import GroupBox from "../app/GroupBox";
import { update } from "immupdate";
import Button from "../button/Button";
import SelectPickerField from "../form/SelectPickerField";
import CheckBox from "../form/CheckBox";
import TextAreaField from "../form/TextAreaField";
import EditParcelShowNumber from "./EditParcelShowNumber";
import RadioButtonGroupField from "../form/RadioButtonGroupField";
import { SelectType } from "./ParcelForm";

interface RoleFormProps{
    readonly initialValues: any;
    readonly setInitialValues: (value: any) => void;
    readonly onSubmit: (value: any) => void;
    readonly statuses: any[];
    readonly curiers: any[];
}

const validationSchema = object({
    statusId: mixed<SelectType>(),
    recipientCourierId: mixed<SelectType>(),
})

export default function EditParcelStatusForm({
    initialValues, 
    setInitialValues, 
    onSubmit,
    statuses,
    curiers
}:RoleFormProps){

    const inqFormRef = useRef<any>(null);

    const radioButtonOptions = [
        {
          label: "Накладной",
          value: "getInvoice",
        },
        {
          label: "Маршрутный лист",
          value: "getCourierList"
        },
        {
          label: "Накладной/Маршрутный лист",
          value: "getAll"
        }
      ]

    const onChangeStatusId = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            statusId: {
                label: value.label,
                value: value.value
            }
        }))
    },[setInitialValues])

    const onChangeRecipientCourierId = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            recipientCourierId:{
                label: value.label,
                value: value.value
            }
        }))
    },[setInitialValues])
   
    // ==== checkbox ==== //

    const onChangeSendSmsToTelegram = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            sendSmsToTelegram: value
        }))
    },[setInitialValues])

    const onChangeSendSmsToSender = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            sendSmsToSender: value
        }))
    },[setInitialValues])

    const onChangeSendSmsToRecipient = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            sendSmsToRecipient: value
        }))
    },[setInitialValues])

    // ==== checkbox end ==== //
    
    const onChangeParcelCode = useCallback((value: any)=>{
        let array = [...initialValues.parcelCode]
        if(value.target.value.length === 9){
            let data = {
                title: value.target.value
            }
            let found = array.filter((item: any)=>item.title === value.target.value)
            if(found.length === 0){
                array.push(data);
            }

            setInitialValues((prev: any)=>update(prev, {
                parcelCode: array,
                searchText: "",
            }))
        }else{
            setInitialValues((prev: any)=>update(prev, {
                searchText: value.target.value,
            }))
        }
    },[setInitialValues, initialValues])

    const deleteSearchNumber = useCallback((value: any)=>{

        let data = [...initialValues.parcelCode];

        data.splice(Number(value), 1);

        setInitialValues((prev: any) => update(prev, {
            parcelCode: data,
        }))
    },[setInitialValues, initialValues.parcelCode])

    const inqFormRefHandler = useCallback((instance: any)=>{
        if(instance){
            inqFormRef.current = instance
        }
    },[inqFormRef])

    const onChangeRadioButton = useCallback((value: any)=>{
            setInitialValues((prev: any)=>update(prev, {
                radioButtonValue: value
            }))
    },[setInitialValues])

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={onSubmit}
            innerRef={inqFormRefHandler}
            >
            {()=>(
                <Form>
                    <div className="row">
                        <div className="col-6">
                        <GroupBox title="Person Info">
                           <div className="row">
                            <div className="col-12">
                            <SelectPickerField
                                label="Статус посылки"
                                name="statusId"
                                options={statuses}
                                value={initialValues.statusId}
                                onChanges={(event: any)=>onChangeStatusId(event)}
                                />
                            </div>
                           </div>
                        </GroupBox>
                        </div>
                        <div className="col-6">
                        <GroupBox title="На доставке у курьера">
                           <div className="row">
                            <div className="col-12">
                            <SelectPickerField
                                label="На доставке у курьера"
                                name="recipientCourierId"
                                value={initialValues.recipientCourierId}
                                options={curiers}
                                onChanges={(event: any)=>onChangeRecipientCourierId(event)}
                                />
                            </div>
                           </div>
                        </GroupBox>
                        </div>

                        <div className="col-12 mt-4">
                            <GroupBox>
                             <div className="row">
                             <div className="col-4">
                                    <CheckBox
                                        checkboxClassName="me-2"
                                        name="sendSmsToTelegram"
                                        className="bg-transparent d-flex w-100 justify-content-start"
                                        rightLabel="Телеграм"
                                        value={initialValues.sendSmsToTelegram}
                                        onChange={(event)=>onChangeSendSmsToTelegram(event)}
                                        />
                                </div>
                                <div className="col-4">
                                    <CheckBox
                                        checkboxClassName="me-2"
                                        name="sendSmsToSender"
                                        className="bg-transparent d-flex w-100 justify-content-start"
                                        rightLabel="СМС Отправителю"
                                        value={initialValues.sendSmsToSender}
                                        onChange={(event)=>onChangeSendSmsToSender(event)}
                                        />
                                </div>
                                <div className="col-4">
                                    <CheckBox
                                        checkboxClassName="me-2"
                                        name="sendSmsToRecipient"
                                        className="bg-transparent d-flex w-100 justify-content-start"
                                        rightLabel="СМС Получателю"
                                        value={initialValues.sendSmsToRecipient}
                                        onChange={(event)=>onChangeSendSmsToRecipient(event)}
                                        />
                                </div>
                                <div className="col-12 mt-4">
                                    <RadioButtonGroupField
                                        className="row"
                                        radioButtonClassName="col-4"
                                        options={radioButtonOptions}
                                        onChange={(value: any)=>onChangeRadioButton(value.target.value)}
                                        value={initialValues.radioButtonValue}
                                        />
                                </div>
                              
                             </div>
                            </GroupBox>
                        </div>

                        <div className="col-12 mt-3">
                            <GroupBox>
                                <div className="row">
                                    <div className="col-12">
                                        <TextAreaField
                                            name="parcelCode"
                                            label="Search parcel by number"
                                            value={initialValues.searchText}
                                            onChange={(value)=>onChangeParcelCode(value)}
                                            />
                                    </div>

                                    <div className="col-12 d-flex">
                                       <EditParcelShowNumber
                                        data={initialValues.parcelCode}
                                        delet={(value: number)=>deleteSearchNumber(value)}
                                        />
                                    </div>
                                </div>
                            </GroupBox>
                        </div>

                        <div className="col-12 mt-3">
                            <Button type="submit" className="text-light bg-gold px-2 py-1">
                                Submit
                            </Button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}