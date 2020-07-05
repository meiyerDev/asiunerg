import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { argonTheme } from '../constants';

import Icon from "./Icon";

const { height } = Dimensions.get('screen');

function CardTheirAbsence (props) {
    const { item, horizontal, style} = props;
    const cardContainer = [styles.card, styles.shadow, style];

  return (
    <Block row={horizontal} card flex style={cardContainer}>
        <Block flex space="between" style={styles.cardDescription}>
          <Block>
            <Block row space="between">
              <Text size={18}>Nombre: {item.name}</Text>
            </Block>
            <Block>
              <Text size={13}>Materia: {item.matter}</Text>
              <Text size={13}>Código: {item.code}</Text>
            </Block>
            <Block row space="between">
              <Block row>
                <Text color={argonTheme.COLORS.ERROR}>Fecha ausente:</Text>
                <Text>{' '+item.date_asistent}</Text>
              </Block>
            </Block>
          </Block>
          {/*<Block flex style={{ marginTop: 13, marginVertical: 8 }}>
            <Block style={{ borderColor: "rgba(0,0,0,0.2)", width: '100%', borderWidth: StyleSheet.hairlineWidth }}/>
          </Block>
          { active
            ? <Block row>
                <Text color={argonTheme.COLORS.ERROR}>Motivo:</Text>
                <Text>{' '+item.reason}</Text>
              </Block>
            : null
          }
          <Block right>
            <TouchableWithoutFeedback onPress={() => setActive(!active)}>
              <Text size={12} color={argonTheme.COLORS.ACTIVE} bold>
              { !active
                ? 'Ver motivo'
                : 'Ocultar motivo'
              }</Text>
            </TouchableWithoutFeedback>
          </Block>*/}
        </Block>
    </Block>
  );
}

CardTheirAbsence.propTypes = {
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

export default CardTheirAbsence;