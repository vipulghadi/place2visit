
import mongoose from "mongoose";

const CountrySchema=mongoose.Schema({
    name:{type:String,unique:true,require:true,lowercase:true},
    code:{type:String},
    image_urls: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },

},{timestamps:true}
)

const country=mongoose.models.Country || mongoose.model("Country",CountrySchema);
export default country