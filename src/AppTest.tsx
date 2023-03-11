import React, {useState} from "react";
import SelectPicker from "./components/form/SelectPicker";

export default function AppTest() {

  return (
   <div className="w-100 d-flex justify-content-center align-items-center flex-column">
   <SelectPicker onChange={(value: any)=>console.log("value ", value)}/>
   </div>
  );
}