import { atom, Atom, PrimitiveAtom, WritableAtom } from "jotai";
import { Language } from "./phone";

export const selectedLanguage = atom("ithkuil" as Language)
const count = atom(0)
export type ParsersOption = {
  linebreak: boolean,
}
export const defaultParsersOption: ParsersOption = {
  linebreak: false,
}
export const lineparsersOptionAtom = atom(defaultParsersOption)