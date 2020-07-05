import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { LogOutAction } from '../store/actions/AuthActions'
import { useSafeArea } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  Image
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Images, argonTheme } from "../constants";
import { DrawerItem as DrawerCustomItem } from '../components';
import { Button } from "../components";

function CustomDrawerContent({ drawerPosition, navigation, profile, focused, state, ...rest }) {
  const insets = useSafeArea();
  const screens = [
    {
      title: "Inicio",
      nav: "Home"
    }, 
    {
      title: "Perfil",
      nav: "Profile"
    },
    {
      title: "Inasistencias",
      nav: "Absence"
    },
    {
      title: "Clases",
      nav: "TheirAbsence"
    },
  ];

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(LogOutAction(navigation))
  }

  return (
    <Block
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <Block flex={0.06} style={styles.header}>
        <Image styles={styles.logo} source={Images.Logo} />
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
              return (
                <DrawerCustomItem
                  title={item.title}
                  nav={item.nav}
                  key={index}
                  navigation={navigation}
                  focused={state.index === index ? true : false}
                />
              );
            })}
            <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
              <Block style={{ borderColor: "rgba(0,0,0,0.2)", width: '100%', borderWidth: StyleSheet.hairlineWidth }}/>
            </Block>
            <Block middle>
              <Button 
                onPress={handleLogout}
                color="error">
                <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                  CERRAR SESIÓN
                </Text>
              </Button>
            </Block>
        </ScrollView>
      </Block>
    </Block>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center',
  }
});

export default CustomDrawerContent;
