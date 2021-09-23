import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const CardProvinsi = ({item, index}) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.card}>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.containerHari}>
              <Text style={styles.textHari}>{index + 1}</Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <View style={styles.cardText}>
                <Text style={{color: '#fff'}}>
                  Provinsi : {item.attributes.Provinsi}
                </Text>
                <Text style={{color: '#fff'}}>
                  Positif : {item.attributes.Kasus_Posi}
                </Text>
                <Text style={{color: '#fff'}}>
                  Sembuh : {item.attributes.Kasus_Semb}
                </Text>
                <Text style={{color: '#fff'}}>
                  Meninggal : {item.attributes.Kasus_Meni}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardProvinsi;

const styles = StyleSheet.create({
  containerHari: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 10,
  },
  textHari: {
    fontSize: 25,
    // fontWeight: 'bold',
  },
  card: {
    padding: 10,
    backgroundColor: '#ff5252',
    marginBottom: 10,
    marginLeft: '2%',
    width: '96%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  cardText: {
    fontSize: 15,
  },
  cardContainer: {
    alignItems: 'center',
  },
});
