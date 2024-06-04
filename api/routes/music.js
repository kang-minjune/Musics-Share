import express from "express";
import { getListGenre,
         getListGenres,
         postListGenre,
         updateListGenre, 
         deleteListGenre } from "../controllers/music.js";

const router = express.Router();

router.get("/:id", getListGenre); //해당 id 노래 정보 출력 라우터
router.get("/", getListGenres); //모든 노래 정보 출력 라우터
router.post("/musicpost", postListGenre);
router.put("/edit/:id", updateListGenre); //음악 정보 수정.
router.delete("/delete/:id", deleteListGenre); //음악정보 삭제

export default router;