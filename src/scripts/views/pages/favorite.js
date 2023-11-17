import FavoriteRestoIdb from '../../data/favorite-resto';
import { createRestaurantElement } from '../templates/template.creator';

const Favorite = {
  async render() {
    return `
      <div class="content">
        <h1 class="list_heading fav">Favorite Resto</h1>
        <div id="restaurant-list" class="resto_list"></div>
      </div>
    `;
  },

  async afterRender() {
    const restaurantListContainer = document.getElementById('restaurant-list');

    // Hapus semua elemen anak (child elements) dari restaurantListContainer
    while (restaurantListContainer.firstChild) {
      restaurantListContainer.removeChild(restaurantListContainer.firstChild);
    }

    const restaurants = await FavoriteRestoIdb.getAllResto();

    if (restaurants.length === 0) {
      // Jika tidak ada restoran, tampilkan pesan "Tidak ada restaurant untuk ditampilkan"
      restaurantListContainer.innerHTML = '<p class="restaurant-item__not__found">Tidak ada restaurant untuk ditampilkan</p>';
    } else {
      // Jika ada restoran, tampilkan masing-masing restoran
      restaurants.forEach((restaurantItem) => {
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
    }
  },

};

export default Favorite;
