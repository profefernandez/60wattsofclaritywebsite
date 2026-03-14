// Centralized company data for 60 Watts of Clarity
export const COMPANY = {
  name: '60 Watts of Clarity',
  tagline: 'Illuminating the Path to Ethical AI',
  mission:
    'We train social workers and broader communities to navigate, critique, and shape artificial intelligence with confidence, compassion, and ethical clarity.',
  description:
    '60 Watts of Clarity is an AI education company built at the intersection of social work, community advocacy, and emerging technology. We believe that ethical AI starts with the people most affected by it.',
  founded: '2024',
  email: 'hello@60wattsofclarity.com',
  phone: '+1 (555) 060-9274',
};

export const FRAMEWORK_PILLARS = [
  {
    id: 1,
    icon: '🔬',
    title: 'Examine',
    description:
      'Critically analyze AI systems, their design choices, training data, and the populations they serve or underserve.',
    color: 'primary',
  },
  {
    id: 2,
    icon: '🤝',
    title: 'Engage',
    description:
      'Build community relationships that center lived experience and ensure diverse voices inform AI policy and deployment.',
    color: 'secondary',
  },
  {
    id: 3,
    icon: '⚖️',
    title: 'Advocate',
    description:
      'Champion equitable AI governance, algorithmic accountability, and human-centered technological design.',
    color: 'green',
  },
  {
    id: 4,
    icon: '🌱',
    title: 'Educate',
    description:
      'Deliver accessible, culturally responsive AI literacy training that transforms fear into informed action.',
    color: 'warm',
  },
  {
    id: 5,
    icon: '🔭',
    title: 'Envision',
    description:
      'Co-create futures where AI amplifies human dignity, justice, and the well-being of all communities.',
    color: 'primary',
  },
  {
    id: 6,
    icon: '🛠️',
    title: 'Implement',
    description:
      'Provide practical tools, playbooks, and frameworks organizations can deploy immediately in their AI governance work.',
    color: 'secondary',
  },
];

export const WORKSHOPS = [
  {
    id: 1,
    title: 'AI 101 for Social Workers',
    level: 'Foundational',
    duration: '4 hours',
    format: 'In-person / Virtual',
    description:
      'A practical introduction to AI concepts, terminology, and real-world applications relevant to social work practice.',
    topics: ['What is AI?', 'Machine learning basics', 'Case studies in social services', 'Identifying bias'],
  },
  {
    id: 2,
    title: 'Algorithmic Bias & Equity',
    level: 'Intermediate',
    duration: '6 hours',
    format: 'Workshop Series (3×2hrs)',
    description:
      'Deep-dive into how AI systems encode and perpetuate systemic inequalities, with actionable advocacy strategies.',
    topics: ['Historical context', 'Bias detection methods', 'Advocacy frameworks', 'Policy toolkits'],
  },
  {
    id: 3,
    title: 'Ethical AI Leadership',
    level: 'Advanced',
    duration: '2 days',
    format: 'Intensive Cohort',
    description:
      'For organizational leaders ready to build comprehensive AI ethics programs and community governance structures.',
    topics: ['AI strategy', 'Ethics board formation', 'Community engagement', 'Impact measurement'],
  },
  {
    id: 4,
    title: 'Community AI Literacy',
    level: 'Community',
    duration: '2 hours',
    format: 'Public Workshop',
    description:
      'Accessible AI education designed for community members, residents, and advocates with no technical background.',
    topics: ['AI in everyday life', 'Your data rights', 'Speaking up', 'Resources'],
  },
];

export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: 'Child Welfare Algorithm Audit',
    category: 'Research & Advocacy',
    year: '2024',
    description:
      'Partnered with child welfare advocates to assess predictive risk-scoring tools used in family services.',
    outcome: 'Led to policy reform recommendations adopted by 3 county agencies.',
    tags: ['Research', 'Policy', 'Child Welfare'],
  },
  {
    id: 2,
    title: 'AI Literacy for Housing Advocates',
    category: 'Training',
    year: '2024',
    description:
      'Delivered 12-week curriculum to 200+ housing justice advocates across 5 cities.',
    outcome: 'Participants reported 87% increase in AI confidence scores.',
    tags: ['Training', 'Housing', 'Equity'],
  },
  {
    id: 3,
    title: 'Ethical AI Framework v1.0',
    category: 'Framework',
    year: '2025',
    description:
      'Published open-source ethical AI framework for human services organizations.',
    outcome: 'Adopted by 45+ organizations in its first quarter.',
    tags: ['Framework', 'Open Source', 'Policy'],
  },
  {
    id: 4,
    title: 'Community AI Town Halls',
    category: 'Community Engagement',
    year: '2025',
    description:
      'Organized and facilitated 8 public town halls on AI and community impact in underserved neighborhoods.',
    outcome: 'Reached 1,200+ residents; generated 3 city council resolutions.',
    tags: ['Community', 'Advocacy', 'Policy'],
  },
];

