import './App.css';
import { useState, useEffect } from 'react'

export default  function App() {
  const [inputValue, setInputValue] = useState('')
  const [resultToDisplay, setResultToDisplay] = useState([])
  const subscriptionKey = '';
  const userInput = encodeURI(inputValue);

  const requestKeys = {
    method: 'GET',
    headers: {
       'Ocp-Apim-Subscription-Key': subscriptionKey,
    },
  };

  const handleSearch = () => {
    {/*console.log(setInputValue);*/}
    console.log(inputValue);
    fetch(
      `https://api.bing.microsoft.com/v7.0/search?mkt=en-NZ&q=${userInput}`,
      requestKeys
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        console.log(result.images.value);
        setResultToDisplay(result.images.value);
      });
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div>
      <h1>Turners Used Cars for sale</h1>
      <input
        type='text'
        className='input'
        placeholder="Search for Cars"
        onChange={(e) => setInputValue(e.target.value)}
      />
      
      <button onClick={handleSearch}>Search</button>
      
      <div className='result'>
        {resultToDisplay?.map((e, index) => {
          return (
            <div key={index}>
              <a href={e.thumbnailUrl}><img src={e.thumbnailUrl} alt={e.name} /></a> 
            </div>
          );
        })}
      </div>
      
    </div>
  );
}