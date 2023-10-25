
import * as Location from 'expo-location';



const apiCall = async () => {

  console.log("in ");
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    const locationData = await Location.getCurrentPositionAsync({});
   return locationData;
  }

  export const  GetCurrentLocation =()=>{

    return apiCall();

}