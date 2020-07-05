import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { signUpAction } from "../../store/actions/AuthActions";
import { Block, Checkbox, Text } from "galio-framework";
import { useFormFields } from '../../helpers/FormFields';
import { Notify } from '../../helpers/Notify';

import { Button, Icon, Input, Notification } from "../../components";
import { Images, argonTheme } from "../../constants";

const { width, height } = Dimensions.get("screen");

function Register ({ navigation, route }) {

  const notify = useSelector(state => state.notify)
  const isLoading = useSelector(state => state.auth.loading)
  const [ toastShow, setToastShow ] = useFormFields({
    show: false,
    type: 'error',
    message: ''
  })

  const [ loading, setLoading ] = useState(isLoading)
  const [ fields, setFields ] = useState({
    identity: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const dispatch = useDispatch()

  const handelRegister = () => {
    dispatch(signUpAction(fields,navigation))
  }

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
              <Block flex={0.20} middle>
                <Notification isShow={toastShow.show} message={toastShow.message} positionIndicator="top" color={toastShow.type}/>
                <Text color="#8898AA" size={40}>
                  ¡ Registrate !
                </Text>
              </Block>
              <Block flex center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled
                >
                  <Block width={width * 0.8}>
                    <Input
                      onChangeText={e => setFields({...fields,identity:e})}
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
                    <Input
                      onChangeText={e => setFields({...fields,email:e})}
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
                    <Input
                      onChangeText={e => setFields({...fields,password:e})}
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
                    <Input
                      onChangeText={e => setFields({...fields,password_confirmation:e})}
                      password
                      borderless
                      placeholder="Confirme Contraseña"
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
                    <Block row style={styles.passwordCheck}>
                      <Text size={12} color={argonTheme.COLORS.MUTED}>
                        seguridad de contraseña:
                      </Text>
                      <Text bold size={12} color={argonTheme.COLORS.SUCCESS}>
                        {" "}
                        fuerte
                      </Text>
                    </Block>
                  </Block>
                  <Block width={width * 0.75}>
                    <Checkbox
                      checkboxStyle={{
                        borderWidth: 3
                      }}
                      color={argonTheme.COLORS.PRIMARY}
                      label="Estoy de Acuerdo con las "
                    />
                    {/*<Button
                      style={{ width: 100 }}
                      color="transparent"
                      textStyle={{
                        color: argonTheme.COLORS.PRIMARY,
                        fontSize: 14
                      }}
                    >*/}
                    <Text style={{marginLeft:30, marginBottom:10}}>
                      Políticas de privacidad
                    </Text>
                    {/*</Button>*/}
                  </Block>
                  <Block middle>
                    <Button
                      loading={loading}
                      disabled={loading}
                      onPress={handelRegister}
                      color="primary" style={styles.createButton}>
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        ACTIVAR CUENTA
                      </Text>
                    </Button>
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
    height: height * 0.78,
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
    paddingBottom: 25
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

export default Register;
