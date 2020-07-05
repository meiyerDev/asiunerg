import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AbsenceTeacherListAction } from '../../store/actions/student/AbsenceActions';
import { StyleSheet, Dimensions, SafeAreaView, FlatList } from 'react-native';

import { Block, Text, theme } from 'galio-framework';
import { CardTheirAbsence } from '../../components';
import argonTheme from "../../constants/Theme";

const { width } = Dimensions.get('screen');

function TheirAbsencePage() {

	const dispatch = useDispatch()
	const absencesStudent = useSelector(state => state.absences)

	const [absences, setAbsences] = useState(absencesStudent.theirAbsences);
	const [isRefreshing, setIsRefreshing] = useState(absencesStudent.loading)
	const [links, setLinks] = useState(absencesStudent.metaTheirAbsences);

	const handleRefreshindList = () => {
		dispatch(AbsenceTeacherListAction())
	}

	const handleMoreItems = () => {
		if(links.current_page === links.last_page || links.current_page === undefined || links.current_page === null){
			return;
		}
		dispatch(AbsenceTeacherListAction(links.current_page + 1))
	}

	useEffect(() => {
		if (absences.length === 0) {
			dispatch(AbsenceTeacherListAction())
		}
	}, [dispatch, absences.length])

	useEffect(() => {
		setAbsences(absencesStudent.theirAbsences)
	}, [absencesStudent.theirAbsences])

	useEffect(() => {
		setIsRefreshing(absencesStudent.loading)
	}, [absencesStudent.loading])

	useEffect(() => {
		setLinks(absencesStudent.metaTheirAbsences)
	}, [absencesStudent.metaTheirAbsences])

	return (
		<Block flex center style={styles.home}>
			<SafeAreaView style={styles.absences}>
				<FlatList
					data={absences}
					ListHeaderComponent={<Text style={{marginTop: 10}}>Inasistencias de Profesores</Text>}
					ListFooterComponent={absences.length > 0 ? <Text center muted bold style={{marginTop: 10}}>No hay más clases impartidas</Text> : null}
					ListEmptyComponent={<Text style={{marginTop: 10}} h5 color={argonTheme.COLORS.ERROR}>Tus profesores no han informado alguna inasistencias</Text>}
					initialNumToRender={5}
					onEndReached={() => handleMoreItems()}
					refreshing={isRefreshing}
					onRefresh={handleRefreshindList}
					renderItem={({ item }) => <CardTheirAbsence
						item={item}
						horizontal
					/>}
					keyExtractor={item => item.id.toString()}
				/>
			</SafeAreaView>
		</Block>
	)
}

const styles = StyleSheet.create({
	home: {
		width: width,
	},
	absences: {
		width: width - theme.SIZES.BASE * 2,
	},
});

export default TheirAbsencePage;