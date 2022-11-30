import './App.css';
import { useState } from 'react'

const subscriptionKey = '';
export default  function App() {
  const [inputValue, setInputValue] = useState('')
  const [resultToDisplay, setResultToDisplay] = useState([])
  
  //const userInput = encodeURI(inputValue);

  const requestKeys = {
    method: 'GET',
    headers: {
       'Ocp-Apim-Subscription-Key': subscriptionKey,
    },
  };

  const handleSearch = () => {
    fetch(
      `https://api.bing.microsoft.com/v7.0/custom/search?q=${inputValue}&customconfig=5e393488-268a-442a-9802-c3de0da2e02b&mkt=en-NZ`,
      requestKeys
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        console.log(result.webPages.value);
        setResultToDisplay([...result.webPages.value]);
      });
  };

  

  return (
    <div>
      <h1>Turners Used Cars for sale</h1>
      <input
        type='text'
        className='input'
        placeholder="Search for Cars"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      
      <button onClick={handleSearch}>Search</button>
      
      <div className='result'>
        {resultToDisplay?.map((value, index) => {
          return (
            <div key={index}>
              <div src={value.url} />
            </div>
          );
        })}
      </div>
      
    </div>
  );
}