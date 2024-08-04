const express = require("express");
const Listing = require("../models/listings.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const router = express.Router();
const { isLoggedIn, isOwner, isReviewAuthor } = require("../middleware.js");
const ExpressErrors = require("../utils/ExpressErrors.js");
const listingController = require("../controller/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
//---------------------
//Index
router.get("/", wrapAsync(listingController.index));
//New listing
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

//show
router.get("/:id", wrapAsync(listingController.showListing));

//New listing
router.post(
  "/",
  isLoggedIn,
  upload.single("image"),
  wrapAsync(listingController.createListing)
);

//Edit Rout
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

//PATCH Edit rout
router.patch(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("image"),

  wrapAsync(listingController.updateListing)
);

//Delete Rout
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);

module.exports = router;
