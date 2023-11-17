/* eslint-disable no-debugger */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Review Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Post resto review', async ({ I }) => {
  debugger;
  const reviewText = 'nyoba e2e testing';

  I.waitForElement('.restaurant', 10);
  I.seeElement('.restaurant');
  I.click(locate('.restaurant').first());

  I.seeElement('.add-review form');

  I.fillField('#name', 'test review');
  I.fillField('#review', reviewText);
  I.click(locate('#submitReview', 30));
  I.wait(5);

  // Refresh the page after posting the review
  // I.refreshPage(5);
  I.executeScript(() => location.reload(true));

  const lastReview = locate('.r_decs').last();
  const lastReviewText = await I.grabTextFrom(lastReview);
  assert.strictEqual(reviewText, lastReviewText.trim());
});
