const ProductModel=require("../models/ProductModel");
exports.ProductList=async(req,res)=>{
    try {
        let pageNo=Number(req.params.pageNo);
        let perPage=Number(req.params.perPage);
        let searchValue=req.params.searchKey;
        let skipValue=(pageNo-1)*perPage;
        let Total;
        let Rows;

        if(searchValue!=='0'){
            let SearchRgx={"$regex":searchValue,"$options":"i"};
            let SearchQuery={$or:[{title:SearchRgx},{
            category:SearchRgx},{remark:SearchRgx},
            {brand:SearchRgx}]};

            Total=await ProductModel.aggregate([{$match:SearchQuery},{$count:"total"}]);
            Rows=await ProductModel.aggregate([{$match:SearchQuery},{$skip:skipValue},{$limit:perPage}])

        }else{
            Total=await ProductModel.aggregate([{$count:"total"}]);
            Rows=await ProductModel.aggregate([{$skip:skipValue},{$limit:perPage}])
        }
        res.status(200).json({status: "success", total: Total, data: Rows});
    } catch (error) {
        res.status(200).json({status:"fail",error:console.log(error)});
    }
}