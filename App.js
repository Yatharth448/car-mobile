import React, { Component } from 'react';
import { StyleSheet, BackHandler, View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import RNExitApp from 'react-native-exit-app';
const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }
  webView = {
    canGoBack: false,
    // injectedJavaScript: false,
    ref: null,
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPress);

  }
  componentWillUnmount() {
    try {

      BackHandler.removeEventListener('hardwareBackPress', this.backPress);

    } catch (error) {

      console.error('unmount', error)

    }

  }

  handleBackButtonClick = () => {
    this.exitAlert()
    //	BackHandler.exitApp();
    return true;
  };


  exitAlert() {
    Alert.alert(
      '',
      'Are you sure you want to exit?',
      [
        { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Yes', onPress: () => RNExitApp.exitApp() },
      ],
      { cancelable: false });
  }

  backPress = () => {
    try {

      if (this.webView.canGoBack && this.webView.ref) {
        this.webView.ref.goBack();
        return true;
      }
      //return this.webView.ref.goBack();;
      this.handleBackButtonClick();
      return true;


    } catch (error) {

      console.error('back press', error)

    }
  }

  render() {
    return (
      <View style={styles.container}>
       
        <WebView source={{ uri: 'https://www.karayana.in/' }}
          // scalesPageToFit={false}
          injectedJavaScript={INJECTEDJAVASCRIPT}
          ref={(webView) => {
            this.webView.ref = webView;
          }}
          onNavigationStateChange={(navState) => {
            this.webView.canGoBack = navState.canGoBack;
          }}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
