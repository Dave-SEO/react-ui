import React, {useContext} from 'react'
import classNames from 'classnames'
import {MenuContext} from './Menu'
export interface MenuItemProps {
    index?: string,
    className?:string,
    disabled?: boolean,
    style?: React.CSSProperties
}
const MenuItem: React.FC<MenuItemProps> =(props)=>{
    const {index ,className,disabled, style, children} = props
    const context = useContext(MenuContext)
    const classed = classNames('menu-item', className,{
        'is-disabled': disabled,
        'is-active': context.index === index
    })
    const handleClick = ()=>{
        if(context.onSelect && !disabled && (typeof index === 'string')){
            context.onSelect(index)
        }
    }
    return (
        <li className={classed} style={style} onClick={handleClick}>
             {children}
        </li>
    )
}
MenuItem.displayName = 'MenuItem'
export default MenuItem