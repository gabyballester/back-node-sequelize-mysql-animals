import { Router } from "express";
import { isAuthMd } from "../../middlewares/auth.middleware";
import {
  createLike,
  getAllLikes,
  getOneLike,
  updateOneLike,
  deleteOneLike,
  deleteAllLikes,
} from "../controllers/like.controller";
const router = Router();

//Rutas /api/likes/
router.post("/", isAuthMd, createLike);
router.get("/", isAuthMd, getAllLikes);
router.get("/:id", isAuthMd, getOneLike);
router.put("/:id", isAuthMd, updateOneLike);
router.delete("/:id", isAuthMd, deleteOneLike);
router.delete("/", isAuthMd, deleteAllLikes);

export default router;
