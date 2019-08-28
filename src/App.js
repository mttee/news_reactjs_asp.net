import React from 'react';
import './App.css';
import Router from './Routers/router';
import Menu from './Components/nav'

import { Container} from 'semantic-ui-react'

function App() {

  return (
    <div className="App">
      <Container>
        <Router/>
      </Container>       
    </div>
  );
}

export default App;
