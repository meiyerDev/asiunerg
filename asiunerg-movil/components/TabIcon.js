import React from 'react';

import argonTheme from '../constants/Theme';
import Icon from "./Icon";

export function TabBarIcon(props) {
  const { focused, name } = props;
  return (
    <Icon
      name={name}
      family="ArgonExtra"
      size={25}
      color={focused ? argonTheme.COLORS.PRIMARY : argonTheme.COLORS.BLACK}
    />
	);
}
