import React, {FC} from 'react'
import classnames from 'classnames'
// export enum ButtonSize {
//    Large = 'lg',
//    Small = 'sm'
// }
// export enum ButtonType {
//     Primary = 'primary',
//     Default = 'default',
//     Danger = 'danger',
//     Link = 'link'
// }

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'
interface BaseButtonProps {
    className?: string,
    /**设置 Button 的禁用*/
    disabled?: boolean
    /** 设置Button 的大小 */
    size?: ButtonSize
    /** 设置Button 的类型 */
    btnType?: ButtonType,
    children: React.ReactNode,
    href?: string
}
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type NativeAnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
// Partial 后属性变为可选
export type ButtonProps = Partial<NativeButtonProps & NativeAnchorButtonProps>
export const Button: FC<ButtonProps> = (props)=>{
    const {
        btnType,
        disabled,
        size,
        children,
        href,
        className,
        ...restProps
    } = props
    console.log('props', btnType)
    const classes = classnames('btn',className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
    })
    if(btnType === 'link' && href){
        return(
            <a  className={classes} {...restProps} href={href}>
                {children}
            </a>
        )
    } else {
        return (
            <button className={classes} {...restProps} disabled={disabled}>
                 {children}
            </button>
        )
    }
}
Button.defaultProps = {
    disabled: false,
    btnType: 'primary',
    size: 'lg'
}
export default Button
