const { default: mongoose } = require("mongoose");


const MarkSchema = new mongoose.Schema({
        UserId:{
            type: mongoose.Schema.ObjectId,
            ref: 'Authhh'
        },
        RealStateId:{
            type: mongoose.Schema.ObjectId,
            ref: 'RealState' 
        },
        createAt:{
            type: Date,
            default: Date.now()
        }
},{
    toJSON:{virtuals: true},
    toObject: {virtuals: true}
})

MarkSchema.index({RealStateId: 1, UserId: 1}, {unique: true});

MarkSchema.pre(/find/, function(next){

    this.populate({
        path:'UserId',
        select: 'FristName  LastName  PhoneNumber _id role '
    })
    this.populate({
        path:'RealStateId',
        select: 'Image Mortgage Measure  _id TypeState SomeRoom '
    });

    next();
})

const Mark = mongoose.model('Mark', MarkSchema);

module.exports = Mark;