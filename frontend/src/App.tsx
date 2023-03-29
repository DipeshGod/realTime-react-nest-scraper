import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';

//By default, the Socket.IO client opens a connection to the server right away. You can prevent this behavior
//with the autoConnect option:
//we only want to establish connection when component mounts
export const socket = io('http://localhost:3000', {
  autoConnect: false,
});

function App() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [error, setError] = useState<null | string>(null);
  const [data, setData] = useState<any[]>([]);

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [scrapingStarted, setScrapingStarted] = useState(false);

  const handleProductSearch = async () => {
    const body = JSON.stringify({ name: searchKeyword });

    try {
      await fetch('http://localhost:3000/scrape/ebay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
    } catch (err: any) {
      setError(err.data.msg);
    }
  };

  useEffect(() => {
    socket.connect();
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onNewProduct(value: any) {
      setData((data) => [...data, value]);
    }

    function handleScrapingStarted(value: boolean) {
      console.log('yaga aayo');
      setScrapingStarted(value);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('newProduct', onNewProduct);
    socket.on('scrapingStarted', handleScrapingStarted);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('newProduct', onNewProduct);
      socket.off('scrapingStarted', handleScrapingStarted);
    };
  }, []);

  return (
    <div className="App">
      <input
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="Enter Product Name"
      />
      <br />
      <br />
      <button onClick={handleProductSearch}>Search</button>
      {JSON.stringify(data)}
      {error && <p style={{ color: 'green' }}>{error}</p>}
      {scrapingStarted && <p style={{ color: 'red' }}>Scraping Started</p>}
    </div>
  );
}

export default App;
