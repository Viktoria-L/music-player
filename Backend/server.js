import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import session from "express-session";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import cors from "cors";

// Express setup
const port = 3000;
const app = express();
const saltRounds = 10;

const corsOptions = {
  origin: "http://localhost:5174", // Eller vilken URL din frontend använder
  credentials: true, // Detta tillåter cookies och autentiseringstokens att skickas med requests
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "shhhh, very secret",
  })
);

// MongoDB setup
const client = new MongoClient("mongodb://127.0.0.1:27017");
await client.connect();
const db = client.db("MusicPlayerDB");
const usersCollection = db.collection("users");
const playlistsCollection = db.collection("playlists");
const favoritesCollection = db.collection("favorites");

// Middleware for authentication
const restrict = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send({ error: "Unauthorized access" });
  }
};

// Routes
app.post("/api/register", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.pass, saltRounds);
    const newUser = await usersCollection.insertOne({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      user: req.body.user,
      pass: hash,
    });
    res.json({ user: req.body.user });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const user = await usersCollection.findOne({ user: req.body.user });
    const passwordsMatch = await bcrypt.compare(req.body.pass, user.pass);
    if (user && passwordsMatch) {
      req.session.user = { id: user._id, username: user.user };
      res.json({ id: user._id, user: user.user });
      console.log("Session Data:", req.session.user);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(401).json({ error: "Login failed" });
  }
});

app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ loggedin: false });
  });
});

app.get("/api/favorites", restrict, async (req, res) => {
  const favorites = await favoritesCollection
    .find({ userId: req.session.user.id })
    .toArray();
  res.json(favorites);
});

app.post("/api/favorites", restrict, async (req, res) => {
  const favorite = await favoritesCollection.insertOne({
    userId: req.session.user.id,
    songId: req.body.songId,
  });
  res.json(favorite);
});

app.get("/api/playlists", restrict, async (req, res) => {
  const playlists = await playlistsCollection
    .find({ userId: req.session.user.id })
    .toArray();
  res.json(playlists);
});

app.post("/api/playlists", restrict, async (req, res) => {
  const playlist = await playlistsCollection.insertOne({
    userId: req.session.user.id,
    name: req.body.name,
    songs: [],
  });
  res.json(playlist);
});

app.put("/api/playlists/:id", restrict, async (req, res) => {
  const updateResult = await playlistsCollection.findOneAndUpdate(
    { _id: new ObjectId(req.params.id), userId: req.session.user.id },
    { $push: { songs: req.body.songId } }
  );
  res.json(updateResult);
});

// 404 Middleware
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Listening
app.listen(port, () => console.log(`Listening on port ${port}`));
