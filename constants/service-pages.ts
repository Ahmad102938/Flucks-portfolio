// Content for the service landing pages (/services/<slug>): five core services, plus focused pages
// for narrower searches (e.g. "RAG pipeline development") that each sit under one core service.
//
// Each page targets the searches a client makes when they need that service, so the title,
// description, headline and FAQs all use the words people actually search for. Edit freely; the
// page layout reads everything from here. `relatedProjects` are Cloudinary slugs from /works, and
// a case study links back to every service that lists it.

export interface ServicePage {
    slug: string;
    /** Short name used in links, breadcrumbs and the footer, e.g. "Web Development" */
    name: string;
    /** Browser tab and Google result title (the layout adds " · Flucks"). Aim for under 55 characters. */
    metaTitle: string;
    /** Google result snippet. Aim for 140 to 160 characters. */
    metaDescription: string;
    /** The page's main heading */
    headline: string;
    intro: string;
    offerings: { title: string; description: string }[];
    process: { title: string; description: string }[];
    stack: string[];
    faqs: { question: string; answer: string }[];
    relatedProjects: string[];
    /** Focused pages only: the core service this page belongs to */
    parent?: string;
}

// Shared promise behind every service: a team of engineers, not a single freelancer
const TEAM_FAQ = {
    question: "Are you a freelancer or an agency?",
    answer:
        "Flucks is a team of designers and engineers, not a solo freelancer. Every project gets design, frontend, backend and QA covered by people who work together daily, with one point of contact, written scope and regular demos, so nothing depends on one person being available.",
};

const LOCATION_FAQ = {
    question: "Do you work with clients outside India?",
    answer:
        "Yes. We're based in India and work with clients across India and worldwide, including the US, UK, Europe and the Middle East. We plan overlap hours with your time zone and keep everything documented, so distance never slows the work down.",
};

