import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageShell } from "@/components/site-shell";
import { toast } from "sonner";

export const Route = createFileRoute("/feedback")({
  head: () => ({ meta: [{ title: "Feedback – Sarkari Sahayak" }] }),
  component: FeedbackPage,
});

function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your feedback!");
    (e.target as HTMLFormElement).reset();
    setRating(0);
  };

  return (
    <PageShell>
      <section className="bg-gradient-hero text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-5xl font-bold mb-3">Your Feedback Matters</h1>
          <p className="text-primary-foreground/85 max-w-2xl">Help us improve Sarkari Sahayak for every citizen.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader><CardTitle>Share your experience</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input name="name" required />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input name="email" type="email" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Language Used</Label>
                <Select defaultValue="English">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Kannada">ಕನ್ನಡ</SelectItem>
                    <SelectItem value="Hindi">हिन्दी</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Chatbot Experience</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      onMouseEnter={() => setHover(n)}
                      onMouseLeave={() => setHover(0)}
                      className="p-1"
                    >
                      <Star className={`h-7 w-7 transition-colors ${n <= (hover || rating) ? "fill-saffron text-saffron" : "text-muted-foreground"}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Suggestions</Label>
                <Textarea name="message" rows={4} placeholder="Tell us what worked and what didn't..." required />
              </div>
              <Button type="submit" className="w-full gap-2"><Send className="h-4 w-4" /> Submit Feedback</Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
