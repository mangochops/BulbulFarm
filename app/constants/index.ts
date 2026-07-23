import { FaTree, FaLeaf, FaSeedling, FaPalette, FaTractor,FaHandHoldingWater} from 'react-icons/fa';
import {Sprout, DraftingCompass, Shovel, Trees, Building2, Leaf, ShieldCheck, HeartHandshake, Globe2} from "lucide-react"


export interface navItems {
  label: string;
  route: string;
}
export interface servicesItems{
  id: number;
  icon: string;
  description: string;
  title: string;
}
export interface productItems {
  image: string;
  commonName: string;
  binomialName: string;
  size: number;
  id: number;
  description: string;
  price: number;
}

export interface Product {
  id?: number
  commonName: string
  binomialName: string
  description: string
  price: string
  size: string
  image: string
  matureImage?: string // Image of the grown tree on hover
  created_at?: string;
}

export interface customers {
  avatar: string;
  name: string;
  id: number;
  feedback: string;
 
}

export interface Article {
  id: number
  title: string
  description: string
  featured_image: string | null
  slug: string
  created_at: string
  updated_at: string
}

export interface ServiceDetail {
    id: string
    title: string
    subtitle: string
    icon: React.ElementType
    heroImage: string
    summary: string
    description: string
    deliverables: string[]
    process: { step: string; title: string; desc: string }[]
    metrics: { label: string; value: string; hint: string }[]
    graphType: "growth" | "composition" | "timeline"
}

