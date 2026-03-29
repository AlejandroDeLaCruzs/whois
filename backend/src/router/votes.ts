import { Router } from "express";
import { myVoteById, ressults, voteToday } from "../controllers/votes";
import { authMiddleware } from "../middleware/auth";


const router = Router();

router.post("/:questionId", authMiddleware, voteToday);
router.get("/results/:id", ressults);
router.get("/myVote/:id",authMiddleware, myVoteById )

export default router;
