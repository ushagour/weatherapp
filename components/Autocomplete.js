import React, { useState, useEffect } from 'react';
import { StyleSheet,View, Text, TextInput, FlatList,TouchableOpacity } from 'react-native';
import {fetchWeatherForecast,fetchLocationsCity} from '../API/weather'
import { EvilIcons } from '@expo/vector-icons'; 

const Autocomplete = (props) => {
  const [search, setSearch] = useState(null);
  const [suggestions, setsuggestions] = useState([]);

  const handelSerchCity= ()=>{
    
    if(search && search.length>2){
      props.setLoading(true);
      fetchLocationsCity({cityName: search}).then(res=>{

        if (res.current) {
          // Valid city name exists in the response
          setsuggestions(res);
          props.setdata(res);
          props.backgroundColorFu(res);
          setSearch(" ");
          props.setLoading(false);
        } else {
          // City name is undefined or empty in the response
          alert("Error: City not found or invalid city name.");
          props.setLoading(false);
        }

    })
      .catch((err) => {
        alert(err)
        props.setLoading(false);
      });
    }


  }


  return (
<View style={styles.SearchWrapper}>
<TextInput style={styles.input} placeholder="Location"  placeholderTextColor="white"  value={search} onChangeText={text=>setSearch(text)}/>

     
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.location.name}</Text>
        )}
      />

<TouchableOpacity onPress={handelSerchCity}>
  <View style={styles.addWrapper}>
  <EvilIcons  style={styles.TextAdd} name="search" size={25}  />
  </View>
</TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  
  SearchWrapper: {
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection:'row',
    marginTop: 30,
    justifyContent:'space-around',
    alignItems:"center",
    
  },
input:{
  paddingVertical:15,
  paddingHorizontal:15,
  width:250,
  backgroundColor: 'rgba(0,0,0,0.3)', // 40% opaque
  color: 'white',
  borderRadius:60,
  borderColor:"#C0C0C0",
  borderWidth:1,
},addWrapper:{
  height:50,
  width:50,
  borderRadius:60,
  backgroundColor: 'rgba(0,0,0,0.3)', // 40% opaque
  justifyContent:"center",
  alignItems:"center",
  borderColor:"#C0C0C0",
  borderWidth:1,
},
TextAdd:{
  color: 'white',
},});

export default Autocomplete;


