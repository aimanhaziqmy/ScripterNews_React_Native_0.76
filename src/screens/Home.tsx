import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { colors, Tabs } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp, NewsData } from "../../type";
import { NEWS_API_KEY } from "../../config";
import Loader from "../components/Loader";

type Tab = typeof Tabs[number];

const CATEGORY_MAP: Record<Tab, string> = {
  General: "general",
  Business: "business",
  Entertainment: "entertainment",
  Health: "health",
  Science: "science",
  Sports: "sports",
  Technology: "technology",
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<NewsData[]>([]);
  const [selectedTab, setSelectedTab] = useState(Tabs[0]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    getData(1);
    setPage(1);
  }, [selectedTab]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  }

  useEffect(() => {
    if(page>1){
      getData(page);
    }
  }, [page]);

  const getData = async (page: number) => {
    try {
      setLoading(true);
      const category = CATEGORY_MAP[selectedTab];
      const url = `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=${perPage}&page=${page}&apiKey=${NEWS_API_KEY}`;
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await fetch(url, { headers, method: "GET" });
      const data = await response.json();
      if (data?.status === "ok") {
        setNews((prevNews) =>
          page === 1 ? data?.articles : [...prevNews, ...data?.articles]
        );
      }
    } catch (error) {
      console.log("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };
  const renderTabItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(item)}>
      <Text
        style={[styles.tabText, item === selectedTab && styles.tabTextActive]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderNewsCard = ({ item }: { item: NewsData }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('News', {item})}>
      {item?.urlToImage && <Image source={{ uri: item.urlToImage }} style={styles.image}  resizeMode="cover"/> }
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.description}>{item?.description}</Text>
        <Text style={styles.source}>Source : {item?.source?.name}</Text>
        <Text style={styles.publishedAt}>{new Date(item?.publishedAt).toDateString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Header />
      <View style={styles.tabView}>
        <FlatList
          data={Tabs}
          keyExtractor={(item) => item}
          renderItem={renderTabItem}
          horizontal
          contentContainerStyle={styles.tabContainer}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {loading && page === 1 ? (
        <Loader />
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderNewsCard}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.list}
          onEndReached={handleLoadMore}
          ListFooterComponent={
            <ActivityIndicator
              size="large"
              color={colors.gray}
              style={styles.indicatorStyle}
            />
          }
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  header: {
    backgroundColor: colors.black,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  headerTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  tabView: {
    marginVertical: 10,
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
    padding: 5,
  },
  tabTextActive: {
    backgroundColor: colors.blue,
    color: colors.white,
    padding: 5,
    borderRadius: 5,
  },
  publishedAt: {
    fontSize: 12,
    color: colors.gray,
  },
  indicatorStyle: {
    marginVertical: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  card: {
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
    backgroundColor: colors.white,
    padding: 10
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    marginBottom: 8
  },
  source: {
    fontSize: 12,
    color: colors.darkGray,
  }
});
