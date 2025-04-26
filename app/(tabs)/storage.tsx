import { Button, FlatList, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { storage } from '../services/storage';
import { addColor, getColors } from '../services/db';
import * as schema from '../../db/schema';
import { useORM } from '../services/orm';

export default function Storage() {
  const [name, setName] = useState<string>("");
  const [colors, setColors] = useState<schema.Color[]>([]);

  const { addColor, getColors } = useORM();

  useEffect(() => {
    loadData();
    loadColors();
  }, []);

  const loadData = async () => {
    setName(await storage.load("color") ?? "");
  }
  const loadColors = async () => {
    // setColors(await getColors() ?? []);
    setColors(await getColors() ?? []);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Async Storage Example</Text>
      <Text>Hello dear, {name || "anonymous"} person</Text>

      <TextInput placeholder='Enter name' value={name} onChangeText={setName} />
      <Button title="Save" onPress={async () => {
        await storage.save("color", name)
        // await addColor(name);
        await addColor(name);
        loadColors();
      }}></Button>

      <FlatList
        data={colors}
        renderItem={(i) => <Text>[{i.item.id}] - {i.item.name}</Text>}
        keyExtractor={(i) => i.id.toString()} />
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
