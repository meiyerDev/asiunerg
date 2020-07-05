import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPresentsProfile } from '../../store/actions/teacher/ProfileActions';
import Classes from '../../services/Teacher/Classes';
import { createResponse } from '../../helpers/Response';
import { useFormFields } from '../../helpers/FormFields';
import { Notify } from '../../helpers/Notify';
import {
    StyleSheet,
    Dimensions,
    StatusBar,
    KeyboardAvoidingView,
} from 'react-native';

import { Block, Text } from "galio-framework";
import { Button, Input, Notification } from "../../components";
import { argonTheme } from "../../constants";

const { width, height } = Dimensions.get("screen");

function FormClass({ route, navigation }) {

    const {
        idSection,
        students_present,
        students_absent,
        store_absences,
    } = route.params

    const dispatch = useDispatch();
    const notify = useSelector(state => state.notify)

    const [validate, setValidate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [toastShow, setToastShow] = useFormFields({
        show: false,
        type: 'error',
        message: ''
    })

    const [fields, setFields] = useFormFields({
        theme: '',
        observation: ''
    })

    const handleSubmit = () => {
        setLoading(true)
        if (!validate) {
            handleNotification('error', 'Error de validación, todos los campos son requeridos.');
            setLoading(false)
            return;
        }
        handleNotification('info', 'Se notificará su clase impartida.')

        const form = {
            students_present,
            store_absences,
            students_absent,
            ...fields
        }

        Classes.finishClassStudent(idSection, form)
            .then(resp => {
                const response = createResponse(resp).data
                console.log(response)
                dispatch(addPresentsProfile(1))
                navigation.navigate('Profile')
                setLoading(false)
            })
            .catch(error => {
                console.log('error: ', error)
                setLoading(false)
            })
    }

    const handleFormReset = () => {
        setFields({
            ...fields,
            theme: '',
            observation: ''
        })
    }

    const handleNotification = (type, message) => {
        Notify(type, message, toastShow, setToastShow);
    }

    useEffect(() => {
        if (notify.type !== '') {
            Notify(notify.type, notify.message, toastShow, setToastShow);
        }
    }, [notify])

    /* VALIDAR LOS CAMPOS */
    useEffect(() => {
        const {
            theme,
            observation
        } = fields

        setValidate(false)
        if (theme !== '' && observation !== '') {
            setValidate(true)
        }
    }, [fields])

    return (
        <Block flex middle>
            <StatusBar hidden />
            <Block flex middle>
                <Notification isShow={toastShow.show} message={toastShow.message} positionIndicator="center" color={toastShow.type} />
                <Block flex={0.2} middle>
                    <Text color={argonTheme.COLORS.BLACK} size={20}>
                        ¡ Informa tu Clase Impartida !
	                </Text>
                </Block>
                <Block flex center>
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior="padding"
                        enabled
                    >
                        <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                            <Input
                                borderless
                                placeholder="Tema impartido"
                                s value={fields.theme}
                                onChangeText={e => setFields({ theme: e })}
                            />
                            <Input
                                borderless
                                multiline={true}
                                placeholder="Observación detallada"
                                textAlignVertical="top"
                                style={styles.formTextarea}
                                value={fields.observation}
                                onChangeText={e => setFields({ observation: e })}
                            />
                        </Block>
                        <Block middle>
                            <Button
                                loading={loading}
                                disabled={loading}
                                onPress={handleSubmit}
                                color="warning">
                                <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                                    INFORMAR CLASE
                                </Text>
                            </Button>
                        </Block>
                    </KeyboardAvoidingView>
                </Block>
            </Block>
        </Block>
    )
}

const styles = StyleSheet.create({
    formContainer: {
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
    formTextarea: {
        height: height * 0.09,
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.05,
        elevation: 2,
    }
})


export default FormClass;