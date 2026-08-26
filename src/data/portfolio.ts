/// DATA FOR THE ENTIRE APPLICATION
/// Every section gets the data it displays from here. Each project, each workplace, etc. are all computed and stored here. This is basically a local database.

// ---------------------------------------------------------------------------
// Projects (portfolio grid)
// ---------------------------------------------------------------------------
export type GridClass =
  | "masonry-item--w4"
  | "masonry-item--w4-double"
  | "masonry-item--w6";
export type CardClass =
  | "card"
  | "card card-featured"
  | "card card-highlight"
  | "card card-laanc";

export interface Project {
  id: string;
  title: string;
  description: string;
  /** Filename in src/assets/imgs/ for Astro Image optimization */
  imageKey: string;
  lightboxImageKey?: string;
  lightboxDetails?: string;
  tags: string[];
  gridClass: GridClass;
  cardClass: CardClass;
  ctaUrl?: string; // Added: Optional link URL
  ctaText?: string; // Added: Optional button label
  thumbWidth?: number; // Added: Optional thumbnail width
  thumbHeight?: number; // Added: Optional thumbnail height
}

export const projects: Project[] = [
  {
    id: "blog",
    title: "huement.com Blog",
    description:
      "Statamic CMS based, using the latest Laravel Livewire as a foundation, its my cutting edge tech focused blog. All the artwork, every article, and anything else you see was either coded, created, or written by me. It uses the latest SEO practices, and is optimized for speed and performance.",
    lightboxDetails: `
# huement.com Blog

Cutting-edge tech blog built on **Statamic CMS** and **Laravel Livewire**.

### Technical Highlights
* **Full Stack Architecture**: Built from the ground up using modern **PHP 8.3+** and Livewire reactive components.
* **100% Original Content**: All articles, custom artwork, and interactive tools were created and coded directly by me.
* **SEO & Speed**: Rigorously optimized for core web vitals, dynamic open-graph card generation, and automated CI/CD deployments.
    `,
    imageKey: "blog.png",
    tags: ["Laravel Livewire", "Statamic CMS", "PHP 8.3+", "CI/CD"],
    gridClass: "masonry-item--w4-double",
    cardClass: "card card-featured",
    ctaUrl: "https://huement.com/blog",
    ctaText: "Read Blog",
    thumbWidth: 850,
    thumbHeight: 400,
  },
  {
    id: "luma",
    title: "Luma Shapes",
    description:
      "Sensory Game created for babies. It plays pleasing musical chords and offers bright shapes and fun animations upon interacting with the shapes and characters. I coded this game using Godot Engine, and it is available for Android devices. The pixel art was generated mostly through Higgsfield.ai.",
    lightboxDetails: `
# Luma Shapes

A interactive sensory mobile game tailored for infants and toddlers.

### Key Features
* **Built in Godot**: Engineered using GDScript with node architectures designed for smooth touch response.
* **Interactive Audio**: Generates harmonious musical chords and scale progressions upon shape interaction.
* **Generative Pixel Art**: Visual assets created and polished using **Higgsfield.ai** and sprite editing pipelines.
* **Android Native**: Optimized for performance across diverse mobile hardware profiles.
    `,
    imageKey: "luma.gif",
    lightboxImageKey: "luma.gif",
    tags: ["Godot", "Android", "Musical", "Pixel Art"],
    gridClass: "masonry-item--w4",
    ctaUrl:
      "https://play.google.com/store/apps/details?id=com.huement.lumashapes&hl=en_US",
    ctaText: "Google PlayStore",
    cardClass: "card",
  },
  {
    id: "cookie",
    title: "Cookie Sleuth Browser Extension",
    description:
      "Affiliate Marketing Fraud detection",
    lightboxDetails: `
# Cookie Sleuth

Advanced affiliate marketing fraud detection and cookie manipulation prevention engine.

### Core Mechanics
* **Separation Engine**: Distinguishes legitimate affiliate referrals from unsolicited attribution hijacking.
* **LZ Navigation Novelty**: Applies Lempel-Ziv entropy metrics to detect synthetic navigation patterns.
* **Ad-Tech Suppression**: Identifies and suppresses hidden ad-tech cookie synchronization loops.
* **Scoring Engine**: Evaluates real-time threats using a normalized multi-signal scoring algorithm.
    `,
    imageKey: "cookie-sq2.gif",
    lightboxImageKey: "cookie.png",
    tags: ["React.js", "Marketing"],
    gridClass: "masonry-item--w4",
    cardClass: "card",
    ctaUrl: "https://github.com/huement/cookie_sleuth",
    ctaText: "Goto Repository",
    thumbWidth: 400,
    thumbHeight: 400,
  },
  {
    id: "youtube",
    title: "Barebones Code",
    description:
      "My YouTube channel, powered by my animation skills and a good bit of AI. Each video focuses on a tech or coding topic, such as React features, AI IDE reviews, software deep dives, image / video / audio generation, or anything else going on in the tech space.",
    lightboxDetails: `
# Barebones Code

A developer-centric video platform exploring modern software engineering, AI tooling, and emerging web stacks.

### Content & Production
* **Deep Dives**: In-depth reviews on React ecosystem tooling, local LLM integrations, and dev workflows.
* **Custom Animation**: Motion graphics paired with AI visual generation to clarify complex architectural concepts.
* **Community Engagement**: Real-world benchmarks, hardware teardowns, and software tutorials.
    `,
    imageKey: "bare-thumb.gif",
    lightboxImageKey: "bare-600.gif",
    tags: ["YouTube", "Video", "Animation", "Voiceover"],
    gridClass: "masonry-item--w4-double",
    cardClass: "card card-highlight",
    ctaUrl: "https://youtube.com/@barebonescode",
    ctaText: "Visit Channel",
    thumbWidth: 600,
    thumbHeight: 340,
  },
  {
    id: "trend",
    title: "TrendForge",
    description:
      "A web application for visualizing and analyzing trends. We call it 'Narrative Arbitrage', and TrendForge uses the latest Tailwind v4, React 18, Typescript, PHP and various AI tools, including LLAMA, XAI, OpenAI's GPT-4, HuggingFace Models, and much more.",
    lightboxDetails: `
# TrendForge

Real-time trend analysis platform leveraging modern AI models for **Narrative Arbitrage**.

### Architecture Overview
* **Multi-LLM Integration**: Combines output from Llama, xAI, GPT-4, and specialized HuggingFace models.
* **PGVector Embeddings**: High-performance similarity search powered by PostgreSQL and **PGVector**.
* **WordPress Plugin**: Integrates story suggestion pipelines directly into WordPress editorial environments.
* **Modern Stack**: Built with Tailwind CSS v4, React 18, TypeScript, Volt, and OpenAPI standards.
    `,
    imageKey: "trendforge.png",
    tags: ["AI Analytics", "Docker", "PGVector", "Volt", "Tailwind"],
    gridClass: "masonry-item--w4-double",
    cardClass: "card",
    ctaUrl: "https://trendforge.huement.com",
    ctaText: "Goto TF Website",
    thumbWidth: 850,
    thumbHeight: 400,
  },
  {
    id: "cosmic",
    title: "Cosmic Wave",
    description: "An dynamic SVG generation library for creating cosmic waveforms and visualizations.",
    lightboxDetails: `
# Cosmic Wave

Parametric SVG generation library engineered for dynamic cosmic wave visualizations.

### Technical Highlights
* **Procedural Rendering**: Generates mathematical vector waveforms dynamically without external image dependencies.
* **Interactive Parameters**: Allows real-time tweaking of wave frequency, amplitude, decay, and particle density.
* **Lightweight Footprint**: Pure JavaScript implementation designed for high frame-rate web UI graphics.
    `,
    imageKey: "cosmic-sq.png",
    lightboxImageKey: "cosmic.png",
    tags: ["SVG", "Javascript", "UI/UX", "Visualization"],
    gridClass: "masonry-item--w4",
    cardClass: "card",
    thumbWidth: 400,
    thumbHeight: 400,
  },
  {
    id: "flightplan",
    title: "FlightPlan App",
    description:
      "Project I worked on from the planning stage to the client hand-off. Involved building & then flying drones via flightplans users generated on the Web and Android versions of the application.",
    lightboxDetails: `
# FlightPlan App

Commercial drone mission planning and automated flight controller platform.

### Capabilities
* **Autonomous Grid Surveying**: Draw custom flight boundaries on web maps to auto-generate waypoint plans.
* **Hardware Integration**: Communicates directly with Android ground station controllers for drone telemetry.
* **Full Stack Pipeline**: Built with Vue.js, TypeScript, Node.js, and GraphQL services.
    `,
    imageKey: "flightplan.png",
    tags: ["Vue.js", "TypeScript", "GraphQL", "Node.js", "Android"],
    gridClass: "masonry-item--w4-double",
    cardClass: "card",
    thumbWidth: 700,
    thumbHeight: 400,
  },
  {
    id: "laanc",
    title: "LAANC Map Layers",
    description: "Generating complex maps and layers from PostGIS GeoJSON.",
    lightboxDetails: `
# LAANC Map Layers

Low Altitude Authorization and Notification Capability (LAANC) geospatial map renderer.

### GIS Capabilities
* **Spatial Queries**: Executes high-speed GIS queries over complex FAA controlled airspace polygon data.
* **PostGIS & GeoJSON**: Transforms spatial database output directly into interactive browser map overlays.
* **Backend Processing**: Custom PHP spatial pipelines designed for airspace compliance checking.
    `,
    imageKey: "laanc.png",
    tags: ["PostGIS", "GeoJSON", "PHP", "SQL"],
    gridClass: "masonry-item--w4",
    cardClass: "card card-laanc",
  },
  {
    id: "shopify",
    title: "NextJS Shopify Storefront React App",
    description:
      "Pull in Shopify API Storefront data and display it with React. Uses Next.js for server side component and rendering functionality.",
    lightboxDetails: `
# Next.js Shopify Storefront

Headless e-commerce template powered by Shopify's GraphQL Storefront API.

### Features
* **Next.js & SSR**: Employs React Server Components for ultra-fast initial page loads and SEO optimization.
* **Custom Cart Pipeline**: Manages dynamic inventory states, client carts, and secure checkout hand-offs.
* **Modern UI**: Reactive shopping interface built for conversion performance and smooth page transitions.
    `,
    imageKey: "shopify.png",
    lightboxImageKey: "shopify-2.png",
    tags: ["React.js", "NextJS", "Shopify", "Ecommerce"],
    gridClass: "masonry-item--w6",
    cardClass: "card",
    ctaUrl: "https://github.com/huement/shopify-react-demo",
    ctaText: "Goto Repository",
  },
  {
    id: "sites",
    title: "App Sites View",
    description: "Asset and site management interface.",
    lightboxDetails: `
# App Sites View

Enterprise physical site and asset tracking dashboard for commercial drone operations.

### Key Capabilities
* **Geospatial Organization**: Group flight records, imagery, and hardware telemetry by physical GPS sites.
* **Reactive UI**: Vue.js and TypeScript frontend consuming real-time GraphQL endpoints.
* **Audit Trails**: Historical logging for client asset management and regulatory compliance.
    `,
    imageKey: "sites.png",
    tags: ["Vue.js", "TypeScript", "GraphQL", "Node.js"],
    gridClass: "masonry-item--w6",
    cardClass: "card",
    thumbWidth: 700,
    thumbHeight: 400,
  },
  {
    id: "image",
    title: "Flight Imagery",
    description: "Drone capture and image workflow.",
    lightboxDetails: `
# Flight Imagery Workflow

Automated aerial photo ingest and spatial telemetry tagging pipeline.

### Highlights
* **Background Uplink**: Automatic sync of raw drone aerial photos directly from ground control devices.
* **Telemetry Binding**: Binds EXIF metadata, GPS tags, and flight parameters to every image asset.
* **Browser Inspection**: Interactive Vue interface for high-resolution photo zooming and spatial tagging.
    `,
    imageKey: "image.png",
    tags: ["Vue.js", "TypeScript", "Android", "GraphQL"],
    gridClass: "masonry-item--w4",
    cardClass: "card",
  },
  {
    id: "printed",
    title: "Printed Paper Maps",
    description: "Large-format printed maps with customer data.",
    lightboxDetails: `
# Printed Paper Maps

Automated vector map layout engine for physical large-format plotter printing.

### Specifications
* **High Resolution**: Converts digital spatial data into crisp vector outputs suitable for high-DPI plotters.
* **Dynamic Layers**: Overlays customer boundaries and proprietary operational data onto base mapping.
* **Tech Stack**: Powered by PostGIS, PHP backend scripts, and HTML5 Canvas processing.
    `,
    imageKey: "printed.png",
    tags: ["PostGIS", "PHP", "SQL", "HTML5"],
    gridClass: "masonry-item--w4",
    cardClass: "card",
  },
  {
    id: "freshlime1",
    title: "FreshLime",
    description: "Hybrid mobile applications; ReactJS since its earliest days.",
    lightboxDetails: `
# FreshLime Mobile Suite

Hybrid B2B mobile management platform built during the early adoption phase of modern frontend frameworks.

### Architecture
* **Frontend Pioneering**: Developed scalable web and mobile views using early-era **React.js** and AngularJS.
* **Backend Integrations**: Django/Python API layers backed by AWS infrastructure and **QuickBooks API** sync.
* **Customer Engagement**: Built tools for automated Google reviews, customer feedback, and service tracking.
    `,
    imageKey: "freshlime1.png",
    tags: ["React.js", "Python", "Django", "AWS", "AngularJS"],
    gridClass: "masonry-item--w4",
    cardClass: "card",
  },
];

