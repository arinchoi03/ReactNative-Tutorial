/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
var RandManager = require('./RandManager.js')
import Swiper from 'react-native-swiper';
var NetworkImage = require('react-native-image-progress');
var Progress = require('react-native-progress');

const NUM_WALLPAPERS = 5;

// this gets the viewport dimensions
var {width, height} = Dimensions.get('window')

export default class SplashWalls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wallsJSON: [],
      isLoading: true
    }
    this.fetchWallsJSON = this.fetchWallsJSON.bind(this)
    this.renderLoadingMessage = this.renderLoadingMessage.bind(this)
    this.renderResults = this.renderResults.bind(this)
  }
  componentDidMount() {
    this.fetchWallsJSON()
  }
  fetchWallsJSON() {
    var url = 'https://unsplash.it/list'
    fetch(url)
    .then(response => response.json())
    .then(jsonData => {
      var randomIds = RandManager.uniqueRandomNumbers(NUM_WALLPAPERS, 0, jsonData.length)
      var walls = [];
      randomIds.forEach(randomId => {
        walls.push(jsonData[randomId])
      })
      this.setState({
        isLoading: false,
        wallsJSON: [].concat(walls)
      })
    })
    .catch(error => console.log('fetch error' + error))
  }
  renderLoadingMessage() {
    return (

    <View style={styles.loadingContainer}>
        <ActivityIndicator
          animating={true}
          color={'#fff'}
          size={'small'}
          style={{margin: 15}} />
          <Text style={{color: '#fff'}}>Contacting Unsplash</Text>

    </View>
    );
  }

  renderResults() {
    var {wallsJSON, isLoading} = this.state
    if (!isLoading) {
      return(
        <Swiper
        dot={<View style={{backgroundColor: 'rgba(255,255,255,.4)', width: 8, height: 8,borderRadius: 10, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
        activeDot={<View style={{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
        loop={false}
        onMomentumScrollEnd={this.onMomentumScrollEnd}>
          {wallsJSON.map((wallpaper, index) => {
            return(
              <View key={index}>
                <NetworkImage
                  source={{uri: `https://unsplash.it/${wallpaper.width}/${wallpaper.height}?image=${wallpaper.id}`}}
                  indicator={Progress.circle}
                  style={styles.wallpaperImage}
                  indicatorProps={{
                    color: '#000',
                    size: 0,
                    thickness: 1
                  }}>
                </NetworkImage>
              </View>
            )
          })
        }
        </Swiper>
        )
    }
  }
  render() {
    var {isLoading} = this.state;
    if (isLoading) return this.renderLoadingMessage();
    else return this.renderResults();
  }
}

const styles = StyleSheet.create({
  container: {
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
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  wallpaperImage: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: '#000'
  }
});

AppRegistry.registerComponent('SplashWalls', () => SplashWalls);
