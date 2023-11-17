/* eslint-disable max-len */
/* eslint-disable no-undef */

// Import DataError if it's a custom error class
// import { DataError } from 'path_to_data_error_module'; // Uncomment and replace 'path_to_data_error_module' with the actual path if needed

const itActsAsfavoriteRestaurantModel = (favoriteRestaurant) => {
  it('should return the restaurant that has been added', async () => {
    favoriteRestaurant.putResto({ id: 1 });
    favoriteRestaurant.putResto({ id: 2 });

    expect(await favoriteRestaurant.getResto(1)).toEqual({ id: 1 });
    expect(await favoriteRestaurant.getResto(2)).toEqual({ id: 2 });
    expect(await favoriteRestaurant.getResto(3)).toEqual(undefined);
  });

  it('should refuse a restaurant from being added if it does not have the correct property', async () => {
    try {
      await favoriteRestaurant.putResto({ aProperty: 'property' });
      // If the putResto function succeeds, this assertion will indicate a failure
      expect(true).toBe(false);
    } catch (error) {
      // Ensure that the error is an instance of DataError or another appropriate error type
      expect(error).toBeInstanceOf(Error); // Use DataError if it's a custom error class
    }

    // Ensure that data is not added to the list of favorite restaurants
    expect(await favoriteRestaurant.getAllResto()).toEqual([]);
  });

  it('can return all of the restaurants that have been added', async () => {
    favoriteRestaurant.putResto({ id: 1 });
    favoriteRestaurant.putResto({ id: 2 });

    expect(await favoriteRestaurant.getAllResto()).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('should remove favorite restaurant', async () => {
    favoriteRestaurant.putResto({ id: 1 });
    favoriteRestaurant.putResto({ id: 2 });
    favoriteRestaurant.putResto({ id: 3 });

    await favoriteRestaurant.deleteResto(1);

    expect(await favoriteRestaurant.getAllResto()).toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('should handle a request to remove a restaurant even though the restaurant has not been added', async () => {
    favoriteRestaurant.putResto({ id: 1 });
    favoriteRestaurant.putResto({ id: 2 });
    favoriteRestaurant.putResto({ id: 3 });

    await favoriteRestaurant.deleteResto(4);

    expect(await favoriteRestaurant.getAllResto()).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });
};

// eslint-disable-next-line import/prefer-default-export
export { itActsAsfavoriteRestaurantModel };
