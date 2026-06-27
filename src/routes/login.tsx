import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn, UserPlus, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { PageShell } from "@/components/site-shell";
import { useLanguage, LANG_LABELS } from "@/lib/language-context";
import type { Lang } from "@/lib/mock-data";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login – Sarkari Sahayak" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const user = { name: (fd.get("identifier") as string) || "Citizen", id: "demo" };
    localStorage.setItem("ss-user", JSON.stringify(user));
    navigate({ to: "/dashboard" });
  };

  const onRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const user = { name: (fd.get("name") as string) || "Citizen", id: "demo" };
    localStorage.setItem("ss-user", JSON.stringify(user));
    navigate({ to: "/dashboard" });
  };

  return (
    <PageShell>
      <div className="container mx-auto px-4 py-12 grid lg:grid-cols-2 gap-10 items-center max-w-6xl">
        <div className="hidden lg:block">
          <div className="rounded-2xl bg-gradient-hero text-primary-foreground p-10 shadow-elev">
            <ShieldCheck className="h-12 w-12 mb-4" />
            <h2 className="text-3xl font-bold mb-3">Welcome to Sarkari Sahayak</h2>
            <p className="text-primary-foreground/85 mb-6">Your gateway to all government services — secure, multilingual, and citizen-friendly.</p>
            <ul className="space-y-2 text-sm">
              <li>✓ Personalised scheme recommendations</li>
              <li>✓ Save and track applications</li>
              <li>✓ Chat history across devices</li>
            </ul>
          </div>
        </div>

        <Card className="shadow-elev">
          <CardHeader>
            <CardTitle>Access your account</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="login"><LogIn className="h-4 w-4 mr-2" />Login</TabsTrigger>
                <TabsTrigger value="register"><UserPlus className="h-4 w-4 mr-2" />Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={onLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="identifier">Mobile / Email</Label>
                    <Input id="identifier" name="identifier" placeholder="9876543210" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full">{t("nav.login")}</Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={onRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile</Label>
                      <Input id="mobile" name="mobile" type="tel" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rpassword">Password</Label>
                    <Input id="rpassword" name="password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Preferred Language</Label>
                    <Select defaultValue="en" name="language">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {(["en", "kn", "hi"] as Lang[]).map((l) => (
                          <SelectItem key={l} value={l}>{LANG_LABELS[l]}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">Create Account</Button>
                </form>
              </TabsContent>
            </Tabs>
            <div className="text-center text-xs text-muted-foreground mt-4">
              Admin? <Link to="/admin" className="text-primary hover:underline">Admin login</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
