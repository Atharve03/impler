import express from 'express';

import cors from 'cors';
import path from "path"
import productRoute from "./routes/product.route.js"
import orderRoute from "./routes/order.route.js"

const app = express();


app.use(express.json());
app.use(cors());

app.use("/api/v1/product", productRoute);
app.use("/api/v1/order",orderRoute)


//Intializing the application
app.listen(5000 || process.env.PORT, () => {
  console.log(`app listening on port ${5000 || process.env.PORT}`);
});