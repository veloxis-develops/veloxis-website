import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Github, Linkedin, Twitter, CheckCircle, ArrowRight, Mail, MapPin, Clock } from 'lucide-react';
import { useForm } from '@formspree/react';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [state, submitToFormspree] = useForm("xbdaeqvn");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitToFormspree(e);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  const socials = [
    { icon: <Github size={20} />, label: 'GitHub', href: 'https://github.com/veloxis-develops', hoverColor: 'hover:text-white hover:bg-white/10' },
    { icon: <Linkedin size={20} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/veloxis-develops-9b206b3b4/', hoverColor: 'hover:text-[#0A66C2] hover:bg-[#0A66C2]/10' },
    { icon: <Twitter size={20} />, label: 'Twitter', href: 'https://x.com/VeloxisD', hoverColor: 'hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10' },
  ];

  return (
    <section id="contact" ref={ref} className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-glow-cyan/[0.03] rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-glow-amber/20 bg-glow-amber/[0.05] text-xs font-medium text-glow-amber tracking-wider uppercase font-[JetBrains_Mono] mb-6">
            Let's Build Together
          </span>
          <h2 className="font-[Syne] text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Start a Conversation
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Have an AI challenge or a system that needs to scale?
            Let's discuss how I can deliver results for your team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info Cards */}
            <div className="glass-card rounded-2xl p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-glow-cyan/[0.05] border border-glow-cyan/20">
                  <Mail size={18} className="text-glow-cyan" />
                </div>
                <div>
                  <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Email</div>
                  <div className="text-sm text-text-primary">veloxisdevelops@gmail.com</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-glow-violet/[0.05] border border-glow-violet/20">
                  <MapPin size={18} className="text-glow-violet" />
                </div>
                <div>
                  <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Location</div>
                  <div className="text-sm text-text-primary">INDIA — Remote OK</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-glow-emerald/[0.05] border border-glow-emerald/20">
                  <Clock size={18} className="text-glow-emerald" />
                </div>
                <div>
                  <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Response Time</div>
                  <div className="text-sm text-text-primary">Within 24 hours</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card rounded-2xl p-6">
              <div className="text-xs text-text-muted uppercase tracking-wider mb-4">Connect</div>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-void-border text-text-muted transition-all duration-300 ${social.hoverColor} hover:border-transparent`}
                  >
                    {social.icon}
                    <span className="text-sm font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <form  onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 lg:p-8 glow-border"
            action="https://formspree.io/f/xbdaeqvn" method="post"
            >
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-text-muted uppercase tracking-wider mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-void-light border border-void-border text-text-primary text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-glow-cyan/40 focus:ring-1 focus:ring-glow-cyan/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted uppercase tracking-wider mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-void-light border border-void-border text-text-primary text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-glow-cyan/40 focus:ring-1 focus:ring-glow-cyan/20 transition-all duration-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-text-muted uppercase tracking-wider mb-2">Message</label>
                  <textarea
                  name="message"
                  id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, and goals..."
                    className="w-full px-4 py-3 rounded-xl bg-void-light border border-void-border text-text-primary text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-glow-cyan/40 focus:ring-1 focus:ring-glow-cyan/20 transition-all duration-300 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full group flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-glow-cyan to-glow-blue text-void font-semibold text-sm hover:shadow-[0_0_40px_rgba(0,240,255,0.2)] transition-all duration-500 disabled:opacity-60 cursor-pointer"
                >
                  {submitted ? (
                    <>
                      <CheckCircle size={18} />
                      Message Sent — I'll be in touch!
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
