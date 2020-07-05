import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { absencesAction, deleteAbsenceAction } from '../../store/actions/teacher/AbsenceActions';
import { StyleSheet, Dimensions, SafeAreaView, FlatList } from 'react-native';
import { argonTheme } from '../../constants';

import { Block, Text, theme } from 'galio-framework';
import { CardAbsence } from '../../components';

const { width } = Dimensions.get('screen');

function AbsencePage() {

	const dispatch = useDispatch()
	const absencesTeacher = useSelector(state => state.absences)

	const [absences, setAbsences] = useState(absencesTeacher.absences);
	const [links, setLinks] = useState(absencesTeacher.metaAbsences);
	const [isRefreshing, setIsRefreshing] = useState(absencesTeacher.loading)

	const handleDelete = (id) => {
		dispatch(deleteAbsenceAction(id))
	}

	const handleRefreshindList = () => {
		dispatch(absencesAction())
	}

	const handleMoreItems = () => {
		if(links.current_page === links.last_page || links.current_page === undefined || links.current_page === null){
			return;
		}
		dispatch(absencesAction(links.current_page + 1))
	}

	useEffect(() => {
		if (absences.length === 0) {
			dispatch(absencesAction())
		}
	}, [dispatch, absences.length])

	useEffect(() => {
		setAbsences(absencesTeacher.absences)
	}, [absencesTeacher.absences])

	useEffect(() => {
		setIsRefreshing(absencesTeacher.loading)
	}, [absencesTeacher.loading])

	useEffect(() => {
		setLinks(absencesTeacher.metaAbsences)
	}, [absencesTeacher.metaAbsences])

	return (
		<Block flex style={styles.home}>
			<Block flex center>
				<SafeAreaView style={styles.articles}>
					<FlatList
						data={absences}
						ListHeaderComponent={<Text style={{ marginBottom: 10 }}>Tus inasistencias</Text>}
						ListFooterComponent={absences.length > 0 ? <Text center muted bold style={{ marginTop: 10 }}>No has informado más ausencias</Text> : null}
						ListEmptyComponent={<Text style={{ marginTop: 10 }} h5 color={argonTheme.COLORS.ERROR}>No posee informes de ausencias</Text>}
						onEndReached={() => handleMoreItems()}
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
		</Block>
	)
}

const styles = StyleSheet.create({
	home: {
		width: width,
	},
	articles: {
		width: width - theme.SIZES.BASE * 2,
		paddingVertical: theme.SIZES.BASE,
	},
});

export default AbsencePage;