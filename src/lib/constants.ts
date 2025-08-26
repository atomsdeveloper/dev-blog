export const SIMULATE_AWAIT_PROMISE_IN_MS_VARIABLE = Number(
  process.env.SIMULATE_AWAIT_PROMISE_IN_MS || 0
);

// 900 KB * 1024 MB = 921600 bytes;
export const IMAGE_UPLOADER_MAX_SIZE_VARIABLE = Number(
  process.env.IMAGE_UPLOADER_MAX_SIZE || 921600
);

export const IMAGE_UPLOAD_DIRECTORY_VARIABLE =
  process.env.IMAGE_UPLOAD_DIRECTORY?.toString() ?? "";

export const IMAGE_SERVER_DOMAIN_VARIABLE =
  process.env.IMAGE_SERVER_DOMAIN?.toString() || "";

export const JWT_SECRET_KEY_VARIABLE = process.env.JWT_SECRET_KEY || "";

// Js use mileseconds, so should be multiply per 1000 for get minutes.
export const LOGIN_EXPIRATION_MINUTES_VARIABLE =
  Number(process.env.LOGIN_EXPIRATION_SECONDS || 84600) * 1000;

export const LOGIN_EXPIRATION_STRING_VARIABLE =
  process.env.LOGIN_EXPIRATION_STRING || "1d";

export const LOGIN_COOKIE_NAME_VARIABLE =
  process.env.LOGIN_COOKIE_NAME || "LOGIN_SESSION";

export const LOGIN_USER_VARIABLE = process.env.LOGIN_USER || "";

export const LOGIN_PASS_VARIABLE = process.env.LOGIN_PASS || "";

export const ALLOW_LOGIN_VARIABLE = Boolean(
  Number(process.env.ALLOW_LOGIN || 0)
);
