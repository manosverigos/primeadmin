const mongodb = require('mongodb');
const {
  MongoClient
} = require("mongodb");

const uri =
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.pbkow.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;

exports.applyEdit = async (req, res) => {
  const data = req.body;

  const id = data._id
  const o_id = new mongodb.ObjectID(id);

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  let info = {
    title: data.title,
    product: data.product,
    comment: data.comment
  }

  if (data.endDate) {
    info.endDate = data.endDate
  } else if (data.sales_num) {
    info.sales_num = data.sales_num
  }

  try {
    await client.connect();
    const database = client.db('eshop');
    const collection = database.collection('offers');

    const filter = {
      "_id": o_id
    }
    const updateDoc = {
      $set: info
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
  //   _id: data._id
  // }, {
  //   $set: info
  // }, (err, numReplaced) => {})
  // res.redirect('/offers')
  // //res.redirect('/offers')
}