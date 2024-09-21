import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function setCookies(name: string, value: string, exDays: number){
  const d = new Date();
  d.setTime(d.getTime() + (exDays*24*60*60*1000));
  const expires = "expires="+ d.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path='/'`
}

export function deleteCookies(name: string){
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path='/';`
}

export function getCookie(cname: string) {
  const name = cname + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function decodeToken(token: string){
  try{
    const [header, payload] = token.split('.');

    const dHeader = atob(header);
    const parseHeader = JSON.parse(dHeader);

    const dPayload = atob(payload)
    const parsePayload = JSON.parse(dPayload);

    return { parseHeader, parsePayload }


  }catch(err){
    console.log(err);
    
  }
}