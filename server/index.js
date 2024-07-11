import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
//import insert from './functions/insert.js';
//import getData from './functions/getData.js';
//import getIds from './functions/getIds.js';
//import deleteRow from './functions/deleteRow.js';
//import { IP2Location } from 'ip2location-nodejs';
import Url from './models/url.js';
import VCard from './models/vcard.js';
import Preview from './models/preview.js';
//import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';

dotenv.config({ path: '../.env' });


const uri = process.env.MONGO_URI


mongoose.connect(uri)
    .then(() => console.log("connected"))
    .catch(err => console.log(err));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
/*const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.urlencoded({limit: '10mb', extended: true}));
app.use(express.json({limit: '10mb'}));
app.use(cors({
    origin: 'https://dynamic-styled-qrcode-generator-1.onrender.com'
  }));


app.post('/sites', (req, res) => {
    const url = new Url(
        req.body
    );
    //console.log(preview)
    url.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
    //res.json(req.body);
    //const table = "sites";
    //const keys = Object.keys(req.body);
    //insert(req.body, keys, table);
})

app.post('/vcards', (req, res) => {
    const vcard = new VCard(
        req.body
    );
    //console.log(preview)
    vcard.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
    //res.json(req.body);
    //console.log(req.body);
    //const table = "vcards";
    //const keys = Object.keys(req.body);
    //insert(req.body, keys, table);
})

app.post('/previews', (req, res) => {
    //res.json(req.body)
    const preview = new Preview(
        req.body
    );
    //console.log(preview)
    preview.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
    //const table = "previews";
    //const keys = Object.keys(req.body);
    //insert(req.body, keys, table);
})

app.post('/medium', (req, res) => {
    res.json(req.body);
    //const ip = '62.74.186.0';
    //let ip2location = new IP2Location();
    //ip2location.open("../../../downloads/IP2LOCATION-LITE-DB1.IPV6.BIN/IP2LOCATION-LITE-DB1.IPV6.BIN");
    //let result = ip2location.getAll(ip).countryLong;
    //ip2location.close();
    //const urls = Url.find({ name: req.body.name }).select('_id')
    //const table = "sites";
    //const query = `SELECT id FROM ${table} WHERE name='${req.body.name}';`;
    /*async function waitForData() {
        let result = await getIds(ids, query);
        let id = result[0];
        if (id) {
            console.log("this item exists")
        } else {
            console.log("item does not exist")
        }
    }
    waitForData()*/
})

app.post('/sitesupdate', async (req, res) => {
    if (req.body.curTable === "vcards") {
        await VCard.deleteOne({ short: req.body.obj.short })
        const newUrl = new Url(
            req.body.obj
        );
        newUrl.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
    } else {
        await Url.findOneAndUpdate({ short: req.body.obj.short }, req.body.obj)
    }
})

app.post('/vcardsupdate', async (req, res) => {
    if (req.body.curTable === "urls") {
        await Url.deleteOne({ short: req.body.obj.short })
        const newVCard = new VCard(
            req.body.obj
        );
        newVCard.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
    } else {
        await VCard.findOneAndUpdate({ short: req.body.obj.short }, req.body.obj)
    }
})

/*app.post('/deletepreviews', (req, res) => {
    res.json(req.body);
    console.log(req.body);
    const table = "previews";
    const id = req.body.id;
    deleteRow(table, id);
})*/

/*app.get('/vcardid', (req, res) => {
    const table = "vcards";
    let ids = [];
    const query = `SELECT id FROM ${table} ORDER BY id DESC LIMIT 1;`
    async function waitForData() {
        let result = await getIds(ids, query);
        res.send(result);
    }
    waitForData();

})*/

/*app.get('/previewid', (req, res) => {
    const table = "previews";
    let ids = [];
    const query = `SELECT id FROM ${table} ORDER BY id DESC LIMIT 1;`
    async function waitForData() {
        let result = await getIds(ids, query);
        res.send(result);
    }
    waitForData();
    
})*/

app.get('/fetchedsites', async (req, res) => {
    //let sites = [];
    //const table = "urls";
    /*const query = `SELECT * FROM ${table};`;
    async function waitForData() {
        let result = await getData(sites, query);
        res.send(result);
    }
    waitForData();*/
        try {
            const data = await Url.find();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
})

app.get('/fetchedvcards', async (req, res) => {
    /*let vCards = [];
    const table = "vcards";
    const query = `SELECT * FROM ${table};`;
    async function waitForData() {
        let result = await getData(vCards, query);
        res.send(result);
    }
    waitForData();*/
    try {
        const data = await VCard.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/fetchedpreviews', async (req, res) => {
    /*let previews = [];
    const table = "previews";
    const query = `SELECT * FROM ${table};`;
    async function waitForData() {
        let result = await getData(previews, query);
        res.send(result);
    }
    waitForData();*/
    try {
        const data = await Preview.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})





app.listen(PORT, () => {
    console.log(`listening on port, ${PORT}`)
})