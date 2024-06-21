import redirects from "~/app/redirects/redirects.json";
import { type NextApiRequest, type NextApiResponse } from "next";

type RedirectEntry = {
  destination: string;
  permanent: boolean;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const pathname = req.query.pathname;
  if (!pathname) {
    return res.status(400).json({ message: "Bad Request" });
  }

  // Get the redirect entry from the redirects.json file
  const redirect = (redirects as Record<string, RedirectEntry>)["/listings"];

  // Account for bloom filter false positives
  if (!redirect) {
    return res.status(400).json({ message: "No redirect" });
  }

  // Return the redirect entry
  return res.json(redirect);
}
