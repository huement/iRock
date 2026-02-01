// ---------------------------------------------------------------------------
// Projects (portfolio grid)
// ---------------------------------------------------------------------------
export type GridClass = 'masonry-item--w4' | 'masonry-item--w4-double'
export type CardClass =
    | 'card'
    | 'card card-featured'
    | 'card card-highlight'
    | 'card card-laanc'

export interface Project {
    id: string
    title: string
    description: string
    /** Filename in src/assets/imgs/ for Astro Image optimization */
    imageKey: string
    tags: string[]
    gridClass: GridClass
    cardClass: CardClass
}

export const projects: Project[] = [
    {
        id: 'blog',
        title: 'huement.com Blog',
        description:
            'Laravel Livewire site—I coded it, did all the artwork, and wrote every article. Statamic CMS with a Digital Ocean CI/CD pipeline.',
        imageKey: 'blog.png',
        tags: [
            'Laravel',
            'Livewire',
            'Statamic CMS',
            'PHP',
            'Digital Ocean',
            'CI/CD',
        ],
        gridClass: 'masonry-item--w4-double',
        cardClass: 'card card-featured',
    },
    {
        id: 'map',
        title: 'Map Data',
        description: 'Spatial data visualization and mapping.',
        imageKey: 'map.png',
        tags: ['PostGIS', 'PHP', 'SQL', 'HTML5'],
        gridClass: 'masonry-item--w4',
        cardClass: 'card',
    },
    {
        id: 'youtube',
        title: 'Barebones Code',
        description:
            'My YouTube channel about tech—videos with heavy animation and voiceovers. I handle all editing and animations.',
        imageKey: 'youtube.png',
        tags: ['YouTube', 'Video', 'Animation', 'Voiceover'],
        gridClass: 'masonry-item--w4-double',
        cardClass: 'card card-highlight',
    },
    {
        id: 'flightplan',
        title: 'FlightPlan App',
        description:
            'Building & flying drone flightplans via hybrid Android application.',
        imageKey: 'flightplan.png',
        tags: ['Vue.js', 'TypeScript', 'GraphQL', 'Node.js', 'Android'],
        gridClass: 'masonry-item--w4',
        cardClass: 'card',
    },
    {
        id: 'map-texture',
        title: 'Map Texture',
        description: 'Custom map textures and rendering.',
        imageKey: 'map_texture.png',
        tags: ['PostGIS', 'GeoJSON', 'PHP'],
        gridClass: 'masonry-item--w4',
        cardClass: 'card',
    },
    {
        id: 'laanc',
        title: 'LAANC Map Layers',
        description: 'Generating complex maps and layers from PostGIS GeoJSON.',
        imageKey: 'laanc.png',
        tags: ['PostGIS', 'GeoJSON', 'PHP', 'SQL'],
        gridClass: 'masonry-item--w4-double',
        cardClass: 'card card-laanc',
    },
    {
        id: 'sites',
        title: 'App Sites View',
        description: 'Asset and site management interface.',
        imageKey: 'sites.png',
        tags: ['Vue.js', 'TypeScript', 'GraphQL', 'Node.js'],
        gridClass: 'masonry-item--w4',
        cardClass: 'card',
    },
    {
        id: 'image',
        title: 'Flight Imagery',
        description: 'Drone capture and image workflow.',
        imageKey: 'image.png',
        tags: ['Vue.js', 'TypeScript', 'Android', 'GraphQL'],
        gridClass: 'masonry-item--w4',
        cardClass: 'card',
    },
    {
        id: 'printed',
        title: 'Printed Paper Maps',
        description: 'Large-format printed maps with customer data.',
        imageKey: 'printed.png',
        tags: ['PostGIS', 'PHP', 'SQL', 'HTML5'],
        gridClass: 'masonry-item--w4',
        cardClass: 'card',
    },
    {
        id: 'freshlime1',
        title: 'FreshLime',
        description:
            'Hybrid mobile applications; ReactJS since its earliest days.',
        imageKey: 'freshlime1.png',
        tags: ['React.js', 'Python', 'Django', 'AWS', 'AngularJS'],
        gridClass: 'masonry-item--w4',
        cardClass: 'card',
    },
    {
        id: 'results',
        title: 'AI Analytics',
        description:
            'Loading statistics and AI compiled results as mapped data layers.',
        imageKey: 'results.png',
        tags: ['Vue.js', 'TypeScript', 'GraphQL', 'Node.js', 'PostGIS'],
        gridClass: 'masonry-item--w4',
        cardClass: 'card',
    },
    {
        id: 'freshlime3',
        title: 'FreshLime App',
        description: 'Business management suite and hybrid mobile experience.',
        imageKey: 'freshlime3.png',
        tags: ['React.js', 'Django', 'Python', 'AWS'],
        gridClass: 'masonry-item--w4',
        cardClass: 'card',
    },
]

