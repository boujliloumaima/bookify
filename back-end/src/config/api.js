import express from "express";
import { Router } from "express";
import cookiesParser from "cookies-parser";

const router = Router();

router.post("set-cookie", (req, res) => {
  const { username } = req.body;
  res.cookie("user", username, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(200).send({ message: "Cookie cree avec succes !" });
});

router.get("/get-cookie", (req, res) => {
  const userCookie = req.cookies.user;

  if (userCookie) {
    res.status(200).send({ message: userCookie });
  } else {
    res.status(404).send({ message: "aucun cookie trouve !" });
  }
});

router.delete("/delete-cookie", (req, res) => {
  res.clearCookie("user");
  res.status(200).send({ message: "cookie supprime avec succes" });
});

export default router;
