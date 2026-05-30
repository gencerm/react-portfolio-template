import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const SLUG_RE = /^[a-zA-Z0-9_-]+$/;

export default function handler(req, res) {
  if (process.env.NODE_ENV !== "development") {
    return res.status(200).json({ name: "This route works in development mode only" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { slug, content, variables } = req.body;
  if (!slug || !SLUG_RE.test(slug)) {
    return res.status(400).json({ error: "Invalid slug" });
  }

  const { date, title, tagline, preview, image } = variables;
  const filePath = join(process.cwd(), "_posts", `${slug}.md`);
  fs.writeFile(
    filePath,
    matter.stringify(content, { date, title, tagline, preview, image }),
    "utf-8",
    (err) => { if (err) console.error(err); }
  );
  res.status(200).json({ status: "DONE" });
}
