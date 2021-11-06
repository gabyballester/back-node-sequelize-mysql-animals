const { SERVER_HOST, SERVER_PORT } = process.env;

export const GLOBAL = {
  baseUrl: `http://${SERVER_HOST}:${SERVER_PORT}`,
  endpoint: {
    emailActivation: '/auth/activate/',
    frontPassChangeForm: '/auth/front-pass-change-form/'
  },
  emailConfig: {
    service: process.env.EMAIL_SERVICE,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
    from: process.env.NAME_TO_SHOW,
    rejection_false: process.env.REJECTION_FALSE
  },

}
