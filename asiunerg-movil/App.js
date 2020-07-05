import React, { useState, useEffect } from "react";
import { Provider, useDispatch } from 'react-redux';
import { isAuthAction } from "./store/actions/AuthActions";
import Api from './services/Api';
import Auth from './services/Auth/Auth'
import { store } from './configureStore';
import { Image, View, ActivityIndicator, StyleSheet } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as SecureStore from 'expo-secure-store'
import { Block, GalioProvider, Text } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

import Screens from "./navigation/Screens";
import { Images, articles, argonTheme, Task } from "./constants";

TaskManager.defineTask(Task.GEOLOCATION_UNERG_TASK, ({ data: { eventType, region }, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  SecureStore.getItemAsync('token')
    .then(async token => {
      Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const response = (await Auth.getRole())
      if(response.status === 200){
        const {
          role
        } = response.data;
        if (role === 'Teacher') {
          if (eventType === Location.GeofencingEventType.Enter) {
            console.log("You've entered region:", region);
            await Auth.postRegion({
              position: true,
              identifier: 'AIS'
            });
          } else if (eventType === Location.GeofencingEventType.Exit) {
            console.log("You've left region:", region);
            await Auth.postRegion({
              position: false,
              identifier: 'AIS'
            });
          }
        }
      }
    })
});

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.ArgonLogo,
  Images.androidLogo
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}


function Applicantion () {

  const [ isLoadingComplete, setIsLoadingComplete ] = useState(false)
  const dispatch = useDispatch();

  const isAuthToken = async () => {
    return SecureStore.getItemAsync('token')
      .then(async token => {
        if(token !== null){
          console.log('espera..')
          Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          const response = (await Auth.getRole())
          if(response.status === 200){
            console.log('login..')
            const {
              role
            } = response.data;
            dispatch(isAuthAction(role));
          }else{
            const token = await SecureStore.deleteItemAsync('token')
            Api.defaults.headers.common['Authorization'] = ''
          }
        }
      })
  }

  const startGeolocation = async () => {
    return Location.getPermissionsAsync()
      .then(async permissionGeo => {
        if (! permissionGeo.granted) {
          do {
            let responsePermission = (await Location.requestPermissionsAsync()).granted;
            if (!responsePermission) {
              alert('Lo sentimos, se necesitan permisos de localización para utilizar esta app.');
            }
          }while(!responsePermission);
        }
      })
  }

  const _loadResourcesAsync = async () => {
    return Promise.all([...cacheImages(assetImages),isAuthToken(),startGeolocation()]);
  };

  const _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  const _handleFinishLoading = () => {
    setIsLoadingComplete(true);
  };

  if (!isLoadingComplete) {
    return (
      <View style={[styles.container,styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" size="large" />
        <Text size={10} center bold>Verificando sesión</Text>
        <Text size={10} center bold>Por favor, espere..</Text>
        <AppLoading
          startAsync={_loadResourcesAsync}
          onError={_handleLoadingError}
          onFinish={_handleFinishLoading}
        />
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <GalioProvider theme={argonTheme}>
          <Block flex>
            <Screens />
          </Block>
        </GalioProvider>
      </NavigationContainer>
    );
  }
}

export default function App () {
  return (
    <Provider store={store}>
      <Applicantion/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    padding: 10,
  },
});