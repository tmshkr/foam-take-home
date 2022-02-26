import type { NextApiRequest, NextApiResponse } from "next";
import knex from "src/knex";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    res.status(405).json({ errorMessage: "Method not allowed" });
    return;
  }

  const { is_foaming } = req.body;
  res.status(200).json({ name: "John Doe" });
}
