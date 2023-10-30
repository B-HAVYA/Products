var express = require('express');
var router = express.Router();
var pool =require('./pool')
/* GET users listing. */

//category
router.get('/fetch_all_category', function(req, res, next) {
  pool.query("select * from category",function(error,result){
    if(error){
      console.log(error)
        res.status(500).json({data:[],message:'Server Error : Issue in Database'})
    }
    else{
        res.status(200).json({data:result,message:"Success"})
    }
  })
});


//types
router.get('/fetch_all_types', function(req, res, next) {
  pool.query("select * from producttype where categoryid=?",[req.query.categoryid],function(error,result){
    if(error){
      console.log(error)
        res.status(500).json({data:[],message:'Server Error : Issue in Database'})
    }
    else{
        res.status(200).json({data:result,message:"Success"})
    }
  })
});



//brands
router.get('/fetch_all_brands', function(req, res, next) {
  pool.query("select * from brands where typeid=?",[req.query.typeid],function(error,result){
    if(error){
      console.log(error)
        res.status(500).json({data:[],message:'Server Error : Issue in Database'})
    }
    else{
        res.status(200).json({data:result,message:"Success"})
    }
  })
});
module.exports = router;
