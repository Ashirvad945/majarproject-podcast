const authMiddleware = require("../middleware/authmiddleware");
const upload = require("../middleware/multer");
const Category = require("../models/category");
const User = require("../models/user");
const Podcast = require("../models/podcast");

const router = require("express").Router();

//add product

router.post("/add-podcast",authMiddleware,upload,async(req,res)=>{
 try {
   const {title,description,category} = req.body;
   const frontImage = req.files["frontImage"] ? [frontImage][0].path:null;
   const audioFile = req.files["audioFile"] ? [audioFile][0].path:null;
   if(!title || !description || !category || !frontImage || !audioFile){
       return res.status(400).json({message:"All fields are required"});
   }

   const {user} = req;
   const cat = await Category.findOne({categoryName:category});
   if(!cat){
       return res.status(400).json({message:"No category found"});
   }
   const catid = cat._id;
   const userid = user._id;
   const newPodcast = new Podcast({title,
       description,
       category:catid,
       frontImage,
       audioFile,
       user:userid,
   });
   await newPodcast.save();
   await Category.findByIdAndUpdate(catid,{
       $push: {podcats:newPodcast._id},
   });
  await User.findByIdAndUpdate(userid,{$push: {podcasts:newPodcast._id},
}); 
  res.status(201).json({message:"Podcast added succesfully"});
 } catch (error) {
    console.error('Error',error);  // log the error
   return res.status(500).json({message:"Failed to add podcasts"});
 }
});


//get all podcost
router.get("/get-podcasts",async (req,res)=>{
   try {
       const podcasts = await Podcast.find()
       .populate("category")
       .sort({createdAt:-1});
       return res.status(200).json({data:podcasts});
   } catch (error) {
       return res.status(500).json({message:"Internal server error"});
   }
});

//get-user-podcasts
router.get("/get-user-podcasts",authMiddleware,async (req,res)=>{
   try {
       const {user} = req;
       const userid = user._id;
       const data = await User.findById(userid)
       .populate({
           path:"podcasts",
           populate:{path:"category"},

       })
       .select("-password");
       if(data && data.podcasts){
           data.podcasts.sort(
               (a,b)=>new Date(b.createdAt) - new Date(a.createdAt)
           );
       }
       return res.status(200).json({data:data.podcasts});
   } catch (error) {
       return res.status(500).json({message:"Internal server error"});
       
   }
});

//get podcasts by id
router.get("/get-podcasts/:id",async(req,res)=>{
   try {
       const {id} = req.params;
       const podcasts = await Podcast.findById(id).populate("category");
       return res.status(200).json({data:podcasts});
   } catch (error) {
       return res.status(500).json({message:"Internal server error"});
   }
});


// get pdcasts by categories
router.get("/category/:cat",async(req,res)=>{
   try {
       const {cat} = req.params;
       const categories = await Category.find({categoryName:cat}).populate({
           path:"podcasts",
           populate:{path:"category"},
       });
       let podcasts = [];
       categories.forEach((category)=>{
           podcasts = [...podcasts, ...category.podcasts];
       });
       return res.status(200).json({data:podcasts});
   } catch (error) {
       return res.status(500).json({message:"Internal server error"});
   }
});
module.exports = router;