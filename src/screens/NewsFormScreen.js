import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function NewsFormScreen({ route, navigation }) {
  const { articleToEdit, articleIndex, onArticleEdited } = route.params || {};

  const [title, setTitle] = useState(
    articleToEdit ? articleToEdit.title : ""
  );

  const [image, setImage] = useState(
    articleToEdit ? articleToEdit.image : ""
  );

  const [description, setDescription] = useState(
    articleToEdit ? articleToEdit.description : ""
  );

  const saveArticle = async () => {
    if (!title.trim()) {
      Alert.alert("Aviso", "Debes ingresar un título.");
      return;
    }

    if (!description.trim()) {
      Alert.alert("Aviso", "Debes ingresar una descripción.");
      return;
    }

    const newArticle = {
      idArticle:
        articleToEdit?.idArticle ||
        `custom-${Date.now()}`,
      title: title.trim(),
      image: image.trim(),
      description: description.trim(),
    };

    try {
      const existingArticles = await AsyncStorage.getItem(
        "customArticles"
      );

      const articles = existingArticles
        ? JSON.parse(existingArticles)
        : [];

      if (
        articleToEdit !== undefined &&
        articleIndex !== undefined
      ) {
        articles[articleIndex] = newArticle;
      } else {
        articles.push(newArticle);
      }

      await AsyncStorage.setItem(
        "customArticles",
        JSON.stringify(articles)
      );

      if (onArticleEdited) {
        onArticleEdited();
      }

      navigation.goBack();
    } catch (error) {
      console.error(
        "Error al guardar el artículo:",
        error
      );

      Alert.alert(
        "Error",
        "No se pudo guardar el artículo."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>
        {articleToEdit ? "Edit Article" : "New Article"}
      </Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        autoCapitalize="none"
        style={styles.input}
      />

      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>
            Upload Image URL
          </Text>
        </View>
      )}

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={[
          styles.input,
          styles.descriptionInput,
        ]}
      />

      <TouchableOpacity
        onPress={saveArticle}
        style={styles.saveButton}
      >
        <Text style={styles.saveButtonText}>
          {articleToEdit
            ? "Update Article"
            : "Save Article"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: "#FFFFFF",
  },

  screenTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#111827",
    marginTop: hp(2),
    marginBottom: hp(1),
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.4),
    marginVertical: hp(1),
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    fontSize: hp(1.8),
  },

  descriptionInput: {
    height: hp(20),
    textAlignVertical: "top",
  },

  image: {
    width: "100%",
    height: hp(25),
    marginVertical: hp(1),
    borderRadius: 10,
    resizeMode: "cover",
  },

  imagePlaceholder: {
    height: hp(20),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
  },

  imagePlaceholderText: {
    color: "#6B7280",
    fontSize: hp(1.8),
  },

  saveButton: {
    backgroundColor: "#4F75FF",
    paddingVertical: hp(1.5),
    alignItems: "center",
    borderRadius: 8,
    marginTop: hp(2),
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: hp(2),
  },
});