import React, { useState } from 'react';
import AnimatedSection from '../../components/ui/AnimatedSection';
import Button from '../../components/ui/Button';
import { COMPANY } from '../../data/content';
import { isValidEmail, sanitizeText } from '../../utils/security';

interface FormState {
  name: string;
  email: string;
  organization: string;
  interest: string;
  message: string;
}

const INTERESTS = [
  'AI 101 for Social Workers',
  'Algorithmic Bias & Equity',
  'Ethical AI Leadership',
  'Community AI Literacy',
  'Custom Partnership',
  'Intelligence Library',
];

const ContactSection: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    organization: '',
    interest: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const errs: Partial<FormState> = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!isValidEmail(form.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) errs.message = 'Message is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: sanitizeText(value) }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSubmitted(true);
  };

  const inputClass = (field: keyof FormState) =>
    `w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
      errors[field]
        ? 'border-rose-400/60 focus:border-rose-400 focus:ring-rose-400/30'
        : 'border-white/10 focus:border-sky-400/50 focus:ring-sky-400/30'
    }`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 lg:py-32 relative"
      style={{ background: '#000000' }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(56,189,248,0.07) 0%, transparent 60%)',
        }}
      />

      <div className="section-container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-eyebrow">Get in Touch</span>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light text-white mb-4 tracking-tight"
          >
            Ready to Bring Ethical{' '}
            <span className="gradient-text-primary">AI Education</span>
            {' '}to Your Community?
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            Whether you&apos;re a social work agency, community organization, or individual advocate —
            let&apos;s build something meaningful together.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div
                role="alert"
                aria-live="polite"
                className="glass-card border border-emerald-400/30 p-10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center mx-auto mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-8 h-8 text-emerald-400" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-heading font-medium text-white mb-2 tracking-tight">
                  Message Received!
                </h3>
                <p className="text-slate-400">
                  Thank you, {form.name}. We&apos;ll respond to {form.email} within 1–2 business days.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card border border-white/10 p-8 space-y-6"
                aria-label="Contact form"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name <span aria-hidden="true" className="text-rose-400">*</span>
                      <span className="sr-only">(required)</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass('name')}
                      placeholder="Your name"
                      aria-required="true"
                      aria-describedby={errors.name ? 'error-name' : undefined}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p id="error-name" role="alert" className="mt-1.5 text-xs text-rose-400">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address <span aria-hidden="true" className="text-rose-400">*</span>
                      <span className="sr-only">(required)</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass('email')}
                      placeholder="you@organization.org"
                      aria-required="true"
                      aria-describedby={errors.email ? 'error-email' : undefined}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p id="error-email" role="alert" className="mt-1.5 text-xs text-rose-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-org" className="block text-sm font-medium text-slate-300 mb-2">
                    Organization
                  </label>
                  <input
                    id="contact-org"
                    name="organization"
                    type="text"
                    value={form.organization}
                    onChange={handleChange}
                    className={inputClass('organization')}
                    placeholder="Your organization (optional)"
                    autoComplete="organization"
                  />
                </div>

                <div>
                  <label htmlFor="contact-interest" className="block text-sm font-medium text-slate-300 mb-2">
                    Area of Interest
                  </label>
                  <select
                    id="contact-interest"
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    className={`${inputClass('interest')} cursor-pointer`}
                    aria-label="Select area of interest"
                  >
                    <option value="">Select an option...</option>
                    {INTERESTS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-slate-300 mb-2">
                    Message <span aria-hidden="true" className="text-rose-400">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass('message')} resize-none`}
                    placeholder="Tell us about your organization and what you're hoping to accomplish..."
                    aria-required="true"
                    aria-describedby={errors.message ? 'error-message' : undefined}
                    maxLength={2000}
                  />
                  {errors.message && (
                    <p id="error-message" role="alert" className="mt-1.5 text-xs text-rose-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  loading={submitting}
                  className="w-full justify-center"
                  aria-label="Submit contact form"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatedSection delay={0.2}>
              <div className="glass-card border border-white/10 p-6 space-y-5">
                <h3 className="text-white font-heading font-medium text-xl mb-4 tracking-tight">
                  Direct Contact
                </h3>
                {[
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-sky-400" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    ),
                    label: 'Email',
                    value: COMPANY.email,
                    href: `mailto:${COMPANY.email}`,
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-sky-400" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    ),
                    label: 'Phone',
                    value: COMPANY.phone,
                    href: `tel:${COMPANY.phone.replace(/\D/g, '')}`,
                  },
                ].map(({ icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-sky-400/10 flex items-center justify-center flex-shrink-0">
                      {icon}
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">{label}</p>
                      <a href={href} className="text-sm text-slate-300 hover:text-sky-400 transition-colors no-underline">
                        {value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.35}>
              <div className="glass-card border border-amber-400/20 p-6">
                <h3 className="text-white font-heading font-medium text-lg mb-2">
                  Response Time
                </h3>
                <p className="text-slate-400 text-sm">
                  We respond to all inquiries within <strong className="text-amber-400">1–2 business days</strong>.
                  For urgent matters, please call directly.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <div className="glass-card border border-white/10 p-6">
                <h3 className="text-white font-heading font-medium text-lg mb-3">
                  Quick Chat
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  Want instant answers? Try our AI assistant Clara on the strategic snapshot page.
                </p>
                <a href="/snapshot" className="no-underline">
                  <Button variant="outline" size="sm" className="w-full justify-center">
                    Talk to Clara
                  </Button>
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
