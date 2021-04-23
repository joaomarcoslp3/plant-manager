import React, { useEffect, useState } from 'react'
import { pt } from 'date-fns/locale'
import { formatDistance } from 'date-fns'
import { View, StyleSheet, Image, Text, FlatList } from 'react-native'

import { colors, fonts } from '../styles'
import { Header, PlantCardSecondary } from '../components'
import { loadPlant, PlantsProps } from '../libs/storage'
import waterdrop from '../assets/waterdrop.png'
import { ScrollView } from 'react-native-gesture-handler'

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantsProps[]>([])
  const [loading, setLoading] = useState(true)
  const [nextWatered, setNextWatered] = useState<string>()

  useEffect(() => {
    async function loadStorageData () {
      const plantsStoraged = await loadPlant()

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(), 
        new Date().getTime(), 
        { locale: pt }
      )

      setNextWatered(`Não esqueça de regar a ${plantsStoraged[0].name} à aproximadamente ${nextTime}`)
      setMyPlants(plantsStoraged)
      setLoading(false)
    }
    loadStorageData()
  }, [])

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterdrop} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View>

      <ScrollView style={styles.plants} showsVerticalScrollIndicator={false}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>

        <FlatList 
          data={myPlants} 
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <PlantCardSecondary data={item} />
          )}  
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flex: 1}}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spotlightImage: {
    width: 60,
    height: 60
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20
  },
  plants: {
    flex: 1,
    width: '100%'
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  }
})
