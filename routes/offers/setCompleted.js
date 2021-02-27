const mongodb = require('mongodb');
const {
  MongoClient
} = require("mongodb");

const uri =
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.pbkow.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;

exports.setCompleted =  async (req, res) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const id = req.query.id
  const o_id = new mongodb.ObjectID(id);
  try {
    await client.connect();
    const database = client.db('eshop');
    const collection = database.collection('offers');

    const filter = {
      "_id": o_id
    }
    const updateDoc = {
      $set: {
        completed: true,
        overdue: false,
        warning: 'done'
      }
    }
    const result = await collection.updateOne(filter, updateDoc);
  } catch {
    console.log('oops')
  } finally {
    await client.close();
    res.redirect('/offers')
  }
  // db.loadDatabase()
  // db.update({
  //   _id: id
  // }, {
  //   $set: {
  //     completed: true,
  //     overdue: false
  //   }
  // }, (err, numReplaced) => {
  // })
}