import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'

const auth = getAuth()

export function useAuthentication() {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(false)

  console.log('user', user)

  useEffect(() => {
    setLoading(true)
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUser(user)
          setLoading(false)
        } else {
          // User is signed out
          setUser(undefined)
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
