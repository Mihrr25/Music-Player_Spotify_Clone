import express from "express";
import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
let app = express();
app.use(express.json());
app.use(express.urlencoded());
async function connectToMongo() {
    await mongoose.connect(process.env.mylink, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
};

const play = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    songs: [{
        name: String,
        artist: String,
        link: String
    }]
})
const ourUser = new mongoose.Schema({
    username: String,
    password: String,
    playlist: [{
        title: String,
        description: String,
        image: String,
        songs: [{
            name: String,
            artist: String,
            link: String,
            simage:String
        }]
    }]
})
function getCurrentFormattedDate() {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentDate = new Date();
    const monthName = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();

    return `${monthName} ${day}, ${year}`;
}
app.use(cors());
const localPlaylist = mongoose.model("localplaylist", play);
const users = mongoose.model("users", ourUser);
app.get('/localPlay', async (req, res) => {
    let ans = await localPlaylist.find()
    res.send(JSON.stringify(ans));
    console.log("send")
    
});
app.post('/api/fetchuser', async (req, res) => {
    let obj= await users.findOne({username:req.body.username});
    res.send(JSON.stringify(obj));
    console.log("obj")
    
})
app.post('/api/addPlaylist', async (req, res) => {
    // console.log(req.body);
    console.log("Creating")
    let obj={
        title:req.body.playlistName,
        description:`Created on ${getCurrentFormattedDate()}`,
        image:"",
        songs:[]
    }
    await users.updateOne(
        { username: req.body.username },
        { $push: { playlist: obj } }
    );
    let ans= await users.findOne({username:req.body.username});
    let fans = ans.playlist.find(ele=> ele.title===req.body.playlistName)
    console.log(fans);
    res.send(fans);
    console.log("Created")

})
app.post('/api/addSong', async (req, res) => {
    console.log(req.body);
    const user = await users.findOne({ username:req.body.username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const playlist = user.playlist.find(p => p._id == req.body.playlist);
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        // Add the new song to the playlist's songs array
        playlist.songs.push(req.body.song);
        if(playlist.songs.length===1){
            playlist.image=req.body.song.simage;
        }
        // Save the updated user document
        await user.save();
        let a= await users.findOne({ username:req.body.username })
        let ans={
            username:a.username,
            playlist:a.playlist
        }
        res.send(ans);
})

app.put('/api/createuser',async (req,res)=>{
    let demo=new users({
        username:req.body.username,
        password:req.body.newpas,
        playlists:[]
    })
    console.log("created")
    await demo.save();
    console.log(req.body)
    let obj= await users.findOne({username:req.body.username});
    res.send(JSON.stringify(obj));

})
app.listen(5000, async () => {
    console.log("server");
    await connectToMongo()
    console.log("connected")
})