// 'use client';

// import React, { useState } from 'react';
// import {
//   FileText,
//   Bot,
//   BrainCircuit,
//   Sparkles,
//   Send,
//   Loader2,
//   Copy,
//   Check,
// } from 'lucide-react';
// import { toast } from 'react-hot-toast';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

// interface Message {
//   role: 'user' | 'assistant';
//   content: string;
// }

// export default function AIStudioPage() {
//   const [activeTab, setActiveTab] = useState<'notes' | 'chat'>('notes');

//   // Generator State
//   const [topic, setTopic] = useState('');
//   const [depth, setDepth] = useState('Detailed');
//   const [includeRoadmap, setIncludeRoadmap] = useState(true);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [generatedNotes, setGeneratedNotes] = useState('');
//   const [copied, setCopied] = useState(false);

//   // Chat State
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       role: 'assistant',
//       content:
//         'Hello! I am your AI Study Assistant. Ask me to explain concepts, solve problems, or give study tips!',
//     },
//   ]);
//   const [inputMsg, setInputMsg] = useState('');
//   const [isChatting, setIsChatting] = useState(false);

//   const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

//   // 1. Handle Notes Generation
//   const handleGenerateNotes = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!topic.trim()) return toast.error('Please enter a topic.');

//     setIsGenerating(true);
//     setGeneratedNotes('');

//     try {
//       const res = await fetch(`${API_URL}/api/ai/generate-notes`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ topic, depth, includeRoadmap }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setGeneratedNotes(data.result);
//         toast.success('Notes generated successfully!');
//       } else {
//         toast.error(data.error || 'Generation failed.');
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error('Could not connect to AI service.');
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // 2. Handle Chat Assistant
//   const handleSendMessage = async (textToSend?: string) => {
//     const msg = textToSend || inputMsg;
//     if (!msg.trim()) return;

//     const newMessages: Message[] = [...messages, { role: 'user', content: msg }];
//     setMessages(newMessages);
//     setInputMsg('');
//     setIsChatting(true);

//     try {
//       const res = await fetch(`${API_URL}/api/ai/chat`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           messages: newMessages.map((m) => ({
//             role: m.role === 'assistant' ? 'model' : 'user',
//             content: m.content,
//           })),
//         }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
//       } else {
//         toast.error('Failed to get response.');
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error('Error contacting assistant.');
//     } finally {
//       setIsChatting(false);
//     }
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(generatedNotes);
//     setCopied(true);
//     toast.success('Copied to clipboard!');
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="min-h-screen bg-[#FFFDF9] px-4 py-10 sm:px-8 mt-20">
//       <div className="mx-auto max-w-6xl">
//         {/* Header */}
//         <div className="text-center max-w-2xl mx-auto mb-10">
//           <div className="inline-flex items-center gap-2 rounded-full border border-[#D8A34D]/30 bg-[#fad59a] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#624104]">
//             <Sparkles size={14} /> Agentic AI Workspace
//           </div>
//           <h1 className="mt-4 text-4xl font-extrabold text-[#2D2A26]">AI Study Studio</h1>
//           <p className="mt-2 text-sm text-[#6F665B]">
//             Generate custom study materials or converse with your contextual study assistant.
//           </p>
//         </div>

//         {/* Tab Selection */}
//         <div className="flex justify-center mb-8">
//           <div className="inline-flex rounded-full bg-[#F8F4EC] p-1.5 border border-[#EEE8DE]">
//             <button
//               onClick={() => setActiveTab('notes')}
//               className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold transition-all ${
//                 activeTab === 'notes'
//                   ? 'bg-[#1F4B43] text-white shadow-md'
//                   : 'text-[#6F665B] hover:text-[#2D2A26]'
//               }`}
//             >
//               <FileText size={16} /> Notes Generator & Planner
//             </button>
//             <button
//               onClick={() => setActiveTab('chat')}
//               className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold transition-all ${
//                 activeTab === 'chat'
//                   ? 'bg-[#1F4B43] text-white shadow-md'
//                   : 'text-[#6F665B] hover:text-[#2D2A26]'
//               }`}
//             >
//               <Bot size={16} /> AI Chat Assistant
//             </button>
//           </div>
//         </div>

