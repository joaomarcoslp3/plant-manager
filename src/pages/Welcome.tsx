import React from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { Feather } from '@expo/vector-icons'

import wateringImage from '../assets/watering.png'
import { colors, fonts } from '../styles'

export const Welcome = () => {
  const { navigate } = useNavigation()

  function handleStart () {
    navigate('UserIdentification')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Gerencie {'\n'} suas plantas de {'\n'} forma fácil</Text>

        <Image source={wateringImage} style={styles.image} resizeMode='contain' />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.
        </Text>

        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleStart}>
          <Feather name='chevron-right' style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    marginTop: 38,
    lineHeight: 34,
    fontFamily: fonts.heading,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56
  },
  image: {
    height: Dimensions.get('window').width * 0.7
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 32
  }
})
