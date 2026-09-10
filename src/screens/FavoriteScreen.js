import React from "react";

import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { useNavigation } from "@react-navigation/native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { toggleFavorite } from "../redux/favoritesSlice";

export default function FavoriteScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const favoriteArticlesList = useSelector(
    (state) =>
      state.favorites?.favoriteArticles || []
  );

  const handleRemoveFavorite = (article) => {
    dispatch(toggleFavorite(article));
  };

  const handleOpenArticle = (article) => {
    // Artículo normal de HomeScreen
    if (article.thumbnail) {
      navigation.navigate(
        "ArticleDetail",
        article
      );

      return;
    }

    // Artículo personalizado
    if (article.image) {
      navigation.navigate(
        "CustomNewsScreen",
        {
          article,
        }
      );
    }
  };

  // Lista vacía
  if (favoriteArticlesList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyHeart}>
          ♡
        </Text>

        <Text style={styles.emptyText}>
          No favorite articles yet!
        </Text>

        <Text style={styles.emptyDescription}>
          Open an article and tap the heart
          to save it here.
        </Text>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>
            Go back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View
        style={styles.headerContainer}
        testID="FavoriteArticles"
      >
        <Text style={styles.title}>
          My Favorite Articles
        </Text>

        <Text style={styles.counter}>
          {favoriteArticlesList.length}
          {favoriteArticlesList.length === 1
            ? " article"
            : " articles"}
        </Text>
      </View>

      {/* Botón volver */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>
          Go back
        </Text>
      </TouchableOpacity>

      {/* Lista */}
      <FlatList
        data={favoriteArticlesList}
        contentContainerStyle={
          styles.listContentContainer
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) =>
          item.idArticle
            ? String(item.idArticle)
            : String(index)
        }
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            {/* Abrir artículo */}
            <TouchableOpacity
              style={styles.articleContent}
              onPress={() =>
                handleOpenArticle(item)
              }
              activeOpacity={0.8}
            >
              {(item.thumbnail ||
                item.image) && (
                <Image
                  source={{
                    uri:
                      item.thumbnail ||
                      item.image,
                  }}
                  style={styles.articleImage}
                />
              )}

              <View style={styles.textContainer}>
                <Text
                  style={styles.articleTitle}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>

                {item.category && (
                  <Text style={styles.categoryText}>
                    {item.category}
                  </Text>
                )}

                {item.description && (
                  <Text
                    style={
                      styles.articleDescription
                    }
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                )}
              </View>
            </TouchableOpacity>

            {/* Quitar favorito */}
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() =>
                handleRemoveFavorite(item)
              }
            >
              <Text style={styles.removeHeart}>
                ♥
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  headerContainer: {
    marginTop: hp(4),
    marginHorizontal: wp(4),
    marginBottom: hp(1),
  },

  title: {
    fontSize: hp(3.5),
    fontWeight: "700",
    color: "#4B5563",
  },

  counter: {
    fontSize: hp(1.7),
    color: "#9CA3AF",
    marginTop: hp(0.5),
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(10),
    backgroundColor: "#F9FAFB",
  },

  emptyHeart: {
    fontSize: hp(8),
    color: "#9CA3AF",
    marginBottom: hp(1),
  },

  emptyText: {
    fontSize: hp(2.5),
    fontWeight: "600",
    color: "#4B5563",
    textAlign: "center",
  },

  emptyDescription: {
    fontSize: hp(1.8),
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: hp(1),
    marginBottom: hp(2),
  },

  backButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 7,

    marginTop: hp(1),
    marginBottom: hp(2),
    marginLeft: wp(4),

    width: 110,

    alignItems: "center",
  },

  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  listContentContainer: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(4),
  },

  cardContainer: {
    backgroundColor: "#FFFFFF",
    marginBottom: hp(2),
    padding: wp(3),
    borderRadius: 12,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    elevation: 3,
  },

  articleContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  articleImage: {
    width: wp(20),
    height: wp(20),
    maxWidth: 120,
    maxHeight: 120,
    borderRadius: 10,
    marginRight: wp(4),
    resizeMode: "cover",
  },

  textContainer: {
    flex: 1,
    paddingRight: 10,
  },

  articleTitle: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#4B5563",
    marginBottom: hp(0.5),
  },

  categoryText: {
    fontSize: hp(1.5),
    color: "#2563EB",
    marginBottom: hp(0.5),
  },

  articleDescription: {
    fontSize: hp(1.6),
    color: "#6B7280",
  },

  removeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#FEE2E2",
  },

  removeHeart: {
    fontSize: 25,
    color: "#EF4444",
  },
});