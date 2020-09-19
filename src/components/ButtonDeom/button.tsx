import React, {FC} from 'react'
import classnames from 'classnames'
export enum ButtonSize {
   Large = 'lg',
   Small = 'sm'
}
export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}
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
export const Button: FC<BaseButtonProps> = (props)=>{
    const {
        btnType,
        disabled,
        size,
        children,
        href
    } = props
    console.log('props', btnType)
    const classes = classnames('btn', {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType.Link) && disabled
    })
    if(btnType === ButtonType.Link && href){
        return(
            <a  className={classes} href={href}>
                {children}
            </a>
        )
    } else {
        return (
            <button className={classes} disabled={disabled}>
                 {children}
            </button>
        )
    }
}
Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Primary,
    size: ButtonSize.Large
}
export default Button
