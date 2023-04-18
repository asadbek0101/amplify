import { InputProps as NativeInputProps } from "../../api/AppDto";


export interface InputProps extends Omit<NativeInputProps, "size" | "placeholder" | "classname">{
    readonly width?: number;
    readonly height?: number;
    readonly hasError?: boolean;
    readonly hintText?: string;
    readonly label?: string;
    readonly placeholder?: string;
}

export function Input({
    width,
    height,
    hasError,
    hintText,
    label,
    placeholder,
    ...props
}:InputProps){
    return (
        <input type="text" />
    )
}