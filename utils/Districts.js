import NewsArticle from "../models/NewsArticle.js";

const Districts = async (req, res) => {
  try {
    const response = await NewsArticle.find({district:req.params.district});
    return res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export default Districts;
