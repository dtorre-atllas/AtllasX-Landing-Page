import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Loader2, 
  Upload, 
  FileAudio, 
  File, 
  Check, 
  Sparkles, 
  Globe,
  Mic,
  MessageSquare,
  Mail,
  Volume2,
  Clock,
  Flame
} from "lucide-react";
import logo from "figma:asset/1e92e0e6bcf98f1e05ff176c9126ea436cff368d.png";

type MessageRole = "assistant" | "user";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  component?: "website-input" | "files" | "voice" | "options" | "test" | "contacts" | "dashboard";
  metadata?: any;
}

export function CampaignDemoShowcase() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [websiteTyping, setWebsiteTyping] = useState("");
  const [websiteValue, setWebsiteValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll only the chat container, not the page
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Typing animation effect
  useEffect(() => {
    if (websiteTyping) {
      const text = websiteTyping;
      let currentIndex = 0;
      setWebsiteValue("");

      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setWebsiteValue(text.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50); // 50ms per character

      return () => clearInterval(typingInterval);
    }
  }, [websiteTyping]);

  // Auto-play demo loop
  useEffect(() => {
    const runDemo = async () => {
      // Step 1: Initial message (start immediately)
      addMessage("assistant", "Let's create your AI calling campaign! First, what's your website?");
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Step 2: Website input
      addMessage("assistant", "", "website-input");
      await new Promise(resolve => setTimeout(resolve, 800));
      setWebsiteTyping("https://acmesaas.com");
      await new Promise(resolve => setTimeout(resolve, 1500));
      addMessage("user", "https://acmesaas.com");
      setWebsiteValue("https://acmesaas.com");
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsProcessing(false);
      
      // Step 3: Training files
      addMessage("assistant", "Perfect! Now let's train your AI with your best materials.");
      await new Promise(resolve => setTimeout(resolve, 2000));
      addMessage("assistant", "", "files", {
        files: [
          { name: "best_sales_call_q4.mp3", type: "audio" },
          { name: "sales_script_v3.pdf", type: "pdf" },
          { name: "product_overview.pdf", type: "pdf" }
        ]
      });
      await new Promise(resolve => setTimeout(resolve, 2500));
      addMessage("user", "Uploaded 3 files");
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsProcessing(false);
      
      // Step 4: Voice selection
      addMessage("assistant", "Great! Now choose a voice for your AI caller:");
      await new Promise(resolve => setTimeout(resolve, 2000));
      addMessage("assistant", "", "voice");
      await new Promise(resolve => setTimeout(resolve, 2500));
      addMessage("user", "Selected: Sarah (Professional Female)");
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsProcessing(false);
      
      // Step 5: Options
      addMessage("assistant", "Perfect! Let's customize your campaign settings:");
      await new Promise(resolve => setTimeout(resolve, 1800));
      addMessage("assistant", "", "options");
      await new Promise(resolve => setTimeout(resolve, 2200));
      addMessage("user", "Settings configured ✓");
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsProcessing(false);
      
      // Step 6: Test call
      addMessage("assistant", "Let's test your campaign. Enter your phone number:");
      await new Promise(resolve => setTimeout(resolve, 2000));
      addMessage("user", "+1 (555) 123-4567");
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 2500));
      setIsProcessing(false);
      addMessage("user", "Test call completed ✓");
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Step 7: Contacts
      addMessage("assistant", "Sounds great, right? Now upload your contact list:");
      await new Promise(resolve => setTimeout(resolve, 2000));
      addMessage("user", "Added 247 contacts");
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsProcessing(false);
      
      // Step 8: Dashboard
      addMessage("assistant", "Perfect! Campaign launched. Here's your live dashboard:");
      await new Promise(resolve => setTimeout(resolve, 1500));
      addMessage("assistant", "", "dashboard");
      
      // Wait longer to show final result
      await new Promise(resolve => setTimeout(resolve, 12000));
      setMessages([]);
      setWebsiteTyping("");
      setWebsiteValue("");
      
      // Restart immediately (no delay)
      runDemo();
    };

    runDemo();
  }, []);

  const addMessage = (role: MessageRole, content: string, component?: Message["component"], metadata?: any) => {
    const newMessage: Message = {
      id: Date.now().toString() + Math.random(),
      role,
      content,
      component,
      metadata,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-b from-gray-50 to-white rounded-2xl border-2 border-gray-200 shadow-2xl overflow-hidden">
      {/* Demo Header */}
      <div className="border-b border-gray-700 bg-gray-900/95 backdrop-blur-sm px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <img src={logo} alt="AtllasX" className="h-8" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-400 font-medium">Live Demo</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-[calc(100%-60px)] overflow-y-hidden px-4 py-6" ref={messagesContainerRef}>
        <div className="max-w-2xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {message.role === "assistant" ? (
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="flex-1">
                      {message.content && (
                        <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200 text-sm">
                          <p className="text-gray-900">{message.content}</p>
                        </div>
                      )}
                      
                      {/* Component Previews */}
                      {message.component === "website-input" && (
                        <div className="mt-2 bg-gray-50 rounded-xl p-3 border border-gray-200">
                          <div className="flex flex-col sm:flex-row gap-2">
                            <div className="flex-1 relative min-w-0 w-full">
                              <Globe className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                              <div className={`h-9 pl-8 pr-3 rounded-lg border border-gray-300 bg-white flex items-center text-sm w-full ${websiteValue ? 'text-gray-900' : 'text-gray-400'}`}>
                                <span className="truncate block w-full">{websiteValue || 'https://yourwebsite.com'}</span>
                              </div>
                            </div>
                            <button className="h-9 px-4 rounded-lg bg-indigo-600 text-white text-sm font-medium flex items-center justify-center whitespace-nowrap w-full sm:w-auto">
                              Continue
                            </button>
                          </div>
                        </div>
                      )}

                      {message.component === "files" && message.metadata?.files && (
                        <div className="mt-2 bg-gray-50 rounded-xl p-3 space-y-2">
                          {message.metadata.files.map((file: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200">
                              {file.type === 'audio' ? (
                                <FileAudio className="w-4 h-4 text-indigo-600" />
                              ) : (
                                <File className="w-4 h-4 text-indigo-600" />
                              )}
                              <span className="text-xs text-gray-700 flex-1">{file.name}</span>
                              <Check className="w-4 h-4 text-green-600" />
                            </div>
                          ))}
                        </div>
                      )}

                      {message.component === "voice" && (
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {[
                            { name: "Sarah", type: "Professional", selected: true },
                            { name: "Marcus", type: "Confident", selected: false },
                          ].map((voice) => (
                            <div
                              key={voice.name}
                              className={`p-3 rounded-lg border ${
                                voice.selected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <div className="text-xs font-semibold text-gray-900">{voice.name}</div>
                                <Mic className="w-3.5 h-3.5 text-indigo-600" />
                              </div>
                              <div className="text-xs text-gray-600">{voice.type}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {message.component === "options" && (
                        <div className="mt-2 bg-white rounded-xl p-4 border border-gray-200 space-y-3">
                          {[
                            { icon: MessageSquare, label: "Follow-up Text", checked: true },
                            { icon: Volume2, label: "Background Noise", checked: true },
                            { icon: Mail, label: "Email Follow-up", checked: true },
                          ].map((option, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <option.icon className="w-4 h-4 text-indigo-600" />
                                <span className="text-xs text-gray-900">{option.label}</span>
                              </div>
                              <div className={`w-8 h-5 rounded-full ${option.checked ? 'bg-indigo-600' : 'bg-gray-300'} relative`}>
                                <div className={`w-3 h-3 rounded-full bg-white absolute top-1 ${option.checked ? 'right-1' : 'left-1'} transition-all`} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {message.component === "dashboard" && (
                        <div className="mt-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
                          {/* Stats Grid */}
                          <div className="grid grid-cols-3 gap-3 p-3 border-b border-gray-200">
                            <div className="text-center">
                              <div className="text-lg font-bold text-gray-900">247</div>
                              <div className="text-xs text-gray-600">Total Calls</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-600">89%</div>
                              <div className="text-xs text-gray-600">Answer Rate</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-indigo-600">31</div>
                              <div className="text-xs text-gray-600">Hot Leads</div>
                            </div>
                          </div>

                          {/* Hot Leads Section */}
                          <div className="p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Flame className="w-3.5 h-3.5 text-orange-500" />
                              <span className="text-xs font-semibold text-gray-900">Hot Leads</span>
                            </div>
                            <div className="space-y-2">
                              {[
                                { name: "Sarah Johnson", company: "TechCorp", status: "Interested", score: 95 },
                                { name: "Michael Chen", company: "DataFlow", status: "Book Meeting", score: 92 },
                                { name: "Emily Davis", company: "CloudSync", status: "Follow Up", score: 88 },
                              ].map((lead, idx) => (
                                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                  <div className="flex-1">
                                    <div className="text-xs font-medium text-gray-900">{lead.name}</div>
                                    <div className="text-xs text-gray-500">{lead.company}</div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                                      {lead.score}%
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Recent Activity */}
                          <div className="p-3 bg-gray-50 border-t border-gray-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-3.5 h-3.5 text-gray-400" />
                              <span className="text-xs font-semibold text-gray-900">Recent Activity</span>
                            </div>
                            <div className="space-y-1.5">
                              {[
                                { text: "Call completed with John Smith", time: "2m ago", type: "success" },
                                { text: "Voicemail left for Lisa Brown", time: "5m ago", type: "neutral" },
                                { text: "Meeting booked with Sarah J.", time: "8m ago", type: "success" },
                              ].map((activity, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                                    activity.type === 'success' ? 'bg-green-500' : 'bg-gray-400'
                                  }`} />
                                  <div className="flex-1">
                                    <div className="text-xs text-gray-700">{activity.text}</div>
                                    <div className="text-xs text-gray-400">{activity.time}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="bg-gray-900 text-white rounded-xl px-4 py-2.5 max-w-xs text-sm">
                      <p>{message.content}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-2"
            >
              <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                <span className="text-xs text-gray-600">Processing...</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}