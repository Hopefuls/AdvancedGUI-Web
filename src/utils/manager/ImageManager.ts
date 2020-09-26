import { getBase64 } from "./FontManager";
import Vue from "vue";

export interface Image {
  name: string;
  data: HTMLImageElement;
  ratio: number;
  isGif: boolean;
}

export const images: { [key: string]: Image } = {};
let imageContainer: HTMLElement;

export async function registerImageBase64(
  dataUrl: string,
  imageName: string,
  isGif: boolean
) {
  const imageElement = document.createElement("img") as HTMLImageElement;
  imageElement.onload = () => {
    const image: Image = {
      name: imageName,
      data: imageElement,
      ratio: imageElement.naturalWidth / imageElement.naturalHeight,
      isGif
    };
    Vue.set(images, imageName, image);
  };

  imageElement.src = dataUrl;
  imageContainer.appendChild(imageElement);
}

export async function registerImage(
  file: File | Blob,
  imageName: string,
  isGif: boolean
) {
  const url = await getBase64(file);
  await registerImageBase64(url, imageName, isGif);
}

export async function unregisterImage(imageName: string) {
  const elem = images[imageName].data;

  Vue.delete(images, imageName);
  elem.remove();
}

export function setupImageManager(hiddenImageContainer: HTMLElement) {
  imageContainer = hiddenImageContainer;
  for (const font of [
    "Down.png",
    "Down_H.png",
    "Up.png",
    "Up_H.png",
    "Left.png",
    "Left_H.png",
    "Right.png",
    "Right_H.png",
    "Play.png",
    "Play_H.png",
    "PlayRed.png",
    "PlayRed_H.png",
    "List1.png",
    "List2.png",
    "List3.png"
  ]) {
    fetch(`images/${font}`)
      .then(resp => resp.blob())
      .then(blob =>
        registerImage(blob, font.substr(0, font.length - 4), false)
      );
  }
}
