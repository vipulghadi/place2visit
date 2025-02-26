// models/Blog.js
import mongoose from "mongoose";
import slugify from "slugify";

// Subsection schema
const SubSectionSchema = new mongoose.Schema({
  title: String,
  text: String,
  images: {type:[String],default:[]},
});

// Section schema
const SectionSchema = new mongoose.Schema({
  heading: String,
  text: String,
  images: {type:[String],default:[]},
  subsections: [SubSectionSchema],
});

// Article schema
const ArticleSchema = new mongoose.Schema({
  title: String,
  cover_images: {type:[String],default:[]},
  sections: [SectionSchema],
});

// Blog schema with references to Country, State, and Place
const BlogSchema = new mongoose.Schema(
  {
    meta_title: String,
    meta_description: String,
    country: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Country", 
      required: false
    },
    state: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "State", 
      required: false 
    },
    place: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Place", 
      required: false,

    },
    article: ArticleSchema,
    slug: { type: String, unique: true },
    view_count:{ type: Number, default: 0 },
    like_count:{ type: Number, default: 0 },
    tags:{type:[String],default:[]},
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Pre-save middleware to generate a unique slug
BlogSchema.pre("save", async function (next) {
  if (!this.slug && this.meta_title) {
    let baseSlug = slugify(this.meta_title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    while (await mongoose.models.Blog.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    this.slug = slug;
  }
  next();
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
export default Blog;