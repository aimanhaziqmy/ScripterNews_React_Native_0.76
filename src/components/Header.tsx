import { SafeAreaView, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../constants'
import Logo from './Logo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { HomeScreenNavigationProp } from '../../type'
interface Props {
    icon?: boolean;
}   

const Header = ({icon}: Props) => {

  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
            <View style={styles.backButton}>
                {
                    icon ? <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} /></TouchableOpacity> : (<Text style={styles.backButtonText}>News</Text>)
                }
            </View>
            <Logo />
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.signInView}>
                <Text style={styles.signInText}>Sign In</Text>
                <Ionicons name="person" size={18} color={colors.blue} />
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