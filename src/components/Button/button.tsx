import React, {ButtonHTMLAttributes, FC, HtmlHTMLAttributes} from 'react'
import classNames from 'classnames'
// 定义button的大小、类型
// 枚举 button 大小
// export enum ButtonSize {
//     large = 'lg',
//     small = 's',
//     middle = 'm'
// }
export type ButtonSize = 'lg' | 's' | 'm'
// 枚举 button的类型 如 Primary、Danger,Link
// export enum ButtonType {
//     Primary = 'primary',
//     Danger = 'danger',
//     Link = 'link'
// }
export type ButtonType = 'primary' | 'danger' | 'link'
// 定义接口来描述 button 组件的类型
export interface IBaseButton {
    disable?: boolean,
    href?: string,
    btnType?: ButtonType,
    size?: ButtonSize,
    children: React.ReactNode,
    onClick?: () => void
}
type NativeButtonProps = IBaseButton & React.ButtonHTMLAttributes<HTMLElement>
type NativeAnchorButtonProps = IBaseButton & React.AnchorHTMLAttributes<HTMLElement>
// Partial 后属性变为可选参数
export type ButttonProps = Partial<NativeButtonProps & NativeAnchorButtonProps>
export const Button:FC<ButttonProps> = (props) =>{
    const {
        disable,
        size,
        href,
        btnType,
        children,
        className,
        ...restProps
    } = props
    const classed = classNames('btn',className, {
        [`btn-${btnType}`] : btnType,
        [`btn-${size}`] : size,
        disable: ('link' && href) && disable
    })
    if('link' && href){
        return (
            <a href={href} {...restProps} className={classed}>{children}</a>
        )
    } else {
        return (
            <button className={classed} {...restProps} disabled={disable}>{children}</button>
        )
    }
}
Button.defaultProps = {
    btnType: 'primary',
    size: 'm',
    disable: false
}
export default Button