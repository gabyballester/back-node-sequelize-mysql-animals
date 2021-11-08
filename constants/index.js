const {
  SERVER_HOST,
  SERVER_PORT,
  EMAIL_SERVICE,
  EMAIL_SECURE,
  GMAIL_USER,
  GMAIL_PASS,
  NAME_TO_SHOW,
  REJECTION_FALSE,
  SECRET_KEY,
  SALT_ROUNDS,
  HTTP_PREFIX
} = process.env;

export const GLOBAL = {
  api: {
    serverPort: SERVER_PORT,
    baseUrl: `${HTTP_PREFIX}${SERVER_HOST}:${SERVER_PORT}`,
    endpoint: {
      emailActivation: "/auth/activate/",
      frontPassChangeForm: "/auth/front-pass-change-form/",
    },
  },
  emailConfig: {
    service: EMAIL_SERVICE,
    secure: EMAIL_SECURE,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
    from: NAME_TO_SHOW,
    rejection_false: REJECTION_FALSE,
  },
  secretKey: SECRET_KEY,
  saltRounds: SALT_ROUNDS,
};
