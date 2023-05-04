import React, {useCallback, useRef, useState} from "react";
import { Form, Formik } from "formik";
import { number, object, string } from "yup";
import GroupBox from "../app/GroupBox";
import InputField from "../form/InputField";
import { update } from "immupdate";
import Button from "../button/Button";
import Dropdown from "../form/DropdownSelect";
import SelectPickerField from "../form/SelectPickerField";
import CheckBox from "../form/CheckBox";
import TextAreaField from "../form/TextAreaField";
import EditParcelShowNumber from "./EditParcelShowNumber";

interface RoleFormProps{
    readonly initialValues: any;
    readonly setInitialValues: (value: any) => void;
    readonly onSubmit: (value: any) => void;
}

const validationSchema = object({
    name: string().required("Required!"),
})

export default function EditParcelStatusForm({
    initialValues, 
    setInitialValues, 
    onSubmit
}:RoleFormProps){

    const inqFormRef = useRef<any>(null);
    const [searchTextarea, setSearchTextarea] = useState("")

    const onChangeName = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            name: value.target.value
        }))
    },[setInitialValues])
   
   
    const onChangeSearchParcelByNumber = useCallback((value: any)=>{
        let array = [...initialValues.searchParcelByNumber]
        if(value.target.value.length === 9){
            let data = {
                title: value.target.value
            }

            array.push(data);

            setInitialValues((prev: any)=>update(prev, {
                searchParcelByNumber: array,
                searchText: "",
            }))
        }else{
            setInitialValues((prev: any)=>update(prev, {
                searchText: value.target.value,
            }))
        }
    },[setInitialValues, initialValues])

    const deleteSearchNumber = useCallback((value: any)=>{

        let data = [...initialValues.searchParcelByNumber];

        data.splice(Number(value), 1);

        setInitialValues((prev: any) => update(prev, {
            searchParcelByNumber: data,
        }))
    },[setInitialValues, initialValues.searchParcelByNumber])

    const inqFormRefHandler = useCallback((instance: any)=>{
        if(instance){
            inqFormRef.current = instance
        }
    },[inqFormRef])


   
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
                                label="Name"
                                name="name"
                                value={initialValues.name}
                                onChange={(event: any)=>onChangeName(event)}
                                />
                            </div>
                           </div>
                        </GroupBox>
                        </div>
                        <div className="col-6">
                        <GroupBox title="Person Info">
                           <div className="row">
                            <div className="col-12">
                            <SelectPickerField
                                label="Name"
                                name="name"
                                value={initialValues.name}
                                onChange={(event: any)=>onChangeName(event)}
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
                                        name="telegram"
                                        className="bg-transparent"
                                        rightLabel="Telegram"
                                        onChange={()=>console.log("salom dunyo")}
                                        />
                                </div>
                                <div className="col-4">
                                    <CheckBox
                                        name="telegram"
                                        className="bg-transparent"
                                        rightLabel="Telegram"
                                        onChange={()=>console.log("salom dunyo")}
                                        />
                                </div>
                                <div className="col-4">
                                    <CheckBox
                                        name="telegram"
                                        className="bg-transparent"
                                        rightLabel="Telegram"
                                        onChange={()=>console.log("salom dunyo")}
                                        />
                                </div>
                                <div className="col-4 mt-4">
                                    <CheckBox
                                        name="telegram"
                                        className="bg-transparent"
                                        rightLabel="Telegram"
                                        onChange={()=>console.log("salom dunyo")}
                                        />
                                </div>
                                <div className="col-4 mt-4">
                                    <CheckBox
                                        name="telegram"
                                        className="bg-transparent"
                                        rightLabel="Telegram"
                                        onChange={()=>console.log("salom dunyo")}
                                        />
                                </div>
                                <div className="col-4 mt-4">
                                    <CheckBox
                                        name="telegram"
                                        className="bg-transparent"
                                        rightLabel="Telegram"
                                        onChange={()=>console.log("salom dunyo")}
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
                                            name="searchParcelByNumber"
                                            label="Search parcel by number"
                                            value={initialValues.searchText}
                                            onChange={(value)=>onChangeSearchParcelByNumber(value)}
                                            />
                                    </div>

                                    <div className="col-12 d-flex">
                                       <EditParcelShowNumber
                                        data={initialValues.searchParcelByNumber}
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