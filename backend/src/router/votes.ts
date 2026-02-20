import { Router } from "express";
import { voteToday } from "../controllers/votes";
import { authMiddleware } from "../middleware/auth";


const router = Router();

router.post("/", authMiddleware, voteToday);
router.get("/results/:id", authMiddleware, );

export default router;
