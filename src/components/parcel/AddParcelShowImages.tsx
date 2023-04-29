
interface Props{
    readonly data: any[];
}

export default function AddParcelShowImages({data}:Props){
    
    return (
        <div className="row">
            {data.length > 0 && (
              <>
                {data.map((item: any)=>{
                    return (
                    <div className="col-3">
                         <img width="100%" src={item.imageBytes} alt="" />
                     </div>
                    )
                })}
                </>
            )}
            {data.length == 0 && (
                <div className="col-12 d-flex justify-content-center align-items-center" style={{height: "200px",}}>
                    <h2>Upload Img</h2>
                </div>
            )}
        </div>
    )
}