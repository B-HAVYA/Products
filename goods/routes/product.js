var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')
/* GET home page. */
router.get('/productinterface', function(req, res, next) {
  res.render('productinterface',{message:''});
});


router.post('/submit_products',upload.single('picture'),function(req,res){
console.log("Body",req.body);
console.log("File",req.file);
  pool.query('insert into products(categoryid, typeid, brandid, productname, description, price, offerprice, stock, gst, status, gift, picture)values(?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.categoryid,req.body.typeid,req.body.brandid,req.body.productname,req.body.description,req.body.price,req.body.offerprice,req.body.stock,req.body.gst,req.body.status,req.body.gift+"",req.file.filename],function(error,result){
    if(error){
      res.render('productinterface',{message:"Server error :Failed to submit records"})
    }
    else{
      
      res.render('productinterface',{message:"Records submitted successfully"})
    }

  })
})


router.get('/display', function(req, res, next) {
  pool.query('SELECT P.*, (SELECT C.categoryname FROM category C WHERE C.categoryid = P.categoryid) AS categoryname,(SELECT T.typename FROM producttype T WHERE T.typeid = P.typeid) AS typename,(SELECT B.brandname FROM brands B WHERE B.brandid = P.brandid) AS brandname FROM products P;',function(error,result){
    if(error){
      res.render('display',{data:[],status:false,message:"Server Error"})
    }
    else{
      if(result.length==0){ res.render('display',{data:[],status:false,message:"Record Not Found"})
    }
  else{
    res.render('display',{data:result,status:true,message:"Success"})
    
  }

     }
  })
  

});


router.get('/editdisplay', function(req, res, next) {
  pool.query('SELECT P.*, (SELECT C.categoryname FROM category C WHERE C.categoryid = P.categoryid) AS categoryname,(SELECT T.typename FROM producttype T WHERE T.typeid = P.typeid) AS typename,(SELECT B.brandname FROM brands B WHERE B.brandid = P.brandid) AS brandname FROM products P where P.productid=?;',[req.query.productid],function(error,result){
    if(error){
      res.render('editdisplay',{data:[],status:false,message:"Server Error"})
    }
    else{
     
    res.render('editdisplay',{data:result[0],status:true,message:"Success"})
    
  

     }
  })
  

});

module.exports = router;
