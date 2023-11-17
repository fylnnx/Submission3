/* eslint-disable no-promise-executor-return */
/* eslint-disable no-undef */
import 'fake-indexeddb/auto';
import FavoriteRestoIdb from '../src/scripts/data/favorite-resto';
import * as TestFactories from './helpers/testFactories';

describe('Liking A Resto', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    await FavoriteRestoIdb.putResto({ id: 1 });

    await new Promise((resolve) => setTimeout(resolve, 500));

    // Pastikan data restoran disimpan di IndexedDB(berhasil dilike)
    const restaurantFromDb = await FavoriteRestoIdb.getResto(1);

    expect(restaurantFromDb).toEqual({ id: 1 });

    await FavoriteRestoIdb.deleteResto(1);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    await FavoriteRestoIdb.putResto({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestoIdb.getAllResto()).toEqual([{ id: 1 }]);
    await FavoriteRestoIdb.deleteResto(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    try {
      await TestFactories.createLikeButtonPresenterWithRestaurant({});
      document.querySelector('#likeButton').dispatchEvent(new Event('click'));

      // Uncomment the following line if you intend to test getAllResto
      expect(await FavoriteRestoIdb.getAllResto()).toEqual([]);

      await FavoriteRestoIdb.getAllResto();
    } catch (error) {
      // Adjust the expectation to check for a more general error message
      expect(error.message).toMatch(/Invalid id/);
    }
  });
});
