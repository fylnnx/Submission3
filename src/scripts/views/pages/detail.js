import UrlParser from '../../routes/url-parser';
import DicodingRestaurant from '../../data/dicoding-restaurant-source';
import { createRestaurantDetails } from '../templates/template.creator';
import LikeButtonInitiator from '../../utils/like-button-presenter';
// import CONFIG from '../../globals/config';

const Detail = {
  async render() {
    return `
      <div id="restaurantDetail"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await DicodingRestaurant.RestaurantDetail(url.id);
    const restaurantContainer = document.querySelector('#restaurantDetail');
    restaurantContainer.innerHTML = createRestaurantDetails(restaurant);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurant.restaurant.id,
        pictureId: restaurant.restaurant.pictureId,
        name: restaurant.restaurant.name,
        city: restaurant.restaurant.city,
        rating: restaurant.restaurant.rating,
        description: restaurant.restaurant.description,
      },
    });

    const submitButton = document.querySelector('#submitReview');
    submitButton.addEventListener('click', async () => {
      const name = document.querySelector('#name').value;
      const review = document.querySelector('#review').value;
      const restaurantId = restaurant.restaurant.id;
      const reviewData = { id: restaurantId, name, review };

      try {
        const response = await DicodingRestaurant.reviewRestaurant(reviewData);
        if (response.error) {
          console.error('Gagal menambahkan review:', response.message);
        } else {
          console.log('Review berhasil ditambahkan:', response);
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    });
  },
};

export default Detail;
