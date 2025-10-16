import { useState } from "react";
import { Button } from "@/components/ui/button"; 
import { Checkbox } from "@/components/ui/checkbox"; 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"; 

// --- BEST PRACTICE: Define static data and types outside the component ---
interface Term {
  title: string;
  content: string;
}

const termsAndConditionsData: Term[] = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing and using our service, you accept and agree to be bound by the terms and provision of this agreement.",
  },
  {
    title: "User Accounts",
    content:
      "You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.",
  },
  {
    title: "Prohibited Conduct",
    content:
      "You agree not to use the service for any unlawful purpose or to solicit others to perform or participate in any unlawful acts.",
  },
  {
    title: "Intellectual Property",
    content:
      "The service and its original content, features, and functionality are owned by the Company and are protected by international copyright, trademark, and other intellectual property laws.",
  },
  {
    title: "Termination",
    content:
      "We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.",
  },
  {
    title: "Disclaimer of Warranties",
    content:
      'The service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the operation of the service.',
  },
  {
    title: "Limitation of Liability",
    content:
      "In no event shall the Company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.",
  },
  {
    title: "Changes to Terms",
    content:
      "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this site.",
  },
  {
    title: "Governing Law",
    content:
      "These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.",
  },
  {
    title: "Contact Information",
    content:
      "If you have any questions about these Terms, please contact us at [your contact email or page].",
  },
];

function TermsCondition() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        checked={accepted}
        disabled
        onCheckedChange={(checked) => setAccepted(Boolean(checked))}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>

        <Dialog>
          <DialogTrigger asChild>
            <span className="text-sm text-blue-600 underline cursor-pointer w-fit">
              View Terms
            </span>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Terms & Conditions</DialogTitle>
              <DialogDescription>
                Please read our terms and conditions carefully before accepting.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 text-sm text-gray-500 p-1 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <ul className="list-disc space-y-3 pl-5">
                {termsAndConditionsData.map((term) => (
                  <li key={term.title}>
                    <strong className="font-semibold text-primary">{term.title}:</strong>{" "}
                    {term.content}
                  </li>
                ))}
              </ul>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" onClick={() => setAccepted(true)}>
                  Accept & Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default TermsCondition;