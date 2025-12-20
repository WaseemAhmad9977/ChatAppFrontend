import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Chat, Message } from './types';
import { CiChat1 } from "react-icons/ci";

interface ChatAreaProps {
  activeChat: string | null;
  chats: Chat[];
  messages: Message[];
  typers: string[];
  currentUserId: string;
  text: string;
  onTextChange: (text: string) => void;
  onSend: () => void;
  onBack: () => void; // Added for mobile
}

export default function ChatArea({
  activeChat,
  chats,
  messages,
  typers,
  currentUserId,
  text,
  onTextChange,
  onSend,
  onBack
}: ChatAreaProps) {
  const currentChat = chats.find(c => c.id === activeChat);

  if (!activeChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-300 bg-gray-50/30">
        <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl"><CiChat1 /></span>
        </div>
        <div className="text-center p-6">
          <h3 className="text-gray-800 font-semibold text-lg mb-1">It's quiet here...</h3>
          <p className="text-sm text-gray-500">Select a chat from the sidebar or start a new one.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col flex-1 h-full bg-white md:bg-gray-50/50 relative'>
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 sticky top-0 z-20 flex items-center gap-3">
        <button onClick={onBack} className="md:hidden p-2 -ml-2 text-gray-500 hover:text-gray-800">
           <span className="text-xl">←</span>
        </button>
        
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            {currentChat?.name.substring(0, 1).toUpperCase()}
        </div>
        
        <div>
           <div className="font-bold text-gray-800 text-sm leading-tight">{currentChat?.name}</div>
           <div className="text-xs text-gray-500 mt-0.5">
             {typers.length > 0 ? (
               <span className="text-indigo-600 font-medium animate-pulse">
                 {typers.join(', ')} {typers.length === 1 ? 'is' : 'are'} typing...
               </span>
             ) : (
                currentChat?.participantNames.join(', ')
             )}
           </div>
        </div>
      </div>

      <MessageList messages={messages} currentUserId={currentUserId} />
      <MessageInput text={text} onTextChange={onTextChange} onSend={onSend} />
    </div>
  );
}