import React from 'react';
import YouTube from 'react-youtube';
 
class Youtube extends React.Component {
  render() {
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        mute: 1
      },
    };
 
    return (
      <div
        className="video"
        style={{
          position: "relative",
          paddingBottom: "56.25%" /* 16:9 */,
          paddingTop: 25,
          height: 0
        }}>
          <YouTube style ={{position: 'absolute', top: '0', left: 0}}containerClassName="video-responsive" videoId={this.props.selectedSong} opts={opts} onReady={this._onReady} />       
      </div>
    )
  }
 
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default Youtube