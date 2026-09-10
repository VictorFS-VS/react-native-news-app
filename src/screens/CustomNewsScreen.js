import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import {
    useNavigation,
    useRoute,
  } from "@react-navigation/native";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import {
    useDispatch,
    useSelector,
  } from "react-redux";
  import { toggleFavorite } from "../redux/favoritesSlice";
  
  export default function CustomNewsScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();
  
    const { article } = route.params || {};
  
    const favoriteArticles = useSelector(
      (state) =>
        state.favorites.favoriteArticles || []
    );
  
    if (!article) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>
            No Article Details Available
          </Text>
  
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.errorBackButton}
          >
            <Text style={styles.errorBackButtonText}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  
    const isFavourite = favoriteArticles.some(
      (item) =>
        item.idArticle === article.idArticle
    );
  
    const handleToggleFavorite = () => {
      dispatch(toggleFavorite(article));
    };
  
    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        testID="scrollContent"
      >
        {/* Article Image */}
        <View
          style={styles.imageContainer}
          testID="imageContainer"
        >
          {article.image ? (
            <Image
              source={{ uri: article.image }}
              style={styles.articleImage}
            />
          ) : (
            <View style={styles.noImageContainer}>
              <Text style={styles.noImageText}>
                No Image Available
              </Text>
            </View>
          )}
        </View>
  
        {/* Top Buttons */}
        <View
          style={styles.topButtonsContainer}
          testID="topButtonsContainer"
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.buttonText}>
              Back
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={handleToggleFavorite}
            style={styles.favoriteButton}
          >
            <Text style={styles.favoriteIcon}>
              {isFavourite ? "♥" : "♡"}
            </Text>
          </TouchableOpacity>
        </View>
  
        {/* Article Details */}
        <View
          style={styles.contentContainer}
          testID="contentContainer"
        >
          <Text style={styles.articleTitle}>
            {article.title}
          </Text>
  
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              Content
            </Text>
  
            <Text style={styles.contentText}>
              {article.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF",
      flex: 1,
    },
  
    scrollContent: {
      paddingBottom: 30,
    },
  
    imageContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
  
    articleImage: {
      width: wp(98),
      height: hp(50),
      borderRadius: 35,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      marginTop: 4,
      resizeMode: "cover",
    },
  
    noImageContainer: {
      width: wp(98),
      height: hp(35),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F3F4F6",
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
    },
  
    noImageText: {
      color: "#6B7280",
      fontSize: hp(2),
    },
  
    contentContainer: {
      paddingHorizontal: wp(4),
      paddingTop: hp(4),
    },
  
    articleTitle: {
      fontSize: hp(3),
      fontWeight: "bold",
      color: "#4B5563",
      marginBottom: hp(2),
    },
  
    sectionContainer: {
      marginBottom: hp(2),
    },
  
    sectionTitle: {
      fontSize: hp(2.5),
      fontWeight: "bold",
      color: "#4B5563",
      marginBottom: hp(1),
    },
  
    topButtonsContainer: {
      width: "100%",
      position: "absolute",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: hp(4),
    },
  
    backButton: {
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 50,
      marginLeft: wp(5),
      backgroundColor: "#FFFFFF",
      elevation: 3,
    },
  
    favoriteButton: {
      padding: 8,
      borderRadius: 50,
      marginRight: wp(5),
      backgroundColor: "#FFFFFF",
      elevation: 3,
    },
  
    buttonText: {
      color: "#111827",
      fontWeight: "600",
    },
  
    favoriteIcon: {
      fontSize: hp(3),
      color: "#EF4444",
    },
  
    contentText: {
      fontSize: hp(1.8),
      color: "#4B5563",
      lineHeight: hp(2.7),
    },
  
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
    },
  
    errorTitle: {
      fontSize: hp(2.5),
      color: "#4B5563",
      marginBottom: hp(2),
    },
  
    errorBackButton: {
      backgroundColor: "#4F75FF",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
  
    errorBackButtonText: {
      color: "#FFFFFF",
      fontWeight: "bold",
    },
  });