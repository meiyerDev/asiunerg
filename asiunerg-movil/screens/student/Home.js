import React, { useEffect, useState } from 'react';
import Classes from '../../services/Student/Classes'
import { StyleSheet, Dimensions, SafeAreaView, FlatList } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { argonTheme } from '../../constants';
import { createResponse } from '../../helpers/Response';

import { CardClass } from '../../components';
const { width } = Dimensions.get('screen');

function Home ({navigation}) {

  const [ classes, setClasses ] = useState([]);
  const [ isRefreshing, setIsRefreshing ] = useState(true);
  const [ links, setLinks ] = useState({});

  const handleNavigateToMatter = (item) => {
  }

  const handleMoreClass = () => {
    if(links.current_page === links.last_page || links.current_page === undefined || links.current_page === null){
			return;
    }
    Classes.getClasses(links.current_page + 1)
      .then(resp => {
        const response = createResponse(resp).data;
        setClasses([classes,...response.data])
        setLinks({
          current_page : response.current_page,
          last_page : response.last_page,
        })
        setIsRefreshing(false)
      })
      .catch(error => {
        console.log('error',error)
        setIsRefreshing(false)
      })
  }

  const handleRefreshindList = () => {
    Classes.getClasses()
      .then(resp => {
        const response = createResponse(resp).data;
        setClasses(response.data)
        setLinks({
          current_page : response.current_page,
          last_page : response.last_page,
        })
        setIsRefreshing(false)
      })
      .catch(error => {
        console.log('error',error)
        setIsRefreshing(false)
      })
  }

  useEffect(() => {
    handleRefreshindList()
  },[])

  const renderClasses = () => {
    return (
      <SafeAreaView style={styles.classes}>
        <FlatList
          data={classes}
          ListHeaderComponent={<Text style={{marginBottom: 10}}>Tus clases</Text>}
          ListFooterComponent={classes.length > 0 ? <Text center muted bold style={{marginTop: 10}}>No hay más clases impartidas</Text> : null}
          ListEmptyComponent={<Text style={{marginTop: 10}} h5 color={argonTheme.COLORS.ERROR}>No posee registros de clases impartidas</Text>}
          initialNumToRender={7}
					onEndReachedThreshold={0.5}
          onEndReached={() => handleMoreClass()}
          refreshing={isRefreshing}
          onRefresh={handleRefreshindList}
          renderItem={({ item }) => <CardClass
            item={item}
            style={{ marginRight: theme.SIZES.BASE }}
            handleNavigateToClass={handleNavigateToMatter}
          />}
          keyExtractor={item => item.id.toString()}
        />
      </SafeAreaView>
    )
  }

  return (
    <Block flex center style={styles.home}>
      {renderClasses()}
    </Block>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  classes: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default Home;
