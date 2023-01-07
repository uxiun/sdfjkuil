import { gloss, StrTsx } from "./Pattern"
import { glossPhonetic } from "./pattern.phonetic"

export const language = {
  ithkuil: "ithkuil",
  phone: "phonetic"
} as const
// export type Language = typeof language [keyof typeof language]
export type Language = typeof language[keyof typeof language]
export const AllLanguage: Language[] = ["ithkuil", "phonetic"]

export const selectGlosser = (lang : Language) => {
  switch (lang) {
    case "ithkuil": return gloss
    case "phonetic": return glossPhonetic
  }
}
