import React, { useState, useEffect } from 'react';
import Classes from '../../services/Teacher/Classes';
import { createResponse } from '../../helpers/Response';
import { StyleSheet, Dimensions, SafeAreaView, FlatList } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { argonTheme } from '../../constants';

import { CardStudent, Button } from '../../components';
import articles from '../../constants/articles';
const { width } = Dimensions.get('screen');

function MatterStudentsList ({route, navigation}) {
  
	const {
		idSection
	} = route.params

  const [ students, setStudents ] = useState([])
	const [ markable, setMarkable ] = useState(false)
	const [ loading, setLoading ] = useState(false)

	const handleGetStudentList = () => {
    setLoading(true)
		Classes.getStudentsForMatter(idSection)
		.then(resp => {
      const response = createResponse(resp).data.data
      setStudents(response.students)
      setMarkable(response.is_markable)
      setLoading(false)
		})
		.catch(error => {
			console.log('error',error)
      setLoading(false)
		})
	}

  const handleChangePresent = id => {
    if(!markable) return;
    setLoading(true)
    const newStudents = students.map(student => {
      let val = student
      if(student.id === id) {
        val = {...student, present: !student.present}
      }
      return val
    })
    setStudents(newStudents)
    setLoading(false)
  }

  const handleFinishClass = () => {
		navigation.push('FormClass',{
      idSection : idSection,
      students_present: students.filter(student => student.present).map(student => student.id),
      students_absent: students.filter(student => !student.present).map(student => student.id),
      store_absences: true
    })
  }
  
  const handleSubmitPresent = e => {
    setLoading(true)
		const form = {
			students_present: students.filter(student => student.present).map(student => student.id),
			students_absent: students.filter(student => !student.present).map(student => student.id),
		}
		Classes.newClassStudents(idSection,form)
		.then(resp => {
			const response = createResponse(resp).data/*.data*/;
			setStudents(students.filter(student => !response.present.includes(student.id)))
      setLoading(false)
		})
		.catch(error => {
			console.log('error: ',error.response)
      setLoading(false)
		})
	}

	useEffect(() => {
    handleGetStudentList()
	},[idSection])

  const renderStudents = () => {
    return (
      <SafeAreaView style={styles.students}>
        <FlatList
          data={students}
          ListHeaderComponent={<Text>Tus materias asignadas</Text>}
          ListFooterComponent={students.length > 0 ? <Text center muted bold style={{marginTop: 10}}>No hay mas estudiantes</Text> : null}
          refreshing={loading}
          onRefresh={handleGetStudentList}
          renderItem={({ item }) => <CardStudent
            item={item}
            horizontal
            handleChangePresent={handleChangePresent}
            isMarkable={markable}
          />}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={{marginTop: 10}} h5 color={argonTheme.COLORS.ERROR}>No posee estudiantes inscritos</Text>}
        />
      </SafeAreaView>
    )
  }

  return (
    <Block flex center space={'between'} style={styles.home}>
      {renderStudents()}
      {
        markable
        ? <Block flex space="between" row>
            {students.length > 0
              ? <Button uppercase
                  style={styles.button}
                  loading={loading}
                  disabled={loading}
                  size={'small'}
                  color={'success'}
                  onPress={handleSubmitPresent}
                >Marcar asistentes</Button>
              : null
            }
            <Button uppercase
              style={styles.button}
              loading={loading}
              disabled={loading}
              size={'small'}
              color={'primary'}
              onPress={handleFinishClass}
            >Informar asistencia</Button>
          </Block>
        : null
      }
    </Block>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  students: {
    flex: 1,
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  button: {
    marginHorizontal: 1
  }
});

export default MatterStudentsList;
