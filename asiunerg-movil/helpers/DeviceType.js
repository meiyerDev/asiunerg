import { Platform } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const isIOS = Platform.OS === 'ios';

export default function() {
  const statusBarHeight = isIOS ? ifIphoneX(44, 20) : 0;
  const navBarHeight = isIOS ? 44 : 56;
  const headerHeight = statusBarHeight + navBarHeight;
  return {
    offset: headerHeight,
    behavior: isIOS ? 'padding' : ''
  };
}