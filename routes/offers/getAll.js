const mongodb = require('mongodb');
const {
  MongoClient
} = require("mongodb");

const uri =
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.pbkow.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;
  
exports.getAllOffers = async (req, res) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });


  try {
    await client.connect();
    const database = client.db('eshop');
    const collection = database.collection('offers');

    let search = req.query.search
    let result = [];
    if(search) {
      result = await collection.find({$text: {$search: search}}).toArray()
      
      if(mongodb.ObjectID.isValid(search)){
        const o_id = new mongodb.ObjectID(search);
        let search_by_id = await collection.findOne({"_id": o_id})
        result.push(search_by_id)
      }

    }else{
      result = await collection.find({}).toArray()
    }

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
    
    const pageCount = Math.ceil(_result.length / 10);
    let page = parseInt(req.query.p);
    if (!page ) { page = 1;}
    if (page > pageCount) {
      page = pageCount
    }
    let finalResult = _result.slice(page * 10 - 10, page * 10)
    res.json({
      "page": page,
      "pageCount": pageCount,
      "result": finalResult
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
