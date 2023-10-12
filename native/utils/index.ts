import { format } from 'date-fns';

export function search(props: unknown[], keyword: string) {
  return props.filter(Boolean).join('').toLowerCase().includes(keyword.toLowerCase());
}

export function formatDate(date: string, $format = "MMM dd, yyyy '•' hh:mm a") {
  return date ? format(new Date(date), $format) : '';
}

export function stripMobile(mobile: string) {
  const $mobile = mobile.replace(/[\s+]/g, '');
  return $mobile.substring($mobile.startsWith('09') ? 2 : $mobile.startsWith('959') ? 3 : 0);
}

export function formatMobile(mobile: string) {
  return mobile ? `09 ${mobile.slice(0, 3)} ${mobile.slice(3, 6)} ${mobile.slice(6)}` : '';
}

export function astrikeNumber(number: string, length = 4) {
  return [...number].map((no, i) => (number.length - i > length ? '*' : `${no}`)).join('');
}

export function getRandomValue(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function stringifyParamsURL(url: string, $params: { [k: string]: string }) {
  const params = new URLSearchParams();
  Object.entries($params).forEach(([name, value]) => {
    params.append(name, encodeURIComponent(value));
  });
  return `${url}?${params.toString()}`;
}
