import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matterAssignAction } from '../../store/actions/teacher/ProfileActions'
import { StyleSheet, Dimensions, SafeAreaView, FlatList } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { Card } from '../../components';
import articles from '../../constants/articles';
const { width } = Dimensions.get('screen');

function Matters ({navigation}) {

  const dispatch = useDispatch();
  const teacherMatters = useSelector(state => state.profile.matters);
  const teacherLoading = useSelector(state => state.profile.loading);

  const [ isRefreshing, setIsRefreshing ] = useState(teacherLoading);
  const [ matters, setMatters ] = useState(teacherMatters);

  const handleNavigateToMatter = (item) => {
    navigation.push('MatterStudentList',{
      idSection : item
    })
  }

  const handleRefreshindList = () => {
    dispatch(matterAssignAction())
  }
  
  useEffect(() => {
    if(teacherMatters.length === 0) {
      dispatch(matterAssignAction())
    }
  },[dispatch, teacherMatters])

  useEffect(() => {
    setMatters(teacherMatters)
  },[teacherMatters])

  useEffect(() => {
    setIsRefreshing(teacherLoading)
  },[teacherLoading])
  
  const renderArticles = () => {
    return (
      <SafeAreaView style={styles.articles}>
        <FlatList
          data={matters}
          ListHeaderComponent={<Text>Tus clases</Text>}
          ListFooterComponent={matters.length > 0 ? <Text center muted bold style={{marginTop: 10}}>No hay más secciones asignadas</Text> : null}
          initialNumToRender={4}
          onEndReached={() => {
            console.log('mas render')
          }}
          refreshing={isRefreshing}
          onRefresh={handleRefreshindList}
          renderItem={({ item }) => <Card
            item={item}
            style={{ marginRight: theme.SIZES.BASE }}
            handleNavigateToMatter={handleNavigateToMatter}
          />}
          keyExtractor={item => item.id.toString()}
        />
      </SafeAreaView>
    )
  }

  return (
    <Block flex center style={styles.home}>
      {renderArticles()}
    </Block>
  );
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

export default Matters;
