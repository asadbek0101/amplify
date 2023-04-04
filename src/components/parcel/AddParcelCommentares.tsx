import { Formik } from "formik";
import GroupBox from "../app/GroupBox";
import TextAreaField from "../form/TextAreaField";
import { Form } from "react-router-dom";

export default function AddParcelCommentares(){
    return (
       <Formik
            initialValues={{}}
            enableReinitialize={true}
            onSubmit={()=>console.log("Asadbek")}
            validationSchema={{}}
            >
            {()=>(
            <Form>
                 <div className="row p-3">
                    <div className="col-12">
                        <GroupBox>
                            <div className="row">
                                <div className="col-12">
                                    <TextAreaField name="commentary" label="Commentary"/>
                                </div>
                                <div className="col-12">
                                    <TextAreaField name="commentary" label="Commentary"/>
                                </div>
                                <div className="col-12">
                                    <TextAreaField name="commentary" label="Commentary"/>
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