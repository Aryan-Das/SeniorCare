
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const PatientModel = require("./models/PatientModel");
const UserModel = require("./models/UserModel")
let jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const bcrypt = require('bcryptjs/dist/bcrypt');
const cookieParser = require('cookie-parser');

// Connect to MongoDB
const atlas_uri = process.env.ATLAS_URI || "";
mongoose.connect(atlas_uri, { useNewUrlParser: true, useUnifiedTopology: true });
// Define routes and middleware


app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);
});

app.use(cors({
    origin: 'http://localhost:5173',  // Frontend URL
    credentials: true,               // Allow credentials (cookies) to be sent
}));

app.use(cookieParser());
app.use(express.json());



app.post('/patients',auth, async (req,res)=>{
    const newPatient = new PatientModel(req.body);
    try{
        await newPatient.save();
        res.json(newPatient);
    }catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
})

app.get('/patients', auth, async(req,res) => {
    const patients = await PatientModel.find();
    res.json(patients);
})


//update specific patient
app.put('/patients/:id',auth,async(req,res)=>{
    try{
        const updatedPatient = await PatientModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updatedPatient);
    }catch(error){
        console.log(error);
        res.status(404).send("Could not find patient");
    }
   
})

//get specific patient
app.get('/patients/:id', auth,async(req,res)=>{
    try{
        const patient = await PatientModel.findById(req.params.id);
        
        res.json(patient);
    }
    catch(error){
        console.log(error);
        res.status(404).send("Could not find patient");
    }
   
})

app.delete('/patients/:id',auth, async(req,res)=>{
    
    await PatientModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Patient Successfully Deleted' });
})

app.post("/users/register",async (req,res)=>{
    try{
        const {email,firstName, lastName,password, passwordVerify} = req.body;
        if(!email || !firstName || !lastName || !password || !passwordVerify){
            return res.status(400).json({errorMessage: "Please enter all required fields!"});

        }
        if(password.length < 6){
            return res.status(400).json({errorMessage: "Please enter a password with at least 6 characters!"});
        }
        if(password != passwordVerify){
            return res.status(400).json({errorMessage: "Passwords must match!"});
        }
        const existingUser = await UserModel.findOne({email:email});
        if(existingUser){
            return res.status(400).json({errorMessage: "Account with this email already exists!"});
        }

        const newUser = new UserModel({email,firstName,lastName,password})
        const savedUser = await newUser.save();

        res.status(201).json({message:"signed up",success:true});
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

app.post("/users/signin",async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({errorMessage: "Please enter all required fields!"});

        }
        const existingUser =  await UserModel.findOne({email:email});
        if(!existingUser){
            return res.status(400).json({errorMessage: "Wrong email or password"});
        }
       
        const passwordCorrect = await bcrypt.compare(password,existingUser.password);
        if (!passwordCorrect){
            return res.status(400).json({errorMessage: "Wrong email or password"});
        }
        const token =jwt.sign(
            {
                user: existingUser._id,
            },
            process.env.JWT_SECRET
        )
        console.log(token)
                
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); 

        res.setHeader('Access-Control-Allow-Credentials', 'true'); 
        
        console.log('Setting cookie...');
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: 'Lax',
            path: '/',
            maxAge: 86400000, // Optional: cookie expiration time (1 day)
        });
        console.log('Cookie set');
        res.status(201).json({message:"logged in",success:true});

    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
})
app.get('/set-simple-cookie', (req, res) => {
    res.cookie("testCookie", "someValue", {
      httpOnly: true,       // Prevents client-side JavaScript from accessing the cookie
      secure: false,        // Set to true for HTTPS, false for HTTP (in development)
      sameSite: 'None',     // Required for cross-origin cookies
      path: '/',            // Cookie accessible on all paths
      maxAge: 86400000      // Cookie expires in 1 day
    });
    res.json({ message: 'Cookie is set' });
    /*If you're moving to production later, keep in mind that you'll likely need to switch to SameSite=None with Secure=true once you switch to HTTPS. */
  });
app.get('/check-cookies', (req, res) => {
    console.log('Cookies:', req.cookies);  // Log cookies object to the console

    const testCookie = req.cookies.testCookie;
    if (testCookie) {
        return res.json({ message: 'Cookie found', cookie: testCookie });
    } else {
        return res.status(400).json({ message: 'Cookie not found' });
    }
});
app.get("/users/logout",(req,res)=>{
    res.cookie("token","",{
        httpOnly:true,
        expires: new Date(0)
    }).send();
})