import React, {useCallback} from "react";
import { Form, Formik } from "formik";
import { number, object, string } from "yup";
import GroupBox from "../app/GroupBox";
import InputField from "../form/InputField";
import { update } from "immupdate";
import Button from "../button/Button";

interface RoleFormProps{
    readonly initialValues: any;
    readonly setInitialValues: (value: any) => void;
    readonly submit: (value: any) => void;
}

const validationSchema = object({
    name: string().required("Required!"),
})

export default function RoleManagerForm({initialValues, setInitialValues, submit}:RoleFormProps){

    const onChangeName = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            name: value.target.value
        }))
    },[setInitialValues])


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={submit}
            >
            {()=>(
                <Form>
                    <div className="row">
                        <div className="col-6">
                        <GroupBox title="Person Info">
                           <div className="row">
                            <div className="col-12">
                            <InputField
                                label="Name"
                                name="name"
                                value={initialValues.name}
                                onChange={(event: any)=>onChangeName(event)}
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