// ---------------------------------------------------------------------------
// Timeline (career as code)
// ---------------------------------------------------------------------------
export interface TimelineItem {
  filename: string;
  language: string;
  code: string;
}

export const timeline: TimelineItem[] = [
  {
    filename: "Upwork.tsx",
    language: "typescript",
    code: `interface FreelanceConfig {
  duration: "2026 - PRESENT";
  stack: ["React.js", "Next.js", "TypeScript", "Tailwind"];
}

export function UpworkConsultant({ clientScope }: { clientScope: ProjectBrief }) {
  const [satisfaction, setSatisfaction] = useState<number>(5.0);

  useEffect(() => {
    async function shipClientApp() {
      const cleanCode = await modernizeCodebase(clientScope);
      setSatisfaction(5.0);
    }

    shipClientApp();
  }, [clientScope]);

  return (
    <ClientSatisfaction rating={satisfaction}>
      <ShippedFeatures status="Deployed & Approved" />
    </ClientSatisfaction>
  );
}`,
  },
  {
    filename: "Botlink.ts",
    language: "javascript",
    code: `class Botlink extends Developer {
  duration = "2021 - 2025";
  stack = ["Vue.js", "GraphQL", "Node.js", "TS"];
  role = "Senior"; // mentored & assisted junior devs

  async onInit() {
    const photos = await this.captureDroneFlightplan(); // Android upload
    const results = await this.mapResults(photos);
    await this.mentorJuniorDevelopers();
    return results;
  }

  async secureContractWork() {
    await this.buildLocalBatteryControllers();
    await this.integrateNavyShipScheduling();
    return "Mission Successful";
  }
}`,
  },
  {
    filename: "Myriad.php",
    language: "php",
    code: `namespace Experience;

class MyriadMobile extends Agency {
    const YEARS = "2016 - 2020";
    use Jira, Scrum;

    public function handleAgTech() {
        return Bushel::ag()->finance([
            'stack' => ['WordPress', 'NodeJS', 'Docker']
        ]);
    }

    public function buildCustomerSites() {
        return Myriad::client()->deploy([
            'stack' => ['Laravel', 'React', 'Next.js', 'WordPress']
        ]);
    }
}`,
  },
  {
  filename: "RealTruck.sql",
  language: "sql",
  code: `/* High-Volume E-Commerce Platform · Legacy Modernization & Mobile Overhaul */
WITH ModernizationMetrics AS (
    SELECT
        company_name,
        duration = '2014 - 2016',
        stack = 'PHP/MSSQL · Mobile-First UI · Asset Pipelines',
        AVG(page_load_ms) AS fast_load_time,
        SUM(cart_conversions) AS recovered_revenue
    FROM ECommerceLegacy
    WHERE platform = 'RealTruck.com'
)
SELECT
    m.stack,
    c.responsive_mobile_templates,
    c.overhauled_build_pipelines,
    s.hourly_revenue,
    a.reduced_abandonment_rate
FROM ModernizationMetrics m
JOIN SalesData s ON s.company = m.company_name
JOIN CartAbandonment a ON a.company = m.company_name
WHERE s.hourly_revenue > 5000 AND s.annual_revenue > 10000000;

-- Rewrote legacy monolithic codebases into responsive, mobile-first templates
-- Overhauled asset pipeline & build tools to reduce page load times and enhance web security`
},
  {
    filename: "RigMapper.php",
    language: "php",
    code: `// Oilfield Mapping · 2015 - 2017
namespace Mapping;

class RigMapper {
    const DURATION = "2015 - 2017";
    private $stack = ["PHP", "PostGIS", "SQL", "HTML5"];

    public function run(): Map {
        return $this->drillingRigLocations()
            ->customerDataOverlay()
            ->largePrintedMaps();
    }
}`,
  },
  {
    filename: "UND.edu.txt",
    language: "markdown",
    code: `# A Journey Begins · 2015
## University of North Dakota

- Bachelor of Science | Statistics
- Bachelor of Arts | Economics
- Focus: user and financial mathematics`,
  },
];

