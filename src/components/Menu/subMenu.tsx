import React, {FC, FunctionComponentElement, useContext, useState, MouseEvent} from 'react'
import {MenuContext} from './Menu'
import classNames from 'classnames'
import {Icon} from '../icon'
import {Transition} from 'react-transition-group'
interface ISubMenu {
    index?: string,
    style?: React.CSSProperties,
    className?: string,
    disabled?: boolean,
    title?: string
}

let timer: any
const SubMenu:FC<ISubMenu> = ({index, style, className, disabled, children, title}) =>{
    const context = useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const isopened = (index && openedSubMenus && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    const [menuOpen, setOpen] = useState(isopened)
    const handlenMouse = (e:MouseEvent, toggle: boolean) =>{
       window.clearTimeout(timer)
       // 加定时器原因是 子菜单与 菜单之间有间隙，会导致移入子菜单消失
        timer = setTimeout(()=>{
            setOpen(toggle)
        }, 300)
    }
    const handleClick = (e: MouseEvent) => {
        e.preventDefault()
        setOpen(!menuOpen)
    }

    const hoverEvents = context.mode === 'horizonal' ? {
        onMouseLeave: (e: MouseEvent) => {handlenMouse(e, false)},
        onMouseEnter: (e: MouseEvent) => {handlenMouse(e, true)}
    }: {}
   
    const clickEvent = context.mode === 'vertical' ? {
        onClick: (e: MouseEvent) => {handleClick(e)}
    } : {}
    const renderSubChildren = () =>{
        const SubMenuClass = classNames('submenu',{
           'menu-opened': menuOpen
        })
        const childSubComponent = React.Children.map(children, (child, i)=>{
            const childElement = child as FunctionComponentElement<ISubMenu>
            if(childElement.type.displayName === 'MenuItem'){
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.error('not subMenu item')
            }
        })
        return (
            <Transition   
                in={menuOpen}
                timeout={300}
                animation="zoom-in-top"
                apper={true}
            >
                <ul className={SubMenuClass} >
                    {childSubComponent}
                </ul>
            </Transition>
           
        )
    }
    const classNamed = classNames('submenu-item', {
        className,
        'menu-opened': menuOpen,
        'is-horizonal' : context.mode === 'horizonal',
        'is-vertical' : context.mode === 'vertical'
    })
    return (
         <li className={classNamed} style={style} data-testid='test-submenu'  {...hoverEvents}>
             <div className='submenu-title' {...clickEvent}>
                 {title}<Icon icon='angle-down' className='icon-down' size='lg' theme='primary'/>
             </div>
             {renderSubChildren()}
         </li>
    )
}
SubMenu.displayName = 'SubMenu'
export default SubMenu