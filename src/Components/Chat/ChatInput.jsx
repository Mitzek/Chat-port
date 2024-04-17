import React, { useState } from "react";
import style from "./chatStyle.module.css";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

function ChatInput({ sendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (e, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleChatInput = (e) => {
    setMsg(e.target.value);
  };

  const handleSendMsg = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      sendMsg(msg);
      setMsg(" ");
    }
  };
  return (
    <div className={style.chatInputContainer}>
      <div className={style.buttonContainer}>
        <div className={style.emoji}>
          <BsEmojiSmileFill onClick={handleEmojiPicker} />
          {showEmojiPicker && (
            <Picker
              pickerStyle={{ position: "absolute", top: 310, left: 430 }}
              onEmojiClick={handleEmojiClick}
            />
          )}
        </div>
      </div>
      <form className={style.msgInputForm} onSubmit={(e) => handleSendMsg(e)}>
        <input
          className={style.chatInput}
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={handleChatInput}
        />
        <button type="submit" className={style.chatButton}>
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
