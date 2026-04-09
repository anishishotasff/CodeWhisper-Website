const SITE_KEY = '6LeVI68sAAAAAMWe79Al3CHnFoZt2rrPxaM4ZD8o';

declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (cb: () => void) => void;
        execute: (key: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}

export function getRecaptchaToken(action: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!window.grecaptcha?.enterprise) {
      reject(new Error('reCAPTCHA not loaded'));
      return;
    }
    window.grecaptcha.enterprise.ready(async () => {
      try {
        const token = await window.grecaptcha.enterprise.execute(SITE_KEY, { action });
        resolve(token);
      } catch (err) {
        reject(err);
      }
    });
  });
}
