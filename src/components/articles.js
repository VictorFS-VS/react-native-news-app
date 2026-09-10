import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Articles({ categories, articles }) {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <ArticleCard
      item={item}
      index={index}
      navigation={navigation}
    />
  );

  return (
    <View>
      <Text style={styles.heading}>Latest News</Text>

      <View testID="articlesDisplay">
        <FlatList
          data={articles}
          keyExtractor={(item) => item.idArticle}
          renderItem={renderItem}
          numColumns={2}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
}

function ArticleCard({ item, index, navigation }) {
  return (
    <View style={styles.articleCard} testID="articleDisplay">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ArticleDetail", { ...item })
        }
      >
        <Image
          source={{ uri: item.thumbnail }}
          style={[
            styles.articleImage,
            {
              height: index % 3 === 0 ? hp(25) : hp(35),
            },
          ]}
        />

        <Text style={styles.articleText}>
          {item.title.length > 20
            ? item.title.slice(0, 20) + "..."
            : item.title}
        </Text>

        <Text style={styles.articleDescription}>
          {item.description.length > 40
            ? item.description.slice(0, 40) + "..."
            : item.description}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: hp(3),
    fontWeight: "bold",
    marginHorizontal: wp(4),
    marginTop: hp(2),
    marginBottom: hp(2),
    color: "#52525B",
  },

  articleCard: {
    flex: 1,
    marginHorizontal: wp(2),
    marginBottom: hp(2),
  },

  articleImage: {
    width: "100%",
    borderRadius: 15,
    resizeMode: "cover",
  },

  articleText: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#52525B",
    marginTop: hp(1),
  },

  articleDescription: {
    fontSize: hp(1.6),
    color: "#71717A",
    marginTop: hp(0.5),
  },
});