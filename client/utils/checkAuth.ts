import { IncomingMessage } from "http";
import { GetServerSideProps } from "next";
import { apiUser } from "../services/api/apiUser";
import { NextReq } from "../types";
import { getAuthorization } from "./getAuthorization";

export const checkAuth = async (req: NextReq) => {
  try {
    const user = await apiUser.getProfile(getAuthorization(req))
    return user
  } catch {
    return null
  }
}