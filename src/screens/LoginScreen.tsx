import React, { useState, useContext } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  KeyboardAvoidingView, Platform, SafeAreaView 
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }: any) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setError('');
    
    // validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }
    
    // check password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // mock bad credentials
    if (password !== 'password123') {
      setError('Incorrect credentials');
      return;
    }

    login(email);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.form}>
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  header: { marginBottom: 40 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666' },
  form: { width: '100%' },
  inputContainer: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', 
    borderRadius: 12, marginBottom: 16, paddingHorizontal: 16,
    borderWidth: 1, borderColor: '#E5E5E5', height: 56
  },
  icon: { marginRight: 12 },
  input: { flex: 1, height: '100%', fontSize: 16, color: '#1A1A1A' },
  eyeIcon: { padding: 8 },
  button: { 
    backgroundColor: '#007AFF', borderRadius: 12, height: 56, 
    justifyContent: 'center', alignItems: 'center', marginTop: 8 
  },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  footer: { 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 32 
  },
  footerText: { color: '#666', fontSize: 15 },
  link: { color: '#007AFF', fontSize: 15, fontWeight: '600' },
  error: { 
    color: '#FF3B30', backgroundColor: '#FFEBEB', padding: 12, 
    borderRadius: 8, marginBottom: 16, overflow: 'hidden', textAlign: 'center' 
  },
});
