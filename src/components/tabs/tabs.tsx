import React, { cloneElement, CSSProperties, FC, FunctionComponentElement, createContext,useState } from 'react'
import classNames from 'classnames'
import {TabPaneProps} from './tabPane'

type onSelectType = (index: string) => void
export interface TabsProps {
    defaultIndex?: string,
    onSelect?: onSelectType, 
    style?: CSSProperties,
    className?: string
}

interface ITabsContext{
    index?: string, 
    onSelect?: onSelectType
}
export const tabsContext = createContext<ITabsContext>({index: '1'})
const Tabs: FC<TabsProps> = (props) =>{
    const {defaultIndex, style, className, children, onSelect} = props
    const [active, setActive] = useState(defaultIndex)
    const classNamed = classNames('tabs', className, {})
    const handlSelect = (index: string) =>{
        setActive(index)
        if(onSelect){
            onSelect(index)
        }
    }
    const contextValue: ITabsContext = {
        index: active ? active : '1',
        onSelect: handlSelect
    }
    const renderChildren = () =>{
       return React.Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<TabPaneProps>
            if(childElement.type.displayName === 'TabPane'){
                return cloneElement(childElement, {
                    index: (index + 1).toString() 
                })
            } else {
                console.error('Warning: children not tabPane')
            }
       })
    }
    return (
        <tabsContext.Provider value={contextValue}>
            <ul style={style} className={classNamed}>
                {renderChildren()}
            </ul>
        </tabsContext.Provider>
        
    )
} 

Tabs.displayName = 'Tabs'

Tabs.defaultProps = {
    defaultIndex: '1'
}
export default Tabs