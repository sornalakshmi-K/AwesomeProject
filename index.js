/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import VoiceToText from './src/Screens/Voice/VoiceToText';
AppRegistry.registerComponent(appName, () => VoiceToText);
