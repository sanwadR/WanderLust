const express = require("express");
const router = express.Router({ mergeParams: true }); // Merge params from parent router
// const Review = require("../models/reviews.js");
const Listing = require("../models/listings.js");
const Review = require("../models/reviews.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controller/reviews.js");
router.post("/", isLoggedIn, wrapAsync(reviewController.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
