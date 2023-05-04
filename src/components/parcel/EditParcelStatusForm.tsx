import { Formik } from "formik";
import { Form } from "react-router-dom";
import { object, string } from "yup";

const validationSchema = object({
    name: string()
})

interface Props{
    readonly initialValues: any;
    readonly setInitialValues: (value: any) => void;
    readonly onSubmit: (value: any) => void;
}

export default function EditParcelStatusForm({
    initialValues,
    setInitialValues,
    onSubmit
}:Props){
    return (
      <div>
        Edit Parcel Status
      </div>
    )
}