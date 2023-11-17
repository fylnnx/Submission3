/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import { itActsAsfavoriteRestaurantModel } from './contracts/favoriteRestoContract';

let favoriteRestaurants = [];

const FavoriterestaurantArray = {
  getResto(id) {
    if (!id) {
      return;
    }

    return favoriteRestaurants.find((restaurant) => restaurant.id == id);
  },

  getAllResto() {
    return favoriteRestaurants;
  },

  putResto(restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    // pastikan id ini belum ada dalam daftar favoriteRestaurants
    if (this.getResto(restaurant.id)) {
      return;
    }

    favoriteRestaurants.push(restaurant);
  },

  deleteResto(id) {
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id
    favoriteRestaurants = favoriteRestaurants.filter((restaurant) => restaurant.id != id);
  },
};

describe('Favorite restaurant Array Contract Test Implementation', () => {
  afterEach(() => {
    favoriteRestaurants = [];
  });

  itActsAsfavoriteRestaurantModel(FavoriterestaurantArray);
});
