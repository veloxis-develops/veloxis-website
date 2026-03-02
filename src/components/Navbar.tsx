import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../lib/data';
import { useScrollPosition } from '../lib/hooks';

export default function Navbar() {
  const scrollY = useScrollPosition();
  const scrolled = scrollY > 50;
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-void/70 backdrop-blur-2xl border-b border-void-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-glow-cyan to-glow-violet flex items-center justify-center">
                <span className="font-[Syne] font-bold text-void text-sm">VD</span>
              </div>
              <span className="font-[Syne] font-semibold text-text-primary text-lg tracking-tight">
                Veloxis Develops
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-300 rounded-lg hover:bg-white/[0.03]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="ml-4 px-5 py-2.5 text-sm font-medium rounded-xl bg-gradient-to-r from-glow-cyan/10 to-glow-violet/10 border border-glow-cyan/20 text-glow-cyan hover:border-glow-cyan/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
              >
                Book a Discovery Call
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-[Syne] font-semibold text-text-primary hover:text-glow-cyan transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setMobileOpen(false)}
                className="mt-4 px-8 py-3 text-lg font-medium rounded-xl bg-gradient-to-r from-glow-cyan to-glow-violet text-void"
              >
                Book a Discovery Call
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
