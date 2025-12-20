import { useRef, useEffect } from 'react';
import { Message } from './types';
import moment from 'moment';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export default function MessageList({ messages, currentUserId }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

    
  function formatTime(ts: number) {
    return moment(ts).format('HH:mm');
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
      {messages.map((msg, index, arr) => {
        const isMine = msg.sender === currentUserId;
        const showSender = !isMine && (index === 0 || arr[index-1].sender !== msg.sender);

        return (
          <div key={msg.id} className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
            {showSender && <span className="text-[10px] text-gray-400 ml-1 mb-1 font-medium pl-1">{msg.senderName}</span>}
            <div className={`max-w-[85%] md:max-w-[70%] px-4 py-2.5 text-sm shadow-sm relative group ${
               isMine 
                 ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-sm' 
                 : 'bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-tl-sm'
            }`}>
              <div className="break-words leading-relaxed">{msg.text}</div>
              <div className={`flex items-center gap-1 mt-1 text-[10px] font-medium justify-end ${isMine ? 'text-indigo-200' : 'text-gray-400'}`}>
                <span>{formatTime(msg.ts)}</span>
                {isMine && msg.status && (
                  <span className="opacity-80">
                    {msg.status === 'sending' && '•'}
                    {msg.status === 'sent' && '✓'}
                    {msg.status === 'failed' && '!'}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}