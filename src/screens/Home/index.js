/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Axios from 'axios';
import React, {useState, useEffect, useCallback} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const Home = props => {
  const [dirawat, setDirawat] = useState('');
  const [meninggal, setMeninggal] = useState('');
  const [positif, setPositif] = useState('');
  const [sembuh, setSembuh] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState({});

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      getData();
      setIsLoading(false);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  const getData = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    try {
      const res = await Axios.get('https://api.kawalcorona.com/indonesia');
      setIsLoading(true);
      setDirawat(res.data[0].dirawat);
      setMeninggal(res.data[0].meninggal);
      setPositif(res.data[0].positif);
      setSembuh(res.data[0].sembuh);
      setData({
        labels: ['Dirawat', 'Meninggal', 'Positif', 'Sembuh'],
        datasets: [
          {
            data: [
              parseInt(res.data[0].dirawat.replace(/,/g, '')),
              parseInt(res.data[0].meninggal.replace(/,/g, '')),
              parseInt(res.data[0].positif.replace(/,/g, '')),
              parseInt(res.data[0].sembuh.replace(/,/g, '')),
            ],
          },
        ],
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      alert('gagal');
      setIsLoading(false);
    }
  };

  if (isLoading === true) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#009387" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.header}>
          <Text
            style={{fontSize: 20, fontWeight: 'bold', marginBottom: hp('2%')}}>
            Data Covid Indonesia
          </Text>
          {dirawat !== '' && (
            <BarChart
              // style={graphStyle}
              data={data}
              width={wp('80%')}
              height={220}
              yAxisLabel=""
              chartConfig={{
                backgroundGradientFrom: '#ff5252',
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: '#ff5252',
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 1) => '#ff5252',
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.5,
                useShadowColorFromDataset: false,
              }}
              verticalLabelRotation={30}
            />
          )}
          <View style={styles.rowHeader}>
            <TouchableOpacity
              style={[styles.buttonHeader, {backgroundColor: '#fd6768'}]}>
              <Text style={styles.textHeader}>Dirawat</Text>
              <View style={styles.icon}>
                <Text>{dirawat}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonHeader, {backgroundColor: '#109da4'}]}>
              <Text style={styles.textHeader}>Sembuh</Text>
              <View style={styles.icon}>
                <Text>{sembuh}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rowHeader}>
            <TouchableOpacity
              style={[styles.buttonHeader, {backgroundColor: '#f0981a'}]}>
              <Text style={styles.textHeader}>Meninggal</Text>
              <View style={styles.icon}>
                <Text>{meninggal}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonHeader, {backgroundColor: '#48294b'}]}>
              <Text style={styles.textHeader}>Positif</Text>
              <View style={styles.icon}>
                <Text>{positif}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 10,
  },
  header: {
    width: wp('100%'),
    alignItems: 'center',
    padding: 20,
  },
  rowHeader: {
    flexDirection: 'row',
  },
  buttonHeader: {
    width: wp('40%'),
    height: hp('20%'),
    borderRadius: 20,
    margin: wp('3%'),
  },
  icon: {
    backgroundColor: 'white',
    width: wp('20%'),
    height: wp('20%'),
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    color: 'white',
    marginLeft: 10,
    marginTop: 10,
    fontSize: 20,
  },
  footer: {
    width: wp('100%'),
    // alignItems: 'center',
    paddingHorizontal: wp('4%'),
  },
  rowFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerContentFooter: {
    backgroundColor: 'white',
    width: wp('85%'),
    flexDirection: 'row',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
  },
  boxFooter: {
    width: wp('28%'),
    height: wp('28%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 2,
    borderRightColor: '#f4f4f4',
  },
  circleContent: {
    backgroundColor: '#2e3850',
    width: wp('12%'),
    height: wp('12%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  circleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  containerContentFooter2: {
    backgroundColor: 'white',
    width: wp('85%'),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopWidth: 2,
    borderTopColor: '#f4f4f4',
    flexDirection: 'row',
  },
  boxFooter2: {
    width: wp('28%'),
    height: wp('28%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 2,
    borderRightColor: '#f4f4f4',
  },
});

export default Home;
