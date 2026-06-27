import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Languages, ShieldCheck, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage, LANG_LABELS } from "@/lib/language-context";
import type { Lang } from "@/lib/mock-data";

export function Header() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  const nav = [
    { to: "/", label: t("nav.home") },
    { to: "/services", label: t("nav.services") },
    { to: "/schemes", label: t("nav.schemes") },
    { to: "/documents", label: t("nav.documents") },
    { to: "/chatbot", label: t("nav.chatbot") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];
const nav = [
    { to: "/", label: t("nav.home") },
    { to: "/services", label: t("nav.services") },
    { to: "/schemes", label: t("nav.schemes") },
    { to: "/documents", label: t("nav.documents") },
    { to: "/chatbot", label: t("nav.chatbot") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-hero shadow-card">
            <ShieldCheck className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight">Sarkari Sahayak</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Gov. AI Assistant</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  active ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Languages className="h-4 w-4" />
                <span className="hidden sm:inline">{LANG_LABELS[lang]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {(["en", "kn", "hi"] as Lang[]).map((l) => (
                <DropdownMenuItem key={l} onClick={() => setLang(l)}>
                  {LANG_LABELS[l]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={toggleDark} aria-label="Toggle theme">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Link to="/login" className="hidden sm:inline-flex">
            <Button size="sm">{t("nav.login")}</Button>
          </Link>

          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t bg-background">
          <nav className="container mx-auto flex flex-col py-2 px-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/login" onClick={() => setOpen(false)} className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted">
              {t("nav.login")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t bg-muted/30 mt-16">
      <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="font-bold">Sarkari Sahayak</span>
          </div>
          <p className="text-sm text-muted-foreground">AI-powered multilingual assistant for government services across India.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/schemes" className="hover:text-foreground">{t("nav.schemes")}</Link></li>
            <li><Link to="/documents" className="hover:text-foreground">{t("nav.documents")}</Link></li>
            <li><Link to="/services" className="hover:text-foreground">{t("nav.services")}</Link></li>
            <li><Link to="/chatbot" className="hover:text-foreground">{t("nav.chatbot")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">{t("nav.about")}</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">{t("nav.contact")}</Link></li>
            <li><Link to="/feedback" className="hover:text-foreground">{t("nav.feedback")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Emergency</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Police: <span className="text-foreground font-medium">100</span></li>
            <li>Ambulance: <span className="text-foreground font-medium">108</span></li>
            <li>Women Helpline: <span className="text-foreground font-medium">1091</span></li>
            <li>Citizen Call Centre: <span className="text-foreground font-medium">1077</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Sarkari Sahayak. A Digital India initiative demo.
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