export const LIBRARY_RESOURCES = [
  {
    id: 1,
    icon: '📚',
    title: 'The Clarity Canon',
    type: 'Curated Reading List',
    description:
      'Essential texts on AI ethics, algorithmic justice, data sovereignty, and technology policy for practitioners.',
    count: '120+ resources',
  },
  {
    id: 2,
    icon: '🎙️',
    title: 'Voices in AI Podcast Collection',
    type: 'Audio Library',
    description:
      'Curated episodes featuring marginalized AI researchers, community advocates, and policy innovators.',
    count: '80+ episodes',
  },
  {
    id: 3,
    icon: '🗺️',
    title: 'AI Policy Navigator',
    type: 'Interactive Tool',
    description:
      'Map current AI legislation, regulations, and advocacy opportunities at federal, state, and local levels.',
    count: 'Live database',
  },
  {
    id: 4,
    icon: '📊',
    title: 'Impact Research Hub',
    type: 'Research Archive',
    description:
      'Peer-reviewed and practitioner research on AI impacts in housing, child welfare, healthcare, and criminal justice.',
    count: '200+ papers',
  },
  {
    id: 5,
    icon: '🛠️',
    title: 'Practitioner Toolkit',
    type: 'Downloadable Resources',
    description:
      'Ready-to-use worksheets, discussion guides, assessment templates, and facilitation scripts.',
    count: '60+ tools',
  },
  {
    id: 6,
    icon: '🌐',
    title: 'Community Resource Map',
    type: 'Directory',
    description:
      'Connect with AI ethics organizations, advocacy groups, and community tech initiatives across the country.',
    count: '300+ organizations',
  },
];

export const STATS = [
  { value: '2,500+', label: 'Practitioners Trained' },
  { value: '45+', label: 'Organizations Reached' },
  { value: '12', label: 'Partner Cities' },
  { value: '87%', label: 'Confidence Increase' },
];

export const CHATBOT_RESPONSES: Record<string, string> = {
  hello: "Hello! I'm the 60 Watts AI assistant. How can I help you learn more about our ethical AI education programs today?",
  hi: "Hi there! Welcome to 60 Watts of Clarity. What would you like to know — our workshops, framework, library, or scheduling?",
  workshops:
    "We offer 4 flagship workshops: AI 101 for Social Workers (4hrs), Algorithmic Bias & Equity (6hrs), Ethical AI Leadership (2-day intensive), and Community AI Literacy (2hrs public). Which interests you most?",
  schedule:
    "I'd love to help you schedule! Our next available cohorts are:\n• AI 101: April 15 & May 3\n• Algorithmic Bias: April 22 (series starts)\n• AI Leadership: May 10–11\nWould you like me to send you a booking link?",
  framework:
    "Our proprietary 6-pillar framework is called the EEAEIE Model: Examine → Engage → Advocate → Educate → Envision → Implement. It gives practitioners a full-cycle approach to ethical AI in community settings.",
  library:
    "The 60 Watts of Intelligence Library has 6 key sections: The Clarity Canon (120+ resources), Voices in AI Podcast (80+ episodes), AI Policy Navigator, Impact Research Hub (200+ papers), Practitioner Toolkit (60+ tools), and Community Resource Map (300+ orgs).",
  mission:
    "Our mission is to train social workers and communities to navigate, critique, and shape AI with confidence, compassion, and ethical clarity. We believe ethical AI starts with the people most affected by it.",
  contact:
    "You can reach us at hello@60wattsofclarity.com or call +1 (555) 060-9274. We'd love to partner with your organization!",
  pricing:
    "Pricing is tailored to your organization's size and capacity. Community workshops are sliding-scale. Please contact us for a custom quote at hello@60wattsofclarity.com.",
  default:
    "That's a great question! I specialize in information about 60 Watts of Clarity's programs, framework, and scheduling. Try asking about: workshops, our framework, the intelligence library, mission, or scheduling.",
};
