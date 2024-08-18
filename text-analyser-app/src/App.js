import React from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const analyzeText = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api.textrazor.com',
        `text=${encodeURIComponent(inputText)}`, // Text to analyze
        {
          headers: {
            'x-textrazor-key': 'YOUR_API_KEY_HERE', // Replace with your actual API key
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      setApiResponse(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>TextRazor NLP Analysis</h1>
      <textarea
        value={inputText}
        onChange={handleTextChange}
        rows="4"
        cols="50"
        placeholder="Enter text to analyze..."
      />
      <br />
      <button onClick={analyzeText} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Text'}
      </button>

      {apiResponse && (
        <div>
          <h2>API Response</h2>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;

export default App;
