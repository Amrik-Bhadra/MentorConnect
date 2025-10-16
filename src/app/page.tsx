import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Find Your Path. <br className="hidden sm:inline" />
          Connect With a Mentor Who Gets It.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          MentorConnect uses an intelligent matching algorithm to help you find the
          perfect mentor to guide you towards your personal and professional goals.
        </p>
      </div>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/register">Get Started Today</Link>
        </Button>
        <Button variant="outline" asChild>
            <Link href="/browse-mentors">Browse Mentors</Link>
        </Button>
      </div>
    </section>
  );
}