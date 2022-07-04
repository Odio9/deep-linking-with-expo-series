import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Linking from "expo-linking";
export default function App() {

  const [data, setData] = useState(null);


  function handleDeepLink(event) {
    let data = Linking.parse(event.url);
    setData(data);
  }
  useEffect(() => {
      async function getInitialURL() {
        const initialUrl = await Linking.getInitialURL();
        if (initialUrl) setData(Linking.parse(initialUrl));
      }
      
    Linking.addEventListener("url", handleDeepLink);
    if (!data) {
      getInitialURL();
    }

    return () => {  
      Linking.removeEventListener("url");
    };

  }, []);

  return (
    <View style={styles.container}>
      <Text>
        {data ? JSON.stringify(data) : "DeepLink Navigation Youjoin"}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
