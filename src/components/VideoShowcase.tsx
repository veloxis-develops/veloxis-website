import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

export default function VideoShowcase() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section id="showcase" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-glow-violet/20 bg-glow-violet/[0.05] text-xs font-medium text-glow-violet tracking-wider uppercase font-[JetBrains_Mono] mb-6">
            Live Demo
          </span>
          <h2 className="font-[Syne] text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            See the AI Agent in Action
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A 60-second walkthrough of our autonomous agent orchestration platform
            processing real-world logistics data.
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Glow Effect Behind */}
          <div className="absolute -inset-4 bg-gradient-to-r from-glow-cyan/20 via-glow-blue/10 to-glow-violet/20 rounded-3xl blur-2xl opacity-50" />

          {/* Video Wrapper */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 glow-border">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center gap-2 px-5 py-3 bg-gradient-to-b from-black/60 to-transparent">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-3 text-xs text-white/40 font-[JetBrains_Mono]">ai-agent-demo.mp4</span>
            </div>

            {/* Video Element */}
            <div className="relative aspect-video bg-void-light">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                // poster="/images/video-poster.jpg"
                muted={muted}
                playsInline
                preload="metadata"
                onEnded={() => setPlaying(false)}
              >
                {/* Replace src with your actual demo video */}
                <source src="/9e51263e876ec8600f65cda5a5cb0e7acaadedc3b12e739cf6ea7a6d32c3ebfb_1080p.mp4" type="video/mp4" />
                <a href="/9e51263e876ec8600f65cda5a5cb0e7acaadedc3b12e739cf6ea7a6d32c3ebfb_1080p.mp4"></a>
                Your browser does not support the video tag.
              </video>

              {/* Play Overlay */}
              {!playing && (
                <motion.button
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center z-10 bg-black/30 group cursor-pointer"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-glow-cyan/30 rounded-full blur-xl animate-pulse-glow" />
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                      <Play size={32} className="text-white ml-1" fill="white" />
                    </div>
                  </div>
                  <span className="absolute bottom-8 text-sm text-white/60 font-medium">
                    Watch Solution
                  </span>
                </motion.button>
              )}
            </div>

            {/* Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-3 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white cursor-pointer"
                >
                  {playing ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white cursor-pointer"
                >
                  {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white cursor-pointer"
              >
                <Maximize size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
