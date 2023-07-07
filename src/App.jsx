import { useState } from "react"
import axios from "axios"
import { surpriseMePrompts } from './SupriseMeList';

const App = () => {
  const [inputValue, setInputValue] = useState("")
  const [images, setImages] = useState([]);
  const [isError, setIsError] = useState(false);
  const [result, setResult] = useState("");

  const surprise = async () => {
    const index = Math.floor(Math.random() * surpriseMePrompts.length);
    setInputValue(surpriseMePrompts[index]);
  }

  // Get Images req
  const getImages = async () => {
    try {
      if (inputValue.length > 0) {
        const res = await axios.post("http://127.0.0.1:8000/images", { prompt: inputValue, n: 2 });

        console.log(res.data.data);
        setImages(res.data.data);
        setResult(inputValue)
        setInputValue("")
        setIsError(false)
      }
    } catch (err) {
      console.log(err);
      setIsError(true)
    }
  }
  return (
    <div className="App">
      <section className="search-section">
        <p>Start with a detailed desription
          <span className="surprise" onClick={surprise}>Suprise me</span>
        </p>
        <div className="input-container">
          <input
            placeholder="An impressionist oil painting 
            of a sunflower in a purple vase..."
            value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <button onClick={(e) => getImages(e)}>Generate</button>
        </div>
      </section>
      <section className="image-section">
        {images.length > 0 && isError === false ? (
          <>
            <p>Search results for <span style={{ textDecoration: "underline" }}>{result}</span></p>
            <div className="image-container">
              {images.map((image, index) => {
                return <img src={image.url}
                  key={index}>
                </img>
              })}
            </div>
          </>
        ) : ""}
        {images.length === 0 && isError === true ? (
          <p>No results found</p>
        ) : ""}

      </section>
    </div>
  );
}

export default App;
