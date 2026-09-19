import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
          
          <Text style={styles.title}>Welcome back!</Text>
          
          {user?.name && <Text style={styles.name}>{user.name}</Text>}
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color="#FFF" style={styles.icon} />
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  container: { flex: 1, padding: 24, justifyContent: 'space-between' },
  profileCard: { 
    backgroundColor: '#FFF', borderRadius: 16, padding: 24, 
    alignItems: 'center', marginTop: 40,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 3
  },
  avatarCircle: { 
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#007AFF', 
    justifyContent: 'center', alignItems: 'center', marginBottom: 16 
  },
  avatarText: { fontSize: 32, color: '#FFF', fontWeight: 'bold' },
  title: { fontSize: 16, color: '#666', marginBottom: 8 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 4 },
  email: { fontSize: 16, color: '#666' },
  button: { 
    backgroundColor: '#FF3B30', borderRadius: 12, height: 56, 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', 
    marginBottom: 20 
  },
  icon: { marginRight: 8 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});
