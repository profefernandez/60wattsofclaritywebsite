import React from 'react';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { COMPANY } from '../../data/content';

const VALUES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
      </svg>
    ),
    title: 'Timeliness',
    description: 'We meet communities where they are — now. AI is here; education cannot wait.',
    color: 'sky',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Community',
    description: 'Grounded in relationships — the people most impacted by AI must lead its governance.',
    color: 'amber',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Clarity',
    description: '60 watts of illumination — enough to see clearly, act confidently, and lead courageously.',
    color: 'emerald',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    title: 'Justice',
    description: 'Ethical AI is not abstract — it\'s a justice issue with real consequences for real people.',
    color: 'violet',
  },
];

const colorMap: Record<string, string> = {
  sky: 'border-sky-400/30 group-hover:border-sky-400/60',
  amber: 'border-amber-400/30 group-hover:border-amber-400/60',
  emerald: 'border-emerald-400/30 group-hover:border-emerald-400/60',
  violet: 'border-violet-400/30 group-hover:border-violet-400/60',
};

const iconColorMap: Record<string, string> = {
  sky: 'text-sky-400 bg-sky-400/10',
  amber: 'text-amber-400 bg-amber-400/10',
  emerald: 'text-emerald-400 bg-emerald-400/10',
  violet: 'text-violet-400 bg-violet-400/10',
};

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 lg:py-32 bg-[#0d0e22]"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Story */}
          <AnimatedSection>
            <span className="section-eyebrow">Our Story</span>
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6"
            >
              Why{' '}
              <span className="gradient-text-primary">60 Watts?</span>
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                {COMPANY.description}
              </p>
              <p>
                The name <strong className="text-white">60 Watts</strong> is intentional. A 60-watt bulb provides enough
                light to read, to see faces clearly, to navigate a room with confidence. Not blinding floodlights — but
                steady, practical illumination.
              </p>
              <p>
                That is our philosophy: we don&apos;t overwhelm communities with technical jargon. We provide the right
                amount of light to see AI systems clearly — their promises <em>and</em> their risks.
              </p>
            </div>

            {/* Mission statement callout */}
            <div className="mt-8 p-6 glass-card border-l-4 border-l-sky-400">
              <p className="text-white font-medium leading-relaxed italic">
                &ldquo;{COMPANY.mission}&rdquo;
              </p>
            </div>
          </AnimatedSection>

          {/* Right: Values */}
          <AnimatedSection delay={0.2}>
            <span className="section-eyebrow">Our Values</span>
            <h3 className="text-2xl font-heading font-bold text-white mb-8">
              What drives everything we do
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALUES.map((val) => (
                <div
                  key={val.title}
                  className={`group glass-card p-5 transition-all duration-300 hover:translate-y-[-2px] border ${colorMap[val.color]}`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${iconColorMap[val.color]}`}
                  >
                    {val.icon}
                  </div>
                  <h4 className="font-semibold text-white mb-1.5">{val.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{val.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
