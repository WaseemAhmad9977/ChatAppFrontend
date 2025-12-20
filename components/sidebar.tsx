import { Chat, OnlineUser, ConnectionStatus } from './types';
import { CiChat1 } from "react-icons/ci";

interface SidebarProps {
  userName: string;
  connectionStatus: ConnectionStatus;
  onlineUsers: OnlineUser[];
  chats: Chat[];
  activeChat: string | null;
  onNewChat: () => void;
  onOpenChat: (chatId: string) => void;
}

export default function Sidebar({
  userName,
  connectionStatus,
  onlineUsers,
  chats,
  activeChat,
  onNewChat,
  onOpenChat,
}: SidebarProps) {
  return (
    <div className="h-full bg-white border-r border-gray-100 flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 bg-white/50 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="font-bold text-xl text-gray-800 tracking-tight">Messages</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`h-2 w-2 rounded-full ${connectionStatus === 'connected' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
              <p className="text-xs font-medium text-gray-500 capitalize">{userName}</p>
            </div>
          </div>
          <button
            onClick={onNewChat}
            className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors"
            title="New Chat"
          >
             <span className="text-xl leading-none">+</span>
          </button>
        </div>
        
        {/* Online Users */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
             {onlineUsers.length === 0 ? (
                <span className="text-xs text-gray-400 italic">No one else online</span>
             ) : (
                 onlineUsers.map(u => (
                    <div key={u.id} className="flex flex-col items-center min-w-[50px] cursor-default group">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 font-bold text-xs border-2 border-white shadow-sm">
                            {u.name.substring(0, 1).toUpperCase()}
                        </div>
                        <span className="text-[10px] text-gray-500 mt-1 truncate max-w-[50px]">{u.name}</span>
                    </div>
                 ))
             )}
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400 text-sm p-8 text-center bg-gray-50 rounded-2xl mx-2 border border-gray-100">
            <span className="text-2xl mb-2"><CiChat1 /></span>
            No chats yet.<br/>Start a conversation!
          </div>
        ) : (
          chats.map(chat => (
            <div
              key={chat.id}
              onClick={() => onOpenChat(chat.id)}
              className={`p-3.5 rounded-2xl cursor-pointer transition-all duration-200 group ${
                activeChat === chat.id 
                  ? 'bg-indigo-600 shadow-md shadow-indigo-200' 
                  : 'hover:bg-gray-100'
              }`}>
              <div className="flex justify-between items-start">
                 <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors
                        ${activeChat === chat.id ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-600'}`}>
                        {chat.name.substring(0, 1).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold text-sm truncate ${activeChat === chat.id ? 'text-white' : 'text-gray-800'}`}>
                          {chat.name}
                      </div>
                      <div className={`text-xs truncate mt-0.5 ${activeChat === chat.id ? 'text-indigo-100' : 'text-gray-500'}`}>
                        {chat.participantNames.join(', ')}
                      </div>
                    </div>
                 </div>
                {chat.unreadCount > 0 && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeChat === chat.id ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white'
                  }`}>
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}