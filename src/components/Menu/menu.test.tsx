import React from 'react'
import {Menu, MenuItem} from './index'
import {MenuProps} from './Menu'
import { render, RenderResult } from '@testing-library/react';
const testProps:MenuProps = {
    defaultIndex: '0',
    onSelect:jest.fn(),
    className: 'test'
}
const testVerProps:MenuProps = {
    defaultIndex: '0',
    mode: 'vertical'
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
       </Menu> 
    )
}
let wrapper:RenderResult, menuElement:HTMLElement,activeElement:HTMLElement,
     disabledElement:HTMLElement
describe('test menu', ()=>{
    beforeEach(()=>{
      wrapper = render(generateMenu(testProps))
      menuElement = wrapper.getByTestId('test-menu')
      activeElement = wrapper.getByText('active')
      disabledElement = wrapper.getByText('disabled')
    })
    it('menu props default', ()=>{
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('meunWrap')
    })
})