import { Form, Formik } from "formik";
import { object, string } from "yup";
import GroupBox from "../app/GroupBox";
import SelectPickerField from "../form/SelectPickerField";

const validationSchema = object({
    user: string()
})

const options = [
    {label: "Asadbek", value: "1"},
    {label: "Asrorbek", value: "2"},
    {label: "Akmaljon", value: "3"},
]

interface Props{
    readonly initialValues: any;
    readonly setInitialValues: (value: any) => void;
}

export default function EditParcelForm({
    initialValues,
    setInitialValues
}:Props){
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={()=>console.log("Asadbek")}
            >
            {()=>(
                <Form>
                    <div className="row">
                        <div className="col-6">
                            <GroupBox>
                                <div className="row">
                                    <div className="col-12">
                                        <SelectPickerField
                                            name="user"
                                            options={options}
                                            isSearchable
                                            />
                                    </div>
                                </div>
                            </GroupBox>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}