import React, { ButtonHTMLAttributes } from "react";
export interface OwnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}
declare const Button: ({ children, ...props }: OwnProps) => React.JSX.Element;
export default Button;
