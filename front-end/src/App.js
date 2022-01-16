import './App.css';
import React, { useState, useEffect} from 'react';
import axios from 'axios';


function App() {

  const [songs, setSongs] = useState({songs:[]});
  const [url, setUrl] = useState("");
  const [recentlyDeleted, setRecentlyDeleted] = useState("");

  var audio = new Audio("");
  
  useEffect(() => {
    axios.get('http://localhost:5000/list')
    .then(res => setSongs({songs: res.data.title}))
  }, [])


  const PlayAudio = (file) => {
    audio.src=file;
    audio.play();
  }

  const StopAudio = () => {
    audio.pause()

  }

  const NewAudio = () => {
    console.log("ADsadcxascx");
    fetch(`http://localhost:5000/add/?url=${url}`).then(res => console.log(res));
  }
  const DeleteAudio = (title) => {
      fetch(`http://localhost:5000/delete/?title=${title}`).then(res => console.log(res));
      setRecentlyDeleted(title);
  }
  return (
    <div className="App">
  <div>
      <div className="list">SONGS</div>  
        <ul>
          <div> 
            {songs.songs.map(song => 
              <ul>
                <div>
                  <div>
                    {song}
                  </div>
                  <button onClick={() => {PlayAudio(`./songs/${song}`)}}>START</button>
                  <button onClick={() => {StopAudio()}}>END</button>
                  <button onClick={() => {DeleteAudio(song)}}>X</button>

                </div>
              </ul>
            )}
          </div>
        </ul>
      <div className="list">NEW</div>   
        <form className="list">
          <label>
            URL:
            <input value={url} onChange={e => setUrl(e.target.value)}/>
          </label>
          <button onClick={() => {NewAudio()}}>SUBMIT</button>
        </form>
      </div>
    <div>MOST RECENT DELETION: {recentlyDeleted}</div>  
    </div>
 
  );
}

export default App;
