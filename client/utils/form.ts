export const isRequired = {
  value: true,
  message: "Поле не может быть пустым"
}
export const isEmail = {
  value: /^\S+@\S+\.\S+$/,
  message: "Указана некорректная форма"
}

export const FORM = {
  isRequired,
  isEmail,
}
