import React from 'react';
import  {Button} from './components/ButtonDeom'
// import {Button, ButtonSize, ButtonType} from './components/button'
import {Alert, AlertType} from './components/Alert'
import './styles/index.scss';
import {Menu, MenuItem} from './components/Menu'
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
        <Menu defaultIndex='0'>
          <MenuItem >li</MenuItem>
          <MenuItem index='0'>li</MenuItem>
        </Menu>
        {/* <p>
          <Button btnType={ButtonType.Primary} size={ButtonSize.large} disable>submit</Button>
          <Button btnType={ButtonType.Link} href='www.baidu.com' disable>百度一下</Button>
        </p> */}
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
