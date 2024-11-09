import { SafeAreaView, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../constants'
import Logo from './Logo'

const Header = () => {
  return (
    <SafeAreaView>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
            <View style={styles.backButton}>
                <Text style={styles.backButtonText}>News</Text>
            </View>
            <Logo />
            <TouchableOpacity style={styles.signInView}>
                <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.black,
    },
    backButton: {},
    backButtonText: {
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    signInView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    signInText: {
        fontWeight: '500',
        marginRight: 5
    }
})