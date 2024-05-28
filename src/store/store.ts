import { atom } from "jotai";
export const counter = atom(0);
export const imageSource = atom("");
export const image64 = atom("");
export const imagePreview = atom("");
export const imageType = atom("");
export const isElementsDisabled = atom(false);
export const origine = atom<"imageUri" | "cropper" | "blob" | "filter" | null>(
  null
);
