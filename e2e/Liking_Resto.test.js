/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('liking restaurant');
Before(({ I }) => {
  I.amOnPage('/#/Favorite');
});

Scenario('showing empty fav resto list', async ({ I }) => {
  I.waitForElement('#restaurant-list', 5);

  I.seeElement('#restaurant-list');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see(
    'Tidak ada restaurant untuk ditampilkan',
    '.restaurant-item__not__found',
  );

  I.amOnPage('/#');

  I.waitForElement('.restaurant-item_name', 10);
  I.seeElement('.restaurant-item_name');

  const firstRestaurant = locate('.restaurant-item_name').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('#/favorite');
  I.waitForElement('.restaurant', 10);
  I.seeElement('.restaurant');

  const likedRestaurantName = await I.grabTextFrom('.restaurant-item_name');
  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  I.seeElement('.restaurant-item_name');
});

Scenario('unlike one restaurants', async ({ I }) => {
  I.see(
    'Tidak ada restaurant untuk ditampilkan',
    '.restaurant-item__not__found',
  );

  I.amOnPage('/#');

  I.waitForElement('.restaurant-item_name', 10);
  I.seeElement('.restaurant-item_name');

  const firstRestaurant = locate('.restaurant-item_name').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('#/favorite');
  I.waitForElement('.restaurant', 10);
  I.seeElement('.restaurant');

  const likedRestaurantName = await I.grabTextFrom('.restaurant-item_name');
  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  I.seeElement('.restaurant-item_name');

  const firstRestaurantLiked = locate('.restaurant-item_name').first();
  I.click(firstRestaurantLiked);

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('#/favorite');
  I.waitForElement('.restaurant-item__not__found', 10);
  I.see(
    'Tidak ada restaurant untuk ditampilkan',
    '.restaurant-item__not__found',
  );
});
