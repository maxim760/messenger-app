import {PartialI18n} from "emoji-mart/dist-es/utils/shared-props"
type TEmoji = PartialI18n & {
  clear: string, skintext: string, categorieslabel: string, skintones: {
  [key: number]: string
}}


type TLanguages = "ru" | "en"


type TLocaleEmojies = {
  [key in TLanguages]: TEmoji
}


export const localeEmojies: TLocaleEmojies = {
  en: {
    search: "Search",
    clear: "Clear", // Accessible label on "clear" button
    notfound: "No Emoji Found",
    skintext: "Choose your default skin tone",
    categories: {
      search: "Search Results",
      recent: "Frequently Used",
      people: "Smileys & People",
      nature: "Animals & Nature",
      foods: "Food & Drink",
      activity: "Activity",
      places: "Travel & Places",
      objects: "Objects",
      symbols: "Symbols",
      flags: "Flags",
      custom: "Custom",
    },
    categorieslabel: "Emoji categories", // Accessible title for the list of categories
    skintones: {
      1: "Default Skin Tone",
      2: "Light Skin Tone",
      3: "Medium-Light Skin Tone",
      4: "Medium Skin Tone",
      5: "Medium-Dark Skin Tone",
      6: "Dark Skin Tone",
    },
  },
  ru: {
    search: "Поиск",
    clear: "Очистить", // Accessible label on "clear" button
    notfound: "Смайликов не найдено",
    skintext: "Выберите оттенок кожи",
    categories: {
      search: "Результаты Поиска",
      recent: "Часто Используемые",
      people: "Смайлы и Люди",
      nature: "Животные и Природа",
      foods: "Еда и Напитки",
      activity: "Деятельность",
      places: "Путешествия",
      objects: "Объекты",
      symbols: "Символы",
      flags: "Флаги",
      custom: "На заказ",
    },
    categorieslabel: "Категории эмодзи", // Accessible title for the list of categories
    skintones: {
      1: "Тон кожи по умолчанию",
      2: "Светлый оттенок кожи",
      3: "Средне-Светлый оттенок кожи",
      4: "Средний оттенок кожи",
      5: "Средне-темный оттенок кожи",
      6: "Темный оттенок кожи",
    },
  },
};