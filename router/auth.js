const express = require("express");
const router = express.Router();

const cookieParser = require("cookie-parser");

require("../db/conn");

const User = require("../model/dataSchema")

router.use(cookieParser());



const datas = (req, res) => {
  console.log("hello");
};

//create form routes
router.post("/create", async (req, res) => {
  console.log("hello");
  console.log(req.body.dataObj, "dataobj");
  console.log("================================================");

  const data = [req.body.dataObj];
 
  console.log(req.body.dataObj);
  console.log([req.body.dataObj]);


  // const { head, email, date, name, password, state, zip } = data;

  if (data) {
    try {
      const user = await new User({
       data:data
      });
      const userData = await user.save();

      res.status(200).json({ data: userData });
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(422).json({
      errors: "Fill the all details",
    });
  }
});


//get details 
router.get('/user/details',async (req,res)=>{
try{
  const allUser = await User.find();
  console.log("=============================")
  console.log(allUser,"data")
  console.log("-=------------------------------")
  res.json(allUser);
}
catch(err){
console.log(err);
res.json({errors: "something went wrong"})
}
})

//delete form

router.post('/form/delete',async (req, res) => {
  const  id  = req.body._id;
  console.log(id);

  if (id) {
    await User.deleteOne({ _id: id });
    res.json({
      error: false,
      message: "User deleted successfully",
    });
  }else{
    res.json({
      error: true,
      message: "something went wrong"
    })
  }
})

//update form
router.post('/form/update', async(req, res) => {
  
  const data = req.body.editData;
  console.log(data.id);
  try {
    updatedUser = await User.updateOne(
      { _id: data.id },
      {
        $set: {
        data : data
        },
      }
    );
    console.log(updatedUser)
    if (updatedUser) {
      return res.status(200).json({
        message: "updated successfully ",
      });
    }
  } catch (e) {
    console.log(e, "update error");
  }
})


module.exports = router;
