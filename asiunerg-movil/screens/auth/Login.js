import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginAction, clearAuthState } from '../../store/actions/AuthActions'
import { useFormFields } from '../../helpers/FormFields';
import { Notify } from '../../helpers/Notify';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";

import { Block, Text } from "galio-framework";

import { Button, Icon, Input, Notification } from "../../components";
import { Images, argonTheme } from "../../constants";

const { width, height } = Dimensions.get("screen");

export default function Login ({ navigation, route }) {

  const dispatch = useDispatch();
  const notify = useSelector(state => state.notify)
  const isLoading = useSelector(state => state.auth.loading)

  const [ identity, setIdentity ] = useState('27446504') 
  const [ email, setEmail ] = useState('meiyerjaimes@gmail.com')
  const [ password, setPassword ] = useState('12345678')
  const [ loading, setLoading ] = useState(isLoading)

  const [ toastShow, setToastShow ] = useFormFields({
    show: false,
    type: 'error',
    message: ''
  })

  const handleLogin = () => {
    const fields = {
      identity,
      email,
      password
    }
    dispatch(LoginAction(fields))
  }
  useEffect(() => {
    dispatch(clearAuthState())
  },[dispatch])

  useEffect( () => {
    if(notify.type !== ''){
      Notify(notify.type, notify.message, toastShow, setToastShow);
    }
  },[notify])

  useEffect(() => {
    setLoading(isLoading)
  },[isLoading])

	return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block flex middle>
          <Block style={styles.registerContainer}>
            <Block flex>
              <Block flex={0.35} middle>
                <Notification isShow={toastShow.show} message={toastShow.message} positionIndicator="top" color={toastShow.type}/>
                <Text color="#8898AA" size={40}>
                  ¡ Inicia Sesión !
                </Text>
              </Block>
              <Block flex center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled
                >
                  {}
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Input
                      type="number-pad"
                      onChangeText={e => setIdentity(e)}
                      borderless
                      placeholder="Cédula"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="hat-3"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                  </Block>
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Input
                      onChangeText={e => setEmail(e)}
                      borderless
                      placeholder="Correo Electrónico"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                  </Block>
                  <Block width={width * 0.8}>
                    <Input
                      onChangeText={e => setPassword(e)}
                      password
                      borderless
                      placeholder="Contraseña"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="padlock-unlocked"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                  </Block>
                  <Block middle>
                    <Button 
                      loading={loading}
                      disabled={loading}
                      onPress={handleLogin}
                      color="primary" style={styles.createButton}>
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        INGRESAR
                      </Text>
                    </Button>
                  </Block>
				          <Block middle>
				            <Text
				            	onPress={() => navigation.push('Register')} 
				            	bold size={14} color={argonTheme.COLORS.SUCCESS}>
				              o Registrate
				            </Text>
				          </Block>
                </KeyboardAvoidingView>
              </Block>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.60,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 5
  }
});