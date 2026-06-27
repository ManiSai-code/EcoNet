import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageShell } from "@/components/site-shell";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact – Sarkari Sahayak" }] }),
  component: ContactPage,
});

function ContactPage() {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <PageShell>
      <section className="bg-gradient-hero text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-5xl font-bold mb-3">Contact Us</h1>
          <p className="text-primary-foreground/85 max-w-2xl">Have a question or feedback? We're here to help.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 grid lg:grid-cols-3 gap-6 max-w-6xl">
        <div className="lg:col-span-1 space-y-4">
          {[
            { icon: Mail, label: "Email", value: "support@sarkari-sahayak.in" },
            { icon: Phone, label: "Helpline", value: "1800-180-1551 (toll free)" },
            { icon: MapPin, label: "Address", value: "Bengaluru, Karnataka, India" },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <Card key={c.label}>
                <CardContent className="p-5 flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                    <div className="font-medium text-sm">{c.value}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Send us a message</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label>Name</Label><Input name="name" required /></div>
                <div className="space-y-2"><Label>Email</Label><Input name="email" type="email" required /></div>
              </div>
              <div className="space-y-2"><Label>Message</Label><Textarea name="message" rows={5} required /></div>
              <Button type="submit" className="gap-2"><Send className="h-4 w-4" /> Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
