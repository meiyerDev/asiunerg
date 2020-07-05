import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matterToAbsencesAction, reportAbsenceAction } from '../../store/actions/teacher/AbsenceActions';
import { useFormFields } from '../../helpers/FormFields';
import { Notify } from '../../helpers/Notify';
import {
	StyleSheet,
	Dimensions,
	StatusBar,
	KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Block, Text } from "galio-framework";
import { Button, Input, Notification } from "../../components";
import SelectPicker from "../../components/SelectPicker"
import { argonTheme } from "../../constants";

const { width, height } = Dimensions.get("screen");

function FormAbsence() {

	const dispatch = useDispatch();
	const teacherAbsences = useSelector(state => state.absences)
	const notify = useSelector(state => state.notify)

	const [matters, setMatters] = useState(teacherAbsences.matters)
	const [sectionValue, setSectionValue] = useState(0)
	const [validate, setValidate] = useState(false)
	const [loading, setLoading] = useState(false)
	const [toastShow, setToastShow] = useFormFields({
		show: false,
		type: 'error',
		message: ''
	})

	const [fields, setFields] = useFormFields({
		typeAbsence: 0,
		section: [],
		day: '',
		reason: 0,
		observation: ''
	})

	const [DataPickers, setDataPickers] = useState({
		show: true,
		date: new Date()
	})

	const handleOnChangeDayPicker = (event, selecteDate) => {
		setDataPickers({
			...DataPickers,
			show: false,
			date: selecteDate || new Date()
		})
	}

	const handleSubmit = () => {
		if (!validate) {
			handleNotification('error', 'Error de validación, todos los campos son requeridos.');
			return;
		}
		handleNotification('info', 'Se notificará su inasistencia.')
		dispatch(reportAbsenceAction(fields, handleFormReset));
	}

	const handleFormReset = () => {
		setFields({
			...fields,
			section: [],
			reason: 0,
			day: '',
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

	useEffect(() => {
		if (matters.length === 0 || matters.length === 1) {
			dispatch(matterToAbsencesAction());
		}
	}, [dispatch, matters.length])

	useEffect(() => {
		setMatters(teacherAbsences.matters)
	}, [teacherAbsences.matters])

	useEffect(() => {
		if (DataPickers.date !== undefined) {
			let day = DataPickers.date.getDate();
			let month = DataPickers.date.getMonth() + 1;
			let year = DataPickers.date.getFullYear();
			const data = `${(day < 10) ? '0' + day : day}-${(month < 10) ? '0' + month : month}-${year}`
			setFields({ day: data })
		}
	}, [DataPickers.date])

	useEffect(() => {
		handleFormReset()
	}, [fields.typeAbsence])

	/* VALIDAR LOS CAMPOS */
	useEffect(() => {
		const {
			typeAbsence,
			section,
			day,
			reason,
			observation
		} = fields

		setValidate(false)
		if (reason !== 0 && observation !== '') {
			if ((
				typeAbsence === 1 && sectionValue !== 0 && section.length > 0
			) || (
					typeAbsence === 2 && day !== ''
				)
			) {
				setValidate(true)
			}
		}
	}, [fields])

	useEffect(() => {
		setLoading(teacherAbsences.loading)
	}, [teacherAbsences.loading])

	return (
		<Block flex middle>
			<StatusBar hidden />
			<Block flex middle>
				<Notification isShow={toastShow.show} message={toastShow.message} positionIndicator="center" color={toastShow.type} />
				<Block flex={0.2} middle>
					<Text color={argonTheme.COLORS.BLACK} size={20}>
						¡ Informa tu Inasistencia !
	          		</Text>
				</Block>
				<Block flex center>
					<KeyboardAvoidingView
						style={{ flex: 1 }}
						behavior="padding"
						enabled
					>
						<Block width={width * 0.9} style={{ marginBottom: 15 }}>
							<SelectPicker
								mode="dropdown"
								selectedValue={fields.typeAbsence}
								style={{ ...styles.formSelect, marginBottom: fields.typeAbsence > 1 ? 0 : 8 }}
								onValueChange={(itemValue, itemIndex) => setFields({ typeAbsence: itemValue })}
								data={[
									{ label: 'Seleccione..', value: 0 },
									{ label: 'Por materia', value: 1 },
									{ label: 'Por día', value: 2 }
								]}
							/>

							{fields.typeAbsence > 1 && DataPickers.show
								? <DateTimePicker
									mode="date"
									display="calendar"
									onChange={handleOnChangeDayPicker}
									value={DataPickers.date}
									minimumDate={new Date()}
									dayOfWeekFormat={"{dayofweek.abbreviated}"}
									dateFormat={"day month"}
									is24Hour={true}
								/>
								: null}

							{fields.typeAbsence === 1
								? <SelectPicker
									selectedValue={sectionValue}
									style={{ ...styles.formSelect, marginBottom: 8 }}
									onValueChange={(itemValue, itemIndex) => {
										let val = ''
										if (itemValue > 0) {
											val = [itemValue]
										}
										setFields({ section: val })
										setSectionValue(itemValue)
									}}
									data={matters}
								/>
								: fields.typeAbsence === 2
									? <Input
										value={fields.day}
										editable={true}
										onFocus={() => setDataPickers({ ...DataPickers, show: true })}
										onChangeText={() => setDataPickers({ ...DataPickers, show: true })}
										borderless
										placeholder="Fecha de Inasistencia"
									/>
									: null
							}

							<SelectPicker
								mode="dropdown"
								selectedValue={fields.reason}
								style={styles.formSelect}
								onValueChange={(itemValue, itemIndex) => setFields({ reason: itemValue })}
								data={[
									{ label: 'Seleccione motivo..', value: 0 },
									{ label: 'Sin pasaje para el transporte', value: 1 },
									{ label: 'Reposo médico', value: 2 },
									{ label: 'Problema familiar', value: 3 },
									{ label: 'Otro', value: 4 }
								]}
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
								color="warning" style={styles.createButton}>
								<Text bold size={14} color={argonTheme.COLORS.WHITE}>
									INFORMAR INASISTENCIA
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
	formSelect: {
		borderRadius: 4,
		borderColor: argonTheme.COLORS.BORDER,
		height: 44,
		backgroundColor: '#FFFFFF',
		shadowColor: argonTheme.COLORS.BLACK,
		shadowOffset: { width: 0, height: 1 },
		shadowRadius: 2,
		shadowOpacity: 0.05,
		elevation: 2,
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


export default FormAbsence;