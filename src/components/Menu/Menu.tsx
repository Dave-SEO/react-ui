import React, {useState, createContext} from 'react'
import classNames from 'classnames'
import {MenuItemProps} from './MenuItem'
type  MenuMode = 'horizonal' | 'vertical'
export interface MenuProps {
    defaultIndex?:string,
    className?: string,
    mode?: MenuMode,
    style?: React.CSSProperties,
    onSelect?: (selectedIndex: string)=> void
}
interface IMenuContext {
    index: string,
    onSelect?:(selectIndex: string)=> void,
    mode?:MenuMode
}
export const MenuContext = createContext<IMenuContext>({index: '0'})
const Menu: React.FC<MenuProps> = (props)=>{
    const {defaultIndex, className, mode, onSelect, style,children} = props
    const [currentActive, setActive] = useState(defaultIndex)
    const classes = classNames('meunWrap',className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode === 'horizonal'
    })
    const handleClick = (index: string)=>{
        setActive(index)
        if(onSelect){
            onSelect(index)
        }
    }
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode
    }
    const renderChildrenNode = ()=>{
      return React.Children.map(children, (child, index)=>{
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            console.log('children', childElement)
            const {displayName} = childElement.type
            if(displayName === 'MenuItem'){
                return React.cloneElement(childElement, {
                    index: index.toString()
                })
            }else{
                console.error('Warning:not has Component MenuItem')
            }
            // return child
        })
    }
    return (
        <ul className={classes} style={style} data-testid='test-menu'>
            <MenuContext.Provider value={passedContext}>
                {renderChildrenNode()}
            </MenuContext.Provider>
        </ul>
    )
}
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'vertical'
}
Menu.displayName = 'Menu'
export default Menu