// ---------------------------------------------------------------------------
// Hobbies (carousel)
// ---------------------------------------------------------------------------
export interface Hobby {
  title: string;
  imageKey: string;
  /** Optional: filename in public/videos/ (e.g. "demo.mp4") to play in lightbox modal */
  videoKey?: string;
  /** Optional: link to repo or project (e.g. GitHub) */
  href?: string;
  description: string | string[];
}

export const hobbies: Hobby[] = [
  {
    title: "Game Art",
    imageKey: "gameart-preview.png",
    videoKey: "godot-game.mp4",
    description:
      "Pixel art and retro arcade vibes—GHOST QUEST and neon-drenched game screens. Side projects that blend art and code.",
  },
  {
    title: "Godot",
    imageKey: "godot.png",
    videoKey: "shooter-preview.mp4",
    description: [
      "Classic 2D shooter in Godot—GDScript, movement, shooting, and screen wrap.",
      "Rapid-fire bullets, spread patterns, and Asteroids-style gameplay.",
    ],
  },
  {
    title: "Video",
    imageKey: "video-gen.png",
    videoKey: "bones-intro.mp4",
    description:
      "Video editing and motion—Premiere Pro, starfield backgrounds, and bringing ideas to the timeline.",
  },
  {
    title: "Music Visualizer (ViveWorld)",
    imageKey: "vizualizer.gif",
    videoKey: "vizualizer.mp4",
    description: [
      "Music Visuals are something I can not get enough of. I have contributed to a few different VJ's sets.",
      "I currently have an upcoming project coming out on HTC Viveworld showcasing a three.js based music experience.",
    ],
  },
  {
    title: "Hackintosh (OpenCore)",
    imageKey: "hackintosh-oc.png",
    description: [
      "Here is a little showing off of my latest OpenCore config and macOS Sonoma on custom hardware.",
      "Im somewhat of a macOS expert, I've spent hours tweaking kexts and getting macOS on non standard hardware.",
    ],
  },
  {
    title: "Hackintosh Build",
    imageKey: "hackintosh.png",
    href: "https://github.com/johnny13/OSX-LCD",
    description: [
      "This is a custom macOS build I put together. DDR5 Ram, Liquid Cooled GPU & CPU.",
      "I take pride in having an overclocked, unlocked and ready to rock mac :D",
      "I wrote the code that runs the system stats LED screen. ",
    ],
  },
  {
    title: "Overworld",
    imageKey: "overworld-preview.png",
    description:
      "Pixel art overworld—dungeon rooms, arcade cabinets, dance pads, and a bit of ghost-quest atmosphere.",
  },
  {
    title: "Paco",
    imageKey: "paco.png",
    description:
      "This little guy has been by my side for many years. He is my best friend and is often at my feet or watching me from the bed while I work.",
  },

  {
    title: "The End",
    imageKey: "the-end.png",
    description:
      "Outro screens and “Thanks for Watching”—huement.com, branding, and wrapping the story.",
  },
];

