import React, { CSSProperties } from 'react';
import {render, RenderResult} from '@testing-library/react';
import {Tabs, TabPane} from './index'
import {TabsProps} from './tabs'
const testProps: TabsProps = {
    defaultIndex: '2'
}
const generateTabs = () => (
    <Tabs {...testProps}>
        <TabPane label='tab1'>
            tab1content
        </TabPane>
        <TabPane label='tab2'>
            tab2content
        </TabPane>
        <TabPane label='tab3' disabled>
            tab3content
        </TabPane>
    </Tabs>
)
let wrap:RenderResult, tabPane1: HTMLElement
const renderStyle = () => {
   const cssFile:string = `
    .content{
        display:none
    }
    .is-active .content{
        display: block
    }
    `
   const element = document.createElement('style')
   element.type = 'text/css'
   element.innerHTML = cssFile
   return element
}
describe('test Tabs', () => {
    beforeEach(()=>{
        wrap = render(generateTabs())
        wrap.container.append(renderStyle())
        tabPane1 = wrap.getByText('tab1')
    })
    it('test defaultIndex', () => {
        expect(wrap.queryByText('tab1content')).not.toBeVisible()
        expect(wrap.queryByText('tab2content')).toBeVisible()
    })
    it('test tab disabled', () => {

    })
    it('test tab click', () => {

    })
    it('test tab label append html', () => {
        
    })
})
