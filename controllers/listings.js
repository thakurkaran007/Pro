const Listing = require('../models/listing.js');
const x = module.exports;
const mbxGeocoding= require('@mapbox/mapbox-sdk/services/geocoding');
const maptoken = process.env.API_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: maptoken});

x.index = async(req,res) => {
    let x = await Listing.find({});
    res.render("home.ejs",{x});
}
x.newform = (req,res) => {
    res.render("new.ejs");  
}
x.showListing = async(req,res,next) => {
    let { id } = req.params;
       let z = await Listing.findById(id)
       .populate({path:"review",populate :{path:"author"}})
       .populate("owner");
       if(!z){
           next(new ErrorExpress(401,"Error ocurred"));
       }
      
       res.render("f1.ejs",{ z });
   }
x.newListing = async(req,res) => {

        let resp = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
        .send()
    let newlis = new Listing(req.body.listing);
    let url = req.file.path;
    let filename = req.file.filename;
     newlis.owner = req.user._id;
     newlis.image = {url , filename};
     newlis.geometry = resp.body.features[0].geometry ;
    await newlis.save();
    console.log(newlis);;
    req.flash("success", "New Listing Created successfully");
    res.redirect("/listings");

}
x.editListing = async(req,res) => {
    let {id} = req.params;
    let list = await Listing.findById(id);
    let oi = list.image.url;
    oi.replace("/upload","/upload/h_30,w_25");
    res.render("edit.ejs",{list,oi});
}
x.deleteListing = async(req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id); 
    res.redirect("/listings");
};
x.updateListing = async(req,res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(req.file){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url , filename};
    await listing.save();
    req.flash("success","Listing updated Successfully");
    res.redirect(`/listings/${id}`);
    }
}