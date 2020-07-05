import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { argonTheme } from '../constants';

import Icon from "./Icon";

const { height } = Dimensions.get('screen');

function CardAbsence (props) {
    const { item, horizontal, style, handleIcon} = props;
    const cardContainer = [styles.card, styles.shadow, style];

  return (
    <Block row={horizontal} card flex style={cardContainer}>
        <Block flex space="between" style={styles.cardDescription}>
          <Block>
            <Block row space="between">
              <Text size={18}>Materia: {item.name_avr}</Text>
              {
              	item.show_trash
	            	? <TouchableWithoutFeedback onPress={() => handleIcon(item.id)}>
			              <Icon
			                name="support"
			                family="ArgonExtra"
			                size={15}
			                color={argonTheme.COLORS.ERROR}
			              />
		              </TouchableWithoutFeedback>
		            : null
              }
            </Block>
            <Block row space="between">
              <Text size={13}>Sección: {item.section}</Text>
              <Text size={13} color={argonTheme.COLORS.MUTED}>Código: {item.code}</Text>
            </Block>
            <Block row space="between">
              <Block row>
                <Text color={argonTheme.COLORS.ERROR}>Fecha ausente:</Text>
                <Text>{' '+item.date_absence}</Text>
              </Block>
              <Text>inf: {item.date_created}</Text>
            </Block>
          </Block>
        </Block>
    </Block>
  );
}

CardAbsence.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: height * 0.1,
    marginBottom: 0
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

export default CardAbsence;