export const SERVICE_PAGES: ServicePage[] = [
    {
        slug: "web-development",
        name: "Web Development",
        metaTitle: "Web Development Company in India & Worldwide",
        metaDescription:
            "Full-stack web development from scratch: custom websites, web apps, redesigns and feature integrations, built by Flucks' engineers for clients in India and worldwide.",
        headline: "Web development, engineered from scratch.",
        intro:
            "We design and build fast, search-friendly websites and web applications, from a first marketing site to a full-stack platform with dashboards, payments and integrations. Already live? We redesign, modernise and extend existing sites without starting over.",
        offerings: [
            {
                title: "Full-stack web apps",
                description:
                    "Custom platforms built end to end: frontend, backend, database, authentication, admin panels and APIs, shaped around how your business actually works.",
            },
            {
                title: "Business & marketing websites",
                description:
                    "High-performance company sites, landing pages and microsites that load fast, rank well and turn visitors into enquiries.",
            },
            {
                title: "Redesign & visual transformation",
                description:
                    "A fresh look and a better experience for an existing site, keeping your content, SEO and URLs intact while everything else improves.",
            },
            {
                title: "Feature integration",
                description:
                    "New features added to the product you already have: payments, bookings, search, dashboards, third-party APIs and AI features.",
            },
            {
                title: "eCommerce & CMS",
                description:
                    "Online stores and content-managed sites your team can update on its own, built on headless CMS or custom setups.",
            },
            {
                title: "Maintenance & support",
                description:
                    "Ongoing updates, monitoring, security patches, performance tuning and small improvements, so your site keeps working long after launch.",
            },
        ],
        process: [
            { title: "Discover", description: "We map your goals, users and requirements into a clear written scope and plan." },
            { title: "Design", description: "Wireframes and visual design you review and approve before any code is written." },
            { title: "Build", description: "Engineering in short cycles with regular demos, so you see progress every week." },
            { title: "Launch & grow", description: "Testing, deployment, SEO setup and handover, then support as you grow." },
        ],
        stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Supabase", "Tailwind CSS", "Vercel", "AWS"],
        faqs: [
            {
                question: "Can you build a full website or web app from scratch?",
                answer:
                    "Yes. We handle the whole build: planning, UI/UX design, frontend, backend, database, hosting and launch. You get a production-ready product and the source code, not a template.",
            },
            {
                question: "Can you redesign or improve our existing website?",
                answer:
                    "Yes. We redesign the look and experience, speed up slow pages, fix technical SEO and add new features to your current codebase, keeping your URLs and search rankings intact.",
            },
            {
                question: "How long does it take to build a website?",
                answer:
                    "A focused marketing site usually takes 3 to 6 weeks. A custom web application typically takes 2 to 4 months, depending on features and integrations. You get a clear timeline in the proposal before we start.",
            },
            {
                question: "Do you provide website maintenance after launch?",
                answer:
                    "Yes. We offer ongoing maintenance covering updates, monitoring, backups, security fixes, performance tuning and new features as your needs change.",
            },
            TEAM_FAQ,
            LOCATION_FAQ,
        ],
        relatedProjects: ["urban-guest", "flenzo", "registration"],
    },
    {
        slug: "mobile-app-development",
        name: "App Development",
        metaTitle: "Mobile App Development Company: iOS & Android",
        metaDescription:
            "iOS, Android and cross-platform app development by Flucks: new apps from scratch, app redesigns, feature integrations and long-term support, in India and worldwide.",
        headline: "Mobile apps people keep coming back to.",
        intro:
            "We design and develop iOS, Android and cross-platform apps, from the first prototype to App Store and Play Store launch. Have an app already? We redesign it, add features, connect it to new services and keep it running smoothly.",
        offerings: [
            {
                title: "Apps from scratch",
                description:
                    "Complete mobile products: UX, interface design, app development, backend, APIs and store launch, handled by one team.",
            },
            {
                title: "Cross-platform apps",
                description:
                    "One codebase for iOS and Android with React Native or Flutter, so you launch on both stores faster without compromising feel.",
            },
            {
                title: "Native iOS & Android",
                description:
                    "Native builds when you need deep device features, offline support, audio, background tasks or the best possible performance.",
            },
            {
                title: "App redesign",
                description:
                    "A modern interface and smoother experience for an existing app, driven by how your users actually use it.",
            },
            {
                title: "Feature integration",
                description:
                    "Payments, maps, chat, notifications, in-app purchases, analytics and AI features added to your current app.",
            },
            {
                title: "Maintenance & updates",
                description:
                    "OS updates, crash fixes, performance work and store releases, so your app stays healthy and well rated.",
            },
        ],
        process: [
            { title: "Discover", description: "We define the core user journeys, features and platform choice with you." },
            { title: "Prototype", description: "Clickable designs you can test on your phone before development starts." },
            { title: "Build", description: "Development in short cycles with test builds shared every week." },
            { title: "Launch & support", description: "Store submission, launch, monitoring and ongoing releases." },
        ],
        stack: ["React Native", "Flutter", "Swift", "Kotlin", "Expo", "Firebase", "Supabase", "Node.js"],
        faqs: [
            {
                question: "Do you build apps for both iOS and Android?",
                answer:
                    "Yes. We usually build cross-platform with React Native or Flutter so one codebase ships to both stores, and build natively when a project needs it.",
            },
            {
                question: "How long does it take to develop a mobile app?",
                answer:
                    "A focused first version typically takes 2 to 4 months, depending on features, integrations and the backend required. You get a phased plan with milestones before we begin.",
            },
            {
                question: "Can you take over or improve an existing app?",
                answer:
                    "Yes. We audit the current code, fix what's holding it back, redesign the experience and keep shipping new features on top of what you already have.",
            },
            {
                question: "Do you handle App Store and Play Store submission?",
                answer:
                    "Yes. We prepare store listings, handle review requirements and manage releases, and stay on for updates after launch.",
            },
            TEAM_FAQ,
            LOCATION_FAQ,
        ],
        relatedProjects: ["dreamblend", "music-streaming"],
    },
    {
        slug: "mvp-development",
        name: "MVP & Product Development",
        metaTitle: "MVP Development Company for Startups",
        metaDescription:
            "Turn your idea into a launch-ready MVP. Flucks scopes, designs and builds web apps, mobile apps and AI products for startups in India and worldwide.",
        headline: "From idea to a product people can use.",
        intro:
            "We help founders and teams turn an idea into a working product: scoping the smallest version worth launching, designing it, building it properly and getting it in front of real users fast. Then we keep iterating with you as the product grows.",
        offerings: [
            {
                title: "Product discovery & scoping",
                description:
                    "We turn your idea into a focused feature list, user flows and a realistic plan, so you build what matters first.",
            },
            {
                title: "MVP design & development",
                description:
                    "A real, production-quality first version of your web app, mobile app or AI product, not a throwaway prototype.",
            },
            {
                title: "Clickable prototypes",
                description:
                    "Interactive prototypes to validate the idea with users and investors before committing to a full build.",
            },
            {
                title: "Scalable architecture",
                description:
                    "Foundations chosen to grow with you, so your MVP becomes version two without a rewrite.",
            },
            {
                title: "AI-powered products",
                description:
                    "MVPs built around AI from day one: assistants, smart automation, recommendations and LLM features.",
            },
            {
                title: "Post-launch iteration",
                description:
                    "Analytics, feedback loops and regular releases after launch, as your product partner rather than a one-off vendor.",
            },
        ],
        process: [
            { title: "Scope", description: "Workshops to define the problem, the users and the smallest valuable product." },
            { title: "Design", description: "User flows and interface design, validated with a clickable prototype." },
            { title: "Build", description: "Weekly releases you can try, with priorities adjusted as we learn." },
            { title: "Launch & iterate", description: "Go live, measure what users do, and plan the next version together." },
        ],
        stack: ["Next.js", "React Native", "Flutter", "Node.js", "Supabase", "PostgreSQL", "OpenAI", "Vercel"],
        faqs: [
            {
                question: "What is an MVP and why build one?",
                answer:
                    "A minimum viable product is the smallest version of your product that real users can use and pay for. It lets you validate the idea, attract users or investors and learn what to build next, without spending months on features nobody needs.",
            },
            {
                question: "How long does it take to build an MVP?",
                answer:
                    "Most MVPs we build take 6 to 16 weeks, depending on the platform and features. We agree the scope and timeline in writing before we start.",
            },
            {
                question: "Can you help if I only have an idea?",
                answer:
                    "Yes. Many projects start with just an idea. We help you shape it into a clear scope, design the experience and build it, so you don't need a technical co-founder to get started.",
            },
            {
                question: "Will the MVP be able to scale later?",
                answer:
                    "Yes. We build on proven, scalable foundations, so your MVP can grow into a full product without being rebuilt from scratch.",
            },
            TEAM_FAQ,
            LOCATION_FAQ,
        ],
        relatedProjects: ["flenzo", "music-streaming", "dreamblend"],
    },
    {
        slug: "ai-automation",
        name: "AI Automation & Integration",
        metaTitle: "AI Automation & Integration: Chatbots, RAG, Workflows",
        metaDescription:
            "AI chatbots, RAG pipelines, AI agents and workflow automation that save your team hours. Flucks builds and integrates AI into your business, in India and worldwide.",
        headline: "AI that does the work, built into how you work.",
        intro:
            "We build AI into your products and operations: chatbots that answer from your own knowledge, RAG pipelines, AI agents and automated workflows that remove repetitive work. Whether you want to automate an existing process, improve a workflow or create an entirely new AI-driven one, we design it, build it and keep it reliable.",
        offerings: [
            {
                title: "AI chatbots & assistants",
                description:
                    "Customer support and internal assistants that answer accurately from your documents, data and policies.",
            },
            {
                title: "RAG pipelines & knowledge bases",
                description:
                    "Retrieval-augmented generation over your files, wikis and databases, with sources, permissions and evaluation built in.",
            },
            {
                title: "Workflow automation",
                description:
                    "Repetitive tasks across your tools automated end to end: data entry, routing, approvals, reports and notifications.",
            },
            {
                title: "AI agents",
                description:
                    "Multi-step agents that classify, decide, call your systems and hand off to people when needed.",
            },
            {
                title: "AI features in your product",
                description:
                    "LLM features added to your existing web or mobile app: smart search, summaries, generation, voice and recommendations.",
            },
            {
                title: "Workflow redesign & monitoring",
                description:
                    "We modify and improve existing automations, then monitor accuracy, cost and reliability as usage grows.",
            },
        ],
        process: [
            { title: "Map", description: "We study the process or product and find where AI saves the most time." },
            { title: "Prototype", description: "A working proof of concept on your real data, measured for accuracy." },
            { title: "Integrate", description: "Production build connected to your tools, with guardrails and fallbacks." },
            { title: "Monitor & improve", description: "Tracking quality and cost, and improving prompts, data and flows." },
        ],
        stack: ["OpenAI", "Gemini", "Claude", "LangChain", "LangGraph", "n8n", "Vector databases", "Python", "Node.js"],
        faqs: [
            {
                question: "What business processes can be automated with AI?",
                answer:
                    "Most repetitive, rules-based or text-heavy work: customer support, lead qualification, document processing, data entry, ticket routing, reporting, content generation and internal Q&A. We start by mapping your process to find where automation saves the most time.",
            },
            {
                question: "What is a RAG chatbot?",
                answer:
                    "A retrieval-augmented generation (RAG) chatbot looks up answers in your own documents and data before replying, so it gives accurate, source-backed answers about your business instead of generic ones.",
            },
            {
                question: "Can you add AI to our existing website, app or tools?",
                answer:
                    "Yes. We integrate AI features and automations into the products and tools you already use, through APIs, n8n or custom services, without rebuilding everything.",
            },
            {
                question: "Can you improve or fix an automation we already have?",
                answer:
                    "Yes. We audit existing workflows and automations, fix failures, reduce cost and extend them with new steps or AI capabilities.",
            },
            {
                question: "Is our data safe when using AI?",
                answer:
                    "We design for privacy from the start: access controls, data minimisation, providers that don't train on your data, and self-hosted options when needed.",
            },
            TEAM_FAQ,
        ],
        relatedProjects: ["flenzo", "videolab"],
    },
    {
        slug: "product-design",
        name: "UI/UX & Product Design",
        metaTitle: "UI/UX Design & Product Design Agency",
        metaDescription:
            "UI/UX design for websites, mobile apps and SaaS products: research, wireframes, interface design, prototypes and design systems by Flucks, in India and worldwide.",
        headline: "Design that makes products feel effortless.",
        intro:
            "We design websites, apps and software products that are clear, beautiful and easy to use, from research and user flows to polished interfaces and design systems. Because our designers work alongside our engineers, every design is built to be built.",
        offerings: [
            {
                title: "UX research & strategy",
                description: "Understanding your users and goals to shape flows that make sense from the first screen.",
            },
            {
                title: "Wireframes & user flows",
                description: "The structure of every screen and journey, agreed before visual design begins.",
            },
            {
                title: "UI design",
                description: "Distinctive, polished interfaces for web and mobile that feel premium and on-brand.",
            },
            {
                title: "Interactive prototypes",
                description: "Clickable prototypes for testing with users, stakeholders and investors.",
            },
            {
                title: "Design systems",
                description: "Reusable components and guidelines that keep your product consistent as it grows.",
            },
            {
                title: "UX audits & redesign",
                description: "A review of your current product's usability, with a redesign that fixes what's costing you users.",
            },
        ],
        process: [
            { title: "Understand", description: "Research into your users, market and the problem we're solving." },
            { title: "Structure", description: "User flows and wireframes that make every journey simple." },
            { title: "Design", description: "High-fidelity interfaces, motion and interactive prototypes." },
            { title: "Hand off & build", description: "Developer-ready files and, if you like, our engineers build it." },
        ],
        stack: ["Figma", "FigJam", "Framer", "Adobe Illustrator", "Design systems", "Prototyping"],
        faqs: [
            {
                question: "What's included in your UI/UX design service?",
                answer:
                    "Research, user flows, wireframes, visual interface design, interactive prototypes and a design system or style guide, delivered in Figma and ready for development.",
            },
            {
                question: "Can you redesign our existing product?",
                answer:
                    "Yes. We audit your current website or app, find where users struggle, and redesign the experience while keeping what already works.",
            },
            {
                question: "Do you also develop the designs?",
                answer:
                    "Yes. Our designers and engineers work as one team, so we can take your product from design all the way to a launched website or app.",
            },
            TEAM_FAQ,
            LOCATION_FAQ,
        ],
        relatedProjects: ["dreamblend", "registration", "urban-guest"],
    },
];

