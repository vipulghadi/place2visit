// models/Place.js
import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
    name:{type:String,unique:true,require:true,lowercase:true},
  state: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "State", 
    required: false
  },  
  country: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Country", 
    required: false
  },  
  latitude: { type: Number },
  longitude: { type: Number },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });


PlaceSchema.index({ name: 1, state: 1 }, { unique: true });

const Place = mongoose.models.Place || mongoose.model("Place", PlaceSchema);
export default Place;