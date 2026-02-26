import express from "express"
import apiRouter from "./routes/index.js"
import type { Request, Response, NextFunction } from "express";
import { ApiError } from "./utils/ApiError.js";


const app = express();

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));

app.use("/api", apiRouter);

app.use(
    (err:unknown, req:Request, res:Response, next: NextFunction)=>{
        if(err instanceof ApiError){
            return res.status(err.statusCode).json({
                success: false,
                message: err.message
            })
        }

        console.log("UNEXPECTED ERROR", err);

        res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
)



import userRoutes from "./routes/user.route.js"
import { globalErrorHandler } from "./middlewares/error.middleware.js";
app.use("/api/v1/users", userRoutes);

app.all("*", (req:Request, res:Response, next:NextFunction)=>{
    next(
        new ApiError({
            statusCode: 404,
            message: `Route ${req.url} not found`
        })
    )
})

app.use(globalErrorHandler);



export default app;