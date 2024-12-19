"use server";

import { cookies } from "next/headers";
import * as jose from "jose";
import {
  RequestCookies,
  ResponseCookies,
} from "next/dist/compiled/@edge-runtime/cookies";
import { AuthError } from "../utils";

type User = {
  username: string;
};

export const setLoginCookie = async (user: User) => {
  const cookieStore = await cookies();

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  if (!secret) {
    throw new AuthError("NO_JWT_SECRET");
  }

  const token = await new jose.SignJWT({ username: user.username })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("3d") // max age is 3 days bu this token will get updated on every request
    .sign(secret);

  cookieStore.set("clientAccessToken", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
};

export const verifyCookie = async (
  cookies: RequestCookies,
  setCookie: ResponseCookies
) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  if (!secret) {
    throw new AuthError("NO_JWT_SECRET");
  }

  const token = cookies.get("clientAccessToken")?.value;

  if (!token) {
    throw new AuthError("NO_TOKEN");
  }

  try {
    const decoded = await jose.jwtVerify(token, secret);

    const newToken = await new jose.SignJWT({
      username: decoded.payload.username,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("3d")
      .sign(secret);

    // resetting the token for extending the expiration time
    setCookie.set("clientAccessToken", newToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return decoded;
  } catch (error) {
    if (error instanceof jose.errors.JWTExpired) {
      throw new AuthError("TOKEN_EXPIRED");
    }

    if (error instanceof AuthError) {
      throw error;
    }

    throw new AuthError("INVALID_TOKEN");
  }
};

export const verifyTokenForClient = async () => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  if (!secret) {
    throw new AuthError("NO_JWT_SECRET");
  }

  const token = (await cookies()).get("clientAccessToken")?.value;

  if (!token) {
    throw new AuthError("NO_TOKEN");
  }

  try {
    const decoded = await jose.jwtVerify(token, secret);
    return decoded;
  } catch (error) {
    if (error instanceof jose.errors.JWTExpired) {
      throw new AuthError("TOKEN_EXPIRED");
    }

    if (error instanceof AuthError) {
      throw error;
    }
    throw new AuthError("INVALID_TOKEN");
  }
};

export const logoutClearCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("clientAccessToken");
};
