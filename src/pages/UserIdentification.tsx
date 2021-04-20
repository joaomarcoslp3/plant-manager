import React, { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { Button } from '../components'
import { colors, fonts } from '../styles'

export function UserIdentification () {
  const [name, setName] = useState<string>('')
  const [isFilled, setIsFilled] = useState(false)
  const [error, setError] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const { navigate } = useNavigation()

  useEffect(() => {
    if (error){
      setError(false)
    }
  }, [name])
  
  function handleInputBlur () {
    setIsFocused(false)
    setIsFilled(!!name)
  }

  function handleInputFocus () {
    setIsFocused(true)
  }

  function handleInputChange (value: string) {
    setIsFilled(!!value)
    setName(value)
  }

  function handleSubmit () {
    if (!name) {
      setError(true) 
      return
    }
    navigate('Confirmation')
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  {error ? '😔' : isFilled ? '😄' : '😀'}
                </Text>
                
                <Text style={styles.title}>Como podemos {'\n'} chamar você?</Text>
              </View>

              <TextInput 
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green },
                  error && { borderColor: colors.red }
                ]} 
                placeholder={error ? 'Não esqueça do nome' : 'Digite um nome'}
                placeholderTextColor={error ? colors.red : colors.heading}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />

              <View style={styles.footer}>
                <Button label='Confirmar' onPress={handleSubmit} />
              </View> 
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    width: '100%'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center'
  },
  emoji: {
    fontSize: 44
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 32,
    marginTop: 24
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20
  }
})
