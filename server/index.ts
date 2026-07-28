import express from "express"
import cors from "cors";
import PokemonRouter from "./routes/pokemon.routes";
import userRouter from "./routes/user.routes";
const app = express();
const PORT = process.env.PORT || 4500;

// CORS configuration
const corsOptions = {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/pokemon", PokemonRouter)
app.use("/user", userRouter)


app.get("/", (req, res) => {
    res.send("Hello from Node + TypeScript AsdfPI!");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});