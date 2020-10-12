import React, {useState, createContext} from 'react'
import classNames from 'classnames'
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
        'menu-vertical': mode === 'vertical'
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
    return (
        <ul className={classes} style={style} data-testid='test-menu'>
            <MenuContext.Provider value={passedContext}>
                {children}
            </MenuContext.Provider>
        </ul>
    )
}
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'vertical'
}
export default Menu