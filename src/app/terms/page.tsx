
export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 md:py-20 px-4">
      <div className="prose lg:prose-lg max-w-full">
        <h1 className="font-headline">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <h2>1. Agreement to Terms</h2>
        <p>
          By using our website and services, you agree to be bound by these Terms of Service. If you do not agree to these Terms, do not use the services.
        </p>
        
        <h2>2. Use of the Service</h2>
        <p>
          Artisan Finder provides a platform for clients to connect with artisans. We are not a party to any agreement between clients and artisans. You must be at least 18 years old to use our services.
        </p>

        <h2>3. User Accounts</h2>
        <p>
          When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.
        </p>

        <h2>4. Content</h2>
        <p>
          Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post on or through the service, including its legality, reliability, and appropriateness.
        </p>

        <h2>5. Termination</h2>
        <p>
          We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          In no event shall Artisan Finder, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
        </p>
        
        <h2>Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at <a href="mailto:legal@artisanfinder.com">legal@artisanfinder.com</a>.
        </p>
      </div>
    </div>
  );
}
