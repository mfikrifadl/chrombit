/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useTheme} from '@react-navigation/native';

const Splash = props => {
  const {colors} = useTheme();

  const checkToken = async () => {
    props.navigation.replace('MainApp');
  };

  useEffect(() => {
    setTimeout(() => {
      checkToken();
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ff5252" barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../../assets/transparent.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
        animation="fadeInUpBig">
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}>
          Stay Healty And Stay Safe
        </Text>
      </Animatable.View>
    </View>
  );
};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff5252',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Splash;
