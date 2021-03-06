import express from "express";
import axios from "axios";
import { API_KEY } from "../utils/constants";

export const router = express.Router();

type T = {
  accessToken: string;
};

const get = async ({ accessToken }: T) => {
  return (
    await axios.get(
      `https://www.googleapis.com/drive/v3/files/?pageSize=25&fields=*&key=${API_KEY}&access_token=${accessToken}`
    )
  ).data;
};

router.post("/", async (req, res) => {
  const { accessToken } = req.body.data;

  try {
    res.send({ data: await get({ accessToken }) });
  } catch (e: any) {
    console.error(e);
    res.status(403).send(e);
  }
});

module.exports = router;
