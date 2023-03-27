import React, {useCallback} from "react";
import { Form, Formik } from "formik";
import { number, object, string } from "yup";
import GroupBox from "../app/GroupBox";
import InputField from "../form/InputField";
import { update } from "immupdate";
import Button from "../button/Button";

interface UserManagerFormProps{
    readonly initialValues: any;
    readonly setInitialValues: (value: any) => void;
    readonly submit: (value: any) => void;
}

const validationSchema = object({
    firstName: string().required("Required!"),
    lastName: string().required("Required!"),
    userName: string().required("Required!"),
    email: string().required("Required!"),
    phoneNumber: string().required("Required!"),
    address: string().required("Required!"),
    roleName: string().required("Required!"),
    passwordHash: string().required("Required!")
})

export default function UserManagerForm({initialValues, setInitialValues, submit}:UserManagerFormProps){

    const onChangeFirstName = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            firstName: value.target.value
        }))
    },[setInitialValues])

    const onChangeLastName = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            lastName: value.target.value
        }))
    },[setInitialValues])

    const onChangeEmail = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            email: value.target.value
        }))
    },[setInitialValues])

    const onChangePhoneNumber = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            phoneNumber: value.target.value
        }))
    },[setInitialValues])

    //
    
    const onChangeUserName = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            userName: value.target.value
        }))
    },[setInitialValues])

    const onChangeRoleName = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            roleName: value.target.value
        }))
    },[setInitialValues])

    const onChangeAddress = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            address: value.target.value
        }))
    },[setInitialValues])

    const onChangePassword = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            passwordHash: value.target.value
        }))
    },[setInitialValues])

    const onChangeClaim = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            claim: value.target.value
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
                        <div className="col-4">

                        </div>
                        <div className="col-8">
                        <GroupBox title="User Info">
                           <div className="row">
                            <div className="col-6 my-1">
                            <InputField
                                label="First Name"
                                name="firstName"
                                value={initialValues.firstName}
                                onChange={(event: any)=>onChangeFirstName(event)}
                                />
                            </div>
                            <div className="col-6 my-1">
                            <InputField
                                label="Last Name"
                                name="lastName"
                                value={initialValues.lastName}
                                onChange={(event: any)=>onChangeLastName(event)}
                                />
                            </div>
                            <div className="col-6 my-1">
                            <InputField
                                label="Email"
                                name="email"
                                value={initialValues.email}
                                onChange={(event: any)=>onChangeEmail(event)}
                                />
                            </div>
                            <div className="col-6 my-1">
                            <InputField
                                label="Username"
                                name="userName"
                                value={initialValues.userName}
                                onChange={(event: any)=>onChangeUserName(event)}
                                />
                            </div>
                            <div className="col-6 my-1">
                            <InputField
                                label="Phone Number"
                                name="phoneNumber"
                                value={initialValues.phoneNumber}
                                onChange={(event: any)=>onChangePhoneNumber(event)}
                                />
                            </div>
                            <div className="col-6 my-1">
                            <InputField
                                label="Address"
                                name="address"
                                value={initialValues.address}
                                onChange={(event: any)=>onChangeAddress(event)}
                                />
                            </div>
                           </div>
                        </GroupBox>
                        </div>
                        <div className="col-12 mt-5">
                            <GroupBox
                                title="Some user details"
                                >
                                    <div className="row">
                                        <div className="col-4 d-flex">
                                        <InputField
                                        label="User Password"
                                        name="passwordHash"
                                        value={initialValues.passwordHash}
                                        onChange={(event: any)=>onChangePassword(event)}
                                         />
                                        </div>
                                        <div className="col-4 d-flex">
                                        <InputField
                                        label="User Roles"
                                        name="roleName"
                                        value={initialValues.roleName}
                                        onChange={(event: any)=>onChangeRoleName(event)}
                                         />
                                        </div>
                                        <div className="col-4 d-flex">
                                        <InputField
                                        label="User Claims"
                                        name="claim"
                                        value={initialValues.claim}
                                        onChange={(event: any)=>onChangeClaim(event)}
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