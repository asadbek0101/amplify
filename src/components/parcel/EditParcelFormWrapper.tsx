import { useState } from "react";
import TabPage from "../tabs/TabPage";
import EditParcelForm from "./EditParcelForm";

export default function EditParcelFormWrapper(){

    const [initialValues, setInitialValues] = useState({
        user: ""
    })

    return (
        <TabPage
            childrenClassName="p-3"
            >
            <EditParcelForm
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                />
        </TabPage>
    )
}