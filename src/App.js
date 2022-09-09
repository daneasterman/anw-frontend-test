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
              </li>
            )
          )}
        </ul>
      </main>
  );
}

export default App;
