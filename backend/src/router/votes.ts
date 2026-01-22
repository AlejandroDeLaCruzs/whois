import { Router } from "express";
import { voteToday } from "../controllers/votes";


const router = Router();

router.post("/", voteToday);

export default router;
