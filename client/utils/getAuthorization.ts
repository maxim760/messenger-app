import { IncomingMessage } from "http";
import { NextApiRequestCookies } from "next/dist/next-server/server/api-utils";
import { NextReq } from "../types";

export const getAuthorization = (req: NextReq) =>
  req.cookies.Authentication;
