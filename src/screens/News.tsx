import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  RootStackParamList,
  HomeScreenNavigationProp,
  NewsData,
} from "../../type";
import { RouteProp } from "@react-navigation/native";
import { colors } from "../constants";
import { NEWS_API_KEY } from "../../config";

type NewsScreenRouteProp = RouteProp<RootStackParamList, "News">;

const News = () => {
  const route = useRoute<NewsScreenRouteProp>();
  const { item } = route.params;
  const [trendingNews, setTrendingNews] = useState<NewsData[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    const fetchTrendingNews = async () => {
      try {
        const url = `https://newsapi.org/v2/top-headlines?category=entertainment&apiKey=${NEWS_API_KEY}&pageSize=10`;
        const response = await fetch(url);
        const data = await response.json();
        if (data?.status === "ok") {
          setTrendingNews(data?.articles);
        }
      } catch (error) {
        console.log("Error fetching trending news:", error);
      }
    };
    fetchTrendingNews();
  }, []);

  const renderTrendingNewsCard = ({ item }: { item: NewsData }) => (
    <TouchableOpacity
      style={styles.trendingCard}
      onPress={() => navigation.navigate("News", { item })}
    >
      {item?.urlToImage && (
        <Image
          source={{ uri: item.urlToImage }}
          style={styles.trendingImage}
          resizeMode="cover"
        />
      )}
      <Text style={styles.trendingTitle}>{item?.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Header icon={true} />
      <ScrollView style={{ marginBottom: 100 }}>
        {item?.urlToImage && (
          <Image
            source={{ uri: item.urlToImage }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.author}>
            By {item?.author || "Unknown Author"}
          </Text>
          <Text style={styles.publishedAt}>
            Published at : {new Date(item?.publishedAt).toDateString()}
          </Text>
          <Text style={styles.content}>{item?.content}</Text>
          <Text style={styles.recommendationTitle}>Trending News</Text>
          <FlatList
            data={trendingNews}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderTrendingNewsCard}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingList}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  author: {
    color: colors.darkGray,
  },
  publishedAt: {
    color: colors.darkGray,
  },
  content: {
    marginTop: 10,
  },
  recommendationTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
  },
  source: {
    color: colors.darkGray,
  },
  trendingTitle: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 12,
    padding: 10,
  },
  trendingImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  trendingList: {
    marginTop: 10,
  },
  trendingCard: {
    marginRight: 16,
    width: 150,
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 8,
    padding: 5,
  },
});
