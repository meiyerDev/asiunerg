import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { studentAbsencesAction, deleteAbsenceAction } from '../../store/actions/student/AbsenceActions';
import { StyleSheet, Dimensions, SafeAreaView, FlatList } from 'react-native';
import { argonTheme } from '../../constants';

import { Block, Text, theme } from 'galio-framework';
import { CardAbsence } from '../../components';

const { width } = Dimensions.get('screen');

function AbsencePageStudent() {

	const dispatch = useDispatch()
	const absencesStudent = useSelector(state => state.absences)

	const [absences, setAbsences] = useState(absencesStudent.absences);
	const [links, setLinks] = useState(absencesStudent.metaAbsences);
	const [isRefreshing, setIsRefreshing] = useState(absencesStudent.loading)

	const handleDelete = (id) => {
		dispatch(deleteAbsenceAction(id))
	}

	const handleRefreshindList = () => {
		dispatch(studentAbsencesAction())
	}

	const handleMoreItems = () => {
		if(links.current_page === links.last_page || links.current_page === undefined || links.current_page === null){
			return;
		}
		dispatch(studentAbsencesAction(links.current_page + 1))
	}

	useEffect(() => {
		if (absences.length === 0) {
			dispatch(studentAbsencesAction())
		}
	}, [dispatch, absences.length])

	useEffect(() => {
		setAbsences(absencesStudent.absences)
	}, [absencesStudent.absences])

	useEffect(() => {
		setIsRefreshing(absencesStudent.loading)
	}, [absencesStudent.loading])

	useEffect(() => {
		setLinks(absencesStudent.metaAbsences)
	}, [absencesStudent.metaAbsences])

	return (
		<Block flex center style={styles.home}>
			<SafeAreaView style={styles.absences}>
				<FlatList
					data={absences}
					ListHeaderComponent={<Text style={{ marginBottom: 10 }}>Tus inasistencias</Text>}
					ListFooterComponent={absences.length > 0 ? <Text center muted bold style={{ marginTop: 10 }}>No has informado más ausencias</Text> : null}
					ListEmptyComponent={<Text style={{ marginTop: 10 }} h5 color={argonTheme.COLORS.ERROR}>No posee informes de ausencias</Text>}
					onEndReached={handleMoreItems}
					onEndReachedThreshold={0.5}
					initialNumToRender={7}
					refreshing={isRefreshing}
					onRefresh={handleRefreshindList}
					renderItem={({ item }) => <CardAbsence
						item={item}
						horizontal
						handleIcon={handleDelete}
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
		paddingVertical: theme.SIZES.BASE,
	},
});

export default AbsencePageStudent;