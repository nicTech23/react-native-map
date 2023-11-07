import React, { useState } from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function App() {
  const [pin, setPin]= useState({
          latitude: 37.78825,
          longitude: -122.4324,
  })

  const [region, setRegion]=useState({
    latitude:0.0922,
    longitude:0.0421
  })
  return (
    <View style={styles.container}>
  
  
      <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby:"distance"
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          })
          console.log(data, details);
        }}
        query={{
          key: 'AIzaSyA0FOoW5uimqkgHHuKrNSpHzFD27fnrxk0',
          language: 'en',
          components:"country:gh",
          type:"establishment"
        }}
        styles={{
          container:{flex:0, position:'absolute', width:"100%", zIndex:1},
          listView:{
            backgroundColor:'white'
          }
        }}
      />
  

      <MapView style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider='google'
       
      >
        <Marker coordinate={{
          latitude:region.latitude,
          longitude:region.longitude
        }}/>
        <Marker 
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          draggable={true}
          pinColor='blue'
          onDragStart={(e)=>{
            console.log(e.nativeEvent.coordinate )
          }}
          onDragEnd={(e)=>{
            setPin({
              latitude:e.nativeEvent.coordinate.latitude,
              longitude:e.nativeEvent.coordinate.longitude,
            })
          }}
        >
          <Callout>
            <Text>I am me</Text>
          </Callout>
        </Marker>

        <Circle center={
          pin
        } radius={1000}>

        </Circle>

        

      </MapView>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50
  },
  map: {
    width: '100%',
    height: '100%',
  },
});