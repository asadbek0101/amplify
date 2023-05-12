import AppView from "../app/AppView";

interface Props{
    readonly data: any;
}

export default function ParcelView({
    data
}:Props){
    return (<AppView data={data}/>)
}