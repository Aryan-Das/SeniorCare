const mongoose = require('mongoose')
const medSchema = new mongoose.Schema(
    {
        medName : {
            type:String,
            minLength:1,
        },
        strengthAndQuantity:{
            type:String,
            minLength:1,
        },
        instructions:{
            type:String,
            minLength:1,
        },
        expirationDate:{
            type:Date,
        },
        dateFilled:{
            type:Date,
        },
        dateStarted:{
            type:Date,
            default: Date.now
        },
        prescribingPhysician:{
            type:String,
            minLength: 1
        },
        prescriptionNumber:{
            type:String,
            minLength: 1
        },
        noRefills:{
            type:String,
            minLength: 1
        },
        pharmacyName:{
            type:String,
            minLength: 1
        },
    }
);

const patientSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,  
            minLength: 1,
        },
        dateOfBirth:{
            type: Date,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        medications: {
            type: [medSchema],
        },


    },
    {timestamps: true}
);
module.exports = mongoose.model("Patient", patientSchema);