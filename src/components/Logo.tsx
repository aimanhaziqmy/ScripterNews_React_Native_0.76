import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import React from 'react'
import { colors } from '../constants'

const Logo = () => {
  return (
    <TouchableOpacity style={styles.logoContainer}>
      <View style={styles.logoView}>
        <Image source={require('../assets/logo.png')} style={{width: 100, height: 35}}/>
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