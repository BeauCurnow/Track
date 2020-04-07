import React, {useState, useEffect} from 'react';
import TrackTable from './tables/TrackTable'
import AddTrackForm from './forms/AddTrackForm'
import UpdateTrackForm from './forms/UpdateTrackForm'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Track from './components/track'

/**
 * CREATED BY: BEAU CURNOW
 * MUSIC RECOMMENDATION TRACKER
 * **/



// Generates Home Page

function App() {

   const getTracks = () => {
     return fetch('http://35.232.86.10:1337/tracks').then(response => response.json());
   }

  const [tracks, setTracks] = useState([])

  useEffect(() => {
    getTracks().then(tracks => setTracks(tracks));

  }, []);
  
  // Automatially creates id for new tracks
  const addTrack = track => {
    track.id = tracks.length + 1
    setTracks([...tracks, track])

    
  }

  // Deletes track
  const deleteTrack = id => {
    setTracks(tracks.filter(track => track.id !== id))
  }

  //Tracks whether to display edit from
  const [editing, setEditing] = useState(false)

  // Initial Edit form Values
  const initialFormState = {id: null, title: "", artist: "", album: "", recommender: "", comments: ""}//listened_to: false, rating: 0, genre: "",

  const [currentTrack, setCurrentTrack] = useState(initialFormState)

  const editTrack = track => {
    setEditing(true)
    
    setCurrentTrack({id: track.id, title: track.title, artist: track.artist, album: track.album, listened_to: track.listened_to, rating: track.rating, genre: track.genre, recommender: track.recommender, comments: track.comments})
  }

  const updateTrack = (id, updatedTrack) => {
    setEditing(false)

    setTracks(tracks.map(track => (track.id === id ? updatedTrack: track)));
  }

  const pickTrack = track =>{
    setCurrentTrack({id: track.id, title: track.title, artist: track.artist, album: track.album, listened_to: track.listened_to, rating: track.rating, genre: track.genre, recommender: track.recommender, comments: track.comments})
  }


  return (
  <section className="section has-background-light">
  <Router>
    <div className="container">
      <hr/>
      <div className="box">
      <div><h1 className="title is-1 has-text-info">Song Recommendations</h1>
      <h2 className="subtitle">Beau Curnow</h2></div>
      </div>
      <div className="columns">
        <div className="column is-narrow">      
          {editing ? (
            <UpdateTrackForm editing={editing} setEditing={setEditing} currentTrack={currentTrack} updateTrack={updateTrack}/>
            ):(
            <AddTrackForm addTrack={addTrack}/>)}
      </div>       
        <div className="column">
          <Switch>
            <Route path="/:id">
              <Track currentTrack={currentTrack} key={currentTrack.id}/>            
            </Route>
            <Route path="/">
              <TrackTable tracks={tracks}  deleteTrack={deleteTrack} editTrack={editTrack} pickTrack={pickTrack}/>
            </Route>
          </Switch>
        </div>
      </div>
      <div><br/></div>

    </div>
    </Router>
    </section>
  );
}

export default App;