//         {/* TAB 1: AI NOTES GENERATOR */}
//         {activeTab === 'notes' && (
//           <div className="grid gap-8 lg:grid-cols-12">
//             {/* Input Form */}
//             <div className="lg:col-span-5 rounded-3xl border border-[#EEE8DE] bg-white p-6 shadow-sm h-fit">
//               <h2 className="text-lg font-bold text-[#2D2A26] flex items-center gap-2">
//                 <BrainCircuit className="text-[#1F4B43]" size={20} /> Generate Study Guide
//               </h2>

//               <form onSubmit={handleGenerateNotes} className="mt-6 space-y-4">
//                 <div>
//                   <label className="block text-xs font-bold text-[#6F665B] uppercase mb-2">
//                     Study Topic / Subject
//                   </label>
//                   <input
//                     type="text"
//                     value={topic}
//                     onChange={(e) => setTopic(e.target.value)}
//                     placeholder="e.g. Binary Search Trees or Photosynthesis"
//                     className="w-full rounded-xl border border-[#EEE8DE] bg-[#FFFDF9] px-4 py-2.5 text-sm focus:border-[#1F4B43] focus:outline-none"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-bold text-[#6F665B] uppercase mb-2">
//                     Output Depth
//                   </label>
//                   <select
//                     value={depth}
//                     onChange={(e) => setDepth(e.target.value)}
//                     className="w-full rounded-xl border border-[#EEE8DE] bg-[#FFFDF9] px-4 py-2.5 text-sm focus:border-[#1F4B43] focus:outline-none"
//                   >
//                     <option value="Brief Summary">Brief Summary</option>
//                     <option value="Detailed">Detailed Guide</option>
//                     <option value="Exam Prep">Exam Prep & Deep Dive</option>
//                   </select>
//                 </div>

//                 <div className="flex items-center gap-3 pt-2">
//                   <input
//                     type="checkbox"
//                     id="roadmap"
//                     checked={includeRoadmap}
//                     onChange={(e) => setIncludeRoadmap(e.target.checked)}
//                     className="h-4 w-4 rounded border-[#EEE8DE] accent-[#1F4B43]"
//                   />
//                   <label htmlFor="roadmap" className="text-xs font-semibold text-[#2D2A26]">
//                     Include 5-Step Learning Roadmap
//                   </label>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isGenerating}
//                   className="mt-4 w-full flex items-center justify-center gap-2 rounded-full bg-[#1F4B43] py-3 text-xs font-bold text-white hover:bg-[#173B35] disabled:opacity-60 transition"
//                 >
//                   {isGenerating ? (
//                     <>
//                       <Loader2 size={16} className="animate-spin" />
//                       <span>Reasoning & Generating...</span>
//                     </>
//                   ) : (
//                     <>
//                       <Sparkles size={16} />
//                       <span>Generate Notes & Plan</span>
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>

