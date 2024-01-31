export const getCookies = () => {
  return document.cookie.split(';').reduce((cookies, item) => {
    const [name, value] = item.split('=').map((s) => s.trim());
    cookies[name] = decodeURIComponent(value);
    return cookies;
  }, {} as Record<string, string>);
};

export interface CookieOptions {
  name: string;
  value: string;
  days?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  samesite?: 'strict' | 'lax' | 'none';
}

export const setCookie = (options: CookieOptions): void => {
  const { name, value, days, path = '/', domain, secure, samesite } = options;

  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }

  let cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + expires + '; path=' + path;

  if (domain) {
    cookie += '; domain=' + domain;
  }
  if (secure) {
    cookie += '; secure';
  }
  if (samesite) {
    cookie += '; samesite=' + samesite;
  }

  document.cookie = cookie;
};