// ---------------------------------------------------------------------------
// Timeline (career as code)
// ---------------------------------------------------------------------------
export interface TimelineItem {
    filename: string
    language: string
    code: string
}

export const timeline: TimelineItem[] = [
    {
        filename: 'Botlink.ts',
        language: 'javascript',
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
        filename: 'Myriad.php',
        language: 'php',
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
        filename: 'RealTruck.sql',
        language: 'sql',
        code: `/* High Volume eCommerce · mobile + legacy modernization */
SELECT c.action, s.revenue_hr, s.revenue_yr, a.abandonment_rate
FROM Career c
JOIN SalesData s ON s.company = c.company AND s.duration = c.duration
LEFT JOIN CartAbandonment a ON a.company = c.company
WHERE c.company = 'RealTruck' 
  AND c.duration = '2012-2014';
  
-- revenue_hr > 5000; revenue_yr > 10e6
-- PHP/MSSQL · mobile web app · modernized legacy codebase
-- Cart abandonment flows & sales reporting · strict audit requirements`,
    },
    {
        filename: 'FreshLime.py',
        language: 'python',
        code: `# B2B startup · Utah · 1 of 3 devs · 2012 - 2014
class FreshLime(Startup):
    stack = ["Django", "AWS", "AngularJS", "Quickbooks API"]

    def build_suite(self):
        self.service_worker_business_tools()
        self.quickbooks_api_integration()  # hackathon → production
        self.google_review_management()
        return "Business management suite shipped"`,
    },
    {
        filename: 'RigMapper.php',
        language: 'php',
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
        filename: 'UND.edu.txt',
        language: 'markdown',
        code: `# A Journey Begins · 2015
## University of North Dakota

- Bachelor of Science | Statistics
- Bachelor of Arts | Economics
- Focus: user and financial mathematics`,
    },
]

// ---------------------------------------------------------------------------
// Hobbies (carousel)
// ---------------------------------------------------------------------------
export interface Hobby {
    title: string
    imageKey: string
    /** Optional: filename in public/videos/ (e.g. "demo.mp4") to play in lightbox modal */
    videoKey?: string
    /** Optional: link to repo or project (e.g. GitHub) */
    href?: string
    description: string | string[]
}

