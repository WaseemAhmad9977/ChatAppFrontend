import { useState } from 'react';
import { OnlineUser } from './types';

interface NewChatModalProps {
  show: boolean;
  onlineUsers: OnlineUser[];
  onClose: () => void;
  onCreate: (name: string, type: '1-to-1' | 'group', participants: string[]) => void;
}

export default function NewChatModal({ show, onlineUsers, onClose, onCreate }: NewChatModalProps) {
  const [newChatName, setNewChatName] = useState('');
  const [newChatType, setNewChatType] = useState<'1-to-1' | 'group'>('1-to-1');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

  function toggleParticipant(userId: string) {
    setSelectedParticipants(prev => {
      if (newChatType === '1-to-1') {   
        if (prev[0] === userId) return [];
        return [userId];
      }
      return prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId];
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newChatName.trim() || selectedParticipants.length === 0) return;
    if (newChatType === '1-to-1' && selectedParticipants.length !== 1) return;
    
    onCreate(newChatName.trim(), newChatType, selectedParticipants);
    setNewChatName('');
    setSelectedParticipants([]);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Create New Chat</h2>
            <p className="text-xs text-gray-500 mt-1">Start a conversation with online users</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
             <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Chat Name</label>
             <input
                value={newChatName}
                onChange={(e) => setNewChatName(e.target.value)}
                placeholder="e.g. Project Team"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
              />
          </div>

          <div className="flex gap-3 mb-6 bg-gray-50 p-1 rounded-xl">
            <label className={`flex-1 text-center py-2 text-sm font-medium rounded-lg cursor-pointer transition-all ${newChatType === '1-to-1' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              <input type="radio" className="hidden" checked={newChatType === '1-to-1'} onChange={() => setNewChatType('1-to-1')} />
              Direct
            </label>
            <label className={`flex-1 text-center py-2 text-sm font-medium rounded-lg cursor-pointer transition-all ${newChatType === 'group' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              <input type="radio" className="hidden" checked={newChatType === 'group'} onChange={() => setNewChatType('group')} />
              Group
            </label>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Participants</span>
                <span className="text-xs text-gray-400">{selectedParticipants.length} selected</span>
            </div>
            {onlineUsers.length === 0 ? (
               <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <p className="text-sm text-gray-500">No users online right now.</p>
               </div>
            ) : (
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {onlineUsers.map(u => (
                  <label key={u.id} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${selectedParticipants.includes(u.id) ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-transparent hover:bg-gray-50'}`}>
                    <div className={`h-5 w-5 rounded-md border flex items-center justify-center transition-colors ${selectedParticipants.includes(u.id) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}>
                         {selectedParticipants.includes(u.id) && <span className="text-white text-xs">✓</span>}
                    </div>
                    <input type="checkbox" className="hidden" checked={selectedParticipants.includes(u.id)} onChange={() => toggleParticipant(u.id)} />
                    <span className={`text-sm font-medium ${selectedParticipants.includes(u.id) ? 'text-indigo-900' : 'text-gray-700'}`}>{u.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={selectedParticipants.length === 0}
              className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}