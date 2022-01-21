import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Colors } from '../../Theme'

import { Button, Title } from 'components'
// eslint-disable-next-line import/no-cycle
import { HomeStackParams } from 'navigators/HomeStack'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imageContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
  },
  text: {
    color: Colors.text,
  },
  link: {
    color: Colors.text,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconButton: {
    padding: 20,
    paddingVertical: 28,
  },
})

interface Props {
  title: string
  visible?: boolean
  onDone?: () => void
  onHome?: () => void
}

const NotificationModal: React.FC<Props> = ({ title, visible, onDone, onHome, children }) => {
  const { t } = useTranslation()
  const navigation = useNavigation<StackNavigationProp<HomeStackParams>>()
  const [modalVisible, setModalVisible] = useState<boolean>(true)

  useEffect(() => {
    if (visible !== undefined) {
      setModalVisible(visible)
    }
  }, [visible])

  const close = () => {
    setModalVisible(false)
  }

  const closeHome = () => {
    close()
    navigation.navigate('Home')
  }

  return (
    <Modal visible={modalVisible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={onHome || closeHome}>
            <Icon name="home" size={24} color={Colors.text}></Icon>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Title>{title}</Title>
          {children}
          <View style={styles.textContainer}>
            <Text style={styles.text}>Your</Text>
            <Text> </Text>
            <Text style={styles.link}>activity log</Text>
            <Text> </Text>
            <Text style={styles.text}>has been updated</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button title={t('Global.Done')} onPress={onDone || close}></Button>
        </View>
      </View>
    </Modal>
  )
}

export default NotificationModal
