import { IncomingMessage } from "http"
import { NextApiRequestCookies } from "next/dist/next-server/server/api-utils"

export type IWithTimeStamps<T> = T & { createdAt?: string | number, updatedAt?: string | number }
export enum STATUS {
  NEVER="NEVER",
  LOADING="LOADING",
  ERROR="ERROR",
  SUCCESS="SUCCESS",
}

export type NextReq = IncomingMessage & {
  cookies: NextApiRequestCookies;
}