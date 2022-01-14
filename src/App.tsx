import { useState, useEffect, ChangeEvent } from 'react';
import { ChakraProvider } from '@chakra-ui/provider';
import { Switch, Textarea, Tooltip, Button } from '@chakra-ui/react'
import deleteAllCookies from './scripts/background';
import './App.css';

function App() {
  const [on, toggle] = useState(true);
  const [blacklist, setBlacklist] = useState("")

  useEffect(() => {
    chrome.storage.sync.get('blacklist', (data) => {
      const blackListarray: string[] = data.blacklist;
      setBlacklist(blackListarray.join("\n"))
  });
  }, []);

  const toggleExtension = (): void => {
    if (!on) {
      deleteAllCookies();
    }
    toggle(!on);
  }

  const saveBlacklist = (): void => {
    const blackListstring = blacklist;
    chrome.storage.sync.set({ blacklist: blackListstring.split("\n") });
  }

  const handleBlacklistchange:React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setBlacklist(event.target.value);
  }

  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <Button onClick={deleteAllCookies} colorScheme="teal">
            Clear Cookies
          </Button>
          <Switch className='extension-switch' id='toggle-switch' size='lg' onChange={toggleExtension}/>
          <Tooltip label="All websites to remove cookies upon loading" placement="top">
            <div>Automatically Remove These Websites</div>
          </Tooltip>
          <Textarea className='website-list' value={blacklist} resize={'none'} w="600px" h="300px" placeholder='Type in website urls to automatically remove cookies' onChange={handleBlacklistchange}/>
          <Button onClick={saveBlacklist} colorScheme="teal">
            Save Website Blacklist
          </Button>
        </header>
      </div>
    </ChakraProvider>

  );
}

export default App;
