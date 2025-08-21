import { Layers, Twitter, Github, MessageCircle, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-electric-purple to-bright-purple rounded-full flex items-center justify-center">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">ProofDrop</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              The decentralized protocol for verifiable airdrop reputation. Prove your humanity, eliminate bots, and participate in fair token distributions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-electric-purple transition-colors" data-testid="social-twitter">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-purple transition-colors" data-testid="social-github">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-purple transition-colors" data-testid="social-discord">
                <MessageCircle className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-purple transition-colors" data-testid="social-docs">
                <FileText className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Protocol</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="link-docs">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="link-whitepaper">Whitepaper</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="link-api">API</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="link-integration">Integration Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="link-discord">Discord</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="link-telegram">Telegram</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="link-governance">Governance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="link-blog">Blog</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 ProofDrop Protocol. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="link-privacy">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="link-terms">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="link-security">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
