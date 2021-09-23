import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Splash, Home, Provinsi} from '../screens';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = props => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      setRole(await AsyncStorage.getItem('role'));
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" size={wp('5%')} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Provinsi"
        component={Provinsi}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="content-paste" size={wp('5%')} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'Splash'}
          options={{headerShown: false}}
          component={Splash}
        />
        <Stack.Screen
          name={'MainApp'}
          component={MainApp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Home'}
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name={'Provinsi'} component={Provinsi} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
