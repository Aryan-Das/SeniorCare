const { MongoClient, ServerApiVersion } = require ("mongodb");

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log(
   "successfully connected to mongodb"
  );
} catch(err) {
  console.error(err);
}

let db = client.db("patients");

export default db;