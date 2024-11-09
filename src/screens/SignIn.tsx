import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Header from '../components/Header'
import Logo from '../components/Logo'
import { colors } from '../constants'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hidePassword, setHidePassword] = useState(true)

  const handleSignIn = () => {
    console.log('Sign in with', email, password)
  }

  return (
    <View style={styles.container}>
      <Logo width={200} height={50}/>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={hidePassword}
      />
      <TouchableOpacity style={{alignSelf: 'flex-start'}} onPress={() => setHidePassword(!hidePassword)}>
        <Text style={styles.hidePassword}>{hidePassword ? 'Show' : 'Hide'} Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.register, {alignSelf: 'flex-start'}]}>
        <Text style={styles.registerText}>Dont have an account ? Register Now</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    marginBottom: 25,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  hidePassword: {
    marginBottom: 10,
    fontSize: 12,
    textAlign: 'left',
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    borderRadius: 3
    
  },
  button: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',

  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    width: '100%',
  },
  register: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'left',
  },
  registerText: {
    color: colors.blue,
    
  }
})
