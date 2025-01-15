
const Patient = require("../db/models/PatientModel");

exports.register = async(req, res) => {
    const newPatient = await new Patient({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        dateOfBirth : req.body.dateOfBirth,
        email : req.body.email,
      })
      res.status(201).send(newPatient);
      try {
        await newPatient.save();
        
        
      } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
      }
}