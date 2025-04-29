import { authOptions } from "./auth";
import { getToken } from "next-auth/jwt";

export { authOptions };

export async function getUser(req: any) {
  return await getToken({ req });
}
