import { useState } from 'react';
import './App.css';

function App() {
  const [courseSearchKeyWord, setCourseSearchKeyword] = useState('');
  const [error, setError] = useState<null | string>(null);
  const [message, setMessage] = useState<null | string>(null);

  const handleCourseSearch = async () => {
    const body = JSON.stringify({ name: courseSearchKeyWord });

    try {
      const response = await fetch('http://localhost:3000/scrape/course', {
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
        value={courseSearchKeyWord}
        onChange={(e) => setCourseSearchKeyword(e.target.value)}
        placeholder="Enter Course Name"
      />
      <br />
      <br />
      <button onClick={handleCourseSearch}>Search</button>
      {error && <p style={{ color: 'green' }}>{error}</p>}
      {message && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
}

export default App;
