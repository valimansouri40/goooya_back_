const mongoose= require('mongoose');
const User = require('./UserModels');

const RateAdvisorSchema= mongoose.Schema({
        Rate:{
            required:[true,''],
            type:Number,
            max:[5,''],
            min:[1,'']
        },
        RealStateId:{
            type:mongoose.Schema.ObjectId,
            ref:'RealState'
        },
        UserId:{
            type:mongoose.Schema.ObjectId,
            ref:'Authhh'
        },
        createAt:{
            type:Date,
            default: Date.now()
        }    
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

RateAdvisorSchema.index({ RealStateId: 1, UserId: 1 }, { unique: true });



RateAdvisorSchema.statics.calcAverageRatings= async function(RealStateId){

    const stats= await this.aggregate([
           { $match:{ UserId : RealStateId    }
        },
        {
            $group:{
                _id:'$UserId',
                sum:{$sum:1},
                rate:{$avg: '$Rate'}
            }
        }
    ]);
    if (stats.length > 0) {
        await User.findByIdAndUpdate(RealStateId, {
          RateAdvisor: stats[0].rate
        });
      } else {
        await User.findByIdAndUpdate(RealStateId, {
          ratingsQuantity: 0,
          RateAdvisor: 4.5
        });
      }

}

RateAdvisorSchema.post('save', function() {
    // this points to current review
    
    this.constructor.calcAverageRatings(this.UserId);


  });
  
  RateAdvisorSchema.pre(/^findOneAnd/, async function(next) {

    
    this.r = await this.findOne();

    next();
  });
  
  RateAdvisorSchema.post(/^findOneAnd/, async function() {
    // await this.findOne(); does NOT work here, query has already executed
    await this.r.constructor.calcAverageRatings(this.r.UserId);
  });
  
  RateAdvisorSchema.pre(/^findOneAnd/, async function(next) {
    this.r = await this.findOne();
    next();
  });
  
  RateAdvisorSchema.post(/^findOneAnd/, async function() {
    // await this.findOne(); does NOT work here, query has already executed
    await this.r.constructor.calcAverageRatings(this.r.UserId);
  });

const RateAdvisor= mongoose.model('RateAdvisor', RateAdvisorSchema);



module.exports=RateAdvisor;