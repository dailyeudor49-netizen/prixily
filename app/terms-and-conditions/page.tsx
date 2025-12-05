import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - Prixily",
  description: "Terms and Conditions for using Prixily website and services.",
};

export default function TermsAndConditions() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Terms and Conditions
        </h1>
        <p className="text-gray-600 mb-8">Last updated: December 2024</p>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to Prixily. These Terms and Conditions govern your use of
              our website located at prixily.com. By accessing or using our
              website, you agree to be bound by these Terms. If you disagree with
              any part of these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Description of Service
            </h2>
            <p>
              Prixily is an affiliate marketing website that provides information
              about electronics, home appliances, gadgets, and technology
              products. We do not sell products directly. Instead, we provide
              links to third-party retailers where you can purchase the products
              featured on our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Affiliate Disclosure
            </h2>
            <p>
              Prixily participates in various affiliate programs. This means that
              when you click on links to products on our website and make a
              purchase, we may earn a commission from the retailer at no
              additional cost to you.
            </p>
            <p className="mt-4">
              Our affiliate relationships do not influence our editorial content.
              We strive to provide accurate and unbiased information about the
              products we feature.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Product Information
            </h2>
            <p>
              While we make every effort to ensure that product information,
              prices, and availability displayed on our website are accurate, we
              cannot guarantee that all information is current or error-free.
              Product details, prices, and availability are subject to change
              without notice.
            </p>
            <p className="mt-4">
              We recommend that you verify all product information directly with
              the retailer before making a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Third-Party Websites
            </h2>
            <p>
              Our website contains links to third-party websites and retailers.
              These links are provided for your convenience only. We have no
              control over the content, privacy policies, or practices of these
              third-party sites and accept no responsibility for them.
            </p>
            <p className="mt-4">
              Your use of third-party websites is at your own risk and subject to
              the terms and conditions of those websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Intellectual Property
            </h2>
            <p>
              All content on this website, including text, graphics, logos,
              images, and software, is the property of Prixily or its content
              suppliers and is protected by international copyright laws.
            </p>
            <p className="mt-4">
              You may not reproduce, distribute, modify, or create derivative
              works from any content on our website without our prior written
              consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. User Conduct
            </h2>
            <p>When using our website, you agree not to:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                Use the website for any unlawful purpose or in violation of these
                Terms
              </li>
              <li>
                Attempt to gain unauthorized access to our systems or networks
              </li>
              <li>
                Interfere with or disrupt the operation of the website
              </li>
              <li>
                Use automated systems or software to extract data from our
                website
              </li>
              <li>
                Transmit any viruses, malware, or other harmful code
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Disclaimer of Warranties
            </h2>
            <p>
              Our website and its contents are provided &quot;as is&quot; and &quot;as
              available&quot; without any warranties of any kind, either express or
              implied. We do not warrant that our website will be uninterrupted,
              error-free, or free of viruses or other harmful components.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Prixily shall not be liable
              for any indirect, incidental, special, consequential, or punitive
              damages arising out of or related to your use of our website or any
              products purchased through our affiliate links.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold harmless Prixily and its officers,
              directors, employees, and agents from any claims, damages, losses,
              or expenses arising out of your use of our website or violation of
              these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              11. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will
              be effective immediately upon posting to this page. Your continued
              use of the website after any changes constitutes your acceptance of
              the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              12. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              applicable laws, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              13. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms and Conditions, please
              contact us at:{" "}
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
