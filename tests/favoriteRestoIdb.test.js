/* eslint-disable no-promise-executor-return */
/* eslint-disable no-undef */
import { itActsAsfavoriteRestaurantModel } from './contracts/favoriteRestoContract';
import FavoriteRestoIdb from '../src/scripts/data/favorite-resto';

describe('Favorite Resto Idb Contract Test Implementation', () => {
  afterEach(async () => {
    const restaurants = await FavoriteRestoIdb.getAllResto();

    // Menggunakan Promise.all untuk menjalankan semua operasi deleteResto secara parallel
    await Promise.all(restaurants.map(async (restaurant) => {
      // Menggunakan Promise.race untuk memberikan batas waktu pada setiap operasi deleteResto
      await Promise.race([
        FavoriteRestoIdb.deleteResto(restaurant.id),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Delete operation timed out')), 10000)),
      ]);
    }));
  });

  itActsAsfavoriteRestaurantModel(FavoriteRestoIdb);
});
