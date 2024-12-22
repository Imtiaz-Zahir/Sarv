import { sign, verify } from "jsonwebtoken";

type TokenData = {
  name: string;
  email: string;
};

const secret = process.env.JWT_SECRET as string;
if (!secret) throw new Error("JWT_SECRET is not defined");

export function generateToken({ name, email }: TokenData) {
  return sign({ name, email }, secret);
}

export function verifyToken(token: string) {
  try {
    return verify(token, secret) as TokenData;
  } catch (error) {
    console.error(error);
    return null;
  }
}
