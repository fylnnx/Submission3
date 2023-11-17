import API_ENDPOINT from '../globals/api-endpoint';

class DicodingRestaurant {
  static async RestaurantList() {
    const response = await fetch(API_ENDPOINT.RESTAURANTS);
    const responseJson = await response.json();
    return responseJson;
  }

  static async RestaurantDetail(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson;
  }

  // for input restaurant review
  static async reviewRestaurant(review) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: review.id,
        name: review.name,
        review: review.review,
      }),
    };

    const response = await fetch(API_ENDPOINT.ADD_REVIEW, options);
    return response.json();
  }
}

export default DicodingRestaurant;
