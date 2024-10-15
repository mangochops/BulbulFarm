import { FaTree, FaLeaf, FaSeedling, FaPalette, FaTractor,FaHandHoldingWater} from 'react-icons/fa';

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
export interface customers {
  avatar: string;
  name: string;
  id: number;
  feedback: string;
 
}

export const navItems = [
  {
    route: "/",
    label: "Home"
  },
  {
    route:"/",
    label:"About Us"
  },
  {
    route:"/",
    label:"Services"
  },
  {
    route:"/",
    label:"Products"
  },
  {
    route:"/",
    label:"Customers"
  },
  {
    route:"/",
    label:"Contact"
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
    price: "$15.99"
  },
  {
    id: 2,
    image: "/plant.jpeg",
    commonName: "Maple",
    binomialName: "Acer saccharum",
    size: "20-30cm",
    description: "The Sugar Maple is famous for its vibrant autumn colors and sap, which can be used to make maple syrup. Great for medium to large gardens.",
    price: "$12.99"
  },
  {
    id: 3,
    image: "/plant.jpeg",
    commonName: "Pine",
    binomialName: "Pinus sylvestris",
    size: "25-35cm",
    description: "A fast-growing evergreen, the Scots Pine is ideal for creating windbreaks or adding year-round greenery to your landscape.",
    price: "$10.50"
  },
  {
    id: 4,
    image: "/plant.jpeg",
    commonName: "Birch",
    binomialName: "Betula pendula",
    size: "15-25cm",
    description: "Known for its striking white bark and delicate leaves, the Silver Birch is a beautiful addition to any garden, adding elegance and texture.",
    price: "$14.75"
  },
  {
    id: 5,
    image: "/plant.jpeg",
    commonName: "Cherry",
    binomialName: "Prunus avium",
    size: "20-30cm",
    description: "A fruit-bearing tree that blooms with beautiful pink and white flowers in spring, the Wild Cherry is great for orchards or ornamental gardens.",
    price: "$18.25"
  },
  {
    id: 6,
    image: "/plant.jpeg",
    commonName: "Cedar",
    binomialName: "Cedrus libani",
    size: "25-35cm",
    description: "The Cedar of Lebanon is an iconic evergreen tree known for its majestic size and fragrant wood. Ideal for large open spaces.",
    price: "$20.99"
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
