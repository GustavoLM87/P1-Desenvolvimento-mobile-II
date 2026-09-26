import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
 
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Button from '../components/Button';
 
type Props = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;
 
export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  function handleLogin() {
    if (!email || !password) {
      return;
    }
 
    navigation.replace('Home');
  }
 
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={require('../assets/Gemini_Generated_Image_18v3hc18v3hc18v3.png')}
          style={{ width: 1150, height: 600, alignSelf: 'center', marginBottom: 20 }}
        />
        <Text style={styles.title}>
        To-Do List
      </Text>
 
      <Text style={styles.subtitle}>
        Faça login para continuar
      </Text>
 
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
 
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
 
      <Button
        title="Entrar"
        onPress={handleLogin}
      />
    </ScrollView>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
 
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
 
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
 
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
}); 