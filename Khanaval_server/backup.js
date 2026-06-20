import {MongoClient} from "mongodb"
import fs from "fs"
const uri = "mongodb+srv://kr551344_db_user:Omc4myEqagitnbC4@cluster0.rglsnkd.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

async function exportUsers() {
  await client.connect();

  const users = await client
    .db("test")
    .collection("subscriptions")
    .find({})
    .toArray();

  fs.writeFileSync("subscriptions_backup.json", JSON.stringify(users, null, 2));

  await client.close();
}

exportUsers();
