import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native'

import api from '../services/api'
import { colors, fonts } from '../styles'
import { PlantsProps } from '../libs/storage'
import { EnviromentButton, Header, Load, PlantCardPrimary } from '../components'

interface EnviromentsProps {
  key: string
  title: string
}

export function PlantSelect () {
  const { navigate } = useNavigation()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [plants, setPlants] = useState<PlantsProps[]>([])
  const [enviromentSelected, setEnviromentSelected] = useState('all')
  const [enviroments, setEnviroments] = useState<EnviromentsProps[]>([])
  const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([])

  function handleEnviromentSelected(enviroment: string) {
    setEnviromentSelected(enviroment)

    if (enviroment === 'all') return setFilteredPlants(plants)

    const filtered = plants.filter(plant => 
        plant.environments.includes(enviroment)
    )
    setFilteredPlants(filtered)
  }

  async function getPlants () {
    const { data } = await api.get(`/plants?_sort=name&_order=asc&_page=${page}&_limit=8`)

    if(!data) return setLoading(true)
    if(page > 1) {
      setPlants(oldValue => [...oldValue, ...data])
      setFilteredPlants(oldValue => [...oldValue, ...data])
    } else {
      setPlants(data)
      setFilteredPlants(data)
    }
    setLoading(false)
    setLoadingMore(false)
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) return
    setLoadingMore(true)
    setPage(oldValue => oldValue + 1)
    getPlants()
  }

  function handlePlantSelect(plant: PlantsProps) {
    navigate('PlantSave', {plant})
  }

  useEffect(() => {
    async function getEnviroments () {
      const { data } = await api.get('plants_environments?_sort=title&_order=asc')
      setEnviroments([
        {
          key: 'all',
          title: 'Todos'
        },
        ...data
      ])
    }
    getEnviroments()
  }, [])
  
  useEffect(() => {
    getPlants()
  }, []) 

  if (loading) return <Load />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>
      <View>
        <FlatList 
          data={enviroments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnviromentButton 
              label={item.title} 
              active={item.key === enviromentSelected}
              onPress={() => handleEnviromentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList 
          data={filteredPlants}
          renderItem={({ item }) => (
            <PlantCardPrimary data={item} onPress={() => handlePlantSelect(item)}/>
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
          ListFooterComponent={
            loadingMore ?
            <ActivityIndicator color={colors.green}/>
            : <></>
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    paddingHorizontal: 30
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subtitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    lineHeight: 20,
    color: colors.heading
  },
  enviromentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  }
})
