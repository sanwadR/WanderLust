const Listing = require("../models/listings.js");
const listing = require("../routes/listings.js");
module.exports.index = async (req, res) => {
  const listings = await Listing.find({});
  res.render("index.ejs", { listings });
};

module.exports.renderNewForm = async (req, res) => {
  res.render("new.ejs");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }
  res.render("show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
  const { title, description, price, location, country } = req.body;
  let url = req.file.path;
  let filename = req.file.filename;
  const owner = req.user._id;
  const newListing = new Listing({
    title,
    image: { filename, url },
    description,
    price,
    location,
    country,
    owner,
  });
  await newListing.save();
  req.flash("success", "New Listing Created Successfully !!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }
  let originalImage = listing.image.url;
  let originalImageUrl = originalImage.replace(
    "/upload",
    "/upload/h_300,w_250"
  );
  res.render("edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, location, country } = req.body;
  let listing = await Listing.findById(id);
  listing.title = title;
  listing.description = description;
  listing.price = price;
  listing.location = location;
  listing.country = country;

  // Update image if a file is provided
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { filename, url };
  }
  await listing.save();
  req.flash("success", "Listing Updated Successfully !!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully !!");
  res.redirect("/listings");
};
