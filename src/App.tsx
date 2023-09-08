import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import SidePanel from './components/side-panel'
import GamesPanel from './components/games-section/games-panel'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


// GET https://api.rawg.io/api/platforms?key=YOUR_API_KEY
// GET https://api.rawg.io/api/games?key=YOUR_API_KEY&dates=2019-09-01,2019-09-30&platforms=18,1,7



function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const [searchValue, setSearchValue] = useState("");
  const [genre,setGenre]=useState(0);
  const[drop,setDrop]=useState(false);
    return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Navbar setGenre={setGenre} setSearchValue={setSearchValue}></Navbar>
        <div className='body-section'>
          <h3 onClick={()=>{setDrop(!drop)}}>Genres</h3>
          <p className='dropdown'>&#9660; </p>
          <SidePanel drop={drop} setGenre={setGenre}></SidePanel>
          <div className='main-section'>
            <GamesPanel genre={genre}searchValue={searchValue}></GamesPanel>
          </div>
        </div>
      </QueryClientProvider>
    </div>
  )
}

export default App
