import React, { ReactNode, ButtonHTMLAttributes  } from 'react'
import styles from "./button.module.scss"

interface MyComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonType: string,
    children: ReactNode
}

const Button: React.FC<MyComponentProps> = ({buttonType, children, ...inputDefaultProps}) => {
  return (
    <button 
        className={styles[buttonType]} 
        {...inputDefaultProps}
    >{children}</button>
  )
}

export default Button