import "dotenv/config"
import express from "express"
import { prisma } from "./db.js"  // .js using ensures the paths remain valid after compilation (avoid runtime module resolution issues)
import { authRouter } from "./routes/auth-router.js";
import { sendToEngine, sendResponseLoop } from "./utils/broker.js";

const app = express();
const PORT  = Number(process.env.PORT) || 3000; // or 3000 if the Port is NaN Not a number

app.use(express.json());

app.get("/health", (_req , res) =>{ // to check whether server is alive or not and _req becausae we dont need paramerter i.e recive parameter but i dont wanrt to use it  
    res.json({status:"ok"});
})

app.use("/api/vi/auth", authRouter);

app.get("/db-check" , async (_req , res) => {
    const count = await prisma.user.count();
    console.log(count);
    res.json({users:count})
})

app.get("/debug/ping-engine", async (_req, res)=>{
   try {
        const result = await sendToEngine("get_depth",{market:"BTC_USDT"});
        // LPUSH response-queue-1 "{\"correlationId\":\"c8d72c2c-4599-4ead-86ea-22e0edb74672\",\"payload\":{\"bids\":[],\"asks\":[]}}"
        // to be done withing timer 
        res.json(result);    
   } catch (err) {
        res.status(500).json({error: (err as Error).message});
   } 
})

app.listen(PORT , () => {
    console.log(`Backebd is listening at : ${PORT}`);
})

sendResponseLoop().catch((err)=>{
    console.error("response loop crashed:", err);
    process.exit(1);
});
