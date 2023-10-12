import speakeasy from 'speakeasy';

export function sendOTP(secret: string, mobile: string) {
  const code = speakeasy.totp({ secret: secret, step: 60 });
  return Promise.resolve();
}

export function topupMobile(mobile: string) {
  // Add balance will be handled here
  return Promise.resolve();
}