export const hobbies: Hobby[] = [
    {
        title: 'Game Art',
        imageKey: 'gameart-preview.png',
        videoKey: 'godot-game.mp4',
        description:
            'Pixel art and retro arcade vibes—GHOST QUEST and neon-drenched game screens. Side projects that blend art and code.',
    },
    {
        title: 'Godot',
        imageKey: 'godot.png',
        description: [
            'Classic 2D shooter in Godot—GDScript, movement, shooting, and screen wrap.',
            'Rapid-fire bullets, spread patterns, and Asteroids-style gameplay.',
        ],
    },
    {
        title: 'Hackintosh (OpenCore)',
        imageKey: 'hackintosh-oc.png',
        description: [
            'Here is a little showing off of my latest OpenCore config and macOS Sonoma on custom hardware.',
            "Im somewhat of a macOS expert, I've spent hours tweaking kexts and getting macOS on non standard hardware.",
        ],
    },
    {
        title: 'Hackintosh Build',
        imageKey: 'hackintosh.png',
        href: 'https://github.com/johnny13/OSX-LCD',
        description: [
            'This is a custom macOS build I put together. DDR5 Ram, Liquid Cooled GPU & CPU.',
            'I take pride in having an overclocked, unlocked and ready to rock mac :D',
            'I wrote the code that runs the system stats LED screen. ',
        ],
    },
    {
        title: 'Leah',
        imageKey: 'leah.png',
        description:
            'Personal photo—balance between life and code. Someone who keeps the ship steady.',
    },
    {
        title: 'Overworld',
        imageKey: 'overworld-preview.png',
        description:
            'Pixel art overworld—dungeon rooms, arcade cabinets, dance pads, and a bit of ghost-quest atmosphere.',
    },
    {
        title: 'Paco',
        imageKey: 'paco.png',
        description:
            'This little guy has been by my side for many years. He is my best friend and is often at my feet or watching me from the bed while I work.',
    },
    {
        title: 'Video',
        imageKey: 'video-gen.png',
        description:
            'Video editing and motion—Premiere Pro, starfield backgrounds, and bringing ideas to the timeline.',
    },
    {
        title: 'The End',
        imageKey: 'the-end.png',
        description:
            'Outro screens and “Thanks for Watching”—huement.com, branding, and wrapping the story.',
    },
]

// ---------------------------------------------------------------------------
// Socials (Digital Frontier)
// ---------------------------------------------------------------------------
export interface Social {
    icon: string
    iconColorClass: string
    title: string
    description: string
    buttonText: string
    href: string
}

export const socials: Social[] = [
    {
        icon: 'bxl-codepen',
        iconColorClass: 'text-success',
        title: 'CodePen',
        description:
            'Pens, prototypes, and front-end experiments—CSS, SVG, and interactive snippets.',
        buttonText: 'View Pens',
        href: 'https://codepen.io/johnny13',
    },
    {
        icon: 'bxl-github',
        iconColorClass: 'text-light',
        title: 'GitHub',
        description:
            'Repos, open source, and code—RepRasp, Count-S3, MMCV, and more.',
        buttonText: 'View Profile',
        href: 'https://github.com/johnny13',
    },
    {
        icon: 'bxl-linkedin',
        iconColorClass: 'text-info',
        title: 'LinkedIn',
        description:
            'Professional profile, experience, and network—connect for opportunities.',
        buttonText: 'Connect',
        href: 'https://www.linkedin.com/in/derekscott13/',
    },
    {
        icon: 'bxl-youtube',
        iconColorClass: 'text-danger',
        title: 'Tech Vlog',
        description:
            'Deep dives into new tech stacks, hardware teardowns, and live coding sessions.',
        buttonText: 'Watch Now',
        href: 'https://www.youtube.com/@barebonescode',
    },
    {
        icon: 'bxl-twitter',
        iconColorClass: 'text-info',
        title: 'X.com',
        description:
            'Real-time updates, hot takes on industry news, and community discussions.',
        buttonText: 'Follow Me',
        href: 'https://x.com/huement',
    },
    {
        icon: 'bxs-news',
        iconColorClass: 'text-warning',
        title: 'The Blog',
        description:
            'Long-form articles on internet culture, software architecture, and future tech.',
        buttonText: 'Read More',
        href: 'https://huement.com/blog',
    },
]

// ---------------------------------------------------------------------------
// Hero (optional — can be in portfolio or separate)
// ---------------------------------------------------------------------------
export interface HeroData {
    name: string
    tagline: string
    intro: string
    ctaWork: string
    ctaContact: string
}

export const heroData: HeroData = {
    name: 'Derek Scott',
    tagline: 'Developer Extraordinaire',
    intro: 'I am a Full-Stack Rock Star, skilled in transforming complex data into interactive realities. With over 10 years of experience, I have navigated the strict standards of U.S. Navy contracting and the fast-paced agility of startups and e-commerce leaders. When I\’m not coding professionally, I\’m contributing to the community as a tech and video game vlogger, as well as creating my own games and apps.',
    ctaWork: 'Explore Work',
    ctaContact: 'Initialize Contact',
}
