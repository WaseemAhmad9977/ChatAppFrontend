import { useState } from 'react';

interface AuthPopupProps {
  onAuth: (name: string) => void;
}

export default function AuthPopup({ onAuth }: AuthPopupProps) {
  const [authName, setAuthName] = useState('');

  function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = authName.trim();
    if (!trimmed) return;
    onAuth(trimmed);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-8 border border-gray-100">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>
          <p className="text-sm text-gray-500 mt-2">Join the conversation</p>
        </div>
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            autoFocus
            value={authName}
            onChange={(e) => setAuthName(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-gray-700"
            placeholder="Enter your name"
          />
          <button type="submit" className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
            Start Chatting
          </button>
        </form>
      </div>
    </div>
  );
}