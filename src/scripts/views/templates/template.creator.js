import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const createRestaurantElement = (restaurant) => `
    <div class="restaurant" tabindex="0">
    <h2 class="restaurant-item_name">${restaurant.name}</h2>
    <p class="city">Kota: ${restaurant.city}</p>
    <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="Gambar ${restaurant.name}"loading="lazy">
    <p class="rating">${restaurant.rating}<span class="star">★</span></p>
    <p class="desc">${restaurant.description}</p>
    </div>
  </div>
`;

const createRestaurantDetails = (restaurant) => `
  <div id="restaurant-detail" class="restaurant-box">
    <h2 tabindex="0">${restaurant.restaurant.name}</h2>
    <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.restaurant.pictureId}" alt="${restaurant.restaurant.name}" tabindex="0" loading="lazy">
    <p tabindex="0">Alamat: ${restaurant.restaurant.address}, ${restaurant.restaurant.city}</p>
    <p tabindex="0">${restaurant.restaurant.description}</p>

    <h3 tabindex="0">Menu Makanan dan Minuman</h3>
    <div class="menu-container">
      <div class="menu-column">
        <h4 tabindex="0">Menu Makanan</h4>
        <ul tabindex="0">
          ${restaurant.restaurant.menus && restaurant.restaurant.menus.foods && Array.isArray(restaurant.restaurant.menus.foods)
    ? restaurant.restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')
    : 'Tidak ada data makanan'}
        </ul>
      </div>
      <div class="menu-column">
        <h4 tabindex="0">Menu Minuman</h4>
        <ul tabindex="0">
          ${restaurant.restaurant.menus && restaurant.restaurant.menus.drinks && Array.isArray(restaurant.restaurant.menus.drinks)
    ? restaurant.restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')
    : 'Tidak ada data minuman'}
        </ul>
      </div>
    </div>

    <h3 tabindex="0" class="review_heading">Customer Reviews</h3>
    <div class="customer-review-container">
      ${restaurant.restaurant.customerReviews
    ? restaurant.restaurant.customerReviews.map((review) => `
          <div class="customer-review" tabindex="0">
            <p class ="r_name">${review.name}</p>
            <p class ="r_decs">${review.review}</p>
            <p class="r_date">${review.date}</p>
          </div>
        `).join('')
    : 'Tidak ada ulasan'}
    </div>
    <div class="add-review" tabindex="0">
    <h3>Add Review for Restaurant</h3>
    <form id="addReviewForm">
        <label for="name">Your Name:</label>
        <input type="text" id="name" name="name" required>
        
        <label for="review">Your Review:</label>
        <textarea id="review" name="review" required></textarea>
        
        <button type="submit" id="submitReview">Submit Review</button>
    </form>
    </div>
  </div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantElement,
  createRestaurantDetails,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
};
