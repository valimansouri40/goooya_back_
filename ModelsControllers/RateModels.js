const mongoose= require('mongoose');
const RealState = require('./RealStateModels');

const RateSchema= mongoose.Schema({
      Message:{
        required:[true,''],
        type:String,
        },
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
        Accept:{
          type: String,
          default: 'not',
          enum:['ok', 'not']
        },
        createAt:{
            type:Date,
            default: Date.now()
        }    
});

RateSchema.pre(/find/, async function(next){
        this.populate({
          path:'UserId',
          select: 'FristName Image LastName  PhoneNumber _id role '
      })
      this.populate({
          path:'RealStateId',
          select: ' Mortgage Measure City RealStateNumber Area EsquierPhoneNumber EsquierName  _id TypeState SomeRoom '
      });
      next();
})
// RateSchema.index({ RealStateId: 1, UserId: 1 }, { unique: true });



// RateSchema.statics.calcAverageRatings= async function(RealStateId){

//     const stats= await this.aggregate([
//            { $match:{ RealStateId : RealStateId    }
//         },
//         {
//             $group:{
//                 _id:'$RealStateid',
//                 sum:{$sum:1},
//                 rate:{$avg: '$Rate'}
//             }
//         }
//     ]);

//     if (stats.length > 0) {
//         await RealState.findByIdAndUpdate(RealStateId, {
//           ratingQuntity: stats[0].sum,
//           rating: stats[0].rate
//         });
//       } else {
//         await RealState.findByIdAndUpdate(RealStateId, {
//           ratingsQuantity: 0,
//           rating: 4.5
//         });
//       }

// }

// RateSchema.post('save', function() {
//     // this points to current review
    
//     this.constructor.calcAverageRatings(this.RealStateId);


//   });
  
//   RateSchema.pre(/^findOneAnd/, async function(next) {

    
//     this.r = await this.findOne();

//     next();
//   });
  
//   RateSchema.post(/^findOneAnd/, async function() {
//     // await this.findOne(); does NOT work here, query has already executed
//     await this.r.constructor.calcAverageRatings(this.r.RealStateId);
//   });
  // // findByIdAndUpdate
  // // findByIdAndDelete
  // RateSchema.pre(/^findOneAnd/, async function(next) {
  //   this.r = await this.findOne();
  //    console.log(this.r,'this.r');
  //   next();
  // });
  
  // RateSchema.post(/^findOneAnd/, async function() {
  //   // await this.findOne(); does NOT work here, query has already executed
  //   await this.r.constructor.calcAverageRatings(this.r.RealStateId);
  // });

const Rate= mongoose.model('Rate', RateSchema);



module.exports=Rate;