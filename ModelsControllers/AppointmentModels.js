const { default: mongoose } = require("mongoose");


const AppointmentSchema = new mongoose.Schema({
    Appointment:{
        type: String,
        required:[true, 'not exist Appointment'],
    },
    Time:{
        type: String,
        required:[true, 'not exist Appointment'],
    },
    RealStateId:{
        type: mongoose.Schema.ObjectId,
        ref: 'RealState',
        required: [true, 'Review can not be empty!']
        
    },
    RealStateNumber: {
        type: Number,
        required:[true, 'not exist rstnumber'] 
    },
    UserId:{
        type: mongoose.Schema.ObjectId,
        ref: 'Authhh',
      required: [true, 'Review can not be empty!']
    },
    AdvisorId:{
        type: mongoose.Schema.ObjectId,
        ref: 'Authhh',
      required: [true, 'Review can not be empty!']
    },
    Accept:{
        type:String,
        default: 'unseen',
        enum:['unseen', 'Pending','Accepted','decline']
      },
    createAt:{
        type: Date,
        default: Date.now()
    }
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

AppointmentSchema.index({RealStateId: 1 ,UserId: 1},{unique: true});

AppointmentSchema.pre(/find/, function(next){

    this.populate({
        path:'UserId',
        select: 'FristName  LastName  PhoneNumber _id role '
    })
    this.populate({
        path:'AdvisorId',
        select: 'FristName  LastName  PhoneNumber _id role '
    })
    this.populate({
        path:'RealStateId',
        select: ' Mortgage Measure City Area EsquierPhoneNumber EsquierName  _id TypeState SomeRoom '
    });

    next();
})

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;