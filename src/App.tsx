import React from 'react';
import  {Button,ButtonType, ButtonSize} from './components/Button'
import './styles/index.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Button disabled btnType={ButtonType.Danger} size={ButtonSize.Large}>click</Button>
          <Button btnType={ButtonType.Link} href="www.baidu.com">百度一下</Button>
        </p>
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
