import React, { Component } from 'react';
import Video from 'react-native-video';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class VideoView extends Component {
  constructor(a1, a2, a3){
    super(a1, a2, a3)
    this.state = {
      paused: true,
      started: 0,
      end: 0,
      error: 0,
      buffer: 0,
      loaded: 0,
      played: 0,
    };
  }

  handlePress(){
    this.setState({ paused:!this.state.paused })
  }

  handleError(e){
    console.error(e);
  }

  updateInit(e){
    this.setState({ duration: e.duration });
  }

  updatePlay(e){
    console.log(e);
    this.setState({ played: e.currentTime })
  }

  updateLoaded(e){
    console.log(e);
    this.setState({ loaded: e.playableDuration })
  }

  handleEvent(key){
    return ()=>{
      this.setState({
        [key]: this.state[key] + 1
      });
    };
  }

  render(){
    var { state } = this;
    return (
      <View style={styles.container}>
        <Video
          source={{
            uri: "https://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4?",
            // uri: "https://archive.org/download/Pbtestfilemp4videotestmp4/video_test.mp4"
            // uri: "http://webm.land/media/ar1N.webm"
          }}   // Can be a URL or a local file.
           ref={(ref) => {
             this.player = ref
           }}                             // Store reference
           muted={true}                  // Mutes the audio entirely.
           paused={state.paused}               // Pauses playback entirely.
           resizeMode="cover"             // Fill the whole screen at aspect ratio.
           onLoadStart={this.handleEvent("started")}   // Callback when video starts to load
           onLoad={this.updateInit.bind(this)}      // Callback when video loads
           onProgress={this.updatePlay.bind(this)}      // Callback every ~250ms with currentTime
           onEnd={this.handleEvent("end")}             // Callback when playback finishes
           onError={this.handleError.bind(this)}      // Callback when video cannot be loaded
           onBuffer={this.handleEvent("buffer")} // Callback when remote video is buffering
           onReadyForDisplay={this.updateLoaded.bind(this)}
           style={styles.backgroundVideo}
        />
        <TouchableHighlight style={styles.infoWrapper} onPress={()=>this.handlePress()}>
          <View style={styles.info} >{
            Object.keys(state).map((key)=>{
              return <Text key={key} >{key + ": " + state[key]}</Text>;
            })
          }</View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  infoWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
