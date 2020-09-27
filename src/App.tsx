import React from 'react';
import  {Button,ButtonType, ButtonSize} from './components/ButtonDeom'
// import {Button, ButtonSize, ButtonType} from './components/button'
import {Alert, AlertType} from './components/Alert'
import './styles/index.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Button  btnType={ButtonType.Primary} onClick={() =>{console.log('button')}}  size={ButtonSize.Large}>click</Button>
          <br/>
          <Button btnType={ButtonType.Link} href="www.baidu.com">百度一下</Button>
        </p>
        <Alert type={AlertType.success} title="success" description="这是一天成功的消息，这是一天成功的消息"/>
        <Alert type={AlertType.danger} title="danger" closable={true}/>
        <Alert type={AlertType.warning} title="warning"/>
        <Alert type={AlertType.default} title="default"/>
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
