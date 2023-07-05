import mongoose from "mongoose";
var Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: false,
      default: "general",
    },
    photo: {
      type: String,
      required: false,
      default:
        "https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg",
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", ArticleSchema);

export default Article;

