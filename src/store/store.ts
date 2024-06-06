import { atom } from "jotai";
export type OrigineType =
  | "imageUri"
  | "cropper"
  | "blob"
  | "filter"
  | "home"
  | null;
export const counter = atom(0);
export const imageSource = atom("");
export const image64 = atom("");
export const imagePreview = atom("");
export const imageType = atom("");
export const isElementsDisabled = atom(false);
export const asFilterActive = atom(false);
export const origine = atom<OrigineType>(null);
export const cropStencil = atom<"circle" | "square">("square");
