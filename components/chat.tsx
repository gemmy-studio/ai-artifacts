import { ArrowUp, Square, Terminal } from 'lucide-react';

import { Input } from '@/ai-artifacts/components/ui/input';
import { Button } from './ui/button';
import { useEffect } from 'react';
import { ScrollArea } from './ui/scroll-area';

// simulate simple monte carlo method with 1000 iterations. At each iteration, create a point and check if that point was inside the unit circle. If the point was inside, make it green. At the end show me visualization that shows all the points that you created in every iteration
export type Message = {
  // id: string
  role: 'user' | 'assistant';
  content: string;
  commentary?: string;
  meta?: {
    title?: string;
    description?: string;
  };
};

export function Chat({
  isLoading,
  stop,
  messages,
  input,
  handleInputChange,
  handleSubmit,
}: {
  isLoading: boolean;
  stop: () => void;
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [JSON.stringify(messages)]);

  return (
    <div className="flex-1 flex flex-col gap-4 max-h-full w-full px-3 mx-auto justify-between">
      <ScrollArea className="w-full h-[calc(100vh-500px)]">
        <div
          id="chat-container"
          className="flex flex-col gap-2 overflow-y-auto max-h-full rounded-lg"
        >
          {messages.map((message: Message, index: number) => (
            <div
              className={`py-2 px-4 shadow-sm whitespace-pre-wrap ${message.role !== 'user' ? undefined : 'bg-muted/50'} rounded-lg font-serif`}
              key={index}
            >
              {message.role === 'assistant'
                ? message.commentary
                : message.content}
              {message.meta && (
                <div className="mt-4 flex justify-start items-start border border-[#FFE7CC] rounded-md">
                  <div className="p-2 self-stretch border-r border-[#FFE7CC] bg-[#FFE7CC] w-14 flex items-center justify-center">
                    <Terminal strokeWidth={2} className="text-[#FF8800]" />
                  </div>
                  <div className="p-2 flex flex-col space-y-1 justify-start items-start min-w-[100px]">
                    <span className="font-bold font-sans text-sm">
                      {message.meta.title}
                    </span>
                    <span className="font-sans text-sm">
                      {message.meta.description}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex flex-col gap-4">
        <form onSubmit={handleSubmit} className="flex flex-row gap-2">
          <Input
            className="ring-0 rounded-xl"
            required={true}
            placeholder="Describe your app..."
            value={input}
            onChange={handleInputChange}
          />
          {!isLoading ? (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-11"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-11"
              onClick={(e) => {
                e.preventDefault();
                stop();
              }}
            >
              <Square className="h-5 w-5" />
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
