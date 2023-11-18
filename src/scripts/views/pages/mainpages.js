import DicodingRestaurant from '../../data/dicoding-restaurant-source';
import { createRestaurantElement } from '../templates/template.creator';

const MainPages = {
  async render() {
    return `
    <picture>
      <source media="(max-width: 600px)" srcset="../images/heros/hero-image_4.jpg">
      <source type="image/webp" srcset="../images/heros/hero-image_4.webp">
      <source type="image/jpeg" srcset="../images/heros/hero-image_4.jpg">
      <div class="hero" style="background-image: url('../images/heros/hero-image_4.jpg');" alt="Hero Image">
    </picture>    
      <div class="hero__inner">
          <h1 class="hero__title">Find Your Favorite Resto!</h1>
          <p class="hero__tagline">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, suscipit.
          </p>
          <button id="explore_btn">Lets Go!</button>
        </div>
      </div>
      <div section id="penunjuk">
        <p>a</p>
      </div>
      <section class="content">
        <div class="resto_list">
          <h1 class="list_heading">Restaurant List</h1>
          <div id="restaurant-list"></div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const penunjuk = document.getElementById('penunjuk');
    const exploreBtn = document.getElementById('explore_btn');
    exploreBtn.addEventListener('click', () => {
      penunjuk.scrollIntoView({ behavior: 'smooth' });
    });

    const restaurantListContainer = document.getElementById('restaurant-list');
    try {
      const restaurant = await DicodingRestaurant.RestaurantList();

      if (restaurant && restaurant.restaurants) {
        const restaurantList = restaurant.restaurants;
        restaurantListContainer.innerHTML = '';

        restaurantList.forEach((restaurantItem) => {
          const restaurantItemElement = document.createElement('div');
          restaurantItemElement.classList.add('restaurant-item');
          restaurantItemElement.innerHTML = createRestaurantElement(restaurantItem);
          restaurantListContainer.appendChild(restaurantItemElement);

          restaurantItemElement.addEventListener('click', () => {
            window.location.href = `#/detail/${restaurantItem.id}`;
          });

          // Tambahkan event listener untuk tombol "Enter" pada card restoran
          restaurantItemElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
              window.location.href = `#/detail/${restaurantItem.id}`;
            }
          });
        });
      } else {
        console.error('Data restoran tidak ditemukan dalam respons.');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  },
};

export default MainPages;
