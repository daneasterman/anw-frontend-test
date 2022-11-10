import './App.css';

import { useEffect, useState } from 'react';

import { getAlbumArtworkUrl } from './services/contentfulClient'
import { getAlbums, getAlbumTracks } from './services/musicApiClient'

function App() {
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const albums = await (await getAlbums()).slice(0, 9)
      console.log('albums', albums)

      for await (const album of albums) {
        album.artworkUrl = await getAlbumArtworkUrl(album.number)
        album.tracks = await getAlbumTracks(album.number)
      }

      setAlbums(albums)
    }
    
    fetchData();
  }, []);

  return (
    <main>
      <h1 className="heading">Latest Released Albums</h1>
        <ul className="grid">
          {albums?.map((album) => (
                <li className="gridItem" key={album.number}>
                  <h2>{album.name}</h2>
                  <img
                    src={album.artworkUrl}
                    alt={`${album.name} artwork`}
                    width={300}
                    height={300}
                  />
                  <h3 style={{fontWeight: 'bold'}}>Album Tracks:</h3>
                  {album.tracks.map((track) => (
                      <p>{track.title}</p>
                    )
                  )}
                </li>                        
              ))} 
        </ul>
      </main>
  );
}

export default App;
