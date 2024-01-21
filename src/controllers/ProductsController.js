const ProductModel=require("../models/ProductModel");
exports.ProductList=async(req,res)=>{
    try {
        let pageNo=Number(req.params.pageNo);
        let perPage=Number(req.params.perPage);
        let searchValue=req.params.searchValue;
        let skipValue=(pageNo-1)*perPage;
        let data;
        let rows;

        if(searchValue!=='0'){
            let SearchRgx={"$regex":searchValue,"$options":"i"};
            let SearchQuery={$or:[{title:SearchRgx},{
            category:SearchRgx},{remark:SearchRgx},
            {brand:SearchRgx}]};

            data=await ProductModel.aggregate([{$match:SearchQuery},{$count:"total"}]);
            rows=await ProductModel.aggregate([{$match:SearchQuery},{$skip:skipValue},{$limit:perPage}])

        }else{
            data=await ProductModel.aggregate([{$count:"total"}]);
            rows=await ProductModel.aggregate([{$skip:skipValue},{$limit:perPage}])
        }
        res.status(200).json({status: "success", total: data, data: rows});
    } catch (error) {
        res.status(200).json({status:"fail",error:console.log(error)});
    }
}