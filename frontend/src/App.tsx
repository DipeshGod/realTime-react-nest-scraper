import { useState } from 'react';
import './App.css';

function App() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [error, setError] = useState<null | string>(null);
  const [message, setMessage] = useState<null | string>(null);

  const handleProductSearch = async () => {
    const body = JSON.stringify({ name: searchKeyword });

    try {
      const response = await fetch('http://localhost:3000/scrape/ebay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
      const data = await response.json();
      setMessage(data.msg);
    } catch (err: any) {
      setError(err.data.msg);
    }
  };

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
      {error && <p style={{ color: 'green' }}>{error}</p>}
      {message && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
}

export default App;
