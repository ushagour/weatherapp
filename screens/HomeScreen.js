import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image,View,Text, ScrollView, ImageBackground, useWindowDimensions,TextInput,Button,ActivityIndicator} from 'react-native';
import {fetchWeatherForecast,fetchLocationsCity,fetchLocationsCordins} from '../API/weather'
import React, { useCallback, useEffect, useState } from 'react'
import Moment from 'moment';
import {GetCurrentLocation} from '../API/LocationApi';
import * as Font from 'expo-font';
import Autocomplete from '../components/Autocomplete';


export default function App() {
  const { width:windowWidth, height:windowHeight}= useWindowDimensions();
  
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  // weather info 
  const [bgImg, setbgImg] = useState(null);

const handel_format_date=date=>{
  Moment.locale('en');
  return Moment(date).format('MMMM Do, YYYY H:mma')//basically you can do all sorts of the formatting and others
} 
  



 


  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
        'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
        'Lato-Italic': require('../assets/fonts/Lato-Italic.ttf')
        // Add more font definitions as needed
      });
    }
    loadFonts();

    GetCurrentLocation().then(locationData=>{
      
      
      let cords=[locationData.coords.latitude,locationData.coords.longitude];
   
      
      fetchLocationsCordins({ coordinates: cords }) // Change 'Madrid' to the city you want
      .then(res => {
        setData(res);
        handelBackgroundImage(res);
        setLoading(false); // Set loading state to false after data is fetched
      })
      .catch((err) => {
        // console.log(err);
        alert(err)
        setLoading(false); // Handle any errors and set loading state to false
      });
      
      
    })
 
  }, []); 
    

   const handelBackgroundImage =(res)=>{
    let state= res.current.condition.text;
    let stateUper = state.toUpperCase(state); 

    let text = stateUper.split(" ");

      if (text.includes('CLOUDY')) {
        setbgImg(require("../assets/cloudy.jpeg"));
      } else if (text.includes('SUNNY')) {
        setbgImg(require("../assets/sunny.jpg"));
      } else if (text.includes('RAIN')) {
        setbgImg(require("../assets/rainy.jpg"));
      } else if (text.includes('MIST')||text.includes('FOG')){
        setbgImg(require("../assets/mist.jpg"));
      }else{
        setbgImg(require("../assets/night2.jpg"));
      }
      


   }

  return (

    <>
    <StatusBar style="light" />
    {loading ? ( 
  <View style={{ flex: 1, justifyContent: "center"}}>

    <ActivityIndicator  size="large"  color="grey" />
  </View>
      ) : (

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

         <Autocomplete  backgroundColorFu={handelBackgroundImage} setdata={setData} setLoading={setLoading}/>

        
         <View style={styles.topInfoWrapper}>
           <View>        
              <Text style={styles.city}>{data.location.name} <Text style={styles.country}>-{data.location.country}</Text></Text>
              
              
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
              {data.current.wind_kph  }
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
                   width: (data.current.humidity /2),
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
      )}

  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },topInfoWrapper: {
    flex: 1,
    marginTop: 160,
    justifyContent: 'space-between',
  },
  city: {
    color: '#fff',
    fontSize: 40,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  country: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Lato-Italic',
  },
  time: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  temparature: {
    color: '#fff',
    fontFamily: 'Lato-Light',
    fontSize: 85,
  },
  weatherType: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
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
