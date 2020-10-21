import React, {CSSProperties, FC, useContext } from 'react'
import classNames from 'classnames'
import {tabsContext} from './tabs'

export interface TabPaneProps{
    index?: string,
    style?: CSSProperties,
    className?: string,
    label: string | React.ReactNode,
    disabled?: boolean
}
const TabPane: FC<TabPaneProps> = (props) =>{
    const {index, style, className, children, label, disabled} = props
    const contextTabs = useContext(tabsContext)
    const classNamed = classNames('tabPane', className, {
        'is-active': (index === contextTabs.index) && !disabled,
        'is-disabled': disabled
    })
    const handlenClick = () =>{
        if(contextTabs.onSelect && index && !disabled){
            contextTabs.onSelect(index)
        }
    }
    return (
        <li className={classNamed} style={style}>
            <div className="title"  onClick={handlenClick}>{label}</div>
            <p className='content'>{children}</p>
        </li>
    )
}
TabPane.displayName = 'TabPane'
export default TabPane