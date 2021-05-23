import clsx from "clsx";
import React, { useRef, useState } from "react";
import { VscSmiley as IconSmile } from "react-icons/vsc";
import { BaseEmoji, EmojiData, Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { localeEmojies } from "./emojiLocales";
import useOutsideClick from "../../hooks/useOutsideClick";
import { getPosition, ISelectionEl, setPosition } from "../../utils/selection";

interface EmojiPickerProps {
  iconClass?: string;
  blockClass?: string;
  messageElement: HTMLInputElement | HTMLTextAreaElement;
  position?: "top" | "bottom";
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
}

const style: React.CSSProperties = {
  position: "absolute",
  zIndex: 999,
  left: "50%",
  transform: "translateX(-50%)",
};

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  blockClass,iconClass,
  messageElement,
  position = "bottom",
  onChangeText,
}): React.ReactElement => {
  const [isShowPicker, setIsShowPicker] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);
  const onShowPicker = () => {
    setIsShowPicker(true);
  };

  const onClosePicker = () => {
    setIsShowPicker(false);
  };
  useOutsideClick<HTMLDivElement>(blockRef, onClosePicker);

  const onAddEmoji = (emojiObject: BaseEmoji) => {
    const emoji = emojiObject.native
    const len = emoji.length
    const position = getPosition(messageElement);
    onChangeText((prev) => {
      return prev.slice(0, position) + emoji.substring(0,len) + prev.slice(position);
    });
    setPosition(messageElement as ISelectionEl, position + len);
  };

  return (
    <div ref={blockRef} className={clsx("relative", blockClass)}>
      <IconSmile className={clsx("icon", iconClass)} onClick={onShowPicker} />
      {isShowPicker && (
        <Picker
          // perLine={10}
          // emojiSize={16}
          emoji=""
          title=""
          onSelect={onAddEmoji}
          style={{ ...style, [position]: "calc(100% + 5px)" }}
          // exclude={["flags"]}
          native={true}
          // i18n={localeEmojies["ru"]}
          // color={"rgb(29,161,242)"}
          // title={t("title:emoji")}
          // emoji={"globe_with_meridians"}
          // showPreview={false}
        />
      )}
    </div>
  );
};
