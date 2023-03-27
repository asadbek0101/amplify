import { Form, Formik } from "formik";
import React from "react";
import { object } from "yup";
import GroupBox from "../app/GroupBox";
import InputField from "../form/InputField";
import SelectPicker from "../form/SelectPicker";

interface AddParcelFormProps{
    readonly initialValues: any;
    readonly users: any[];
    readonly plans: any[];
    readonly branchs: any[];
    readonly costInfo: any[];
}

const validationSchema = object({

})

export default function AddParcelForm({initialValues, users, costInfo, branchs, plans}:AddParcelFormProps){

    console.log(users)

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={()=>console.log("Formik is working...")}
            enableReinitialize={true}
            validationSchema={validationSchema}
                >
                {()=>(
                   <div className="row">
                    <div className="col-12 mt-4 px-4">
                            <GroupBox title="New Parcel">
                                <Form>
                                    <SelectPicker name="senderId" options={users} label="Sender"/>
                                    <SelectPicker name="recepientId" options={users} label="Recepient"/>
                                    <SelectPicker name="parcelBranchFromId" options={branchs} label="From"/>
                                    <SelectPicker name="parcelBranchToId" options={branchs} label="To"/>
                                    <SelectPicker name="weight" label="Weight"/>
                                    <SelectPicker name="numberOfPoint" label="Number Of Point"/>
                                    <SelectPicker name="parcelPlanId" options={plans} label="Parcel Plan"/>
                                    <SelectPicker name="costDeliveryToBranch" label="Cost For Delivery To Branch"/>
                                    <SelectPicker name="costDeliveryToPoint" label="Cost For Delivery To Point"/>
                                    <SelectPicker name="costPickingUp" label="Cost For Delivery To Pickingup"/>
                                    <SelectPicker name="senderCourierId" label="Courier For Pickingup"/>
                                    <SelectPicker name="recepientCourierId" label="Courier For Delivery"/>
                                    <SelectPicker name="paymentMethod" label="Payment Method"/>
                                </Form>
                            </GroupBox>
                    </div>
                   </div>
                 )}
        </Formik>
    )
}