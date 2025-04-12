import { Button, StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { storage } from '../services/storage';

export default function Storage() {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setName(await storage.load("username") ?? "");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Async Storage Example</Text>
      <Text>Hello dear, {name || "anonymous"}</Text>

      <TextInput placeholder='Enter name' value={name} onChangeText={setName} />
      <Button title="Save" onPress={async () => {
        await storage.save("username", name)
      }}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