export const detailedServices: ServiceDetail[] = [
    {
        id: "seedling-supply",
        title: "Seedling Nursery & Direct Supply",
        subtitle: "High-yield, healthy indigenous and exotic varieties grown for maximum resilience.",
        icon: Sprout,
        heroImage: "/woodland-silhouette.jpg",
        summary: "Propagating climate-adapted seedlings with superior survival rates for large and small scale planting.",
        description: "Our core expertise lies in growing premium-grade tree seedlings inside controlled nursery conditions in Limuru. We manage every stage from seed selection and soil composition to root structure hardening. Whether you need indigenous timber trees, fast-growing shade covers, or commercial fruit orchards, our stock is inspected for disease resistance and outdoor acclimatization prior to delivery.",
        deliverables: [
            "Custom seedling batches prepared to target root depths",
            "Species-specific planting & soil guide manuals",
            "Secure nationwide distribution logistics",
            "Bulk trade rates for NGOs, schools, and private estates"
        ],
        process: [
            { step: "01", title: "Species Selection", desc: "Consultation to pick species aligned with your soil profile and climate." },
            { step: "02", title: "Root Hardening", desc: "Gradual outdoor exposure to ensure high field survival post-transit." },
            { step: "03", title: "Dispatch & Delivery", desc: "Custom timber/crate transport preserving soil balls and root vitality." }
        ],
        metrics: [
            { label: "Sapling Survival Rate", value: "96.4%", hint: "Based on monitored client plantings" },
            { label: "Nursery Species Capacity", value: "80+", hint: "Native, exotic, fruit & ornamental" },
            { label: "Annual Supply Volume", value: "250K+", hint: "Seedlings raised per cycle" }
        ],
        graphType: "growth"
    },
    {
        id: "site-assessment",
        title: "Site Assessment & Soil Consultation",
        subtitle: "Data-driven land analysis to guarantee long-term canopy performance.",
        icon: DraftingCompass,
        heroImage: "/About.jpeg",
        summary: "Comprehensive site evaluation, soil chemistry testing, and climate pairing prior to planting.",
        description: "Successful tree growing starts underground. Our agronomy team conducts complete field assessments analyzing pH levels, drainage patterns, compaction, and seasonal rainfall alignment. We eliminate guess-work by providing tailored species mapping so your investment thrives through drought and heavy rainy seasons alike.",
        deliverables: [
            "Full soil pH and drainage analytical report",
            "Micro-climate zoning & windbreak layout plans",
            "Species compatibility matrix",
            "Irrigation and soil amendment roadmap"
        ],
        process: [
            { step: "01", title: "Soil Sampling", desc: "Core sample collection across multi-zone land areas." },
            { step: "02", title: "Data Analysis", desc: "Testing drainage, organic matter, and structural density." },
            { step: "03", title: "Zoning Strategy", desc: "Drafting precision maps matching trees to exact terrain conditions." }
        ],
        metrics: [
            { label: "Tested Acres", value: "1,200+", hint: "Across diverse regions in Kenya" },
            { label: "Growth Boost", value: "+35%", hint: "Faster maturation vs unassessed soil" },
            { label: "Soil Accuracy", value: "99%", hint: "Lab-backed nutrient profile reporting" }
        ],
        graphType: "composition"
    },
    {
        id: "turnkey-planting",
        title: "Turnkey Tree Planting Services",
        subtitle: "End-to-end execution from ground prep to complete plantation deployment.",
        icon: Shovel,
        heroImage: "/woodland-silhouette.jpg",
        summary: "Full site clearance, pit digging, soil conditioning, and professional seedling planting.",
        description: "Avoid labor bottlenecks and improper planting depths with our full-service execution team. We manage site preparation, pit sizing , compost enrichment, root positioning, and initial hydration. Designed for farm owners, institutions, and residential developments looking for seamless execution.",
        deliverables: [
            "Mechanized or manual hole excavation & spacing",
            "Organic manure & water-retention hydrogel integration",
            "Root collar positioning & initial deep watering",
            "Protective staking and tree-guard setup"
        ],
        process: [
            { step: "01", title: "Land Clearing", desc: "Obstacle removal, pit marking, and hole excavation." },
            { step: "02", title: "Soil Enrichment", desc: "Mixing native soil with cured manure and hydro-gel." },
            { step: "03", title: "Precision Planting", desc: "Root alignment, backfilling, tamping, and initial soaking." }
        ],
        metrics: [
            { label: "Pits Dug Per Day", value: "2,500+", hint: "Deployment capacity with full crews" },
            { label: "Labor Efficiency", value: "100%", hint: "Supervised by certified agronomists" },
            { label: "Root Shock Reduced", value: "85%", hint: "Via proper moisture retention techniques" }
        ],
        graphType: "timeline"
    },
    {
        id: "landscape-design",
        title: "Landscape Architecture & Shade Planning",
        subtitle: "Transforming acreage into functional, aesthetic, and sustainable green ecosystems.",
        icon: Trees,
        heroImage: "/About.jpeg",
        summary: "Master planning for aesthetic estates, windbreaks, privacy hedges, and residential lawns.",
        description: "Trees define landscapes for decades. Our design team blends functional goals—like wind attenuation, solar shade, and privacy—with visual harmony. We create master landscape layouts combining flowering ornamentals with majestic canopy trees to increase property valuation and ecological health.",
        deliverables: [
            "2D/3D master landscape layout blueprints",
            "Canopy progression & shade projection maps",
            "Ornamental and indigenous hedge design",
            "Seasonal flowering schedule integration"
        ],
        process: [
            { step: "01", title: "Vision Mapping", desc: "Defining aesthetic goals, privacy needs, and walkways." },
            { step: "02", title: "3D Layout Design", desc: "Visualizing mature tree canopies and shade shadows." },
            { step: "03", title: "Execution Plan", desc: "Phased planting sequence for short and long term growth." }
        ],
        metrics: [
            { label: "Estates Designed", value: "150+", hint: "Private gardens & commercial grounds" },
            { label: "Property Value Gain", value: "~15%", hint: "Average boost post-landscaping" },
            { label: "Shade Coverage", value: "Optimal", hint: "Calculated for high-sun exposure regions" }
        ],
        graphType: "growth"
    },
    {
        id: "reforestation",
        title: "Commercial Reforestation & Agroforestry",
        subtitle: "Scalable timber, fruit, and conservation forestry projects built for longevity.",
        icon: Building2,
        heroImage: "/woodland-silhouette.jpg",
        summary: "Large-scale ecological restoration and economic forestry for institutions and farms.",
        description: "We work with landholders, corporate bodies, and environmental initiatives to establish multi-acre forests. From sustainable timber species to agroforestry models that combine fruit trees with cash crops, we deliver scalable ecological solutions designed for environmental impact and economic yield.",
        deliverables: [
            "High-density grid design for forestry",
            "Agroforestry intercropping blueprints",
            "Carbon offset and canopy density reporting",
            "Long-term plantation management guidelines"
        ],
        process: [
            { step: "01", title: "Grid Planning", desc: "Optimizing density per hectare for target yields." },
            { step: "02", title: "Mass Deployment", desc: "Synchronized crew planting during optimal rainy windows." },
            { step: "03", title: "Monitored Growth", desc: "Periodic health audits and pruning schedules." }
        ],
        metrics: [
            { label: "Acres Restored", value: "450+", hint: "Dedicated forest & agroforestry projects" },
            { label: "Trees Planted", value: "500K+", hint: "Cumulative impact across key regions" },
            { label: "Carbon Absorption", value: "High", hint: "Long-term sequestering native trees" }
        ],
        graphType: "timeline"
    }
]

