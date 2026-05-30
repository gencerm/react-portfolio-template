import fs from "fs";
import { join } from "path";

export default function handler(req, res) {
  const portfolioData = join(process.cwd(), "/data/portfolio.json");
  if (process.env.NODE_ENV === "development") {
    if (req.method === "POST") {
      fs.writeFileSync(portfolioData, JSON.stringify(req.body), "utf-8");
      return res.status(200).json({ status: "DONE" });
    }
    return res.status(405).json({ error: "Method not allowed" });
  }
  res.status(200).json({ name: "This route works in development mode only" });
}