// Focused pages: each targets one specific search and links back to its core service
const FOCUS_PAGES: ServicePage[] = [
    {
        slug: "ai-chatbot-development",
        parent: "ai-automation",
        name: "AI Chatbot Development",
        metaTitle: "AI Chatbot Development Company",
        metaDescription:
            "Custom AI chatbots for websites, apps, WhatsApp and internal teams, trained on your own data. Flucks designs, builds and maintains them for clients in India and worldwide.",
        headline: "AI chatbots that actually know your business.",
        intro:
            "We build custom AI chatbots and assistants that answer from your own documents, products and policies, not from generic internet knowledge. Put one on your website, inside your app, on WhatsApp or in Slack, and hand conversations to a person whenever it should.",
        offerings: [
            {
                title: "Customer support chatbots",
                description:
                    "Bots that resolve common questions around the clock, look up orders and bookings, and pass complex cases to your team with full context.",
            },
            {
                title: "Sales & lead qualification",
                description:
                    "Assistants that answer product questions, recommend the right plan, capture lead details and book calls straight into your calendar.",
            },
            {
                title: "Internal knowledge assistants",
                description:
                    "A private assistant for your team that answers from handbooks, SOPs, wikis and past tickets, with links to the source.",
            },
            {
                title: "WhatsApp, Slack & multichannel",
                description:
                    "One chatbot brain deployed across your website widget, mobile app, WhatsApp Business, Slack, Teams or email.",
            },
            {
                title: "Voice & multilingual bots",
                description:
                    "Assistants that speak and understand English, Hindi and other languages, by text or by voice.",
            },
            {
                title: "Analytics & continuous tuning",
                description:
                    "Dashboards showing what people ask, where the bot struggles and what it resolves, so answers keep getting better.",
            },
        ],
        process: [
            { title: "Define", description: "We agree what the chatbot should handle, what it must never do, and when it hands off." },
            { title: "Connect your data", description: "Your documents, FAQs, product data and systems become its knowledge base." },
            { title: "Build & test", description: "We test it against real questions and measure accuracy before anyone sees it." },
            { title: "Launch & tune", description: "Go live on your channels, then review conversations and improve it every month." },
        ],
        stack: ["OpenAI", "Claude", "Gemini", "LangChain", "Vector databases", "WhatsApp Business API", "Next.js", "Node.js", "Python"],
        faqs: [
            {
                question: "How is a custom AI chatbot different from a regular chatbot?",
                answer:
                    "Older chatbots follow fixed scripts and break when a question is phrased differently. A custom AI chatbot understands natural language and answers from your own content, so it handles far more questions accurately and sounds like your brand.",
            },
            {
                question: "Will the chatbot make things up?",
                answer:
                    "We ground every answer in your own data using retrieval (RAG), show sources where useful, and set clear rules for what it shouldn't answer. When it isn't confident, it says so and hands over to a person.",
            },
            {
                question: "Can the chatbot work on WhatsApp and our website?",
                answer:
                    "Yes. The same chatbot can run on your website, inside your mobile app, on WhatsApp Business, Slack, Teams or email, so customers get consistent answers everywhere.",
            },
            {
                question: "How long does it take to build an AI chatbot?",
                answer:
                    "A focused chatbot on your existing content usually takes 3 to 6 weeks, including testing. Bots connected to several internal systems take longer, and you get a clear timeline before we start.",
            },
            TEAM_FAQ,
            LOCATION_FAQ,
        ],
        relatedProjects: ["flenzo", "videolab"],
    },
    {
        slug: "rag-development",
        parent: "ai-automation",
        name: "RAG Pipeline Development",
        metaTitle: "RAG Development: Pipelines & Knowledge Bases",
        metaDescription:
            "Retrieval-augmented generation (RAG) pipelines that let AI answer accurately from your documents and databases. Built, evaluated and maintained by Flucks' engineers.",
        headline: "RAG pipelines that give AI the right answers.",
        intro:
            "Retrieval-augmented generation lets an AI model look things up in your own documents and data before it answers. We engineer the whole pipeline: ingestion, chunking, embeddings, search, permissions and evaluation, so answers are accurate, cited and safe to put in front of customers or staff.",
        offerings: [
            {
                title: "Document ingestion",
                description:
                    "PDFs, Word files, websites, Notion, Google Drive, Confluence and databases, cleaned, parsed and kept in sync automatically.",
            },
            {
                title: "Retrieval engineering",
                description:
                    "Chunking, embeddings, hybrid keyword and vector search, and re-ranking tuned to your content, so the right passage is found first.",
            },
            {
                title: "Permission-aware search",
                description:
                    "Users only get answers from documents they're allowed to see, matching the access rules you already have.",
            },
            {
                title: "Answers with sources",
                description:
                    "Responses that cite the exact document and section, so people can check them and trust them.",
            },
            {
                title: "Evaluation & accuracy testing",
                description:
                    "Test sets built from real questions that measure retrieval and answer quality before and after every change.",
            },
            {
                title: "Fixing an existing RAG system",
                description:
                    "Already have a RAG prototype that gives poor answers? We diagnose where retrieval fails and rebuild what's needed.",
            },
        ],
        process: [
            { title: "Audit your data", description: "We review your sources, formats, update frequency and access rules." },
            { title: "Prototype", description: "A working pipeline on a sample of your data, with accuracy measured." },
            { title: "Harden", description: "Scaling, permissions, monitoring, cost controls and automatic re-indexing." },
            { title: "Evaluate & improve", description: "Ongoing evaluation as your content and questions change." },
        ],
        stack: ["LangChain", "LlamaIndex", "OpenAI", "Claude", "pgvector", "Pinecone", "Qdrant", "Elasticsearch", "Python"],
        faqs: [
            {
                question: "What is RAG (retrieval-augmented generation)?",
                answer:
                    "RAG is a technique where an AI model first searches your own documents and data for relevant information, then uses what it found to write its answer. It makes AI accurate about your business without retraining a model.",
            },
            {
                question: "RAG or fine-tuning: which do we need?",
                answer:
                    "For answering questions from your documents, RAG is usually the better choice: it's cheaper, stays up to date as content changes and can cite sources. Fine-tuning suits changing a model's style or format. We'll recommend the right mix for your case.",
            },
            {
                question: "Our RAG chatbot gives wrong answers. Can you fix it?",
                answer:
                    "Usually, yes. Most problems come from how documents are split, searched or ranked rather than the model itself. We measure where it fails and fix retrieval first, then prompts and the model.",
            },
            {
                question: "Can the data stay private or on our own servers?",
                answer:
                    "Yes. We can use providers that don't train on your data, deploy in your own cloud account, or run open-source models fully self-hosted when needed.",
            },
            TEAM_FAQ,
            LOCATION_FAQ,
        ],
        relatedProjects: ["flenzo", "videolab"],
    },
    {
        slug: "workflow-automation",
        parent: "ai-automation",
        name: "Workflow Automation",
        metaTitle: "AI Workflow Automation Services",
        metaDescription:
            "Automate repetitive work across your tools with AI workflows and agents: data entry, approvals, reports and more. Flucks builds, fixes and monitors automations worldwide.",
        headline: "Automate the work your team shouldn't be doing.",
        intro:
            "We find the repetitive, manual steps slowing your business down and automate them end to end, connecting your CRM, email, spreadsheets, databases and internal tools, with AI handling the parts that need judgement. New workflows, smarter versions of existing ones, or fixes for automations that keep breaking.",
        offerings: [
            {
                title: "Process mapping",
                description:
                    "We map how work actually flows today and rank each step by time saved, so you automate the highest-value work first.",
            },
            {
                title: "Custom automations",
                description:
                    "Workflows built in n8n, Make, Zapier or custom code, depending on scale, cost and how much control you need.",
            },
            {
                title: "AI document processing",
                description:
                    "Invoices, forms, contracts, emails and resumes read, classified and turned into structured data automatically.",
            },
            {
                title: "AI agents",
                description:
                    "Agents that research, draft, decide and act across your systems, with a person approving the steps that matter.",
            },
            {
                title: "Reports & notifications",
                description:
                    "Daily summaries, alerts and reports assembled from your tools and delivered to email, Slack or WhatsApp.",
            },
            {
                title: "Fixing & extending automations",
                description:
                    "We repair fragile workflows, cut their running costs and add new steps or AI capabilities to what you already run.",
            },
        ],
        process: [
            { title: "Map", description: "Shadow the process, measure the time it takes and find what to automate." },
            { title: "Design", description: "A clear workflow diagram with every tool, rule and hand-off agreed." },
            { title: "Automate", description: "Build, test on real cases and roll out with logging and error alerts." },
            { title: "Monitor", description: "Track runs, failures and savings, and extend the workflow over time." },
        ],
        stack: ["n8n", "Make", "Zapier", "OpenAI", "Claude", "LangGraph", "Python", "Node.js", "Google Workspace APIs"],
        faqs: [
            {
                question: "Which workflows are worth automating?",
                answer:
                    "Tasks that repeat often, follow clear rules or involve moving information between tools: data entry, lead routing, invoice processing, onboarding, reporting and follow-ups. We start by measuring time spent, so you know the payoff in advance.",
            },
            {
                question: "Do you use n8n, Zapier or custom code?",
                answer:
                    "Whichever fits. No-code tools like n8n, Make and Zapier are quick and easy to change; custom code suits high volumes, complex logic or strict data rules. Many projects combine both.",
            },
            {
                question: "Can you fix an automation that keeps breaking?",
                answer:
                    "Yes. We audit existing workflows, add error handling, retries and alerts, and rebuild the fragile parts so they run reliably.",
            },
            {
                question: "Will automation replace our team?",
                answer:
                    "It removes repetitive work so your team can focus on decisions, customers and growth. Important steps keep a person in the loop for approval.",
            },
            TEAM_FAQ,
            LOCATION_FAQ,
        ],
        relatedProjects: ["videolab", "flenzo"],
    },
    {
        slug: "website-redesign",
        parent: "web-development",
        name: "Website Redesign",
        metaTitle: "Website Redesign Services That Keep Your SEO",
        metaDescription:
            "Website redesign and modernisation without losing search rankings: new design, faster pages and better conversions, delivered by Flucks for clients in India and worldwide.",
        headline: "A new website, without losing what already works.",
        intro:
            "We redesign outdated, slow or hard-to-update websites into fast, modern ones that convert better, while protecting your content, URLs and search rankings. Whether you need a visual refresh, a rebuild on a modern stack or both, we plan the move so nothing breaks on launch day.",
        offerings: [
            {
                title: "Website & UX audit",
                description:
                    "We review design, speed, SEO, analytics and user behaviour to find what's costing you visitors and enquiries.",
            },
            {
                title: "Visual redesign",
                description:
                    "A distinctive new look and clearer structure that reflects where your business is today.",
            },
            {
                title: "Rebuild on a modern stack",
                description:
                    "Move from slow templates, page builders or legacy code to a fast, maintainable stack like Next.js with a headless CMS.",
            },
            {
                title: "SEO-safe migration",
                description:
                    "URL mapping, redirects, metadata and structured data carried over, so you keep your rankings after launch.",
            },
            {
                title: "Speed & Core Web Vitals",
                description:
                    "Optimised images, code and hosting so pages load fast and pass Google's Core Web Vitals.",
            },
            {
                title: "Conversion improvements",
                description:
                    "Clearer messaging, calls to action and forms that turn more of your visitors into enquiries and sales.",
            },
        ],
        process: [
            { title: "Audit", description: "Analytics, SEO and UX review of your current site, with clear priorities." },
            { title: "Redesign", description: "New structure and visual design, reviewed and approved page by page." },
            { title: "Rebuild & migrate", description: "Development, content migration and redirects for every old URL." },
            { title: "Launch & measure", description: "Careful launch, search monitoring and before-and-after results." },
        ],
        stack: ["Next.js", "React", "TypeScript", "Headless CMS", "Tailwind CSS", "Figma", "Vercel", "Google Search Console"],
        faqs: [
            {
                question: "Will a redesign hurt our Google rankings?",
                answer:
                    "Not when it's done carefully. We map every old URL to its new one, set up redirects, keep metadata and structured data, and monitor Search Console after launch. Most sites gain traffic because the new one is faster and clearer.",
            },
            {
                question: "Do we need a full rebuild or just a new design?",
                answer:
                    "It depends on your current site. If the code and platform are sound, a visual redesign is enough. If it's slow, hard to edit or built on an outdated platform, rebuilding usually costs less over time. We'll recommend one after the audit.",
            },
            {
                question: "How long does a website redesign take?",
                answer:
                    "Most redesigns take 4 to 10 weeks, depending on the number of pages, content migration and features. You get a timeline with the proposal.",
            },
            {
                question: "Can you keep our content and add new features?",
                answer:
                    "Yes. We migrate your existing content and can add new features during the redesign, such as bookings, payments, a blog or a client portal.",
            },
            TEAM_FAQ,
            LOCATION_FAQ,
        ],
        relatedProjects: ["urban-guest", "registration", "dreamblend"],
    },
    {
        slug: "website-maintenance",
        parent: "web-development",
        name: "Website Maintenance",
        metaTitle: "Website & App Maintenance and Support Services",
        metaDescription:
            "Website and app maintenance plans: updates, security, backups, monitoring, speed fixes and new features. Flucks keeps your product healthy in India and worldwide.",
        headline: "We keep your website and app running at their best.",
        intro:
            "Launching is the beginning. We look after websites, web apps and mobile apps after go-live, keeping them secure, fast and up to date, fixing issues before your users notice and shipping improvements every month. That includes products we didn't originally build.",
        offerings: [
            {
                title: "Updates & security patches",
                description:
                    "Frameworks, plugins and dependencies kept current, with security fixes applied quickly and safely.",
            },
            {
                title: "Monitoring & uptime",
                description:
                    "Uptime, error and performance monitoring with alerts, so problems are caught and fixed early.",
            },
            {
                title: "Backups & recovery",
                description:
                    "Regular, tested backups of code, content and databases, with a clear plan to restore quickly if anything goes wrong.",
            },
            {
                title: "Speed & SEO health",
                description:
                    "Ongoing performance tuning, broken-link checks and technical SEO fixes to protect your search visibility.",
            },
            {
                title: "Bug fixes & small changes",
                description:
                    "Content updates, layout fixes and small improvements handled by engineers who already know your codebase.",
            },
            {
                title: "New features",
                description:
                    "Monthly development time for new pages, integrations and features as your business grows.",
            },
        ],
        process: [
            { title: "Onboard", description: "Code, hosting and access review, plus a health report of what needs attention." },
            { title: "Stabilise", description: "Urgent fixes, monitoring, backups and security hardening put in place." },
            { title: "Maintain", description: "Regular updates, checks and requested changes on an agreed schedule." },
            { title: "Report & improve", description: "Monthly reports on uptime, speed and work done, with suggested next steps." },
        ],
        stack: ["Next.js", "React", "WordPress", "Node.js", "React Native", "Vercel", "AWS", "Sentry", "Cloudflare"],
        faqs: [
            {
                question: "Do you maintain websites you didn't build?",
                answer:
                    "Yes. We start with an audit of the code, hosting and security, fix anything urgent, then take over regular maintenance and improvements.",
            },
            {
                question: "What's included in website maintenance?",
                answer:
                    "Software and security updates, uptime and error monitoring, backups, speed and SEO checks, bug fixes, content changes and development time for improvements, depending on your plan.",
            },
            {
                question: "Do you also maintain mobile apps?",
                answer:
                    "Yes. We handle OS and library updates, crash fixes, store releases and new features for iOS and Android apps.",
            },
            {
                question: "How quickly do you respond to issues?",
                answer:
                    "Response times are agreed in your plan. Critical problems like a site being down are treated as top priority, and monitoring often lets us fix them before you notice.",
            },
            TEAM_FAQ,
            LOCATION_FAQ,
        ],
        relatedProjects: ["urban-guest", "registration"],
    },
    {
        slug: "web-development-company-india",
        parent: "web-development",
        name: "Development Company in India",
        metaTitle: "Web & App Development Company in India",
        metaDescription:
            "Flucks is a web, app and AI development company in India: a team of designers and engineers building websites, mobile apps, MVPs and AI automation for global clients.",
        headline: "A web and app development company in India, built for global standards.",
        intro:
            "Flucks is a design and engineering studio in India building websites, web apps, mobile apps, MVPs and AI automation for startups and businesses in India and around the world. You get a dedicated team of designers and engineers, clear communication in your time zone and the quality bar of a top product studio, at India's cost advantage.",
        offerings: [
            {
                title: "Websites & web apps",
                description:
                    "Custom websites, full-stack web applications, dashboards and portals built from scratch or improved from what you have.",
            },
            {
                title: "Mobile apps",
                description:
                    "iOS, Android and cross-platform apps with React Native or Flutter, from first version to store launch and beyond.",
            },
            {
                title: "MVPs for startups",
                description:
                    "Launch-ready first versions of your product, scoped tightly and built to scale.",
            },
            {
                title: "AI & automation",
                description:
                    "AI chatbots, RAG pipelines and workflow automation integrated into your products and operations.",
            },
            {
                title: "UI/UX design",
                description:
                    "Research-led interface design and design systems from a team that also builds what it designs.",
            },
            {
                title: "Dedicated team & support",
                description:
                    "Long-term engineering partnership for maintenance, new features and scaling, with the same people throughout.",
            },
        ],
        process: [
            { title: "Talk", description: "A call to understand your goals, followed by a written scope and estimate." },
            { title: "Plan", description: "Milestones, team, communication cadence and time-zone overlap agreed upfront." },
            { title: "Build", description: "Weekly demos, shared progress boards and direct access to the team." },
            { title: "Launch & support", description: "Release, handover with documentation, and ongoing support." },
        ],
        stack: ["Next.js", "React", "React Native", "Flutter", "Node.js", "Python", "PostgreSQL", "OpenAI", "AWS"],
        faqs: [
            {
                question: "Why hire a development company in India?",
                answer:
                    "India has a deep pool of strong engineers and lower costs than the US or Europe. Working with a structured studio rather than individual freelancers gives you that advantage with the reliability, process and accountability of a proper team.",
            },
            {
                question: "How do you work with clients in other time zones?",
                answer:
                    "We agree overlap hours with your team, hold regular video calls and demos, and keep progress, decisions and documentation in shared tools, so you always know where things stand.",
            },
            {
                question: "Who owns the code and designs?",
                answer:
                    "You do. Once the project is paid for, you own the source code, designs and all project assets, and we can sign an NDA before we start.",
            },
            {
                question: "What does a project with Flucks cost?",
                answer:
                    "It depends on scope. After a short discovery call we send a fixed-scope proposal or a monthly team estimate, so you know the cost before committing.",
            },
            TEAM_FAQ,
            LOCATION_FAQ,
        ],
        relatedProjects: ["urban-guest", "flenzo", "dreamblend", "music-streaming"],
    },
];

export const ALL_SERVICE_PAGES: ServicePage[] = [...SERVICE_PAGES, ...FOCUS_PAGES];

export const getServicePage = (slug: string) => ALL_SERVICE_PAGES.find((page) => page.slug === slug) ?? null;

/** Focused pages that sit under a core service */
export const focusPagesOf = (slug: string) => FOCUS_PAGES.filter((page) => page.parent === slug);

/**
 * Where to go next from a service page: a core page lists its focused pages, then the other core
 * services; a focused page lists its parent, its siblings, then the other core services.
 */
export const relatedServicePages = (page: ServicePage): ServicePage[] => {
    const parent = page.parent ? getServicePage(page.parent) : null;
    const family = parent
        ? [parent, ...focusPagesOf(parent.slug).filter((other) => other.slug !== page.slug)]
        : focusPagesOf(page.slug);
    const otherCore = SERVICE_PAGES.filter((other) => other.slug !== page.slug && other.slug !== parent?.slug);
    return [...family, ...otherCore];
};

/** The service pages a case study belongs to, for links from /works/<slug> */
export const servicesForProject = (projectSlug: string) =>
    SERVICE_PAGES.filter((page) => page.relatedProjects.includes(projectSlug));
