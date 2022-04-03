class ApiFeacher{

    constructor(data, query){
        this.data = data
        this.query= query

    }

    filter(){
        const queryobj= {...this.query};

        const araryel= ['page', 'limit', 'sort'];
        araryel.forEach(el=> delete queryobj[el] );

        let queryStr = JSON.stringify(queryobj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  
      this.data = this.data.find(JSON.parse(queryStr));
  
      return this;
    }

    paginate(){
        const page = this.query.page * 1|| 1;
        const limit= this.query.limit * 1||100;
        const skip= (page - 1) * limit;

        this.data= this.data.find().skip(skip).limit(limit);
        return this;
    }

    
    sort(){
        if(this.query.sort){
            const sortby= this.query.sort;
            this.data= this.data.find().sort(sortby).split(',').join(' ')
        }
        // else{
        //     this.data= this.data.find().sort('creatAt')
        // }
        return this;
    }



}

module.exports= ApiFeacher