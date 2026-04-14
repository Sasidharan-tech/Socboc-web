import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { TerminalUI } from '@/components/ui/terminal-ui';
import { Shield, Lock, Search, Globe, Zap, ArrowRight, BarChart3, Activity, Download } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / height) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const terminalLines = [
    "[✓] Initializing scan engine...",
    "[✓] Loading vulnerability signatures (v4.2.0)...",
    "[✓] Connecting to global threat database...",
    "[✓] Scanning target: example-target.io",
    "[✓] Analyzing request headers...",
    "[!] Warning: SSL certificate expiration soon",
    "[!] Critical: SQL Injection vulnerability found at /api/v1/auth",
    "[✓] Cross-site Scripting (XSS) scanner: Active",
    "[!] High: Stored XSS vulnerability detected at /user/profile/settings",
    "[✓] CSRF protection verification: Complete",
    "[!] Open redirect vulnerability found at /auth/callback",
    "[✓] Security audit complete. 3 high-severity threats discovered.",
    "[✓] Report generated successfully."
  ];

  const features = [
    {
      icon: <Search className="w-8 h-8 text-primary" />,
      title: "SQL Injection Detection",
      desc: "Advanced payload testing to identify blind and time-based SQL injection points."
    },
    {
      icon: <Zap className="w-8 h-8 text-secondary" />,
      title: "XSS Scanner",
      desc: "Real-time DOM analysis and script injection testing to secure your user interface."
    },
    {
      icon: <Lock className="w-8 h-8 text-accent" />,
      title: "Broken Auth Detection",
      desc: "Comprehensive testing of session management and authentication workflows."
    },
    {
      icon: <Activity className="w-8 h-8 text-primary" />,
      title: "CSRF Detection",
      desc: "Verify token implementation and protection against cross-site request forgery."
    },
    {
      icon: <Globe className="w-8 h-8 text-secondary" />,
      title: "Open Port Analysis",
      desc: "Full port scanning and service fingerprinting to map your attack surface."
    },
    {
      icon: <Shield className="w-8 h-8 text-accent" />,
      title: "SSL/TLS Audit",
      desc: "Ensure strong encryption protocols and identify configuration weaknesses."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-primary/30 relative">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        
        {/* Animated Background Grid */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        {/* Floating UI Elements */}
        <div className="absolute top-1/4 left-10 animate-float opacity-20 hidden md:block">
          <GlassCard className="p-4 w-48 border-primary/20">
            <div className="h-2 w-full bg-primary/20 rounded mb-2" />
            <div className="h-2 w-2/3 bg-primary/10 rounded" />
          </GlassCard>
        </div>
        <div className="absolute bottom-1/4 right-10 animate-float opacity-20 hidden md:block" style={{ animationDelay: '1s' }}>
          <GlassCard className="p-4 w-48 border-secondary/20">
            <div className="h-2 w-full bg-secondary/20 rounded mb-2" />
            <div className="h-2 w-1/2 bg-secondary/10 rounded" />
          </GlassCard>
        </div>

        <div className="relative z-10 text-center max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Badge variant="outline" className="mb-6 border-primary/50 text-primary py-1 px-4 text-sm animate-pulse-glow">
            NOW IN PUBLIC BETA
          </Badge>
          <h1 className="text-5xl md:text-8xl futuristic-font mb-6 font-bold tracking-tighter">
            Scan. Detect. <span className="gradient-text">Secure.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Next-generation intelligent vulnerability scanner for modern web applications. 
            Identify critical threats before they reach production.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-primary text-black hover:bg-primary/90 rounded-full px-8 py-6 text-lg font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,159,0.4)]" asChild>
              <Link to="/dashboard">
                Start Scan <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 glass rounded-full px-8 py-6 text-lg transition-all hover:bg-white/5 hover:border-white/30" asChild>
              <Link to="/dashboard">
                View Dashboard
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 glass rounded-full px-8 py-6 text-lg transition-all hover:bg-white/5 hover:border-white/30" asChild>
              <a href="/SOCBOX_Setup.exe" download="SOCBOX_Setup.exe">
                Download SOCBOX.exe <Download className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>

      </section>

      {/* Features Section */}
      <section className="py-24 px-6 md:px-12 bg-black/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl futuristic-font mb-4">Core Vulnerability Engine</h2>
            <p className="text-white/50 max-w-2xl mx-auto">SOCBOX uses advanced machine learning models to detect even the most elusive security flaws.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <GlassCard key={i} hoverGlow className="flex flex-col items-start gap-4">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 mb-2">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold futuristic-font tracking-tight">{f.title}</h3>
                <p className="text-white/60 leading-relaxed text-sm">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Live Scanner Preview */}
      <section className="py-24 px-6 md:px-12 bg-[#050505] relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <TerminalUI lines={terminalLines} className="scale-110 md:scale-125 lg:scale-100" />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl md:text-5xl futuristic-font leading-tight">Live Intelligence <br/><span className="text-primary">Streaming.</span></h2>
            <p className="text-lg text-white/60 leading-relaxed">
              Watch as our scanner analyzes every packet, every header, and every response in real-time. SOCBOX provides actionable logs that developers actually understand.
            </p>
            <ul className="space-y-4">
              {[
                "Real-time vulnerability reporting",
                "Deep-link exploit reproduction",
                "Developer-friendly remediation guides",
                "Continuous automated integration"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <div className="w-5 h-5 rounded-full border border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-24 px-6 md:px-12 bg-black relative">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl futuristic-font mb-4">Command & Control</h2>
          <p className="text-white/50">Manage your organization's security posture from a single, high-fidelity dashboard.</p>
        </div>
        
        <GlassCard className="max-w-5xl mx-auto p-0 overflow-hidden border-white/5 bg-black/40">
          <div className="flex flex-col md:flex-row h-full">
            {/* Minimal Dashboard Preview UI */}
            <div className="flex-1 p-8 space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Vulnerabilities", value: "1,284", color: "text-white" },
                  { label: "High Severity", value: "42", color: "text-destructive" },
                  { label: "Medium Severity", value: "312", color: "text-orange-500" },
                  { label: "Low Severity", value: "930", color: "text-primary" },
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-[10px] uppercase text-white/40 tracking-wider font-bold">{stat.label}</p>
                    <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
                  </div>
                ))}
              </div>
              
              <div className="h-48 md:h-64 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
                {/* Mock Chart Visualization */}
                <div className="absolute inset-0 flex items-end justify-around px-8 pb-8 gap-4">
                  {[40, 60, 30, 80, 50, 90, 45].map((h, i) => (
                    <div 
                      key={i} 
                      className="w-full bg-primary/20 border-t border-primary/50 transition-all duration-700 delay-300" 
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <BarChart3 className="w-8 h-8 text-white/20" />
                  <span className="text-xs text-white/20 uppercase tracking-widest font-bold">Threat Distribution Matrix</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-7xl futuristic-font mb-8 leading-tight">Secure Your Web <br/> Applications Today.</h2>
          <Button size="lg" className="bg-primary text-black hover:bg-primary/90 rounded-full px-12 py-8 text-xl font-bold transition-all hover:scale-110 hover:shadow-[0_0_30px_rgba(0,255,159,0.5)] animate-pulse-glow" asChild>
            <Link to="/dashboard">
              Access Scanner Engine <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-all group"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              navigate('/');
            }}
          >
            <Shield className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-xl futuristic-font font-bold">SOCBOX</span>
          </div>
          <p className="text-white/40 text-sm">© 2026 SOCBOX. All rights reserved.</p>
          <div className="flex gap-8 text-sm text-white/60">
            <a href="#" className="hover:text-primary transition-colors">Documentation</a>
            <a href="#" className="hover:text-primary transition-colors">API Status</a>
            <a href="#" className="hover:text-primary transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;