export const milestones = [
    { year: "2023", title: "Farm Established", desc: "Bulbul Farm was founded in Limuru, Kenya, starting with a core nursery of 10 native species." },
    { year: "2024", title: "Expanded Nursery", desc: "Scaled production capacity to over 100,000 seedlings with automated drip propagation systems." },
    { year: "2025", title: "Turnkey Planting Launch", desc: "Introduced end-to-end site evaluation, soil testing, and professional planting teams." },
    { year: "2026", title: "Nationwide Impact", desc: "Crossed 500,000+ trees planted and extended delivery networks across the entire country." }
]

export const values = [
    {
        icon: Leaf,
        title: "Ecological Integrity",
        description: "We propagate climate-resilient indigenous and exotic species nurtured without harsh synthetic shortcuts."
    },
    {
        icon: ShieldCheck,
        title: "Quality First",
        description: "Every seedling undergoes strict root-hardening and disease-screening protocols before leaving our nursery."
    },
    {
        icon: HeartHandshake,
        title: "Community Growth",
        description: "Partnering with local farmers, institutions, and conservationists to create sustainable green economies."
    },
    {
        icon: Globe2,
        title: "Reforestation Commitment",
        description: "Dedicated to restoring local biodiversity and increasing canopy coverage across Kenya."
    }
]

export type SortOption = "featured" | "price-asc" | "price-desc" | "name";

export const navItems = [
  {
    route: "/",
    label: "Home"
  },
  {
    route:"/about",
    label:"About Us"
  },
  {
    route:"/services",
    label:"Services"
  },
  {
    route:"/products",
    label:"Products"
  },
  {
    route:"/articles",
    label:"Articles"
  },
  
  {
    route:"/contact",
    label:"Contact"
  }
]

