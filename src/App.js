import './App.css';

import { useEffect, useState } from 'react';

import { getAlbumArtworkUrl } from './services/contentfulClient'
import { getAlbums } from './services/musicApiClient'

function App() {
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const albums = await (await getAlbums()).slice(0, 9)

      for await (const album of albums) {
        album.artworkUrl = await getAlbumArtworkUrl(album.number)
      }

      setAlbums(albums)
    }
    
    fetchData();    
  }, []);


  return (
    <>
      <h1 className="heading">Latest Released Albums</h1>
        <div className="grid">
          {albums && albums.map((album) => {
            return (
              <div className="gridItem" key={album.number}>
                <h3>{album.name}</h3>
                <img
                  src={album.artworkUrl}
                  alt={`${album.name} artwork`}
                  width={300}
                  height={300}
                />
              </div>
            )
          })}
        </div>
      </>
  );
}

export default App;
