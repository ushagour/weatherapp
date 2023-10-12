import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image,View,Text, ScrollView, ImageBackground, useWindowDimensions,TouchableOpacity } from 'react-native';
import {fetchLocations,fetchWeatherForecast} from '../API/weather'
import React, { useCallback, useEffect, useState } from 'react'
import * as Font from 'expo-font';
import Moment from 'moment';

export default function App() {
  const { width:windowWidth, height:windowHeight}= useWindowDimensions();
  const [search, setSearch] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);


  // weather info 
  const [bgImg, setbgImg] = useState(require("../assets/night2.jpg"));

const handel_format_date=date=>{
  console.log(date);
  Moment.locale('en');

  return Moment(date).format('MMMM Do, YYYY H:mma')//basically you can do all sorts of the formatting and others
} 
  
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
    fetchLocations({ cityName: 'Madrid' }) // Change 'rabat' to the city you want
      .then((res) => {
        setData(res);
        handelBackgroundImage(res.current.condition.text);
        // console.log(data.current.condition.icon);
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
   
   
      


   <View style={{width: windowWidth, height: windowHeight}}>
   {data && (
            <>

     <ImageBackground
       source={bgImg}
       blurRadius={5} 

       style={{
         flex: 1,
       }}>
       <View
         style={{
           flex: 1,
           backgroundColor: 'rgba(0,0,0,0.3)',
           padding: 20,
         }}>
         <View style={styles.topInfoWrapper}>
           <View>        
              <Text style={styles.city}>{data.location.name}</Text>
              
              <Text style={styles.time}>{handel_format_date(data.location.localtime)}</Text>
      
           </View>
           <View>
          
           <Text style={styles.temparature}>{data.current.temp_c}°C</Text>
            
             <View style={{flexDirection: 'row'}}>
            
              <Image source={{uri:"https:"+data.current.condition.icon,width:50,height:50 }}/>
        
               <Text style={styles.weatherType}>{data.current.condition.text}</Text>
          
             </View>
           </View>
         </View>
         <View
           style={{
             borderBottomColor: 'rgba(255,255,255,0.7)',
             marginTop: 20,
             borderBottomWidth: 1,
           }}
         />
         <View style={styles.bottomInfoWrapper}>
           <View style={{alignItems: 'center'}}>
             <Text style={styles.infoText}>Wind</Text>
             <Text style={[styles.infoText, {fontSize: 24}]}>
              {data.current.wind_degree  }
             </Text>
             <Text style={styles.infoText}>km/h</Text>
             <View style={styles.infoBar}>
                 
               <View
                 style={{
                   width: data.current.wind_kph /2,
                   height: 5,
                   backgroundColor: '#69F0AE',
                 }}
               />
                  
             </View>
           </View>
           <View style={{alignItems: 'center'}}>
             <Text style={styles.infoText}>Rain</Text>
             <Text style={[styles.infoText, {fontSize: 24}]}>
               {data.current.precip_in}
             </Text>
             <Text style={styles.infoText}>%</Text>
             <View style={styles.infoBar}>
               <View
                 style={{
                   width: data.current.precip_in / 2,
                   height: 5,
                   backgroundColor: '#F44336',
                 }}
               />
             </View>
           </View>
           <View style={{alignItems: 'center'}}>
             <Text style={styles.infoText}>Humidity</Text>
             <Text style={[styles.infoText, {fontSize: 24}]}>
               {data.current.humidity}
             </Text>
             <Text style={styles.infoText}>%</Text>
             <View style={styles.infoBar}>
               <View
                 style={{
                   width: data.current.humidity / 2,
                   height: 5,
                   backgroundColor: '#F44336',
                 }}
               />
             </View>
           </View>
         </View>
       </View>
     </ImageBackground>
          </>
          )}
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
    lineHeight: 30,
  },infoBar: {
    width: 45,
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  indicatorWrapper: {
    position: 'absolute',
    top: 140,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalDot: {
    height: 5,
    width: 5,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  }, infoText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },bottomInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  
});