export const footerItems = [
  {
    route: "/",
    label: "Home"
  },
  {
    route:"/about",
    label:"About Us"
  },
  {
    route:"/services",
    label:"Services"
  },
  {
    route:"/products",
    label:"Products"
  },
  {
    route:"/articles",
    label:"Articles"
  },
  {
    route:"/admin",
    label:"Admin"
  },
  
  {
    route:"/contact",
    label:"Contact us"
  }
]
export const servicesItems = [
  {
    id: 1,
    icon: FaTree ,
    title: "Landscaping",
    description:"Cultivate beauty with indeginous trees (1-7ft tall) and pristine lawns"
  },
  {
    id: 2,
    icon:FaLeaf ,
    title:"Ceremonial Trees",
    description: "Elevate special occassions - national events, birthdays, weddings, graduations e.t.c with our exquisite trees."
  },
  {
    id: 3,
    icon:FaSeedling ,
    title: "Consultancy services",
    description:"Expert guidance on seatherny, soil health, robust root systems, efficient drainage and underground pipe systems."
  },
  {
    id: 4,
    icon:FaPalette ,
    title: "Design",
    description: "Craft serene parks, captivating gardens(botanical and home gardens), inviting driveways, functional parking lots and protect riparian lands."
  },
  {
    id: 5,
    icon:FaTractor ,
    title: "Agroforestry trees",
    description: "Agroforesty trees for sustainable agricultural practices."
  },
  {
    id: 6,
    icon: FaHandHoldingWater,
    title: "Indigenous Tree Propagation",
    description: "Specialized propagation of native trees to restore ecosystems and promote biodiversity."
  }
]
export const productItems = [
  {
    id: 1,
    image: "/plant.jpeg",
    commonName: "Oak",
    binomialName: "Quercus robur",
    size: "30-40cm",
    description: "A hardy and long-lived tree, the Oak is known for its strength and beautiful foliage. Perfect for large gardens and parks.",
    price: "Kes. 200"
  },
  {
    id: 2,
    image: "/plant.jpeg",
    commonName: "Maple",
    binomialName: "Acer saccharum",
    size: "20-30cm",
    description: "The Sugar Maple is famous for its vibrant autumn colors and sap, which can be used to make maple syrup. Great for medium to large gardens.",
    price: "Kes. 300"
  },
  {
    id: 3,
    image: "/plant.jpeg",
    commonName: "Pine",
    binomialName: "Pinus sylvestris",
    size: "25-35cm",
    description: "A fast-growing evergreen, the Scots Pine is ideal for creating windbreaks or adding year-round greenery to your landscape.",
    price: "Kes. 200"
  },
  {
    id: 4,
    image: "/plant.jpeg",
    commonName: "Birch",
    binomialName: "Betula pendula",
    size: "15-25cm",
    description: "Known for its striking white bark and delicate leaves, the Silver Birch is a beautiful addition to any garden, adding elegance and texture.",
    price: "Kes. 200"
  },
  {
    id: 5,
    image: "/plant.jpeg",
    commonName: "Cherry",
    binomialName: "Prunus avium",
    size: "20-30cm",
    description: "A fruit-bearing tree that blooms with beautiful pink and white flowers in spring, the Wild Cherry is great for orchards or ornamental gardens.",
    price: "Kes. 300"
  },
  {
    id: 6,
    image: "/plant.jpeg",
    commonName: "Cedar",
    binomialName: "Cedrus libani",
    size: "25-35cm",
    description: "The Cedar of Lebanon is an iconic evergreen tree known for its majestic size and fragrant wood. Ideal for large open spaces.",
    price: "Kes. 200"
  }
];

export const customers = [
  {
    id: 1,
    avatar: "/user-01.png",
    name: "John Doe",
    feedback: "This service has completely transformed how we handle our projects. Absolutely amazing!"
  },
  {
    id: 2,
    avatar: "/user-02.png",
    name: "Jane Smith",
    feedback: "Exceptional quality and support. I highly recommend this to anyone looking for reliability."
  },
  {
    id: 3,
    avatar: "/user-03.png",
    name: "Michael Brown",
    feedback: "Great experience from start to finish. The team really understood our needs and delivered."
  },
  {
    id: 4,
    avatar: "/user-04.png",
    name: "Emily Johnson",
    feedback: "I'm really happy with the results! The team was professional and easy to work with."
  },
  {
    id: 5,
    avatar: "/user-05.png",   
    name: "David Lee",
    feedback: "Top-notch service! I couldn't have asked for a better experience. Will use again for sure."
  }
];

export const faqData = [
  {
    question: "Where is Bulbul Farm located and do you deliver across Kenya?",
    answer: "We are based in Limuru, Kenya. Yes, we deliver tree seedlings across the country through secured transportation arrangements."
  },
  {
    question: "What types of tree seedlings do you supply?",
    answer: "We supply a wide range of indigenous, exotic, ornamental, fruit, and shade trees suitable for landscaping, reforestation, and smallholder farming."
  },
  {
    question: "Do you offer planting or site assessment services?",
    answer: "Yes, our team provides site preparation advice, soil consultation, and full-scale tree planting services for residential gardens, corporate grounds, and commercial farms."
  },
  {
    question: "How do I care for seedlings after delivery?",
    answer: "Upon delivery, keep seedlings in a shaded area and water them regularly before planting. We also provide customized care instructions tailored to the specific tree species you purchase."
  },
  {
    question: "Can I place bulk orders for large projects?",
    answer: "Absolutely. We cater to individual homeowners, large agricultural projects, schools, and NGOs requiring bulk seedling orders."
  }
]