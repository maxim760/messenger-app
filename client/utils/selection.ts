
export type ISelectionEl = (HTMLInputElement | HTMLTextAreaElement) & { createTextRange: any }

const getPosition = (element: HTMLInputElement | HTMLTextAreaElement) => {
  element.focus();

  if (element.selectionStart) {
    return element.selectionStart;
  }
  return 0;
};
const setPosition = (
  element: ISelectionEl,
  pos: number
) => {
  if (element.setSelectionRange) {
    element.focus();
    setTimeout(() => {
      element.setSelectionRange(pos, pos);
    }, 0); // без таймаута не работает :(
  } else if (element.createTextRange) {
    const range = element.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select();
  }
};

export {getPosition, setPosition}