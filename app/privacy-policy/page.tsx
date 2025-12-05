import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Prixily",
  description: "Prixily Privacy Policy. Learn how we handle your personal data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: December 2024</p>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Data Controller
            </h2>
            <p>
              The data controller for personal data collected through the website
              prixily.com is Prixily, contactable at:{" "}
              <a
                href="mailto:info@prixily.com"
                className="text-blue-600 hover:underline"
              >
                info@prixily.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Types of Data Collected
            </h2>
            <p>
              During navigation on our website, we may collect the following
              categories of data:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                <strong>Navigation data:</strong> IP address, browser type,
                operating system, pages visited, time spent on site
              </li>
              <li>
                <strong>Voluntarily provided data:</strong> name, email address,
                and other information entered in contact forms
              </li>
              <li>
                <strong>Cookies and similar technologies:</strong> information
                collected through technical and third-party cookies
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Purpose of Processing
            </h2>
            <p>Personal data is processed for the following purposes:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Providing services requested by the user</li>
              <li>Responding to contact requests</li>
              <li>Improving the browsing experience on the site</li>
              <li>Analyzing traffic and site performance</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Legal Basis for Processing
            </h2>
            <p>The processing of personal data is based on:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Consent of the data subject</li>
              <li>Performance of a contract or pre-contractual measures</li>
              <li>Legitimate interest of the controller</li>
              <li>Compliance with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Affiliate Programs
            </h2>
            <p>
              Prixily participates in affiliate programs, including the Amazon
              Associates Program. This means we may receive a commission when
              users purchase products through links on our website.
            </p>
            <p className="mt-4">
              Affiliate partners may use cookies to track visits from our site.
              We encourage you to review the respective privacy policies of our
              partners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Data Retention
            </h2>
            <p>
              Personal data will be retained for the time strictly necessary to
              achieve the purposes for which it was collected, in compliance with
              the statute of limitations provided by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Your Rights
            </h2>
            <p>
              Under applicable data protection laws (including GDPR), you have
              the right to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Access your personal data</li>
              <li>Request rectification or erasure of data</li>
              <li>Restrict or object to processing</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
            <p className="mt-4">
              To exercise your rights, you can contact us at:{" "}
              <a
                href="mailto:info@prixily.com"
                className="text-blue-600 hover:underline"
              >
                info@prixily.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Data Security
            </h2>
            <p>
              We adopt appropriate technical and organizational security measures
              to protect personal data from unauthorized access, loss,
              destruction, or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Changes to This Privacy Policy
            </h2>
            <p>
              We reserve the right to modify this Privacy Policy at any time.
              Changes will be published on this page with an indication of the
              last update date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Contact Us
            </h2>
            <p>
              For any questions regarding this Privacy Policy, you can contact us
              at:{" "}
              <a
                href="mailto:info@prixily.com"
                className="text-blue-600 hover:underline"
              >
                info@prixily.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
