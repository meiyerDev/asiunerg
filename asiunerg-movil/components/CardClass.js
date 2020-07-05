import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { argonTheme } from '../constants';

const { width } = Dimensions.get('screen');

function Card (props) {
  const { item, horizontal, style, ctaColor, handleNavigateToClass } = props;
  
  
  const cardContainer = [styles.card, styles.shadow, style];

  return (
    <Block row={horizontal} card fluid flex style={cardContainer}>
      <TouchableWithoutFeedback
        onPress={() => handleNavigateToClass(item)}
      >
        <Block flex space="between" style={styles.cardDescription}>
          <Block>
              <Text size={16} style={styles.cardTitle,styles.cardHeader} bold>{item.matter.name}</Text>
              <Text>
                <Text size={12} bold>Tema: </Text>
                {item.theme}
              </Text>
              <Text size={12} style={styles.cardTitle}>
                <Text color={argonTheme.COLORS.ERROR} bold>Observación: </Text>
                {item.observation}
              </Text>
          </Block>
          <Block right>
            <Text size={12} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold>
              <Text color={argonTheme.COLORS.BLACK}>De fecha: </Text>
              {item.created_at}
            </Text>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    </Block>
  );
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  ctaColor: PropTypes.string,
  handleNavigateToClass: PropTypes.func
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    // marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6
  },
  cardHeader: {
    paddingBottom: 7
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default withNavigation(Card);