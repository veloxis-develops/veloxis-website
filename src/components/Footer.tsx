import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-void-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-glow-cyan to-glow-violet flex items-center justify-center">
              <span className="font-[Syne] font-bold text-void text-[10px]">VD</span>
            </div>
            <span className="font-[Syne] font-semibold text-text-secondary text-sm">Veloxis Develops</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <span>Crafted with</span>
            <Heart size={12} className="text-red-400 fill-red-400" />
            <span>and an unreasonable amount of coffee</span>
          </div>

          <div className="text-xs text-text-muted">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
