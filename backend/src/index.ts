import "dotenv/config"
import express from "express"
import { prisma } from "./db.js"

const app = express();
const PORT  = (process.env.PORT) || 3000; // or 3000 if the Port is NaN Not a number

app.use(express.json());

app.get("/health", (_req , res) =>{ // to check whether server is alive or not and _req becausae we dont need paramerter i.e recive parameter but i dont wanrt to use it  
    res.json({status:"ok"});
})

app.get("/db-check" , async (_req , res) => {
    const count = await prisma.user.count();
    console.log(count);
    res.json({users:count})
})

app.listen(PORT , () => {
    console.log(`Backebd is Listening at : ${PORT}`);
})