import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { getImageUrl } from "@/lib/image-url";

export const metadata: Metadata = {
  title: "Giveaway Terms & Conditions",
  description:
    "Official terms and conditions for Mauritius Explored promotions and giveaways. Eligibility, prizes, liability, and contact information.",
  alternates: { canonical: "/giveaway/terms" },
};

const sections = [
  {
    title: "1. Promoter",
    body: (
      <p className="text-gray-700 leading-relaxed">
        This Promotion (&quot;Giveaway&quot;) is organised and administered by{" "}
        <strong>Mauritius Explored</strong> (&quot;Promoter&quot;), operating in Mauritius.
      </p>
    ),
  },
  {
    title: "2. Eligibility",
    body: (
      <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
        <li>
          The Giveaway is open to individuals aged <strong>18 years or over</strong> at the time of entry.
        </li>
        <li>Participants must be legally able to enter promotions under the laws of Mauritius.</li>
        <li>Employees, affiliates, partners, and immediate family members of the Promoter are not eligible.</li>
        <li>
          The Giveaway is open internationally unless otherwise specified; however, participants are responsible for
          complying with their local laws.
        </li>
      </ul>
    ),
  },
  {
    title: "3. Entry Requirements",
    body: (
      <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
        <li>Participants must complete all required steps as outlined on the Giveaway page.</li>
        <li>
          Only <strong>one entry per person</strong> is permitted unless otherwise stated.
        </li>
        <li>Entries must be received before the stated closing date and time (Mauritius Time – GMT+4).</li>
        <li>The Promoter reserves the right to verify the validity of entries and participants.</li>
      </ul>
    ),
  },
  {
    title: "4. Acceptance of Terms",
    body: (
      <>
        <p className="text-gray-700 leading-relaxed mb-3">By entering this Giveaway, participants:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
          <li>Confirm that they have read, understood, and agree to be bound by these Terms &amp; Conditions.</li>
          <li>Agree to comply with all applicable laws and regulations in Mauritius.</li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Prize(s)",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed mb-4">
          <li>Prize details will be specified on the Giveaway page.</li>
          <li>
            Prizes are <strong>non-transferable, non-exchangeable, and not redeemable for cash</strong>, unless
            otherwise stated.
          </li>
          <li>
            The Promoter reserves the right to substitute the prize with another of equal or greater value if
            necessary.
          </li>
        </ul>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Travel &amp; experience prizes (if applicable)</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
          <li>
            Hotel stays, tours, or experiences are subject to <strong>availability, blackout dates, and supplier terms</strong>.
          </li>
          <li>
            The winner is responsible for any additional costs not expressly included (e.g. flights, visas, insurance,
            personal expenses).
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Winner Selection & Notification",
    body: (
      <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
        <li>
          Winner(s) will be selected fairly (e.g. random draw or defined criteria) within a reasonable period after the
          closing date.
        </li>
        <li>The winner(s) will be notified via email, phone, or social media.</li>
        <li>
          If a winner does not respond within <strong>7 days</strong>, the Promoter reserves the right to select an
          alternative winner.
        </li>
      </ul>
    ),
  },
  {
    title: "7. Publicity & Marketing Consent",
    body: (
      <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
        <li>
          By entering, participants agree that the Promoter may use their <strong>name, image, and entry content</strong>{" "}
          for promotional purposes, without additional compensation, unless prohibited by law.
        </li>
        <li>This may include use on websites, social media, and marketing materials.</li>
      </ul>
    ),
  },
  {
    title: "8. Data Protection & Privacy",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed mb-3">
          <li>Personal data will be processed in accordance with the Data Protection Act 2017 of Mauritius.</li>
          <li>Information collected will be used solely for:</li>
        </ul>
        <ul className="list-disc pl-8 space-y-1 text-gray-700 leading-relaxed mb-3">
          <li>Administering the Giveaway</li>
          <li>Contacting winners</li>
          <li>Marketing purposes within Mauritius Explored</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          Participants have the right to access, rectify, or request deletion of their personal data in accordance with
          applicable law.
        </p>
      </>
    ),
  },
  {
    title: "9. Liability",
    body: (
      <>
        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>Mauritius Explored and any associated companies, partners, or affiliates shall not be held responsible
          or liable</strong> for:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed mb-4">
          <li>
            Any loss, damage, injury, or disappointment suffered by any participant arising from participation in the
            Giveaway
          </li>
          <li>
            <strong>
              Any loss, damage, or injury incurred as a result of the use, misuse, or enjoyment of any prize by the
              winner or their guests
            </strong>
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed mb-3">By accepting the prize, the winner acknowledges that:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed mb-4">
          <li>
            The prize is used <strong>entirely at their own risk</strong>
          </li>
          <li>
            The Promoter bears <strong>no responsibility</strong> for any incident, accident, or consequence resulting
            from the use of the prize
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed mb-3">
          Nothing in these Terms excludes liability where it cannot be excluded under the laws of Mauritius.
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          To the fullest extent permitted by law, <strong>Mauritius Explored</strong>, its partners, sponsors, and
          affiliates accept no responsibility or liability for any loss, damage, injury, or disappointment suffered by any
          winner or participant as a result of accepting or using any prize.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The winner acknowledges that the use of the prize is entirely at their own risk and agrees that the Promoter
          shall not be liable for any consequences arising from its use.
        </p>
      </>
    ),
  },
  {
    title: "10. Disqualification",
    body: (
      <>
        <p className="text-gray-700 leading-relaxed mb-3">The Promoter reserves the right to disqualify any participant who:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
          <li>Breaches these Terms &amp; Conditions</li>
          <li>Provides false or misleading information</li>
          <li>Attempts to manipulate the Giveaway process</li>
        </ul>
      </>
    ),
  },
  {
    title: "11. Modification, Suspension or Cancellation",
    body: (
      <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
        <li>
          The Promoter reserves the right to amend, suspend, or cancel the Giveaway at any time due to circumstances
          beyond its control or where required by law.
        </li>
      </ul>
    ),
  },
  {
    title: "12. Governing Law & Jurisdiction",
    body: (
      <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
        <li>This Giveaway and these Terms &amp; Conditions shall be governed by the laws of Mauritius.</li>
        <li>
          Any disputes shall be subject to the <strong>exclusive jurisdiction of the courts of Mauritius</strong>.
        </li>
      </ul>
    ),
  },
  {
    title: "13. Contact",
    body: (
      <p className="text-gray-700 leading-relaxed">
        For any queries regarding this Giveaway, please contact:{" "}
        <a href="mailto:info@mauritiusexplored.com" className="text-orange-600 font-medium hover:underline">
          info@mauritiusexplored.com
        </a>
      </p>
    ),
  },
];

export default function GiveawayTermsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="relative h-[36vh] min-h-[220px]">
        <Image
          src={getImageUrl("/images/banners/le-morne-beach-resort-sunset-mauritius.jpg")}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-3xl mx-auto">
            <p className="text-white/90 text-sm uppercase tracking-widest mb-2">Mauritius Explored</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Giveaway Terms &amp; Conditions</h1>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-r-lg mb-10">
              <p className="text-gray-800 text-sm leading-relaxed">
                Please read these terms carefully before entering. By submitting an entry, you agree to be bound by them.
                You can return to the{" "}
                <Link href="/giveaway" className="text-orange-600 font-medium hover:underline">
                  giveaway page
                </Link>{" "}
                at any time.
              </p>
            </div>

            <div className="space-y-10">
              {sections.map((section) => (
                <article key={section.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">{section.title}</h2>
                  {section.body}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
