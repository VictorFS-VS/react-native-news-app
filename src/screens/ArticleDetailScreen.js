import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
  } from "react-native";
  import React from "react";
  
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  
  import { useNavigation } from "@react-navigation/native";
  import { useDispatch, useSelector } from "react-redux";
  import { toggleFavorite } from "../redux/favoritesSlice";
  
  export default function ArticleDetailScreen(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
  
    const article = props.route?.params;
  
    const favoriteArticles = useSelector(
      (state) => state.favorites?.favoriteArticles || []
    );
  
    // Por seguridad, verificamos que haya llegado el artículo
    if (!article) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Article details not available.
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
  
    // Verificamos si el artículo ya está guardado en favoritos
    const isFavourite = favoriteArticles.some(
      (item) =>
        String(item.idArticle) === String(article.idArticle)
    );
  
    const handleToggleFavorite = () => {
      dispatch(toggleFavorite(article));
    };
  
    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Imagen */}
        <View
          style={styles.imageContainer}
          testID="imageContainer"
        >
          {article.thumbnail ? (
            <Image
              source={{ uri: article.thumbnail }}
              style={styles.articleImage}
            />
          ) : (
            <View style={styles.noImageContainer}>
              <Text style={styles.noImageText}>
                No image available
              </Text>
            </View>
          )}
        </View>
  
        {/* Botones superiores */}
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>
              Back
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteButton,
              isFavourite && styles.favoriteButtonActive,
            ]}
            testID="favoriteButton"
          >
            <Text
              style={[
                styles.favoriteIcon,
                isFavourite && styles.favoriteIconActive,
              ]}
            >
              {isFavourite ? "♥" : "♡"}
            </Text>
          </TouchableOpacity>
        </View>
  
        {/* Contenido */}
        <View style={styles.contentContainer}>
          <View testID="articleTitle">
            <Text style={styles.articleTitle}>
              {article.title}
            </Text>
          </View>
  
          <View
            style={styles.articleDetailsContainer}
            testID="articleCategory"
          >
            <Text style={styles.articleCategory}>
              {article.category}
            </Text>
          </View>
  
          <View
            style={styles.sectionContainer}
            testID="sectionContainer"
          >
            <Text style={styles.sectionTitle}>
              Description
            </Text>
  
            <Text style={styles.descriptionText}>
              {article.description}
            </Text>
          </View>
  
          {/* Indicador visual */}
          <View style={styles.favoriteStatusContainer}>
            <Text style={styles.favoriteStatusText}>
              {isFavourite
                ? "♥ Saved in My Favorites"
                : "♡ Tap the heart to save this article"}
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
      paddingBottom: hp(5),
    },
  
    imageContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
  
    articleImage: {
      width: wp(98),
      height: hp(40),
      borderRadius: 20,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      marginTop: 4,
      resizeMode: "cover",
    },
  
    noImageContainer: {
      width: wp(98),
      height: hp(40),
      backgroundColor: "#E5E7EB",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
    },
  
    noImageText: {
      color: "#6B7280",
      fontSize: hp(2),
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
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 50,
      marginLeft: wp(5),
      backgroundColor: "#FFFFFF",
  
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowRadius: 5,
      shadowOffset: {
        width: 0,
        height: 2,
      },
  
      elevation: 4,
    },
  
    backButtonText: {
      fontWeight: "600",
      color: "#111827",
    },
  
    favoriteButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
  
      justifyContent: "center",
      alignItems: "center",
  
      marginRight: wp(5),
  
      backgroundColor: "#FFFFFF",
  
      borderWidth: 1,
      borderColor: "#D1D5DB",
  
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowRadius: 5,
      shadowOffset: {
        width: 0,
        height: 2,
      },
  
      elevation: 4,
    },
  
    favoriteButtonActive: {
      borderColor: "#EF4444",
    },
  
    favoriteIcon: {
      fontSize: 30,
      color: "#4B5563",
    },
  
    favoriteIconActive: {
      color: "#EF4444",
    },
  
    contentContainer: {
      paddingHorizontal: wp(4),
      paddingTop: hp(4),
    },
  
    articleDetailsContainer: {
      marginBottom: hp(2),
    },
  
    articleTitle: {
      fontSize: hp(3),
      fontWeight: "bold",
      color: "#4B5563",
      marginBottom: hp(1),
    },
  
    articleCategory: {
      fontSize: hp(2),
      fontWeight: "500",
      color: "#9CA3AF",
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
  
    descriptionText: {
      fontSize: hp(1.8),
      color: "#4B5563",
      textAlign: "justify",
      lineHeight: hp(2.5),
    },
  
    favoriteStatusContainer: {
      marginTop: hp(2),
      padding: hp(1.5),
      borderRadius: 8,
      backgroundColor: "#F3F4F6",
    },
  
    favoriteStatusText: {
      textAlign: "center",
      fontSize: hp(1.8),
      color: "#4B5563",
      fontWeight: "600",
    },
  
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
    },
  
    errorText: {
      fontSize: hp(2.2),
      color: "#6B7280",
      marginBottom: hp(2),
    },
  
    errorBackButton: {
      backgroundColor: "#2563EB",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
    },
  
    errorBackButtonText: {
      color: "#FFFFFF",
      fontWeight: "bold",
    },
  });