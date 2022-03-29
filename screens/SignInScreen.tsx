import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { View, Text } from '../components/Themed'

const auth = getAuth()

const SignInScreen = () => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: '',
  })

  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.',
      })
      return
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password)
    } catch (error: any) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      {!!value.error && (
        <View>
          <Text>{value.error}</Text>
        </View>
      )}

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder='Email'
          value={value.email}
          onChangeText={(text: string) => setValue({ ...value, email: text })}
        />

        <TextInput
          style={styles.input}
          placeholder='Password'
          value={value.password}
          onChangeText={(text: string) =>
            setValue({ ...value, password: text })
          }
          secureTextEntry={true}
        />

        <Button style={styles.button} title='Sign in' onPress={signIn} />
      </View>
    </View>
  )
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
  formContainer: {
    width: 250,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    padding: 8,
  },
  button: { marginTop: 20 },
})

export default SignInScreen
