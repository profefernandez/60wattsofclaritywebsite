import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHATBOT_RESPONSES } from '../../data/content';
import { sanitizeText } from '../../utils/security';
import Button from '../ui/Button';

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const BotAvatarIcon: React.FC = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
    <circle cx="20" cy="20" r="20" fill="url(#botGradient)" />
    <defs>
      <linearGradient id="botGradient" x1="0" y1="0" x2="40" y2="40">
        <stop stopColor="#38bdf8" />
        <stop offset="1" stopColor="#818cf8" />
      </linearGradient>
    </defs>
    <rect x="12" y="14" width="16" height="12" rx="3" fill="white" fillOpacity="0.9" />
    <circle cx="16" cy="20" r="2" fill="#0ea5e9" />
    <circle cx="24" cy="20" r="2" fill="#0ea5e9" />
    <rect x="17" y="26" width="6" height="3" rx="1.5" fill="white" fillOpacity="0.9" />
    <rect x="9" y="18" width="3" height="6" rx="1.5" fill="white" fillOpacity="0.7" />
    <rect x="28" y="18" width="3" height="6" rx="1.5" fill="white" fillOpacity="0.7" />
    <rect x="14" y="11" width="12" height="4" rx="2" fill="white" fillOpacity="0.6" />
    <circle cx="20" cy="10" r="1.5" fill="#38bdf8" />
  </svg>
);

const SendIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const QUICK_PROMPTS = [
  'Tell me about workshops',
  'What is your framework?',
  'Schedule a training',
  'About the library',
];

/** Pure helper — extracts bot response from keyword matching */
function getBotResponse(userInput: string): string {
  const normalized = userInput.toLowerCase().trim();

  for (const [key, response] of Object.entries(CHATBOT_RESPONSES)) {
    if (key !== 'default' && normalized.includes(key)) {
      return response;
    }
  }

  if (normalized.includes('train') || normalized.includes('learn') || normalized.includes('course')) {
    return CHATBOT_RESPONSES.workshops;
  }
  if (normalized.includes('book') || normalized.includes('appointment') || normalized.includes('meeting')) {
    return CHATBOT_RESPONSES.schedule;
  }
  if (normalized.includes('resource') || normalized.includes('read') || normalized.includes('research')) {
    return CHATBOT_RESPONSES.library;
  }
  if (normalized.includes('price') || normalized.includes('cost') || normalized.includes('fee')) {
    return CHATBOT_RESPONSES.pricing;
  }
  if (normalized.includes('email') || normalized.includes('phone') || normalized.includes('reach')) {
    return CHATBOT_RESPONSES.contact;
  }

  return CHATBOT_RESPONSES.default;
}

/**
 * AI Chatbot component for the strategic snapshot page.
 * Uses keyword-matching responses (no external API required).
 * WCAG 2.1 AA: live region for screen reader announcements.
 */
const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'bot',
      text: "Hello! I'm Clara, your 60 Watts of Clarity AI assistant. 👋\n\nI can help you learn about our ethical AI education programs, workshops, framework, and scheduling. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = useCallback(
    async (text: string) => {
      const cleaned = sanitizeText(text.trim());
      if (!cleaned) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        text: cleaned,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsTyping(true);

      // Simulate typing delay
      await new Promise((resolve) => setTimeout(resolve, 800 + 600 * 0.5));

      const botText = getBotResponse(cleaned);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: botText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      // Announce to screen readers
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = `Clara responded: ${botText}`;
      }
    },
    [liveRegionRef],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSend(prompt);
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      className="flex flex-col h-full rounded-2xl overflow-hidden border border-white/10"
      style={{ background: 'rgba(10,11,30,0.8)', backdropFilter: 'blur(20px)' }}
      role="region"
      aria-label="AI Chat Assistant"
    >
      {/* Chat header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/3">
        <BotAvatarIcon />
        <div>
          <p className="font-semibold text-white text-sm">Clara</p>
          <p className="text-xs text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" aria-hidden="true" />
            AI Assistant • Online
          </p>
        </div>
        <div className="ml-auto text-xs text-slate-500">60 Watts of Clarity</div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0"
        aria-live="polite"
        aria-label="Chat messages"
        style={{ maxHeight: '400px' }}
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}
          >
            {msg.role === 'bot' && (
              <div className="flex-shrink-0 w-7 h-7 mt-1" aria-hidden="true">
                <BotAvatarIcon />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <div
                className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}
                style={{ whiteSpace: 'pre-line' }}
              >
                {msg.text}
              </div>
              <span className="text-xs text-slate-600 px-1">{formatTime(msg.timestamp)}</span>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
              aria-label="Clara is typing"
            >
              <BotAvatarIcon />
              <div className="chat-bubble-bot flex items-center gap-1 py-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={chatEndRef} />
      </div>

      {/* Quick prompts */}
      <div className="px-4 py-2 border-t border-white/5">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Quick prompt suggestions">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleQuickPrompt(prompt)}
              className="text-xs px-3 py-1.5 rounded-full border border-sky-400/30 text-sky-400 hover:bg-sky-400/10 transition-colors cursor-pointer"
              type="button"
              aria-label={`Quick prompt: ${prompt}`}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 p-4 border-t border-white/10"
        aria-label="Send a message to Clara"
      >
        <label htmlFor="chat-input" className="sr-only">
          Type your message
        </label>
        <input
          id="chat-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about workshops, scheduling, our mission..."
          maxLength={500}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/50 transition-colors"
          aria-label="Chat message input"
          disabled={isTyping}
        />
        <Button
          type="submit"
          size="sm"
          disabled={!input.trim() || isTyping}
          icon={<SendIcon />}
          aria-label="Send message"
          className="flex-shrink-0"
        >
          <span className="sr-only md:not-sr-only">Send</span>
        </Button>
      </form>

      {/* Screen reader live region */}
      <div
        ref={liveRegionRef}
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      />
    </div>
  );
};

export default ChatBot;
