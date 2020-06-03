import React, {useState, useEffect} from 'react';
import './App.scss';

import Search from './components/Search'
import Youtube from './components/Youtube'

import firebase from 'firebase'

const config = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: "nifty-bindery-711.firebaseapp.com",
    databaseURL: "https://nifty-bindery-711.firebaseio.com",
    projectId: "nifty-bindery-711",
    storageBucket: "nifty-bindery-711.appspot.com",
    messagingSenderId: "356833982522",
    appId: "1:356833982522:web:e43c63d24d8528fe67dd03"
}
firebase.initializeApp(config)

function App() {
  const [selectedSong, setSelectedSong] = useState('')
  const playReference = firebase.database().ref().child('Playlist')
  
  useEffect(() => {
  
      playReference.on('value', function(snapshot){
        setSelectedSong(snapshot.val());
      });
  })

  return (
      <div className="container">        
        <Youtube selectedSong={selectedSong}/>
        <Search databaseRef={playReference} setSelectedSong={setSelectedSong}/>
      </div>
  );
}

export default App;
