// Hash
import bcrypt from "bcryptjs";

// Constants
import {
  JWT_SECRET_KEY_VARIABLE,
  LOGIN_COOKIE_NAME_VARIABLE,
  LOGIN_EXPIRATION_MINUTES_VARIABLE,
  LOGIN_EXPIRATION_STRING_VARIABLE,
} from "../constants";

// Next
import { cookies } from "next/headers";

// Jose JWT
import { SignJWT, jwtVerify } from "jose";

const jwtSecretKey = JWT_SECRET_KEY_VARIABLE;
const jwtSecretKeyEncoded = new TextEncoder().encode(jwtSecretKey);

const loginExpirationInMinutes = LOGIN_EXPIRATION_MINUTES_VARIABLE;
const loginExpirationString = LOGIN_EXPIRATION_STRING_VARIABLE;
const loginCookieName = LOGIN_COOKIE_NAME_VARIABLE;

// CREATE PASS HASH
export async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, 10); // Created hash of pass.
  const base64 = Buffer.from(hash).toString("base64"); // Wrapper hash pass in base64.
  return base64;
}

// CHECK PASS HASH
export async function checkPassword(password: string, base64Hash: string) {
  const hash = Buffer.from(base64Hash, "base64").toString("utf-8"); // Unpack hash pass to check compare.
  return bcrypt.compare(password, hash);
}

// CREATE COOKIE
export async function createLoginSession(username: string) {
  const expiresAt = new Date(Date.now() + loginExpirationInMinutes);
  console.log(typeof expiresAt);

  // TODO: Set JWT here.
  const loginSession = await signJWT({ username, expiresAt });

  const cookieStore = await cookies(); // Create cookie here.

  // Set config cookie.
  cookieStore.set(loginCookieName, loginSession, {
    httpOnly: true, // Only read into server and not in browser.
    secure: true, // Only read https.
    sameSite: "strict", // TODO: add comment about semeSite.
    expires: expiresAt, // Time expires of cookie.
  });
}

// DELETE COOKIE
export async function deleteLoginSession() {
  const cookieStore = await cookies(); // Create cookie here.

  cookieStore.set(loginCookieName, "", { expires: new Date(0) }); // Config cookie from set expirate date now berfore remove cookie.
  cookieStore.delete(loginCookieName); // Removing cookie.
}

// SIGN JWT
type JWTPayloadProps = {
  username: string;
  expiresAt: Date;
};

export async function signJWT(JWTPayload: JWTPayloadProps) {
  return new SignJWT(JWTPayload)
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setIssuedAt()
    .setExpirationTime(loginExpirationString)
    .sign(jwtSecretKeyEncoded);
}
