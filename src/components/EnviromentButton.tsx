import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { colors, fonts } from '../styles'

interface EnviromentButtonProps extends RectButtonProps {
  label: string
  active?: boolean
}

export function EnviromentButton ({ label, active = false, ...rest }:  EnviromentButtonProps) {
  return (
    <RectButton 
      style={[
        styles.container,
        active && styles.containerActive
      ]} 
      {...rest}
    >
      <Text 
        style={[
          styles.text,
          active && styles.textActive
        ]} 
      >
        {label}
      </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    height: 40,
    width: 76,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 5
  },
  containerActive: {
    backgroundColor: colors.green_light
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.text
  },
  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark
  }
})
