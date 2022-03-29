import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

const auth = getAuth()

export function useAuthentication() {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          setUser(user)
          try {
            const token = await user?.getIdToken()
            await AsyncStorage.setItem('accessToken', `Bearer ${token}`)
          } catch (e) {
            console.error(e)
          }
          setLoading(false)
        } else {
          // User is signed out
          setUser(undefined)
          await AsyncStorage.setItem('accessToken', `Bearer undefined`)
          setLoading(false)
        }
      }
    )

    return unsubscribeFromAuthStatusChanged
  }, [])

  return {
    user,
    loading,
  }
}
