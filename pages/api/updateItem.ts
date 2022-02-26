import type { NextApiRequest, NextApiResponse } from "next";
import knex from "src/knex";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    res.status(405).json({ errorMessage: "Method not allowed" });
    return;
  }
  for (const field of ["key", "is_foaming"]) {
    if (!req.body.hasOwnProperty(field)) {
      res.status(400).json({ errorMessage: "Bad request" });
      return;
    }
  }

  const { key, is_foaming } = req.body;

  await knex("images").where({ key }).update({ is_foaming });
  res.status(200).json({ key, is_foaming });
}
