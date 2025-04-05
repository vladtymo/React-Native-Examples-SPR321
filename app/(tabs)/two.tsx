import { Alert, Button, StyleSheet, Switch, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';
import React from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'
import { useForm, Controller } from "react-hook-form"

type FormData = {
  email: string;
  lang: string;
  accept: boolean;
};

export default function TabTwoScreen() {

  const {
    control,
    handleSubmit
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      lang: "js",
      accept: false,
    },
  })
  const onSubmit = (data: FormData) => {
    Alert.alert("Form Data", `Data: ${data.email} - ${data.lang}`)
    console.log("Form Data", data);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create New Product</Text>

      <Text>Your email:</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ ...styles.input, ...styles.text }}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <DateTimePicker value={new Date()} mode="date" />
      <DateTimePicker value={new Date()} mode="time" />

      <Text>Select your favourite lang:</Text>
      <Controller
        control={control}
        name="lang"
        render={({ field: { onChange, onBlur, value } }) => (
          <Picker
            style={styles.text}
            selectedValue={value}
            onValueChange={onChange}>
            <Picker.Item label="Select a language..." value="" enabled={false} />
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="Python" value="py" />
            <Picker.Item label="Ruby" value="rb" />
            <Picker.Item label="Perl" value="pl" />
            <Picker.Item label="Kotlin" value="kot" />
            <Picker.Item label="PHP" value="php" />
          </Picker>
        )}
      />

      <Text>Accept policy:</Text>
      <Controller
        control={control}
        name="accept"
        render={({ field: { onChange, onBlur, value } }) => (
          <Switch
            onValueChange={onChange}
            value={value} />
        )}
      />

      <Button title='Submit' onPress={handleSubmit(onSubmit)}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  text: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center'
  },
  input: {
    backgroundColor: "lightgray",
    padding: 10,
    minWidth: 200,
    color: 'white',
    fontSize: 18,
  }
});
