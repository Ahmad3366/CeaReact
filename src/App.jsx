import { useState } from "react";

const App = () => {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleEncrypt = (e) => {
    e.preventDefault();

    if (message == '' || key == '') {
      return alert('fill all fileds')
    }

    setIsLoading(true)

    const data = {data: {text: message, key: Number(key)}}

    fetch('https://ceaser-cipher-api.onrender.com/encrypt/', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    .then(res => {
      if (!res.ok) {
        return console.log(res);
      }
      return res.json()
    })
    .then(data => {
      setMessage(data.Encrypted)
      setKey('')
      setIsLoading(false)
      setError(null)
    })
    .catch(erro => {
      setError(erro.message)
      setIsLoading(false)
    })
    
  }
  
  const handleDecrypt =(e) => {
    e.preventDefault()
    
    if (message == '' || key == '') {
      return alert('fill all fileds')
    }
    setIsLoading(true)

    const data = {data: {text: message, key: Number(key)}}

    fetch('https://ceaser-cipher-api.onrender.com/decrypt/', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    .then(res => {
      if (!res.ok) {
        return console.log(res);
      }
      return res.json()
    })
    .then(data => {
      setMessage(data.Decrypted)
      setKey('')
      setIsLoading(false)
      setError(null)
    })
    .catch(err => {
      setError(err.message)
      setIsLoading(false)
    })
  }

  return (
    <div className="App">
      <main>
        <h1 className="title">Ceaser cipher</h1>
        {isLoading && <p className="loading">Loading...</p>}
        {!isLoading && <form className="CeaserForm">
          <label>Message: </label>
          <input
            type="text"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
           />
          <label>Key: </label>
          <input
            type="number"
            required
            value={key}
            onChange={(e) => setKey(e.target.value)} 
          />
          <button onClick={handleEncrypt}>encrypt</button>
          <button onClick={handleDecrypt}>decrypt</button>
        </form>}
        {error && <p style={{color: 'red'}}>{error}</p>}
      </main>
    </div>
  );
};

export default App;
