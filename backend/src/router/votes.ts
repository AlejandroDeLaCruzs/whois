import { Router } from "express";
import { myVoteById, voteToday } from "../controllers/votes";
import { authMiddleware } from "../middleware/auth";


const router = Router();

router.post("/", authMiddleware, voteToday);
router.get("/results/:id", authMiddleware, );
router.get("/myVote/:id",authMiddleware, myVoteById )

export default router;
