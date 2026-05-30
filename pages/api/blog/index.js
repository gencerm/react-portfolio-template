import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { getRandomImage } from "../../../utils";

const SLUG_RE = /^[a-zA-Z0-9_-]+$/;

export default function handler(req, res) {
  if (process.env.NODE_ENV !== "development") {
    return res.status(200).json({ name: "This route works in development mode only" });
  }

  if (req.method === "POST") {
    const postsfolder = join(process.cwd(), `/_posts/${uuidv4()}.md`);
    const data = matter.stringify("# New Blog", {
      date: new Date().toISOString(),
      title: "New Blog",
      tagline: "Amazing New Blog",
      preview:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      image: getRandomImage(),
    });
    fs.writeFileSync(postsfolder, data);
    return res.status(200).json({ status: "CREATED" });
  }

  if (req.method === "DELETE") {
    const { slug } = req.body;
    if (!slug || !SLUG_RE.test(slug)) {
      return res.status(400).json({ error: "Invalid slug" });
    }
    const deleteFile = join(process.cwd(), "_posts", `${slug}.md`);
    fs.unlinkSync(deleteFile);
    return res.status(200).json({ status: "DONE" });
  }

  res.status(405).json({ error: "Method not allowed" });
}
