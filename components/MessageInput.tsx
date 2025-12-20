import { GrSend } from "react-icons/gr";
interface MessageInputProps {
  text: string;
  onTextChange: (text: string) => void;
  onSend: () => void;
}

export default function MessageInput({ text, onTextChange, onSend }: MessageInputProps) {
  return (
    <div className="bg-white p-4 border-t border-gray-100">
      <div className="flex gap-2 max-w-4xl mx-auto items-center bg-gray-50 border border-gray-200 rounded-full px-2 py-2 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
        <input
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), onSend())}
          placeholder="Type a message..."
          className="flex-1 bg-transparent border-none px-4 py-1 outline-none text-sm text-gray-700 placeholder-gray-400"
        />
        <button 
          onClick={onSend}
          disabled={!text.trim()}
          className="h-9 w-9 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all shadow-md">
           <span className="text-xs font-bold"><GrSend /></span>
        </button>
      </div>
    </div>
  );
}