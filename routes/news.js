import express from "express";
import { body, validationResult } from "express-validator";
import NewsArticle from "../models/NewsArticle.js";
import upload from "../utils/Upload.js";
import { uploadImage, getImage } from "../controller/imageController.js";
import Districts from "../utils/Districts.js";
const router = express.Router();

// Will send response of all the items related to the specific user
// GET localhost:5000/api/news/fetchallnews (to get all the news)
router.get("/fetchallnews", async (req, res) => {
  const items = await NewsArticle.find().sort({ _id: -1 });
  res.json(items);
});

router.get("/fechdetails/:id", async (req, res) => {
  const items = await NewsArticle.findById(req.params.id);
  res.status(200).json(items);
});

router.get("/fetchallnews/:district", Districts);

// to upload image
router.post("/file/upload", upload.single("file"), uploadImage);

// to get image
router.get("/file/:filename", getImage);

// POST localhost:5000/api/news/additem (to create new items)
router.post(
  "/addnews",
  [
    body("title", "Enter a Valid title").isLength({ min: 3 }),
    body("description", "description atleast 5 Charecters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // if there are errors return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Creating new object from model
      const news = new NewsArticle({
        title: req.body.title,
        description: req.body.description,
        district: req.body.district,
        photo: req.body.photo,
      });
      const savedItem = await news.save();

      res.json(savedItem);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error");
    }
  }
);

// // // PUT localhost:5000/api/news/updatenews
router.put("/updatenews/:id", async (req, res) => {
  try {
    const { title, description, district } = req.body;
    // create a newNews object
    const newNews = {};
    if (title) {
      newNews.title = title;
    }
    if (description) {
      newNews.description = description;
    }
    if (district) {
      newNews.district = district;
    }

    // find the item to be updated and update it
    let item = await NewsArticle.findById(req.params.id);
    if (!item) {
      return res.status(400).send("Not found");
    }

    // updating the items
    item = await NewsArticle.findByIdAndUpdate(
      req.params.id,
      { $set: newNews },
      { new: true }
    );
    res.json({ item });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error");
  }
});

// // // DELETE localhost:5000/api/news/deletenews
router.delete("/deletenews/:id", async (req, res) => {
  try {
    // find the news to be deleted and delete it
    let item = await NewsArticle.findById(req.params.id);
    if (!item) {
      return res.status(400).send("Not found");
    }

    // deleting the news
    item = await NewsArticle.findByIdAndDelete(req.params.id);
    res.json({ Success: "item has been deleted", item: item });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error");
  }
});

export default router;
