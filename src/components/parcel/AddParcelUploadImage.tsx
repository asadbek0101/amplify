import { useState } from "react";
import ImgUpload from "../app/ImgUpload";
import AddParcelShowImages from "./AddParcelShowImages";

export default function AddParcelUploadImage(){
    const [ imgUrls, setImgUrls ] = useState<any>([])
    return (
        <div className="p-3">
            <ImgUpload setImage={(value: any)=>setImgUrls((prev: any)=>[...prev, {imgUrl: value}])}/>
            <AddParcelShowImages data={imgUrls}/>
        </div>
    )
}