const { default: mongoose } = require("mongoose");


const SearchQuerySchema= new mongoose.Schema({
        queryObj:{
            type: Object
        },
        createAt:{
            type: Date,
            default: Date.now()
        }
})


const SearchQuery = mongoose.model('SearchQuery', SearchQuerySchema);

module.exports = SearchQuery;