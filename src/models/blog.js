import mongoose from "mongoose";
import slugify from "slugify";


// Subsection schema
const SubSectionSchema = new mongoose.Schema({
  title: String,
  text: String,
  image: String,
});

// Section schema
const SectionSchema = new mongoose.Schema({
  heading: String,
  text: String,
  image: String,
  subsections: [SubSectionSchema],
});

// Article schema
const ArticleSchema = new mongoose.Schema({
  title: String,
  cover_image: String,
  sections: [SectionSchema],
});

// Blog schema with new fields
const BlogSchema = new mongoose.Schema(
  {
    meta_title: String,
    meta_description: String,
    country: String,
    state: String,
    place: String,
    latitude: Number,
    longitude: Number,
    total_views: { type: Number, default: 0 },
    article: ArticleSchema,
    slug: { type: String, unique: true },
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

    // Ensure uniqueness
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
