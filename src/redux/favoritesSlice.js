import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteArticles: [],
};

const favoritesSlice = createSlice({
  name: "favorites",

  initialState,

  reducers: {
    toggleFavorite: (state, action) => {
      const article = action.payload;

      const existingIndex =
        state.favoriteArticles.findIndex(
          (item) =>
            String(item.idArticle) ===
            String(article.idArticle)
        );

      if (existingIndex >= 0) {
        // Si ya existe, quitarlo
        state.favoriteArticles.splice(
          existingIndex,
          1
        );
      } else {
        // Si no existe, agregarlo
        state.favoriteArticles.push(
          article
        );
      }
    },
  },
});

export const { toggleFavorite } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;