// ---------------------------------------------------------------------------
// Socials (Digital Frontier)
// ---------------------------------------------------------------------------
export interface Social {
  icon: string;
  iconColorClass: string;
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export const socials: Social[] = [
  {
    icon: "bxl-codepen",
    iconColorClass: "text-success",
    title: "CodePen",
    description:
      "Pens, prototypes, and front-end experiments—CSS, SVG, and interactive snippets.",
    buttonText: "View Pens",
    href: "https://codepen.io/johnny13",
  },
  {
    icon: "bxl-github",
    iconColorClass: "text-light",
    title: "GitHub",
    description:
      "Repos, open source, and code—RepRasp, Count-S3, MMCV, and more.",
    buttonText: "View Profile",
    href: "https://github.com/johnny13",
  },
  {
    icon: "bxl-linkedin",
    iconColorClass: "text-info",
    title: "LinkedIn",
    description:
      "Professional profile, experience, and network—connect for opportunities.",
    buttonText: "Connect",
    href: "https://www.linkedin.com/in/derekscott13/",
  },
  {
    icon: "bxl-youtube",
    iconColorClass: "text-danger",
    title: "Tech Vlog",
    description:
      "Deep dives into new tech stacks, hardware teardowns, and live coding sessions.",
    buttonText: "Watch Now",
    href: "https://www.youtube.com/@barebonescode",
  },
  {
    icon: "bxl-twitter",
    iconColorClass: "text-info",
    title: "X.com",
    description:
      "Real-time updates, hot takes on industry news, and community discussions.",
    buttonText: "Follow Me",
    href: "https://x.com/huement",
  },
  {
    icon: "bxs-news",
    iconColorClass: "text-warning",
    title: "The Blog",
    description:
      "Long-form articles on internet culture, software architecture, and future tech.",
    buttonText: "Read More",
    href: "https://huement.com/blog",
  },
];

// ---------------------------------------------------------------------------
// Hero (optional — can be in portfolio or separate)
// ---------------------------------------------------------------------------
export interface HeroData {
  name: string;
  tagline: string;
  intro: string;
  ctaWork: string;
  ctaContact: string;
}

export const heroData: HeroData = {
  name: "Derek Scott",
  tagline: "Developer Extraordinaire",
  intro:
    "I am a Full-Stack Rock Star, skilled in transforming complex data into interactive realities. With over 10 years of experience, I have navigated the strict standards of U.S. Navy contracting and the fast-paced agility of startups and e-commerce leaders. When I\’m not coding professionally, I\’m contributing to the community as a tech and video game vlogger, as well as creating my own games and apps.",
  ctaWork: "Explore Work",
  ctaContact: "Initialize Contact",
};
