import React from 'react';
import  {Button} from './components/ButtonDeom'
// import {Button, ButtonSize, ButtonType} from './components/button'
import {Alert, AlertType} from './components/Alert'
import './styles/index.scss';
import {Menu, MenuItem, SubMenu} from './components/Menu'
import {Tabs, TabPane} from './components/tabs'
import { spawn } from 'child_process';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Button  btnType= 'primary' onClick={() =>{console.log('button')}}  size='lg'>click</Button>
          <br/>
          <Button btnType='link' href="www.baidu.com">百度一下</Button>
        </p>
        <Alert type={AlertType.success} title="success" description="这是一天成功的消息，这是一天成功的消息"/>
        <Alert type={AlertType.danger} title="danger" closable={true}/>
        <Alert type={AlertType.warning} title="warning"/>
        <Alert type={AlertType.default} title="default"/>
        <Menu defaultIndex='0' mode='vertical' defaultOpenSubMenus={['2']}>
          <MenuItem >li</MenuItem>
          <MenuItem >li</MenuItem>
          <SubMenu title='子菜单'>
            <MenuItem>subMenu1</MenuItem>
            <MenuItem>subMenu2</MenuItem>
          </SubMenu>
        </Menu>
        {/* <p>
          <Button btnType={ButtonType.Primary} size={ButtonSize.large} disable>submit</Button>
          <Button btnType={ButtonType.Link} href='www.baidu.com' disable>百度一下</Button>
        </p> */}
        <Tabs defaultIndex='3'>
          <TabPane label="Tab1">Tab1Content</TabPane>
          <TabPane label="Tab2" disabled>Tab2Content</TabPane>
          <TabPane label="Tab3">Tab3Content</TabPane>
          <TabPane label={<span>Tab4</span>}>Tab4Content</TabPane>
        </Tabs>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
