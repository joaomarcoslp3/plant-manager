import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native'
import { colors, fonts } from '../styles'

interface ButtonProps extends TouchableOpacityProps {
  label: string
}

export function Button (props: ButtonProps) {
  return (
    <TouchableOpacity  style={styles.container} activeOpacity={0.7} {...props} >
      <Text style={styles.text}>{props.label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading
  }
})
