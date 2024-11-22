import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const Chatroom = () => {
  return (
    <div>
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default Chatroom;
