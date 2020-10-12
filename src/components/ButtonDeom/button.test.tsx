import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Button, {ButtonProps} from './button'
// test('our first react test case', ()=>{
//     const wrapper = render(<Button>ni</Button>)
//     const el = wrapper.queryByText('ni')
//     expect(el).toBeInTheDocument()
// })
const defaultProps = {
    onClick: jest.fn()
  }
  const testProps: ButtonProps = {
    btnType: 'primary',
    size: 'lg',
    className: 'klass'
  }
  const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn(),
  }
describe('test Button component', ()=>{
    it('test default button', ()=>{
        const wrapper = render(<Button>Nice</Button>)
        const element = wrapper.getByText('Nice')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-primary')
        fireEvent.click(element)
        // 测试一个函数是否被调用过
        // expect(defaultProps.onClick).toHaveBeenCalled()
    })
    it('test props', ()=>{
        const wrapper = render(<Button>Nice</Button>)
        const element = wrapper.getByText('Nice')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('btn-primary btn-lg')
    })
    it('test link and href', ()=>{
        const wrapper = render(<Button btnType='link' href="wwww">Link</Button>)
        const element = wrapper.getByText('Link')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link')
    })
    it('test btn disabled', ()=>{
        const wrapper = render(<Button {...disabledProps}>Nice</Button>)
        const element = wrapper.getByText('Nice') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.disabled).toBeTruthy()
        fireEvent.click(element)
        expect(disabledProps.onClick).not.toHaveBeenCalled()
    })
})