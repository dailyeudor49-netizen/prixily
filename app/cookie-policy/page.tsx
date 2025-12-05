import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy - Prixily",
  description: "Learn about how Prixily uses cookies and similar technologies on our website.",
};

export default function CookiePolicy() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: December 2024</p>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files that are stored on your device
              (computer, tablet, or mobile phone) when you visit a website. They
              are widely used to make websites work more efficiently and provide
              information to website owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. How We Use Cookies
            </h2>
            <p>
              Prixily uses cookies and similar technologies for the following
              purposes:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                <strong>Essential cookies:</strong> These are necessary for the
                website to function properly and cannot be switched off
              </li>
              <li>
                <strong>Analytics cookies:</strong> These help us understand how
                visitors interact with our website by collecting and reporting
                information anonymously
              </li>
              <li>
                <strong>Affiliate tracking cookies:</strong> These are used by our
                affiliate partners to track referrals and attribute sales
              </li>
              <li>
                <strong>Preference cookies:</strong> These remember your settings
                and preferences to enhance your browsing experience
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Types of Cookies We Use
            </h2>

            <div className="bg-gray-50 rounded-lg p-6 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Strictly Necessary Cookies
              </h3>
              <p className="text-gray-600 mb-2">
                These cookies are essential for the website to function and cannot
                be disabled. They are usually set in response to your actions,
                such as setting privacy preferences or filling in forms.
              </p>
              <p className="text-sm text-gray-500">Duration: Session</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Performance/Analytics Cookies
              </h3>
              <p className="text-gray-600 mb-2">
                These cookies allow us to count visits and traffic sources so we
                can measure and improve the performance of our site. They help us
                know which pages are the most and least popular.
              </p>
              <p className="text-sm text-gray-500">Duration: Up to 2 years</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Affiliate/Marketing Cookies
              </h3>
              <p className="text-gray-600 mb-2">
                These cookies are set by our affiliate partners to track visits
                and purchases made through our website. They help attribute sales
                and calculate commissions.
              </p>
              <p className="text-sm text-gray-500">Duration: Up to 30 days</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Third-Party Cookies
            </h2>
            <p>
              Some cookies on our website are placed by third parties. These may
              include:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                <strong>Analytics providers:</strong> Such as Google Analytics, to
                help us understand website usage
              </li>
              <li>
                <strong>Affiliate networks:</strong> Such as Amazon Associates, to
                track referrals and purchases
              </li>
              <li>
                <strong>Social media platforms:</strong> If you interact with
                social media features on our site
              </li>
            </ul>
            <p className="mt-4">
              We do not control these third-party cookies. Please refer to the
              respective third parties&apos; privacy policies for more information
              about their cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Managing Cookies
            </h2>
            <p>
              You can control and manage cookies in various ways. Please note that
              removing or blocking cookies may impact your user experience and
              some website functionality may no longer be available.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              Browser Settings
            </h3>
            <p>
              Most browsers allow you to control cookies through their settings.
              You can usually find these in the &quot;Options&quot; or &quot;Preferences&quot; menu
              of your browser. The following links provide information on how to
              manage cookies in popular browsers:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Google Chrome</li>
              <li>Mozilla Firefox</li>
              <li>Apple Safari</li>
              <li>Microsoft Edge</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              Opt-Out Tools
            </h3>
            <p>
              You can opt out of certain third-party cookies using the following
              tools:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                Google Analytics Opt-out Browser Add-on
              </li>
              <li>
                Network Advertising Initiative Opt-out Tool
              </li>
              <li>
                Digital Advertising Alliance Opt-out Tool
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Cookie Consent
            </h2>
            <p>
              When you first visit our website, you may be presented with a cookie
              consent notice. By continuing to use our website, you consent to our
              use of cookies as described in this policy.
            </p>
            <p className="mt-4">
              You can withdraw your consent at any time by adjusting your browser
              settings or using the opt-out tools mentioned above.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Changes to This Cookie Policy
            </h2>
            <p>
              We may update this Cookie Policy from time to time to reflect
              changes in technology, legislation, or our data practices. Any
              changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. More Information
            </h2>
            <p>
              For more information about how we handle your personal data, please
              read our{" "}
              <Link
                href="/privacy-policy"
                className="text-blue-600 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <p className="mt-4">
              If you have any questions about our use of cookies, please contact
              us at:{" "}
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
