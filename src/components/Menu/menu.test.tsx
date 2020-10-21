import React from 'react'
import {Menu, MenuItem, SubMenu} from './index'
import {MenuProps} from './Menu'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react';
const testProps:MenuProps = {
    defaultIndex: '0',
    onSelect:jest.fn(),
    className: 'test',
    mode:'horizonal'
}
const testVerProps:MenuProps = {
    defaultIndex: '0',
    mode: 'vertical',
    defaultOpenSubMenus:['4']
}
const generateMenu = (props: MenuProps) =>{
    return (
       <Menu {...props}>
          <MenuItem>
            active
          </MenuItem> 
          <MenuItem disabled>
            disabled
          </MenuItem> 
          <MenuItem >
            xyz
          </MenuItem>
          <SubMenu title='subMenu'>
            <MenuItem>1</MenuItem>
          </SubMenu>
       </Menu> 
    )
}

const createStyleFile = () =>{
  const cssFile:string = `
    .submenu {
      display:none;
    }
    .submenu.menu-opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}
let wrapper:RenderResult, menuElement:HTMLElement,activeElement:HTMLElement,
     disabledElement:HTMLElement
describe('test menu', ()=>{
    beforeEach(()=>{
      wrapper = render(generateMenu(testProps))
      wrapper.container.append(createStyleFile())
      menuElement = wrapper.getByTestId('test-menu')
      activeElement = wrapper.getByText('active')
      disabledElement = wrapper.getByText('disabled')
    })
    it('menu props default', ()=>{
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('meunWrap')
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })
    it('click items and change active and callback', ()=>{
      const Item = wrapper.getByText('xyz')
      expect(Item).toBeInTheDocument()
      fireEvent.click(disabledElement)
      expect(disabledElement).not.toHaveClass('is-active')
    })
    it('test menu vertical', ()=>{
      cleanup()
      const vWrap = render(generateMenu(testVerProps))
      const vMenu = vWrap.getByTestId('test-menu')
      expect(vMenu).toHaveClass('menu-vertical')
      const subMenuElement = vWrap.getByText('subMenu')
      fireEvent.click(subMenuElement)
      expect(vWrap.queryByText('1')).toBeVisible()
    })
    it('test subMenu horizonal hover',async () => {
     const subMenuElement = wrapper.getByText('subMenu')
     expect(subMenuElement).toBeInTheDocument()
     expect(wrapper.queryByText('1')).not.toBeVisible()
     fireEvent.mouseEnter(subMenuElement)
     await waitFor(()=>{
      expect(wrapper.queryByText('1')).toBeVisible()
     })
     fireEvent.click(wrapper.getByText('1'))
     expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
     fireEvent.mouseLeave(subMenuElement)
     await waitFor(()=>{
      expect(wrapper.queryByText('1')).not.toBeVisible()
     })
    })
    it('test vertical defaultOpenSubMenus', ()=>{
      cleanup()
      const vWrap = render(generateMenu(testVerProps))
      expect(vWrap.queryByText('1')).toBeVisible()
    })
})
