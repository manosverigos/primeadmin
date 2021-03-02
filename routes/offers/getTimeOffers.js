const {
  MongoClient
} = require("mongodb");

const uri =
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.pbkow.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;
  
exports.getTimeOffers = async (req, res) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });


  try {
    await client.connect();
    const database = client.db('eshop');
    const collection = database.collection('offers');

    let result = await collection.find({}).toArray()

    result = result.filter(obj => obj.type == 'time')
    result.reverse()

    let _result;
    let filter = req.query.filter

    if(filter == 'not-completed'){
      _result = result.filter(obj => obj.completed == false)
    } else if (filter == 'completed') {
      _result = result.filter(obj => obj.completed == true)
    } else {
      _result = result
    }
    
    res.json({
      "result": _result
    });
  } catch(error) {
    console.log('oops')
    console.log(error)
    res.end()
  } finally {
    await client.close();
  }
}
  // db.loadDatabase()
  // db.find({}, (err, data) => {
  //   if (err) {
  //     res.send('Error')
  //     return
  //   }  
  // })
