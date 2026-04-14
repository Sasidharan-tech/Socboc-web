import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { LayoutDashboard, Scan, FileText, Settings, Shield, Bell, Search, User, MoreHorizontal, AlertTriangle, AlertCircle, Info, CheckCircle2, Menu, X, Download, Plus, Key, Globe, Mail, Lock as LockIcon } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { TerminalUI } from '@/components/ui/terminal-ui';
import { cn } from '@/lib/utils';

import { toast } from 'sonner';

interface Vulnerability {
  id: number;
  target: string;
  type: string;
  severity: string;
  status: string;
  date: string;
}

interface Report {
  id: string;
  name: string;
  target: string;
  date: string;
  severity: string;
  score: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState('Idle');
  const [scanUrl, setScanUrl] = useState('');
  const [scanMode, setScanMode] = useState('Deep');

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Welcome to SOCBOX!', read: false },
  ]);

  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [reports, setReports] = useState<Report[]>([]);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Scan, label: 'Scan' },
    { icon: FileText, label: 'Reports' },
    { icon: Settings, label: 'Settings' },
  ];

  const terminalLines = [
    "[✓] Initializing SOCBOX Engine v1.0.4",
    "[✓] Establishing secure websocket connection...",
    `[✓] Target identified: ${scanUrl || 'example.com'}`,
    "[✓] Resolving DNS for target...",
    "[✓] IP Address: 93.184.216.34",
    "[✓] Scanning top 1000 ports...",
    "[!] Port 22 (SSH) open - Fingerprint: OpenSSH 8.2p1",
    "[✓] Analyzing HTTP security headers...",
    "[!] Missing Content-Security-Policy header",
    "[!] Missing Strict-Transport-Security header",
    "[✓] Crawling web pages...",
    "[✓] 42 pages discovered in 1.4s",
    "[✓] Fuzzing input parameters (XSS/SQLi)...",
    "[!] Critical: SQL Injection found on /api/v1/search?q=",
    "[!] High: Reflected XSS found on /login?redirect=",
    "[✓] Finalizing scan report...",
    "[✓] Scan Complete. 2 Critical, 3 High vulnerabilities found."
  ];

  const mockVulnerabilities = [
    { id: 1, target: 'api.example.com/v1/auth', type: 'SQL Injection', severity: 'High', status: 'Detected', date: '2026-03-31' },
    { id: 2, target: 'shop.example.com/cart', type: 'Cross-Site Scripting (XSS)', severity: 'Medium', status: 'In Review', date: '2026-03-30' },
    { id: 3, target: 'blog.example.com/redirect', type: 'Open Redirect', severity: 'Low', status: 'Resolved', date: '2026-03-29' },
  ];

  const scanSteps = [
    'Initializing scan engine...',
    'Performing DNS lookup...',
    'Analyzing security headers...',
    'Scanning open ports...',
    'Fuzzing HTTP parameters...',
    'Verifying SSL/TLS config...',
    'Generating final report...'
  ];

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setIsScanning(false);
            setScanStep('Scan Complete — 3 vulnerabilities found');
            setVulnerabilities(mockVulnerabilities);
            toast.success("Vulnerability Scan Complete!");
            setNotifications(prev => [{ id: Date.now(), text: "New scan report available!", read: false }, ...prev]);
            clearInterval(interval);
            return 100;
          }
          const next = prev + (Math.random() * 5);
          const stepIndex = Math.min(Math.floor((next / 100) * scanSteps.length), scanSteps.length - 1);
          setScanStep(`${scanSteps[stepIndex]} ${Math.floor(next)}%`);
          return next;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const startScan = () => {
    if (!scanUrl && activeTab === 'Scan') {
      toast.error("Please enter a target URL.");
      return;
    }
    setIsScanning(true);
    setScanProgress(0);
    setScanStep('Initializing...');
    setVulnerabilities([]); // Clear existing
    toast("Scan Engine Started", { description: `Analyzing target: ${scanUrl || 'example.com'}` });
  };

  const createNewReport = () => {
    if (vulnerabilities.length === 0) {
      toast.error("No vulnerabilities found yet. Run a scan first.");
      return;
    }
    const newReport = {
      id: `R-${Math.floor(1000 + Math.random() * 9000)}`,
      name: `Report for ${scanUrl || 'example.com'}`,
      target: scanUrl || 'example.com',
      date: new Date().toISOString().split('T')[0],
      severity: 'High',
      score: (Math.random() * 10).toFixed(1)
    };
    setReports(prev => [newReport, ...prev]);
    toast.success("New report generated successfully.");
  };

  const toggleNotifications = () => {
    if (notifications.length > 0) {
      toast(`You have ${notifications.filter(n => !n.read).length} new messages`, {
        action: {
          label: 'Mark as read',
          onClick: () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))
        }
      });
    } else {
      toast("No new notifications");
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High': return <Badge variant="destructive" className="bg-destructive/20 text-destructive border-destructive/30 px-3">High</Badge>;
      case 'Medium': return <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30 px-3">Medium</Badge>;
      case 'Low': return <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 px-3">Low</Badge>;
      default: return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Detected': return <AlertCircle className="w-4 h-4 text-destructive" />;
      case 'In Review': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'Resolved': return <CheckCircle2 className="w-4 h-4 text-primary" />;
      default: return <Info className="w-4 h-4 text-white/40" />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[#0A0A0A] text-white">
        {/* Sidebar */}
        <Sidebar className="border-r border-white/5 bg-[#0A0A0A]">
          <SidebarHeader className="p-6">
            <div 
              className="flex items-center gap-2 mb-8 cursor-pointer group hover:opacity-80 transition-all"
              onClick={() => navigate('/')}
            >
              <Shield className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-2xl futuristic-font font-bold tracking-tight">SOCBOX</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-white/40 uppercase tracking-widest text-[10px] font-bold px-6 mb-4">Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.label} className="px-3 mb-1">
                      <SidebarMenuButton 
                        onClick={() => setActiveTab(item.label)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-6 rounded-lg transition-all duration-200",
                          activeTab === item.label 
                            ? "bg-primary/10 text-primary neon-border-primary" 
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <item.icon className={cn("w-5 h-5", activeTab === item.label ? "text-primary" : "text-white/60")} />
                        <span className="font-medium text-base">{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Animated Background Pulse */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

          {/* Top Bar */}
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden text-white" />
              <div 
                className="flex lg:hidden items-center gap-2 cursor-pointer hover:opacity-80 transition-all group"
                onClick={() => navigate('/')}
              >
                <Shield className="w-6 h-6 text-primary" />
                <span className="text-lg futuristic-font font-bold tracking-tight">SOCBOX</span>
              </div>
              <h2 className="text-xl font-bold futuristic-font tracking-tight hidden lg:block">{activeTab}</h2>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative hidden md:block">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input 
                  type="text" 
                  placeholder="Search vulnerabilities..." 
                  className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-primary/50 transition-colors w-64"
                />
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative text-white/60 hover:text-white" onClick={toggleNotifications}>
                  <Bell className="w-5 h-5" />
                  {notifications.some(n => !n.read) && <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />}
                </Button>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                  <User className="w-4 h-4" />
                </div>
              </div>
            </div>
          </header>

          {/* Scrollable Area */}
          <main className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
            {activeTab === 'Dashboard' && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Scans', value: reports.length, icon: Scan, color: 'text-secondary' },
                    { label: 'Vulnerabilities', value: vulnerabilities.length, icon: Shield, color: 'text-white' },
                    { label: 'High Severity', value: vulnerabilities.filter(v => v.severity === 'High').length, icon: AlertCircle, color: 'text-destructive' },
                    { label: 'Resolved Issues', value: vulnerabilities.filter(v => v.status === 'Resolved').length, icon: CheckCircle2, color: 'text-primary' },
                  ].map((stat, i) => (
                    <GlassCard key={i} hoverGlow className="flex flex-col gap-2 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <stat.icon className={cn("w-6 h-6", stat.color)} />
                        <MoreHorizontal className="w-4 h-4 text-white/20" />
                      </div>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                      <p className={cn("text-3xl font-bold futuristic-font", stat.color)}>{stat.value}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-primary text-[10px] font-bold">Live System Metrics</span>
                      </div>
                    </GlassCard>
                  ))}
                </div>

                {/* Scan Progress Section */}
                <GlassCard className="relative overflow-hidden p-8 border-primary/10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                      <h3 className="text-2xl futuristic-font font-bold mb-2">Live Vulnerability Scan</h3>
                      <p className="text-white/60 text-sm">Automated analysis of production infrastructure and endpoint security.</p>
                    </div>
                    {!isScanning && (
                      <Button onClick={startScan} className="bg-primary text-black hover:bg-primary/90 rounded-full px-8 py-6 font-bold text-base transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,159,0.3)]">
                        Initialize Scanner Engine
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className={cn(isScanning ? "text-primary animate-pulse" : "text-white/40")}>
                        {scanStep}
                      </span>
                      <span className="text-white/60 font-bold">{Math.floor(scanProgress)}%</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                      <div 
                        className="h-full bg-gradient-to-r from-primary/50 to-primary transition-all duration-500 ease-out shadow-[0_0_10px_rgba(0,255,159,0.5)]"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                  </div>
                </GlassCard>

                {/* Vulnerability Table */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl futuristic-font font-bold">Recent Findings</h3>
                    <Button variant="outline" className="text-xs border-white/10 glass rounded-full px-4 h-8" onClick={createNewReport}>Export Report</Button>
                  </div>
                  <GlassCard className="p-0 overflow-hidden border-white/5 min-h-[200px] flex flex-col">
                    {vulnerabilities.length > 0 ? (
                      <Table>
                        <TableHeader className="bg-white/5">
                          <TableRow className="hover:bg-transparent border-white/10">
                            <TableHead className="text-white/40 uppercase tracking-widest text-[10px] font-bold py-4">Target URL</TableHead>
                            <TableHead className="text-white/40 uppercase tracking-widest text-[10px] font-bold">Vulnerability Type</TableHead>
                            <TableHead className="text-white/40 uppercase tracking-widest text-[10px] font-bold">Severity</TableHead>
                            <TableHead className="text-white/40 uppercase tracking-widest text-[10px] font-bold text-center">Status</TableHead>
                            <TableHead className="text-white/40 uppercase tracking-widest text-[10px] font-bold text-right pr-8">Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {vulnerabilities.map((v) => (
                            <TableRow key={v.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                              <TableCell className="font-mono text-xs py-5 pl-8 text-white/80">{v.target}</TableCell>
                              <TableCell className="font-bold text-sm">{v.type}</TableCell>
                              <TableCell>{getSeverityBadge(v.severity)}</TableCell>
                              <TableCell>
                                <div className="flex items-center justify-center gap-2 text-xs">
                                  {getStatusIcon(v.status)}
                                  <span className="text-white/60 font-medium">{v.status}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right pr-8 text-white/40 text-xs font-mono">{v.date}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                        <Shield className="w-12 h-12 text-white/10 mb-4" />
                        <p className="text-white/40">No vulnerabilities detected. Start a new scan to begin.</p>
                      </div>
                    )}
                  </GlassCard>
                </div>
              </>
            )}

            {activeTab === 'Scan' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <GlassCard className="p-8">
                  <h3 className="text-2xl futuristic-font font-bold mb-6">Engine Configuration</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-white/60 text-xs uppercase tracking-widest font-bold">Target URL / IP Address</Label>
                        <Input 
                          value={scanUrl} 
                          onChange={(e) => setScanUrl(e.target.value)}
                          placeholder="https://your-app.com" 
                          className="bg-white/5 border-white/10 py-6 text-lg focus:border-primary/50 transition-colors"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {['Quick', 'Deep', 'Full'].map((mode) => (
                          <Button 
                            key={mode}
                            variant="outline" 
                            className={cn(
                              "border-white/10 glass py-8 flex flex-col gap-1 transition-all duration-300",
                              scanMode === mode ? "border-primary bg-primary/20 shadow-[0_0_15px_rgba(0,255,159,0.3)]" : "opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0"
                            )}
                            onClick={() => setScanMode(mode)}
                          >
                            <span className={cn("font-bold", scanMode === mode ? "text-primary" : "text-white")}>{mode}</span>
                            <span className="text-[10px] text-white/40">{mode === 'Quick' ? '5 min' : mode === 'Deep' ? '20 min' : '60 min'}</span>
                          </Button>
                        ))}
                      </div>
                      <Button 
                        disabled={isScanning}
                        onClick={startScan}
                        className="w-full bg-primary text-black hover:bg-primary/90 py-8 text-xl font-bold rounded-xl transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(0,255,159,0.3)]"
                      >
                        {isScanning ? 'Scanner Active...' : 'Launch Intelligent Scan'}
                      </Button>
                    </div>
                    <div className="space-y-6">
                      <Label className="text-white/60 text-xs uppercase tracking-widest font-bold">Scan Parameters</Label>
                      <div className="space-y-4">
                        {[
                          { label: 'Follow Redirects', default: true },
                          { label: 'Brute-force Directories', default: false },
                          { label: 'DOM XSS Analysis', default: true },
                          { label: 'Cloudflare Bypass', default: false },
                          { label: 'Aggressive Fuzzing', default: true },
                        ].map((param, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                            <span className="text-sm font-medium text-white/80">{param.label}</span>
                            <Switch defaultChecked={param.default} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>

                {isScanning && (
                  <div className="animate-in slide-in-from-bottom-4 duration-700">
                    <TerminalUI lines={terminalLines} />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'Reports' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl futuristic-font font-bold">Vulnerability Reports</h3>
                  <Button variant="outline" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20" onClick={createNewReport}>
                    <Plus className="w-4 h-4 mr-2" /> New Report
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {reports.length > 0 ? (
                    reports.map((report) => (
                      <GlassCard key={report.id} className="p-6 hover:border-white/20 transition-all group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="flex items-start gap-4">
                            <div className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center border",
                              report.severity === 'Critical' ? "bg-destructive/20 border-destructive/30 text-destructive" :
                              report.severity === 'High' ? "bg-orange-500/20 border-orange-500/30 text-orange-500" :
                              "bg-primary/20 border-primary/30 text-primary"
                            )}>
                              <FileText className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h4 className="font-bold text-lg">{report.name}</h4>
                                <Badge variant="outline" className="text-[10px] border-white/10">{report.id}</Badge>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-white/40 font-mono">
                                <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {report.target}</span>
                                <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {report.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-8">
                            <div className="text-right hidden md:block">
                              <p className="text-[10px] uppercase text-white/40 tracking-wider font-bold mb-1">Risk Score</p>
                              <p className={cn(
                                "text-xl font-bold",
                                parseFloat(report.score) > 8 ? "text-destructive" : 
                                parseFloat(report.score) > 5 ? "text-orange-500" : "text-primary"
                              )}>{report.score}/10</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="icon" className="border-white/10 glass hover:text-primary" onClick={() => toast.success("Downloading report...")}>
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="icon" className="border-white/10 glass hover:text-primary" onClick={() => {}}>
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-24 glass border-white/5 rounded-xl">
                      <FileText className="w-16 h-16 text-white/5 mb-4" />
                      <p className="text-white/20 font-bold mb-2">No Reports Available</p>
                      <p className="text-white/40 text-sm mb-6 max-w-xs mx-auto">Complete a vulnerability scan to generate your first security report.</p>
                      <Button variant="outline" onClick={() => setActiveTab('Scan')} className="border-primary/20 text-primary hover:bg-primary/10 rounded-full px-8">Start Scan</Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'Settings' && (
              <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
                <GlassCard className="p-8">
                  <h3 className="text-xl font-bold futuristic-font mb-6 flex items-center gap-3">
                    <User className="w-5 h-5 text-primary" /> Profile Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-white/40">Full Name</Label>
                      <Input placeholder="Enter your name" className="bg-white/5 border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/40">Email Address</Label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                        <Input placeholder="email@example.com" className="bg-white/5 border-white/10 pl-10" />
                      </div>
                    </div>
                  </div>
                  <Button className="mt-8 bg-white/10 hover:bg-white/20 px-8" onClick={() => {}}>Update Profile</Button>
                </GlassCard>

                <GlassCard className="p-8 border-primary/10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold futuristic-font flex items-center gap-3">
                      <Key className="w-5 h-5 text-primary" /> API Configuration
                    </h3>
                    <Badge className="bg-primary/20 text-primary border-primary/30">Active</Badge>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm text-white/50">Your personal API key allows you to integrate SOCBOX into your CI/CD pipelines.</p>
                    <div className="flex gap-4">
                      <div className="relative flex-1">
                        <LockIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                        <Input value="sbx_live_9482_fjei930492_jdfk" readOnly className="bg-white/5 border-white/10 pl-10 font-mono text-primary" />
                      </div>
                      <Button variant="outline" className="border-white/10 glass" onClick={() => {}}>Regenerate</Button>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-8">
                  <h3 className="text-xl font-bold futuristic-font mb-6 flex items-center gap-3">
                    <Bell className="w-5 h-5 text-secondary" /> Notification Center
                  </h3>
                  <div className="space-y-4">
                    {[
                      { title: 'Critical Vulnerability Alerts', desc: 'Instant email and webhook notifications for severity > 9.0' },
                      { title: 'Daily Scan Summary', desc: 'Get a summary of all scans performed in the last 24 hours' },
                      { title: 'New Signature Updates', desc: 'Notifications when new vulnerability signatures are added to the engine' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                        <div>
                          <p className="font-bold text-sm mb-1">{item.title}</p>
                          <p className="text-xs text-white/40">{item.desc}</p>
                        </div>
                        <Switch defaultChecked={i === 0} />
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;