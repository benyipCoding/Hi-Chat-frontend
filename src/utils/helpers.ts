export const TOKEN_KEY = 'HI_TOKEN';

export function setLocalStorage(data: unknown) {
  return localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
}

export function getLocalStorage() {
  return localStorage.getItem(TOKEN_KEY);
}

export function delLocalStorage() {
  return localStorage.removeItem(TOKEN_KEY);
}

export function addAlphaToHexColor(hexColor: string, alpha: number): string {
  // 移除可能存在的#字符
  hexColor = hexColor.replace('#', '');

  // 将16进制颜色值解析成RGB值
  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);

  // 确保alpha在0到1之间
  alpha = Math.min(1, Math.max(0, alpha));

  // 计算alpha值的255表示
  const alpha255 = Math.round(alpha * 255);

  // 使用带有alpha值的16进制格式返回新颜色
  const newHexColor = `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}${alpha255
    .toString(16)
    .padStart(2, '0')}`;

  return newHexColor;
}
