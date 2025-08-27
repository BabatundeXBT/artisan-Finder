
export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 md:py-20 px-4">
      <div className="prose lg:prose-lg max-w-full">
        <h1 className="font-headline">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <h2>Introduction</h2>
        <p>
          Artisan Direct ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We may collect personal information from you in a variety of ways, including when you register on the site, place an order, subscribe to a newsletter, or fill out a form. The types of personal information we may collect include:
        </p>
        <ul>
            <li><strong>Personal Identification Information:</strong> Name, email address, mailing address, phone number.</li>
            <li><strong>Account Information:</strong> Username, password, and other registration information.</li>
            <li><strong>Financial Information:</strong> Payment data such as credit card details (processed by a third-party payment processor).</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>
          We use the information we collect in various ways, including to:
        </p>
        <ul>
            <li>Provide, operate, and maintain our services</li>
            <li>Improve, personalize, and expand our services</li>
            <li>Understand and analyze how you use our services</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
            <li>Process your transactions</li>
        </ul>
        
        <h2>Your Data Protection Rights</h2>
        <p>
            Depending on your location, you may have the following rights regarding your personal data:
        </p>
        <ul>
            <li>The right to access – You have the right to request copies of your personal data.</li>
            <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
            <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:privacy@artisandirect.com">privacy@artisandirect.com</a>.
        </p>
      </div>
    </div>
  );
}
