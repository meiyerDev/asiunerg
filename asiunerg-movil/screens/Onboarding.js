import React, {useEffect} from "react";
import { useSelector } from 'react-redux';
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import * as Location from 'expo-location';
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import {Images, argonTheme, Task} from "../constants";

function Onboarding({navigation}) {
  const auth = useSelector(state => state.auth.isAuth)
  const loading = useSelector(state => state.auth.loading)

  const handlePress = () => {
    let stack = 'Auth'
    if (auth){
      stack = 'App'
    }

    navigation.push(stack)
  }

  useEffect(() => {
    (async () => {
      let activeTask = await Location.hasStartedGeofencingAsync(Task.GEOLOCATION_UNERG_TASK);
      if (auth){
        if (!activeTask) {
          await Location.startGeofencingAsync(Task.GEOLOCATION_UNERG_TASK,[{
            identifier: 'AIS',
            latitude: 9.897840,
            longitude: -67.389172,
            radius: 100
          }]);
        }
      }else if(activeTask){
        await Location.stopGeofencingAsync(Task.GEOLOCATION_UNERG_TASK);
      }
    })();
  },[])

  return (
    <Block flex style={styles.container}>
      <StatusBar hidden />
      <Block flex center>
        <ImageBackground
          source={Images.Onboarding}
          style={{ height, width, zIndex: 1 }}
        />
      </Block>
      <Block center>
        {/*<Image source={Images.LogoOnboarding} style={styles.logo} />*/}
        <Image source={Images.androidLogo} style={styles.logo} />
      </Block>
      <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block style={styles.title}>
              <Block>
                <Text color="white" size={50}>
                  Solución
                </Text>
              </Block>
              <Block>
                <Text color="white" size={50}>
                  Tecnológica
                </Text>
              </Block>
              <Block style={styles.subTitle}>
                <Text color="white" size={16}>
                  Universidad Nacional Romulo Gallegos.
                </Text>
              </Block>
            </Block>
            <Block center>
              <Button
                style={styles.button}
                color={argonTheme.COLORS.SECONDARY}
                onPress={handlePress}
                textStyle={{ color: argonTheme.COLORS.BLACK }}
              >
              {auth
                ? 'IR A INICIO'
                : 'INICIAR SESIÓN'
              }
              </Button>
            </Block>
        </Block>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  logo: {
    width: width * 0.73,
    height: 70,
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%'
  },
  title: {
    marginTop:'-5%'
  },
  subTitle: {
    marginTop: 20
  }
});

export default Onboarding;
