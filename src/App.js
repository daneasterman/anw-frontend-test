import './App.css';

import { useEffect, useState } from 'react';

import { getAlbumArtworkUrl } from './services/contentfulClient'
import { getAlbums, getAlbumTracks } from './services/musicApiClient'

function App() {
  const [albums, setAlbums] = useState([])  
  const [favTracklist, setFavTrackList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const albums = await (await getAlbums()).slice(0, 9)
      console.log(albums)    

      for await (const album of albums) {
        album.artworkUrl = await getAlbumArtworkUrl(album.number)
        album.tracks = await getAlbumTracks(album.number)
      }

      setAlbums(albums)
    }
    
    fetchData();
  }, []);

  const addFavTrack = event => {
    const value = event.target.value    
    const newList = favTracklist.concat({value});    
    setFavTrackList(newList)    
  }; 

  return (
    <main>
    <div className="flexColumn"> 
      <h2 className="heading">My Favourite Tracks:</h2>
      <ul>
      {favTracklist?.map((item, key) => (
        <div> 
          <li key={key}>        
            <p>{item.value}</p>
          </li>
          <p></p>
        </div>
        ))}
      </ul>
    </div>

      <h1 className="heading">Latest Released Albums</h1>
        <ul className="flexWrapper">
          {albums?.map((album) => (
                <li className="flexItem" key={album.number}>
                  <h2>{album.name}</h2>
                  <img
                    src={album.artworkUrl}
                    alt={`${album.name} artwork`}
                    width={300}
                    height={300}
                  />
                  <h3 style={{fontWeight: 'bold'}}>Album Tracks:</h3>
                  {album.tracks?.map((track) => (
                  <div className="flexRow" key={track.id}>               
                      <p>{track.title}</p>
                      <input                        
                        value={track.title}                
                        onChange={addFavTrack}                        
                        type="radio" />
                    </div>
                    )
                  )}
                </li>                        
              ))} 
        </ul>
      </main>
  );
}

export default App;
