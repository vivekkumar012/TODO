import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import userRoute from './Routes/userRoute.js';
import todoRouter from './Routes/todoRoute.js';


dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello I am vivek a full stack developer from india")
});


app.use("/api/v1/user", userRoute);
app.use("/api/v1/todo", todoRouter);

try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DataBase is Connected bro!!")
} catch (error) {
    console.log('Error in DB Connection, Check kar yaar')
}

const port = 3001 || process.env.PORT;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})