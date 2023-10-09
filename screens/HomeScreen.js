import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput,View,Text, ScrollView, ImageBackground, useWindowDimensions,TouchableOpacity } from 'react-native';
import {fetchLocations,fetchWeatherForecast} from '../API/weather'
import React, { useCallback, useEffect, useState } from 'react'

export default function App() {
  const { width:windowWidth, height:windowHeight}= useWindowDimensions();
  const [search, setSearch] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);


  // weather info 
  const [bgImg, setbgImg] = useState(require("../assets/night2.jpg"));



  
  const handelSerchCity =name=>{
    if (name!='') {
      fetchLocations({'cityName':name})

    } else {
      console.log('please fil the inputr text');
      
    }

  }


  // if(search && search.length>2)
  // fetchLocations({cityName: search}).then(data=>{
  //   // console.log('got locations: ',data);
  // })

  useEffect(() => {
    // Fetch data when the component mounts
    fetchLocations({ cityName: 'rabat' }) // Change 'rabat' to the city you want
      .then((res) => {
        setData(res);
        handelBackgroundImage(res.current.condition.text);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);
    // fetchWeatherForecast({'cityName':'Rabat','days':3})
    // console.log(data.current.cloud);

   const handelBackgroundImage =(state)=>{

     switch (state) {
       case 'Partly cloudy':
        setbgImg(require("../assets/night2.jpg"));

        break;
      case 'Sunny':
        setbgImg(require("../assets/sunny.jpg"));
        
        break;
        
        
      
      }
      


   }

  return (

    <>
    <StatusBar style="light" />
    <ScrollView horizontal pagingEnabled>
      <View style={{ width: windowWidth, height: windowHeight }}>
        <ImageBackground blurRadius={20} source={bgImg} style={{ flex: 1, }} />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          padding: 20,
        
        }}
      >
        <View style={styles.topInfoWrapper}>
          {data && (
            <>
              <Text style={styles.city}>{data.location.name}</Text>
              <Text style={styles.temparature}>{data.current.temp_c}°C</Text>
              <Text style={styles.weatherType}>{data.current.condition.text}</Text>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serchcontainer: {
    
    borderRadius: 100, // Rounded full, you can adjust the value as needed
    // Add any other styles you need here
  },topInfoWrapper: {
    flex: 1,
    marginTop: 160,
    justifyContent: 'space-between',
  },
  city: {
    color: '#fff',
    fontSize: 30,
    // fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  time: {
    color: '#fff',
    // fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  temparature: {
    color: '#fff',
    // fontFamily: 'Lato-Light',
    fontSize: 85,
  },
  weatherType: {
    color: '#fff',
    // fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 34,
    marginLeft: 10,
  },
});
