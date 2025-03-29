import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  html,
  css,
  figma,
  threejs,
  aghoshUK,
  ukimyouth,
  adobe,
  adobephotoshop,
  illustrator,
  indesign,
  photopea,
  canva,
  capcut,
  premier,
  khizrasister,
  visura,
  mainposter,
  ukimcards,
  maneri,
  dofe,
  eidmubarak,
  helvellyn,
  intothefall,
  mentalhealth,
  islamaphobia,
  ukim1,
  ukim2,
  fifa,
  logo,
  ukim4,
  ukimcards2,
  beautcards,
  afteraffects
} from "../assets";





export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Graphic Designer",
    icon: adobephotoshop,
  },
  {
    title: "Logo & Visual Designer",
    icon: illustrator,
  },
  {
    title: "Social Media Content/Design",
    icon: canva,
  },
  {
    title: "Poster & Flyer Designer",
    icon: indesign,
  },
];

const technologies = [
  {
    name: "Indesign",
    icon: indesign,
  },

  {
    name: "premier",
    icon: premier,
  },
  {
    name: "Photoshop",
    icon: adobephotoshop,
  },
  
  {
    name: "Illustrator",
    icon: illustrator,
  },
  {
    name: "Adobe After Effects",
    icon: afteraffects,
  },
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
 
  {
    name: "Capcut",
    icon: capcut,
  },
 
  {
    name: "photopea",
    icon: photopea,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "canva",
    icon: canva,
  },
  {
    name: "figma",
    icon: figma,
  },
  
];

const experiences = [

  {
    title: "Graphic Designer",
    company_name: "UKIM Youth",
    icon: ukimyouth,
    iconBg: "#E6DEDD",
    date: "October 2023 - Present",
    points: [
      "Designed high-quality posters and flyers for events and youth activities, applying design principles to create visually compelling materials that effectively captured attention and conveyed key messages.",
      "Collaborated with the youth team to deliver engaging visual content, ensuring event information was clearly communicated and aligned with the needs of the target audience.",
      "Created culturally sensitive and inclusive outreach materials, incorporating appropriate elements to ensure designs resonated with the community while maintaining respect for traditions and values.",
    ],
  },

  {
    title: "Founder",
    company_name: "Visura Studio",
    icon: visura,
    iconBg: "#E6DEDD",
    date: "Jan 2024 - Present",
    points: [
      "At Visura Studios, I specialise in creating visually compelling logos, dynamic posters, and high-quality graphic design materials tailored to enhance brand identity, effectively communicate messages, and elevate the visual presence of businesses and individuals through innovative and professional design solutions.",
      
    ],
  },
  
 {
    title: "Co-Founder",
    company_name: "Khizra Sisters",
    icon: khizrasister,
    iconBg: "#383E56",
    date: "February 2023 - February 2025",
    points: [
      "Led the creation of visually compelling posters, adverts, and branding materials to enhance community engagement. Managed design projects from concept to completion, ensuring a professional and cohesive visual identity across all platforms.",
      
    ],
  },

  {
    title: "Graphic Designer",
    company_name: "Aghosh",
    icon: aghoshUK,
    iconBg: "#383E56",
    date: "March 2020 - April 2021",
    points: [
      "Created compelling visual assets for fundraising campaigns and charity events, enhancing engagement across ocial media, print, and web platforms while maintaining brand consistency.",
      "Collaborated with marketing and events teams to design brochures, banners, and donor reports, improving communication efforts and supporting key initiatives.",
      "Redesigned website visuals to optimize user experience, aligning layouts and graphics with AghoshUK's mission and branding for better audience interaction.",
    ],
  },

 

];

const testimonials = [
  {
    testimonial:
      "Sadil created a beautiful, professional logo that perfectly captured my vision. Their creativity, attention to detail, and seamless collaboration made the process a breeze.",
    name: "Oways Sharif",
    designation: "CEO",
    company: "chewition",
    
  },
  {
    testimonial:
      "Sadil has been an invaluable asset to UKIM Youth, consistently delivering high-quality graphic design work, including posters, adverts, and promotional materials. Her creativity and dedication have greatly enhanced our outreach and engagement. We truly appreciate his hard work and talent!",
    name: "Usaid Saiad",
    designation: "President",
    company: "UKIM Youth",
  
  },
  {
    testimonial:
      "Sadil's creativity and talent in graphic design are exceptional. Her work is high-quality, engaging, and detailed. Whether it's posters, adverts, or branding, she brings ideas to life beautifully. Grateful for her dedication and professionalism!",
    name: "Muna Ahmed",
    designation: "Youth Leader",
    company: "KYS",

  },
];

const projects = [
  {
    name: "Posters",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "adobe",
        color: "blue-text-gradient",
      },
      {
        name: "indesign",
        color: "green-text-gradient",
      },
      {
        name: "premier",
        color: "pink-text-gradient",
      },
    ],
    image: [mainposter,intothefall,mentalhealth,dofe,eidmubarak,helvellyn,islamaphobia,ukim1,ukim2,fifa],
    source_code_link: "https://github.com/",
  },
  {
    name: "Logos",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "adobe",
        color: "blue-text-gradient",
      },
      {
        name: "photopea",
        color: "green-text-gradient",
      },
      {
        name: "photoshop",
        color: "pink-text-gradient",
      },
    ],
    image: [maneri,logo,ukim4,aghoshUK],
    source_code_link: "https://github.com/",
  },
  {
    name: "Business Cards",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "adobe photoshop",
        color: "blue-text-gradient",
      },
      {
        name: "illustrator",
        color: "green-text-gradient",
      },
      {
        name: "figma",
        color: "pink-text-gradient",
      },
    ],
    image: [ukimcards,ukimcards2,beautcards],
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
