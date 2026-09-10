import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    ActivityIndicator,
    Alert,
  } from "react-native";
  import React, {
    useCallback,
    useState,
  } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import {
    useNavigation,
    useFocusEffect,
  } from "@react-navigation/native";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  
  export default function MyArticlesScreen() {
    const navigation = useNavigation();
  
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchArticles = async () => {
      try {
        setLoading(true);
  
        const storedArticles =
          await AsyncStorage.getItem(
            "customArticles"
          );
  
        if (storedArticles) {
          setArticles(
            JSON.parse(storedArticles)
          );
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error(
          "Error loading articles:",
          error
        );
      } finally {
        setLoading(false);
      }
    };
  
    useFocusEffect(
      useCallback(() => {
        fetchArticles();
      }, [])
    );
  
    const handleAddArticle = () => {
      navigation.navigate("NewsFormScreen");
    };
  
    const handleArticleClick = (article) => {
      navigation.navigate(
        "CustomNewsScreen",
        {
          article,
        }
      );
    };
  
    const deleteArticle = async (index) => {
      try {
        const updatedArticles = [
          ...articles,
        ];
  
        updatedArticles.splice(index, 1);
  
        await AsyncStorage.setItem(
          "customArticles",
          JSON.stringify(
            updatedArticles
          )
        );
  
        setArticles(updatedArticles);
      } catch (error) {
        console.error(
          "Error deleting the article:",
          error
        );
      }
    };
  
    const confirmDeleteArticle = (
      index
    ) => {
      Alert.alert(
        "Delete Article",
        "Are you sure you want to delete this article?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: () =>
              deleteArticle(index),
          },
        ]
      );
    };
  
    const editArticle = (
      article,
      index
    ) => {
      navigation.navigate(
        "NewsFormScreen",
        {
          articleToEdit: article,
          articleIndex: index,
        }
      );
    };
  
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.goBack()
            }
            style={styles.backButton}
          >
            <Text
              style={
                styles.backButtonText
              }
            >
              Back
            </Text>
          </TouchableOpacity>
  
          <Text style={styles.screenTitle}>
            My Articles
          </Text>
  
          <View style={styles.headerSpacer} />
        </View>
  
        {/* Add Article */}
        <TouchableOpacity
          onPress={handleAddArticle}
          style={styles.addButton}
        >
          <Text
            style={styles.addButtonText}
          >
            Add New Article
          </Text>
        </TouchableOpacity>
  
        {loading ? (
          <View
            style={
              styles.loadingContainer
            }
          >
            <ActivityIndicator
              size="large"
              color="#4F75FF"
            />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={
              styles.scrollContainer
            }
            showsVerticalScrollIndicator={
              false
            }
          >
            {articles.length === 0 ? (
              <Text
                style={
                  styles.noArticlesText
                }
              >
                No articles added yet.
              </Text>
            ) : (
              articles.map(
                (article, index) => (
                  <View
                    key={
                      article.idArticle ||
                      index
                    }
                    style={
                      styles.articleCard
                    }
                    testID="articleCard"
                  >
                    <TouchableOpacity
                      testID="handleArticleBtn"
                      onPress={() =>
                        handleArticleClick(
                          article
                        )
                      }
                      activeOpacity={0.8}
                    >
                      {article.image && (
                        <Image
                          source={{
                            uri: article.image,
                          }}
                          style={
                            styles.articleImage
                          }
                        />
                      )}
  
                      <Text
                        style={
                          styles.articleTitle
                        }
                        numberOfLines={2}
                      >
                        {article.title}
                      </Text>
  
                      <Text
                        style={
                          styles.articleDescription
                        }
                        testID="articleDescp"
                        numberOfLines={3}
                      >
                        {article.description
                          ? article.description.substring(
                              0,
                              100
                            ) +
                            (article
                              .description
                              .length >
                            100
                              ? "..."
                              : "")
                          : ""}
                      </Text>
                    </TouchableOpacity>
  
                    {/* Edit / Delete */}
                    <View
                      style={
                        styles.actionButtonsContainer
                      }
                      testID="editDeleteButtons"
                    >
                      <TouchableOpacity
                        onPress={() =>
                          editArticle(
                            article,
                            index
                          )
                        }
                        style={
                          styles.editButton
                        }
                      >
                        <Text
                          style={
                            styles.editButtonText
                          }
                        >
                          Edit
                        </Text>
                      </TouchableOpacity>
  
                      <TouchableOpacity
                        onPress={() =>
                          confirmDeleteArticle(
                            index
                          )
                        }
                        style={
                          styles.deleteButton
                        }
                      >
                        <Text
                          style={
                            styles.deleteButtonText
                          }
                        >
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              )
            )}
          </ScrollView>
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: wp(4),
      paddingTop: hp(2),
      backgroundColor: "#F9FAFB",
    },
  
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "space-between",
      marginBottom: hp(2),
    },
  
    backButton: {
      paddingVertical: hp(1),
      paddingHorizontal: wp(2),
    },
  
    backButtonText: {
      fontSize: hp(2),
      color: "#4F75FF",
      fontWeight: "600",
    },
  
    screenTitle: {
      fontSize: hp(3),
      fontWeight: "bold",
      color: "#111827",
    },
  
    headerSpacer: {
      width: wp(12),
    },
  
    addButton: {
      backgroundColor: "#4F75FF",
      paddingVertical: hp(1.5),
      paddingHorizontal: wp(4),
      alignItems: "center",
      alignSelf: "center",
      borderRadius: 8,
      minWidth: wp(45),
      marginBottom: hp(3),
    },
  
    addButtonText: {
      color: "#FFFFFF",
      fontWeight: "600",
      fontSize: hp(2),
    },
  
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  
    scrollContainer: {
      paddingBottom: hp(3),
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 16,
    },
  
    noArticlesText: {
      textAlign: "center",
      fontSize: hp(2),
      color: "#6B7280",
      marginTop: hp(5),
      width: "100%",
    },
  
    articleCard: {
      width: 350,
      minHeight: 330,
      backgroundColor: "#FFFFFF",
      padding: 16,
      borderRadius: 12,
      marginBottom: hp(2),
  
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 2,
      },
  
      elevation: 3,
    },
  
    articleImage: {
      width: "100%",
      height: 170,
      borderRadius: 8,
      marginBottom: hp(1),
      resizeMode: "cover",
    },
  
    articleTitle: {
      fontSize: hp(2),
      fontWeight: "600",
      color: "#111827",
      marginBottom: hp(0.5),
    },
  
    articleDescription: {
      fontSize: hp(1.7),
      color: "#6B7280",
      marginBottom: hp(1.5),
      lineHeight: hp(2.4),
    },
  
    actionButtonsContainer: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      marginTop: "auto",
      paddingTop: hp(1),
    },
  
    editButton: {
      backgroundColor: "#34D399",
      paddingVertical: hp(1),
      paddingHorizontal: wp(2),
      borderRadius: 5,
      width: 100,
      alignItems: "center",
    },
  
    editButtonText: {
      color: "#FFFFFF",
      fontWeight: "600",
      fontSize: hp(1.7),
    },
  
    deleteButton: {
      backgroundColor: "#EF4444",
      paddingVertical: hp(1),
      paddingHorizontal: wp(2),
      borderRadius: 5,
      width: 100,
      alignItems: "center",
    },
  
    deleteButtonText: {
      color: "#FFFFFF",
      fontWeight: "600",
      fontSize: hp(1.7),
    },
  });