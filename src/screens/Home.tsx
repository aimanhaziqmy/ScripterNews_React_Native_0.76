import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import Header from '../components/Header'
import { colors, Tabs } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { HomeScreenNavigationProp, NewsData } from '../../type'

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<NewsData[]>([]);
  const [selectedTab, setSelectedTab] = useState(Tabs[0]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const  navigation = useNavigation<HomeScreenNavigationProp>();

  const renderTabItem = ({item}: {item:string}) => (
    <TouchableOpacity style={styles.tab}>
      <Text style={styles.tabText}>{item}</Text>
    </TouchableOpacity>
  )
  return (
    <View>
      <Header />
      <View style={styles.tabView}>
        <FlatList data={Tabs} keyExtractor={(item) => item} renderItem={renderTabItem} horizontal contentContainerStyle={styles.tabContainer}
          showsHorizontalScrollIndicator={false}/>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  headerTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1
  },
  tabView: {
    marginVertical: 10
  },
  tabContainer: {
    paddingHorizontal: 16,
  },
  tab: {
    marginRight: 20,
  },
  tabText: {
    color: colors.blue,
    fontSize: 16,
  },
  tabTextActive: {
    color: colors.white

  }
})