//             {/* Generated Result Display */}
//             <div className="lg:col-span-7 rounded-3xl border border-[#EEE8DE] bg-white p-6 shadow-sm min-h-[400px] flex flex-col justify-between">
//               <div>
//                 <div className="flex items-center justify-between pb-4 border-b border-[#EEE8DE]">
//                   <h3 className="font-bold text-[#2D2A26] text-sm">Output Preview</h3>
//                   {generatedNotes && (
//                     <div className="flex gap-2">
//                       <button
//                         onClick={copyToClipboard}
//                         className="inline-flex items-center gap-1 rounded-lg border border-[#EEE8DE] px-3 py-1 text-xs font-semibold text-[#1F4B43] hover:bg-[#F8F4EC]"
//                       >
//                         {copied ? <Check size={14} /> : <Copy size={14} />}
//                         {copied ? 'Copied' : 'Copy'}
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 <div className="mt-4 text-sm leading-relaxed text-[#2D2A26] whitespace-pre-wrap font-sans">
//                   {isGenerating ? (
//                     <div className="flex flex-col items-center justify-center py-20 text-[#6F665B] space-y-3">
//                       <Loader2 className="h-8 w-8 animate-spin text-[#1F4B43]" />
//                       <p className="text-xs font-medium">Analyzing material and structuring flashcards...</p>
//                     </div>
//                   ) : generatedNotes ? (
//                     generatedNotes
//                   ) : (
//                     <div className="py-20 text-center text-xs text-[#6F665B]">
//                       Enter a topic on the left and click generate to view your personalized study notes.
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* TAB 2: AI CHAT ASSISTANT */}
//         {activeTab === 'chat' && (
//           <div className="rounded-3xl border border-[#EEE8DE] bg-white shadow-sm overflow-hidden flex flex-col h-[600px]">
//             {/* Messages Container */}
//             <div className="flex-1 overflow-y-auto p-6 space-y-4">
//               {messages.map((m, idx) => (
//                 <div
//                   key={idx}
//                   className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div
//                     className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
//                       m.role === 'user'
//                         ? 'bg-[#1F4B43] text-white rounded-tr-none'
//                         : 'bg-[#F8F4EC] text-[#2D2A26] border border-[#EEE8DE] rounded-tl-none'
//                     }`}
//                   >
//                     {m.content}
//                   </div>
//                 </div>
//               ))}
//               {isChatting && (
//                 <div className="flex justify-start">
//                   <div className="flex items-center gap-2 rounded-2xl bg-[#F8F4EC] px-4 py-2.5 text-xs text-[#6F665B]">
//                     <Loader2 size={14} className="animate-spin text-[#1F4B43]" />
//                     AI Assistant is thinking...
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Prompt Suggestions */}
//             <div className="bg-[#FFFDF9] px-6 py-2 border-t border-[#EEE8DE] flex gap-2 overflow-x-auto text-xs">
//               <span className="font-bold text-[#6F665B] py-1">Try asking:</span>
//               <button
//                 onClick={() => handleSendMessage('Explain Binary Search in simple terms.')}
//                 className="whitespace-nowrap rounded-full bg-[#F8F4EC] px-3 py-1 text-[#1F4B43] border border-[#EEE8DE] hover:bg-[#EEE8DE]"
//               >
//                 Explain Binary Search
//               </button>
//               <button
//                 onClick={() => handleSendMessage('Give me 3 study tips for computer science exams.')}
//                 className="whitespace-nowrap rounded-full bg-[#F8F4EC] px-3 py-1 text-[#1F4B43] border border-[#EEE8DE] hover:bg-[#EEE8DE]"
//               >
//                 CS Exam Tips
//               </button>
//             </div>

