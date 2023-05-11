import React , {useState, useCallback} from "react";
import "./assets/upload.scss";

interface ImgUploadProps{
    readonly setImage: (value: any) => void;
    readonly className?: string;
}

export default function ImgUpload({setImage, className}:ImgUploadProps){


    const convertBase64 = useCallback((e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = ( ) => {
            setImage(reader.result?.toString());
        }

        reader.readAsDataURL(file);
    },[setImage])

    return (
        <div className={`upload-container ${className}`}>
            <input id="fileUpload" className="hidden" type="file" hidden onChange={(event: any) => convertBase64(event)} />
            <label className="upload-label" htmlFor="fileUpload">Загрузка изображений</label>
        </div>
    )
}