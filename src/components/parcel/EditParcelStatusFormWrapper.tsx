import { useState } from "react";
import TabPage from "../tabs/TabPage";
import EditParcelStatusForm from "./EditParcelStatusForm";

export default function EditParcelStatusFormWrapper(){

    const [initialValues, setInitialValues] = useState({
        name: "",
    })

    return (
        <TabPage
            childrenClassName="p-2"
            >
            <EditParcelStatusForm
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                onSubmit={(value)=>console.log(value)}
                />
        </TabPage>
    )
}