//             {/* Chat Input Bar */}
//             <div className="p-4 bg-white border-t border-[#EEE8DE]">
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   handleSendMessage();
//                 }}
//                 className="flex gap-2"
//               >
//                 <input
//                   type="text"
//                   value={inputMsg}
//                   onChange={(e) => setInputMsg(e.target.value)}
//                   placeholder="Ask a question about your studies..."
//                   className="flex-1 rounded-full border border-[#EEE8DE] bg-[#FFFDF9] px-5 py-2.5 text-sm focus:border-[#1F4B43] focus:outline-none"
//                 />
//                 <button
//                   type="submit"
//                   disabled={isChatting || !inputMsg.trim()}
//                   className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1F4B43] text-white hover:bg-[#173B35] disabled:opacity-50"
//                 >
//                   <Send size={16} />
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useState } from 'react';
import {
    FileText,
    Bot,
    BrainCircuit,
    Sparkles,
    Send,
    Loader2,
    Copy,
    Check,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function AIStudioPage() {
    const [activeTab, setActiveTab] = useState<'notes' | 'chat'>('notes');

    // Generator State
    const [topic, setTopic] = useState('');
    const [depth, setDepth] = useState('Detailed');
    const [includeRoadmap, setIncludeRoadmap] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedNotes, setGeneratedNotes] = useState('');
    const [copied, setCopied] = useState(false);

    // Chat State
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content:
                'Hello! I am your AI Study Assistant. Ask me to explain concepts, solve problems, or give study tips!',
        },
    ]);
    const [inputMsg, setInputMsg] = useState('');
    const [isChatting, setIsChatting] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    // 1. Handle Notes Generation
    const handleGenerateNotes = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) return toast.error('Please enter a topic.');

        setIsGenerating(true);
        setGeneratedNotes('');

        try {
            const res = await fetch(`${API_URL}/api/ai/generate-notes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, depth, includeRoadmap }),
            });

            const data = await res.json();
            if (res.ok) {
                setGeneratedNotes(data.result);
                toast.success('Notes generated successfully!');
            } else {
                toast.error(data.error || 'Generation failed.');
            }
        } catch (err) {
            console.error(err);
            toast.error('Could not connect to AI service.');
        } finally {
            setIsGenerating(false);
        }
    };

    // 2. Handle Chat Assistant
    const handleSendMessage = async (textToSend?: string) => {
        const msg = textToSend || inputMsg;
        if (!msg.trim()) return;

        const newMessages: Message[] = [...messages, { role: 'user', content: msg }];
        setMessages(newMessages);
        setInputMsg('');
        setIsChatting(true);

        try {
            const res = await fetch(`${API_URL}/api/ai/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: newMessages.map((m) => ({
                        role: m.role === 'assistant' ? 'model' : 'user',
                        content: m.content,
                    })),
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
            } else {
                toast.error('Failed to get response.');
            }
        } catch (err) {
            console.error(err);
            toast.error('Error contacting assistant.');
        } finally {
            setIsChatting(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedNotes);
        setCopied(true);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#FFFDF9] px-4 py-10 sm:px-8 mt-20">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#D8A34D]/30 bg-[#fad59a] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#624104]">
                        <Sparkles size={14} /> Agentic AI Workspace
                    </div>
                    <h1 className="mt-4 text-4xl font-extrabold text-[#2D2A26]">AI Study Studio</h1>
                    <p className="mt-2 text-sm text-[#6F665B]">
                        Generate custom study materials or converse with your contextual study assistant.
                    </p>
                </div>

                {/* Tab Selection */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex rounded-full bg-[#F8F4EC] p-1.5 border border-[#EEE8DE]">
                        <button
                            onClick={() => setActiveTab('notes')}
                            className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold transition-all ${activeTab === 'notes'
                                    ? 'bg-[#1F4B43] text-white shadow-md'
                                    : 'text-[#6F665B] hover:text-[#2D2A26]'
                                }`}
                        >
                            <FileText size={16} /> Notes Generator & Planner
                        </button>
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold transition-all ${activeTab === 'chat'
                                    ? 'bg-[#1F4B43] text-white shadow-md'
                                    : 'text-[#6F665B] hover:text-[#2D2A26]'
                                }`}
                        >
                            <Bot size={16} /> AI Chat Assistant
                        </button>
                    </div>
                </div>

                {/* TAB 1: AI NOTES GENERATOR */}
                {activeTab === 'notes' && (
                    <div className="grid gap-8 lg:grid-cols-12">
                        {/* Input Form */}
                        <div className="lg:col-span-5 rounded-3xl border border-[#EEE8DE] bg-white p-6 shadow-sm h-fit">
                            <h2 className="text-lg font-bold text-[#2D2A26] flex items-center gap-2">
                                <BrainCircuit className="text-[#1F4B43]" size={20} /> Generate Study Guide
                            </h2>

                            <form onSubmit={handleGenerateNotes} className="mt-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-[#6F665B] uppercase mb-2">
                                        Study Topic / Subject
                                    </label>
                                    <input
                                        type="text"
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        placeholder="e.g. Binary Search Trees or Photosynthesis"
                                        className="w-full rounded-xl border border-[#EEE8DE] bg-[#FFFDF9] px-4 py-2.5 text-sm focus:border-[#1F4B43] focus:outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#6F665B] uppercase mb-2">
                                        Output Depth
                                    </label>
                                    <select
                                        value={depth}
                                        onChange={(e) => setDepth(e.target.value)}
                                        className="w-full rounded-xl border border-[#EEE8DE] bg-[#FFFDF9] px-4 py-2.5 text-sm focus:border-[#1F4B43] focus:outline-none"
                                    >
                                        <option value="Brief Summary">Brief Summary</option>
                                        <option value="Detailed">Detailed Guide</option>
                                        <option value="Exam Prep">Exam Prep & Deep Dive</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-3 pt-2">
                                    <input
                                        type="checkbox"
                                        id="roadmap"
                                        checked={includeRoadmap}
                                        onChange={(e) => setIncludeRoadmap(e.target.checked)}
                                        className="h-4 w-4 rounded border-[#EEE8DE] accent-[#1F4B43]"
                                    />
                                    <label htmlFor="roadmap" className="text-xs font-semibold text-[#2D2A26]">
                                        Include 5-Step Learning Roadmap
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isGenerating}
                                    className="mt-4 w-full flex items-center justify-center gap-2 rounded-full bg-[#1F4B43] py-3 text-xs font-bold text-white hover:bg-[#173B35] disabled:opacity-60 transition"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            <span>Reasoning & Generating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={16} />
                                            <span>Generate Notes & Plan</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Generated Result Display */}
                        <div className="lg:col-span-7 rounded-3xl border border-[#EEE8DE] bg-white p-6 shadow-sm min-h-[400px] flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between pb-4 border-b border-[#EEE8DE]">
                                    <h3 className="font-bold text-[#2D2A26] text-sm">Output Preview</h3>
                                    {generatedNotes && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={copyToClipboard}
                                                className="inline-flex items-center gap-1 rounded-lg border border-[#EEE8DE] px-3 py-1 text-xs font-semibold text-[#1F4B43] hover:bg-[#F8F4EC]"
                                            >
                                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                                {copied ? 'Copied' : 'Copy'}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 text-sm leading-relaxed text-[#2D2A26] font-sans">
                                    {isGenerating ? (
                                        <div className="flex flex-col items-center justify-center py-20 text-[#6F665B] space-y-3">
                                            <Loader2 className="h-8 w-8 animate-spin text-[#1F4B43]" />
                                            <p className="text-xs font-medium">Analyzing material and structuring flashcards...</p>
                                        </div>
                                    ) : generatedNotes ? (
                                        /* MARKDOWN RENDERER FOR NOTES */
                                        <div className="markdown-content space-y-3 [&_h1]:text-xl [&_h1]:font-bold [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-[#1F4B43] [&_h3]:text-base [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-[#1F4B43] [&_blockquote]:pl-4 [&_blockquote]:italic [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-gray-200 [&_th]:p-2 [&_th]:bg-[#F8F4EC] [&_td]:border [&_td]:border-gray-200 [&_td]:p-2">
                                            <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]}
                                                rehypePlugins={[rehypeKatex]}>
                                                {generatedNotes}
                                            </ReactMarkdown>
                                        </div>
                                    ) : (
                                        <div className="py-20 text-center text-xs text-[#6F665B]">
                                            Enter a topic on the left and click generate to view your personalized study notes.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: AI CHAT ASSISTANT */}
                {activeTab === 'chat' && (
                    <div className="rounded-3xl border border-[#EEE8DE] bg-white shadow-sm overflow-hidden flex flex-col h-[600px]">
                        {/* Messages Container */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((m, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${m.role === 'user'
                                                ? 'bg-[#1F4B43] text-white rounded-tr-none'
                                                : 'bg-[#F8F4EC] text-[#2D2A26] border border-[#EEE8DE] rounded-tl-none'
                                            }`}
                                    >
                                        {/* MARKDOWN RENDERER FOR CHAT */}
                                        {m.role === 'user' ? (
                                            m.content
                                        ) : (
                                            <div className="space-y-2 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4">
                                                <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]}
                                                    rehypePlugins={[rehypeKatex]}>
                                                    {m.content}
                                                </ReactMarkdown>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isChatting && (
                                <div className="flex justify-start">
                                    <div className="flex items-center gap-2 rounded-2xl bg-[#F8F4EC] px-4 py-2.5 text-xs text-[#6F665B]">
                                        <Loader2 size={14} className="animate-spin text-[#1F4B43]" />
                                        AI Assistant is thinking...
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Prompt Suggestions */}
                        <div className="bg-[#FFFDF9] px-6 py-2 border-t border-[#EEE8DE] flex gap-2 overflow-x-auto text-xs">
                            <span className="font-bold text-[#6F665B] py-1">Try asking:</span>
                            <button
                                onClick={() => handleSendMessage('Explain Binary Search in simple terms.')}
                                className="whitespace-nowrap rounded-full bg-[#F8F4EC] px-3 py-1 text-[#1F4B43] border border-[#EEE8DE] hover:bg-[#EEE8DE]"
                            >
                                Explain Binary Search
                            </button>
                            <button
                                onClick={() => handleSendMessage('Give me 3 study tips for computer science exams.')}
                                className="whitespace-nowrap rounded-full bg-[#F8F4EC] px-3 py-1 text-[#1F4B43] border border-[#EEE8DE] hover:bg-[#EEE8DE]"
                            >
                                CS Exam Tips
                            </button>
                        </div>

                        {/* Chat Input Bar */}
                        <div className="p-4 bg-white border-t border-[#EEE8DE]">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSendMessage();
                                }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    value={inputMsg}
                                    onChange={(e) => setInputMsg(e.target.value)}
                                    placeholder="Ask a question about your studies..."
                                    className="flex-1 rounded-full border border-[#EEE8DE] bg-[#FFFDF9] px-5 py-2.5 text-sm focus:border-[#1F4B43] focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    disabled={isChatting || !inputMsg.trim()}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1F4B43] text-white hover:bg-[#173B35] disabled:opacity-50"
                                >
                                    <Send size={16} />
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}