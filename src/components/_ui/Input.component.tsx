interface InputProps {
    onChange? :()=>void;
    label?:string;
}
export const FormInput = 
    ({ onChange, label }: InputProps)=> {

    return  (
        <div className="block">
            <div className="block pb-2">
                <span className="text-lg font-semibold font-sans text-black">{label}</span>
            </div>
            <div className="block">
                <input className="py-3 pl-4 rounded text-base font-sans text-black bg-silver" type="text" onChange={onChange} />
            </div>
        </div>
    )
}