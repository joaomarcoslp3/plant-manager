import React, { useState } from 'react'
import { format, isBefore } from 'date-fns'
import { SvgFromUri } from 'react-native-svg'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { useNavigation, useRoute } from '@react-navigation/core'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { Text, View, StyleSheet, TouchableOpacity, Image, Platform, Alert } from 'react-native'

import { Button } from '../components'
import { colors, fonts } from '../styles'
import waterdrop from '../assets/waterdrop.png'
import { PlantsProps, savePlant } from '../libs/storage'

type Params = {
  plant: PlantsProps
}

export function PlantSave () {
  const [selectDateTime, setSelectDateTime] = useState(new Date)
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios')
  const { navigate } = useNavigation()
  const route = useRoute()
  const { plant } = route.params as Params

  function handleChangeTime (event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState)
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectDateTime(new Date())
      return Alert.alert('Escolha uma hora no futuro! ⏰')
    }

    if (dateTime) {
      setSelectDateTime(dateTime)
    }
  }

  function handleOpenDatetimePicker () {
    setShowDatePicker(oldState => !oldState)
  }

  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectDateTime
      })

      navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
        buttonTitle: 'Muito obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants'
      })
    } catch(err) {
      Alert.alert('Não foi possível salvar. 😥')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri={plant.photo} height={150} width={150} />

        <Text style={styles.plantName}> {plant.name} </Text>
        <Text style={styles.plantAbout}> {plant.about} </Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image source={waterdrop} style={styles.tipImage} />
          <Text style={styles.tipText}> {plant.water_tips} </Text>
        </View>

        <Text style={styles.alertLabel}>Escolha o melhor horário pode ser lembrado:</Text>
        
        {showDatePicker && 
          <DateTimePicker value={selectDateTime} mode='time' display='spinner' onChange={handleChangeTime} />
        }
        {Platform.OS === 'android' && (
          <TouchableOpacity onPress={handleOpenDatetimePicker} style={styles.datePickerButton}>
            <Text style={styles.datePickerText}>{`Mudar ${format(selectDateTime, 'HH:mm')}`}</Text>
          </TouchableOpacity>
        )}
        <Button label='Cadastrar planta' onPress={handleSave}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60
  },
  tipImage: {
    width: 56,
    height: 56
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify'
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5
  },
  datePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40
  },
  datePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text
  }
})
