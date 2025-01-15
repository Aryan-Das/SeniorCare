const express =require("express");
const cors =require('cors')
const {record} = require ("./routes/record.js");
//import accounts  from "./routes/accounts.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
//app.use(bodyParser.json());
//app.use(cookieParser());
app.use(cors());
//app.use("/api", accounts);
