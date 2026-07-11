'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
};

const RESPONSES: Record<string, string> = {
  'what are the hall fees': 'Hall fees vary by room type. Standard rooms are approximately GHS 500-800 per semester. Contact the hall office for current rates.',
  'how do i report a maintenance issue': 'You can report maintenance issues through the Helpdesk page or visit the hall office.',
  'what are the rules': 'Unity Hall rules include: quiet hours from 10pm-6am, no visitors after 9pm, keep rooms clean, no vandalism.',
  'tell me about conti': 'Unity Hall (Continental Hall) is the largest hall of residence in West Africa, established in 1968. Known as the Twin Towers, home of the Continentals.',
};

const DEFAULT_RESPONSE = "I'm not sure about that. Please contact the hall office or check the relevant page on our website.";

function getBotResponse(input: string): string {
  const normalized = input.toLowerCase().replace(/[?.,!]/g, '').trim();
  const entry = Object.entries(RESPONSES).find(([k]) => normalized.includes(k));
  return entry ? entry[1] : DEFAULT_RESPONSE;
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-knust-lust text-xs font-bold text-white">
        AI
      </div>
      <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-3">
        <motion.span
          className="h-2 w-2 rounded-full bg-knust-lust/60"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="h-2 w-2 rounded-full bg-knust-lust/60"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, delay: 0.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="h-2 w-2 rounded-full bg-knust-lust/60"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}

export function ContiChat() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([
    { id: '0', text: 'Hi! I\'m Conti AI. Ask me anything about Unity Hall!', sender: 'bot' },
  ]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: crypto.randomUUID(), text, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = { id: crypto.randomUUID(), text: getBotResponse(text), sender: 'bot' };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="flex h-[500px] w-[calc(100vw-48px)] max-w-[400px] flex-col overflow-hidden rounded-2xl border bg-card shadow-depth-5"
          >
            <div className="flex items-center justify-between bg-knust-lust px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                  AI
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold">Conti AI</h3>
                  <p className="text-[10px] opacity-80">Online</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea ref={scrollRef} className="flex-1 p-4">
              <div className="flex flex-col gap-3">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn('flex items-start gap-2', msg.sender === 'user' && 'flex-row-reverse')}
                  >
                    {msg.sender === 'bot' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-knust-lust text-xs font-bold text-white">
                        AI
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                        msg.sender === 'user'
                          ? 'bg-knust-lust text-white'
                          : 'bg-muted text-foreground'
                      )}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && <TypingIndicator />}
              </div>
            </ScrollArea>

            <div className="flex items-center gap-2 border-t p-3">
              <Input
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button
                size="icon"
                className="h-10 w-10 shrink-0 bg-knust-lust text-white hover:bg-knust-lust/90"
                onClick={handleSend}
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-knust-lust text-sm font-bold text-white shadow-depth-3 transition-shadow hover:shadow-depth-4"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>
    </div>
  );
}
