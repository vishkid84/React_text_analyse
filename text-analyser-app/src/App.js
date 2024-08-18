import React, {useState} from 'react';
import axios from 'axios'

function App() {
  const apiKey = process.env.REACT_APP_TEXTRAZOR_KEY;

  const [inputText, setInputText] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };
  console.log("API Key:", apiKey);
  const analyzeText = async () => {
    setLoading(true);
    
    try {

      
      
      // Make sure the API key exists before making the request
      if (!apiKey) {
        console.error('API key is missing');
        return;
      }
      

      const response = await axios.post(
        'https://api.textrazor.com',
        `text=${encodeURIComponent(inputText)}`, // Text to analyze
        {
          headers: {
            'x-textrazor-key': apiKey, // Use the actual API key from the environment variable
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
