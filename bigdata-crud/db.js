require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");

let singleton;

async function connect() {
    if (singleton) return singleton;

    const client = new MongoClient(process.env.MONGO_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    await client.connect();

    singleton = client.db(process.env.MONGO_DATABASE);
    return singleton;
}

async function insert(customer) {
    const db = await connect();
    return db.collection("customers").insertOne(customer);
}

async function find() {
    const db = await connect();
    return db.collection("customers").find().toArray();
}

async function remove(id) { // Recebe o id como parâmetro
    const db = await connect();
    return db.collection("customers").deleteOne({ _id: new ObjectId(id) }); // Usa o id recebido
}

module.exports = {
    insert,
    find,
    remove
};
