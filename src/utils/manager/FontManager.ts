import Vue from "vue";

export function getBase64(file: File | Blob): Promise<string> {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  return new Promise(resolve => {
    reader.onload = function() {
      resolve(reader.result as string);
    };
  });
}

export interface Font {
  name: string;
  data: string;
}

export const fonts: { [key: string]: Font } = {};

export async function registerFontBase64(dataUrl: string, fontName: string) {
  const font = new FontFace(fontName, `url(${dataUrl})`);
  // wait for font to be loaded
  await font.load();
  // add font to document
  document.fonts.add(font);

  Vue.set(fonts, fontName, {
    name: fontName,
    data: dataUrl
  });
}

export async function registerFont(file: File | Blob, fontName: string) {
  const dataUrl = await getBase64(file);
  await registerFontBase64(dataUrl, fontName);
}

export function registerDefaultFonts() {
  for (const font of [
    "Anton",
    "Bitter",
    "IndieFlower",
    "Oswald",
    "PermanentMarker",
    "PressStart2P",
    "Roboto",
    "VT323",
    "Yoster"
  ]) {
    fetch(`fonts/${font}.ttf`)
      .then(resp => resp.blob())
      .then(blob => registerFont(blob, font));
  }
}
