import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { get } from '../api'
import endpoints from '../api/endpoints'

import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'

const WineriesScreen = ({ navigation }: RootTabScreenProps<'Wineries'>) => {
  const [wineries, setWineries] = useState([])

  useEffect(() => {
    const fetchWineries = async () => {
      try {
        const res = await get(endpoints.getWineries)
        if (res?.data) {
          setWineries(res.data)
        }
      } catch (error) {
        console.log('fetchWineries Error -', error)
      }
    }
    fetchWineries()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wineries</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <View style={styles.wineriesContainer}>
        {wineries.map(
          (
            winery: any // TODO Type Winery
          ) => (
            <View
              key={winery.id}
              darkColor='rgba(255,255,255,0.1)'
              lightColor='#eee'
              style={styles.cardContainer}
            >
              <Text style={styles.cardTitle}>{winery.name}</Text>
              <Text>{winery.location}</Text>
            </View>
          )
        )}
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  wineriesContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 70,
    borderRadius: 8,
    padding: 4,
    margin: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
})

export default WineriesScreen
