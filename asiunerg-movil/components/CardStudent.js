import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, Checkbox, theme } from 'galio-framework';

import { argonTheme } from '../constants';

const { width } = Dimensions.get('screen');

function CardStudent (props) {
  const { navigation, item, horizontal, full, style, ctaColor, imageStyle, handleChangePresent, isMarkable } = props;
  
  const imageStyles = [
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle
  ];
  const cardContainer = [styles.card, styles.shadow, style];
  const imgContainer = [styles.imageContainer,
    horizontal ? styles.horizontalStyles : styles.verticalStyles,
    styles.shadow
  ];

  return (
    <Block row={horizontal} card flex style={cardContainer}>
      <TouchableWithoutFeedback
        onPress={() => handleChangePresent(item.id)}
      >
        <Block style={imgContainer}>
          <Image source={{uri: item.avatar}} style={imageStyles} />
        </Block>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => handleChangePresent(item.id)}
      >
        <Block flex space="around" style={styles.cardDescription}>
          <Text size={14} style={styles.cardTitle,styles.cardHeader} bold>{item.name}</Text>
          <Text size={14} style={styles.cardTitle,styles.cardHeader} bold>{item.lastname}</Text>
          <Text size={12} style={styles.cardTitle}>Cédula: {item.identity}</Text>
        </Block>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => handleChangePresent(item.id)}
      >
        <Block right style={styles.cardCheckbox}>
          {
            isMarkable
            ? <Checkbox
                checkboxStyle={{
                  borderWidth: 3
                }}
                initialValue={item.present}
                color={argonTheme.COLORS.SUCCESS}
                label=""
              />
            : null
          }
        </Block>
      </TouchableWithoutFeedback>
    </Block>
  );
}

CardStudent.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 0
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  cardHeader: {
    paddingBottom: 7
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  cardCheckbox: {
    paddingTop: theme.SIZES.BASE / 2,
    paddingRight: theme.SIZES.BASE / 2,
    marginLeft: -(width / 3)
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
    width: 100,
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 100,
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default withNavigation(CardStudent);