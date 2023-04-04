import Group from "react-select/dist/declarations/src/components/Group";
import CheckBox from "../form/CheckBox";
import GroupBox from "../app/GroupBox";

export default function AddParcelMessages(){
    return (
        <div className="row p-3">
            <div className="col-12">
                <GroupBox title="Messages">
                <div className="row">
                        <div className="col-4 d-flex">
                            <CheckBox className="bg-transparent w-100" name="telegram" rightLabel="Telegram"/>
                        </div>
                        <div className="col-4">
                            <CheckBox className="bg-transparent w-100" name="sms-sender" rightLabel="Sms Sender"/>
                        </div>
                        <div className="col-4 d-flex">
                            <CheckBox className="bg-transparent w-100" name="sms-receipent" rightLabel="Sms-Reseipent"/>
                        </div>
                    </div>
                </GroupBox>
            </div>
        </div>
    )
}