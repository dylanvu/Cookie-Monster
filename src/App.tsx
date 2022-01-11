import { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/provider';
import { Switch, Textarea, Tooltip } from '@chakra-ui/react'
import deleteAllCookies from './scripts/cookies';
import './App.css';

function App() {
  const [on, toggle] = useState(true);

  const toggleExtension = (): void => {
    if (!on) {
      deleteAllCookies();
    }
    toggle(!on);
  }

  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <Switch className='extension-switch' id='toggle-switch' size='lg' onChange={toggleExtension}/>
          <Tooltip label="All websites to remove cookies upon loading" placement="top">
            <div>Automatically Remove These Websites</div>
          </Tooltip>
          <Textarea className='website-list' resize={'none'} w="600px" h="300px" placeholder='Type in website urls to automatically remove cookies'/>
        </header>
      </div>
    </ChakraProvider>

  );
}

export default App;
