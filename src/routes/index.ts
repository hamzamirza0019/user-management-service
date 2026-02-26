import { Router } from "express";
import { asyncHandler} from "../utils/asyncHandler.js"
import type { Request, Response } from "express";



const router = Router();

router.get("/health", asyncHandler(async (req: Request, res: Response) => {
    res.json({status: "ok"});
})
);

router.get(
  "/crash-test",
  asyncHandler(async () => {
    throw new Error("Async error caught!");
  })
);

export default router;