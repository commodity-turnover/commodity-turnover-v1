import React, { ReactNode, ButtonHTMLAttributes  } from 'react'
import styles from "./button.module.scss"

interface MyComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonType: string,
    children: ReactNode
}

const Button: React.FC<MyComponentProps> = ({buttonType, children, disabled, ...inputDefaultProps}) => {
  return (
    <button 
        className={`${styles[buttonType]} ${disabled && styles.disabled}`} 
        
        {...inputDefaultProps}
    >{children}</button>
  )
}

export default Button