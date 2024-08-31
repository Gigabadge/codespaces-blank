import React, { useState } from 'react';
import { Text, TextInput, Button, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // For token storage

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://your-server-ip:5000/api/auth/login', {
        email,
        password,
      });
      const token = res.data.token;
      // Optionally store token in AsyncStorage
      // await AsyncStorage.setItem('userToken', token);
      navigation.navigate('Dashboard', { token });
    } catch (error) {
      setLoading(false);
      const errorMsg = error.response?.data?.msg || 'Login failed. Please try again.';
      setError(errorMsg);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('http://your-server-ip:5000/api/auth/register', {
        email,
        password,
      });
      alert('User registered successfully!');
    } catch (error) {
      setLoading(false);
      const errorMsg = error.response?.data?.msg || 'Sign Up failed. Please try again.';
      setError(errorMsg);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />
      {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title="Login" onPress={handleLogin} />
          <View style={{ marginVertical: 10 }} />
          <Button title="Sign Up" onPress={handleSignUp} />
        </>
      )}
    </View>
  );
}
r