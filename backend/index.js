import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'


dotenv.config();
const app = express();

app.use(express.json())

app.get("/", () => {
    res.send("Hello I am vivek a full stack developer from india")
})

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