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
  View
} from 'react-native';

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
      console.log(jsonData)
      this.setState({isLoading: false})
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
    return (

    <View style={styles.container}>
        <Text>
          Data loaded
        </Text>

    </View>
    );
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
  }
});

AppRegistry.registerComponent('SplashWalls', () => SplashWalls);
