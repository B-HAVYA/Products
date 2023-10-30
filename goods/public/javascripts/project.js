 $(document).ready(function(){
    $.get('/category/fetch_all_category',function(data){

 
data.data.map((item)=>{
$('#categoryid').append($('<option>').text(item.categoryname).val(item.categoryid))

})
})

$('#categoryid').change(function(){

   $.get('/category/fetch_all_types',{categoryid:$('#categoryid').val()},function(data){
$('#typeid').empty()
$('#typeid').append($('<option>').text('Type'))
     data.data.map((item)=>{
     $('#typeid').append($('<option>').text(item.typename).val(item.typeid))
     
     })
     })

     

   
})


$('#typeid').change(function(){

   $.get('/category/fetch_all_brands',{typeid:$('#typeid').val()},function(data){
$('#Brand').empty()
$('#Brand').append($('<option>').text('Brands'))
     data.data.map((item)=>{
     $('#Brand').append($('<option>').text(item.Brandname).val(item.Brandid))
     
     })
     })

     

   
})


$('#picture').change(function(e){
   $('#productimage').attr('src',URL.createObjectURL(e.currentTarget.files[0]))
})

 
})