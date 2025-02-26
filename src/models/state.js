
import mongoose from "mongoose";

const StateSchema = new mongoose.Schema({
    name:{type:String,unique:true,require:true,lowercase:true},
  country: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Country", 
    required: false
  }, 
  image_urls: { type: [String], default: [] },
  isActive: { type: Boolean, default: true },
  
}, { timestamps: true });


StateSchema.index({ name: 1, country: 1 }, { unique: true });

const State = mongoose.models.State || mongoose.model("State", StateSchema);
export default State;