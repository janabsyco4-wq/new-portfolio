'use client';

import { useState, useEffect } from 'react';
import ProjectManager from './ProjectManager';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'messages' | 'projects'>('messages');

  // Check authentication on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load messages from database
  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
      
      // Auto-refresh messages every 10 seconds
      const interval = setInterval(() => {
        fetchMessages();
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success) {
        const formattedMessages = data.data.map((msg: any) => ({
          id: msg._id,
          name: msg.name,
          email: msg.email,
          subject: '',
          message: msg.message,
          timestamp: new Date(msg.createdAt).toLocaleString(),
          read: msg.read || false,
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
    setPassword('');
    onClose();
  };

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      });
      const data = await res.json();
      if (data.success) {
        fetchMessages();
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setSelectedMessage(null);
        fetchMessages();
      } else {
        alert('Failed to delete message');
      }
    } catch (error) {
      alert('Error deleting message');
      console.error(error);
    }
  };

  const unreadCount = messages.filter(msg => !msg.read).length;

  if (!isOpen) return null;

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 animate-fadeIn">
        <div className="w-full max-w-md">
          <div className="rounded-3xl p-8 sm:p-12" style={{ background: 'var(--bg-primary)', border: '2px solid var(--border)' }}>
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-4xl" style={{ background: 'var(--accent)' }}>
                🔐
              </div>
              <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Admin Login
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Enter your password to access the admin panel
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full p-4 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '2px solid var(--border)',
                    color: 'var(--text-primary)',
                  }}
                  autoFocus
                />
                {error && (
                  <p className="mt-2 text-sm text-red-500">
                    {error}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-[var(--accent)] text-white rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1"
                  style={{ boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)' }}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Main Admin Panel
  return (
    <div className="fixed inset-0 bg-black/95 z-[9999] overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 py-4 sm:py-6" style={{ background: 'var(--bg-primary)', borderBottom: '2px solid var(--border)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-2xl sm:text-3xl" style={{ background: 'var(--accent)' }}>
                👨‍💼
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  Admin Panel
                </h1>
                <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Manage your portfolio
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleLogout}
                className="px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
              >
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">🚪</span>
              </button>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all duration-300 hover:rotate-90"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6">
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                activeTab === 'messages' ? 'text-white' : ''
              }`}
              style={{
                background: activeTab === 'messages' ? 'var(--accent)' : 'var(--bg-secondary)',
                color: activeTab === 'messages' ? 'white' : 'var(--text-secondary)',
              }}
            >
              <span className="flex items-center justify-center gap-2">
                � <span className="hidden sm:inline">Messages</span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                    {unreadCount}
                  </span>
                )}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'projects' ? 'text-white' : ''
              }`}
              style={{
                background: activeTab === 'projects' ? 'var(--accent)' : 'var(--bg-secondary)',
                color: activeTab === 'projects' ? 'white' : 'var(--text-secondary)',
              }}
            >
              <span className="flex items-center justify-center gap-2">
                🚀 <span className="hidden sm:inline">Projects</span>
              </span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'messages' ? (
            <div className="h-full flex flex-col lg:flex-row">
              {/* Messages List */}
              <div className="w-full lg:w-2/5 xl:w-1/3 h-1/2 lg:h-full overflow-y-auto" style={{ background: 'var(--bg-secondary)', borderRight: '2px solid var(--border)' }}>
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <div className="text-6xl mb-4">📭</div>
                    <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                      No Messages Yet
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Messages from your contact form will appear here
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => {
                        setSelectedMessage(msg);
                        if (!msg.read) markAsRead(msg.id);
                      }}
                      className="p-4 border-b cursor-pointer transition-all duration-200 hover:bg-opacity-50"
                      style={{
                        background: selectedMessage?.id === msg.id ? 'var(--bg-primary)' : 'transparent',
                        borderColor: 'var(--border)',
                        opacity: msg.read ? 0.7 : 1,
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ background: 'var(--accent)' }}>
                            {msg.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                              {msg.name}
                            </h3>
                            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                              {msg.email}
                            </p>
                          </div>
                        </div>
                        {!msg.read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm line-clamp-2 mb-1" style={{ color: 'var(--text-secondary)' }}>
                        {msg.message}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {msg.timestamp}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Message Detail */}
              <div className="flex-1 h-1/2 lg:h-full overflow-y-auto p-4 sm:p-6 lg:p-8" style={{ background: 'var(--bg-primary)' }}>
                {selectedMessage ? (
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl" style={{ background: 'var(--accent)' }}>
                          {selectedMessage.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                            {selectedMessage.name}
                          </h2>
                          <a href={`mailto:${selectedMessage.email}`} className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>
                            {selectedMessage.email}
                          </a>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteMessage(selectedMessage.id)}
                        className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-red-500 hover:text-white"
                        style={{
                          background: 'var(--bg-secondary)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>

                    <div className="p-6 rounded-2xl mb-4" style={{ background: 'var(--bg-secondary)' }}>
                      <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                        Received: {selectedMessage.timestamp}
                      </p>
                      <div className="h-px my-4" style={{ background: 'var(--border)' }}></div>
                      <p className="text-base leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-primary)' }}>
                        {selectedMessage.message}
                      </p>
                    </div>

                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: Your message`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1"
                      style={{ boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)' }}
                    >
                      ✉️ Reply via Email
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="text-6xl mb-4">💬</div>
                    <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                      Select a Message
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Click on a message to view its details
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8" style={{ background: 'var(--bg-primary)' }}>
              <ProjectManager />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


