module.exports = ({ env }) => ({
  email: {
    provider: 'outlook',
    providerOptions: {
      host: env('EMAIL_SMTP_HOST', 'smtp.office365.com'),
      port: env('EMAIL_SMTP_PORT', 587),
      auth: {
        user: env('EMAIL_SMTP_USER', 'pkbasdc@outlook.com'),
        pass: env('EMAIL_SMTP_PASS', 'ingegneria2324.'),
      },
      // Se il server SMTP richiede l'uso di TLS
      secure: false,
      tls: {
        ciphers: 'SSLv3'
      },
    },
    settings: {
      defaultFrom: 'pkbasdc@outlook.com',
      defaultReplyTo: 'pkbasdc@outlook.com',
    },
  },
});