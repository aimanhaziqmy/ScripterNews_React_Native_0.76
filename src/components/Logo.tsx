import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import React from 'react'
import { colors } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { HomeScreenNavigationProp } from '../../type'

const Logo = ({height = 35, width = 100}: {height?: number, width?: number} = {height: 35, width: 100}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <TouchableOpacity style={styles.logoContainer} onPress={() => navigation.navigate('Home')}>
      <View style={styles.logoView}>
        <Image source={require('../assets/logo.png')} style={{width, height}}/>
      </View>
    </TouchableOpacity>
  )
}

export default Logo

const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    logoView: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 3,
        marginLeft: 5
    }
})