import React, {useState, Fragment} from 'react';
import debounce from 'lodash.debounce';
import YoutubeService from '../services/YoutubeService'

function Search({databaseRef,setSelectedSong}){
  let debouncedFn
  const [suggested, setSuggested] = useState([])
  
  function onSearch(event){
    /* signal to React not to nullify the event object */
    event.persist();    
    if (!debouncedFn) {
      debouncedFn = debounce(() => {
         fetchSearchData(event.target.value);
      }, 1000);
    }
    debouncedFn();
  }

  function addSong(song){
    databaseRef.set(song)
  }

  function fetchSearchData(searchString) {
    YoutubeService.get(`search?q=${searchString}&part=snippet&key=&type=video&videoEmbeddable=true&videoSyndicated=true`)
    .then(function ({data}) {
      // handle success
      setSuggested(data.items);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
    
  return (
    <Fragment>
      <div className="lists">
        <ul className="nes-list is-disc">
          {suggested.map((item, id) =>        
            <li key={id}>
              {item.snippet.title}
              <button type="button" style={{fontSize: '8px'}} className="nes-btn is-normal" onClick={()=> addSong(item.id.videoId)}>
                <i className="nes-icon is-small youtube"></i>
              </button>
            </li>
          )}
        </ul>
      </div>
      <div style={{backgroundColor: '#212529'}, {padding: '1rem'}} className="nes-field is-inline">
        <input type="text" id="dark_field" className="nes-input is-dark" placeholder="Look for a song!"  onChange={onSearch}/>
      </div>      
    </Fragment>


  )
    

  
}

export default Search