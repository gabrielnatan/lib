import React, { ButtonHTMLAttributes} from "react"

export interface OwnProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({children,...props}:OwnProps)=>{
    return(
        <button 
            className="p-2 bg-slate-500 rounded-lg" 
            {...props}
        >
            {children}
        </button>
    )
}


export default Button;