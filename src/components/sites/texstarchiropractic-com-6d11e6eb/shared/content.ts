import type { SiteContent } from "@/types/texstarchiropractic-com-6d11e6eb";

const A = "/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2";
const B = "https://texstarchiropractic.com";

export const siteContent: SiteContent = {
  brand: {
    name: "TexStar Chiropractic",
    origin: B,
    assetBase: A,
    phone: "+1 (512) 899-2228",
    phoneHref: "tel:+15128992228",
    address: "Central Texas",
  },

  hero: {
    eyebrow: "TRUST TEXSTAR CHIROPRACTIC",
    heading: "Improve your quality of life with personalized chiropractic care.",
    body: "Fast relief, lasting results—it\u2019s time to invest in your long\u2011term health. Call today at +1 (512) 899-2228 for a personalized solution for your pain.",
    awardCaption: "Voted Best Chiropractor in the Austin area by Statesman.",
    awardImage: `${A}/images/badge-best-of-austin.webp`,
    awardImageAlt: "Best of Austin 2026 winner badge from Statesman and Austin Monthly",
    photo: `${A}/images/hero-doctors.webp`,
    photoAlt: "Dr. John Jacobson and Dr. Amy Ho standing together",
  },

  rootPain: {
    heading: "Let us get to the Root of your Pain",
    body: "At TexStar Chiropractic, we believe you deserve more than a quick fix. We deliver long-lasting results to improve your quality of life. With cutting edge technology and an experienced team, we\u2019ll work to find the root of your pain and deliver a tailored treatment plan. We\u2019re committed to delivering excellent care to the Central Texas area, earning us a 5-star rating on Google Reviews from pain-free customers!",
    image: `${A}/images/root-pain-xray.png`,
    imageAlt: "Dr Smith pointing to an x-ray",
  },

  offer: {
    price: "$98",
    title: "New Patient Special:",
    note: "Mention this Special Offer when Scheduling",
    cta: "Schedule a Consultation",
    ctaHref: `${B}/schedule-consultation/`,
    includesHeading: "This Includes:",
    steps: [
      { icon: "chart", label: "An initial consultation to identify your health goals" },
      { icon: "spine", label: "A thorough neuro-musculo-skeletal exam to identify issues" },
      { icon: "treatment", label: "A treatment session using one of our advanced service options" },
      {
        icon: "people",
        label: "A one-on-one follow up consultation with your doctor to review your exam findings and any recommendations",
      },
    ],
    finePrint:
      "Due to federal regulations, some restrictions may apply. Services may be covered by your insurance.*",
    readMore: "* Read More",
  },

  solutions: {
    heading: "Personalized Treatment and Solutions",
    subheading:
      "Wherever your pain, we have highly trained and trusted doctors who will deliver long-lasting solutions.",
    items: [
      {
        slug: "back-pain",
        title: "Back Pain",
        description:
          "Lower back pain is one of the most common conditions we treat. Let the TexStar experts identify the source of pain, any underlying issues, and begin a plan of recovery.",
        icon: `${A}/images/solution-back-pain.png`,
        cta: "Learn More",
        href: `/conditions#back-pain`,
      },
      {
        slug: "neck-pain",
        title: "Neck Pain",
        description:
          "Whether it\u2019s whiplash from a car accident or something deeper\u2014TexStar has a solution. We\u2019ll locate the pain and develop a care program tailored to your needs.",
        icon: `${A}/images/solution-neck-pain.png`,
        cta: "Learn More",
        href: `/conditions#neck-pain`,
      },
      {
        slug: "knee-pain",
        title: "Knee Pain",
        description:
          "Knee pain is a very common issue that can hold you back from everyday activities. Let the TexStar team help you get back on your feet with long-lasting recovery.",
        icon: `${A}/images/solution-knee-pain.png`,
        cta: "Learn More",
        href: `/conditions#knee-pain`,
      },
      {
        slug: "headaches",
        title: "Headaches",
        description:
          "Research shows that chiropractic treatment of the spine is an effective solution for tension headaches. Alleviate your chronic headaches with a personalized treatment plan.",
        icon: `${A}/images/solution-headaches.png`,
        cta: "Learn More",
        href: `/conditions#headaches`,
      },
    ],
  },

  commit: {
    heading: "Our Commitment to You",
    body: "We\u2019ve been putting patients first for over a decade, delivering excellent quality care to the Central Texas area.",
    points: [
      {
        title: "Personalized Care",
        description:
          "We\u2019ll identify the underlying causes of your pain and create a tailored recovery plan for your body.",
      },
      {
        title: "Long-lasting Results",
        description:
          "Our highly trained doctors combine advanced treatment and the latest technology to provide lasting results.",
      },
      {
        title: "Holistic Solutions",
        description: "That means less chronic medication dependance, and fewer surgical interventions.",
      },
    ],
    image: `${A}/images/commit-treatment.jpg`,
    imageAlt: "Dr Henry assisting a client off the chiropractic table",
  },

  locations: {
    heading: "TexStar Locations",
    subheading: "Serving the Central Texas area with 4 chiropractic locations",
    cta: "Locations & Hours",
    ctaHref: `/locations`,
    markers: [
      { name: "Austin", x: 40, y: 48, href: `/locations#austin` },
      { name: "Bee Cave", x: 49, y: 22, href: `/locations#bee-cave` },
      { name: "Buda", x: 60, y: 39, href: `/locations#buda` },
      { name: "Dripping Springs", x: 57, y: 72, href: `/locations#dripping-springs` },
    ],
  },

  localTeam: {
    heading: "Your TexStar Local Chiropractic Team",
    paragraphs: [
      {
        text: "Dr. Michael P. Henry, was born and raised here in Austin and has worked in the health care field for over 20 years. Early in his career he realized that the standard health care model in our area is designed to simply cover up symptoms with treatments that can have devastating long term effects.",
        links: [],
      },
      {
        text: "In 2011, Dr. Henry established TexStar Chiropractic with the mission of providing access for all central Texans to a better approach to health care. With a team of likeminded doctors and staff TexStar has helped hundreds of patients get back the quality of life that they deserve by addressing the root causes of their conditions and giving patients the tools they needed to overcome them.",
        links: [],
      },
      {
        text: "The results that TexStar has produced earned Dr. Henry multiple awards and honors over the years and led to his appointment to the Texas Board of Chiropractic Examiners. With 4 local locations, highly skilled doctors and a dedicated staff\u2014the TexStar team is here to help you achieve your healthcare goals.",
        links: [{ label: "Dr. Henry", href: `/team#michael-p-henry` }],
      },
    ],
    image: `${A}/images/local-team.jpg`,
    imageAlt: "TexStar team of doctors standing on stairs",
  },

  dedicate: {
    quote:
      "We are dedicated to the local Central Texas community, and proud to deliver the highest standard of care.",
    attribution: "\u2013 Dr. Michael P. Henry",
    cta: "Learn More About Us",
    ctaHref: `/about`,
    image: `${A}/images/dedicate-dr-henry.png`,
    imageAlt: "portrait of Dr Michael P Henry",
  },

  reviews: {
    heading: "Reviews and Testimonials from our Clients",
    subheading: "True stories from pain-free patients",
    cta: "See More Reviews",
    ctaHref: `/testimonials`,
    items: [
      {
        id: "rachel-peanut",
        author: "Rachel Peanut",
        avatar: "RP",
        timeAgo: "3 days ago",
        stars: 5,
        text: "Sam is the best! She helped me fix my foot with laser it was awesome! She's so awesome..",
        truncated:
          "Sam is the best! She helped me fix my foot with laser it was awesome! She's so awesome..",
        verified: true,
      },
      {
        id: "mike-may",
        author: "Mike May",
        avatar: "MM",
        timeAgo: "16 days ago",
        stars: 5,
        text: "Long time patient, Michael and his staff are amazing!",
        truncated: "Long time patient, Michael and his staff are amazing!",
        verified: true,
      },
      {
        id: "mariela-almanza-gomez",
        author: "Mariela Almanza Gomez",
        avatar: "MA",
        timeAgo: "20 days ago",
        stars: 5,
        text: "Amy and her entire staff have been absolute lifesavers.",
        truncated: "Amy and her entire staff have been absolute lifesavers. Dealing with severe lower ba..",
        verified: true,
      },
      {
        id: "samantha-smith",
        author: "Samantha Smith",
        avatar: "SS",
        timeAgo: "23 days ago",
        stars: 5,
        text: "Fantastic and knowledgeable doctors and friendly staff.",
        truncated: "Fantastic and knowledgeable doctors and friendly staff.",
        verified: true,
      },
      {
        id: "greg-benitez",
        author: "Greg Benitez",
        avatar: "GB",
        timeAgo: "1 month ago",
        stars: 5,
        text: "Everyone here is professional and kind. Highly recommend TexStar.",
        truncated: "Everyone here is professional and kind. Highly recommend TexStar.",
        verified: true,
      },
      {
        id: "chloe",
        author: "Chloe",
        avatar: "C",
        timeAgo: "1 month ago",
        stars: 5,
        text: "The whole team made me feel comfortable from the first visit.",
        truncated: "The whole team made me feel comfortable from the first visit.",
        verified: true,
      },
    ],
  },

  blog: {
    heading: "The TexStar Health Blog",
    subheading: "A vast chiropractic knowledge base",
    cta: "Read More Blog Posts",
    ctaHref: `/blog`,
    posts: [
      {
        slug: "protect-childs-spine-back-to-school",
        title: "Top 5 Ways to Protect Your Child\u2019s Spine During the Back to School Season",
        excerpt:
          "Students fill their daily bags with heavy textbooks, bulky laptops, dynamic school supplies, and lunchboxes. Consequently, the heavy physical weight of these everyday items places excessive [...]",
        image: `${A}/images/blog-child-spine.jpg`,
        imageAlt: "A mother helping her daughter with her school bag",
        href: `${B}/top-5-ways-to-protect-your-childs-spine-during-the-back-to-school-season/`,
      },
      {
        slug: "texstar-on-the-radio",
        title: "Did You Hear TexStar Chiropractic on the Radio?",
        excerpt:
          "If you tune in to local radio, you might have heard a familiar voice talking about TexStar Chiropractic! Austin's own Aaron Hogan recently shared a personal [...]",
        image: `${A}/images/blog-radio.jpg`,
        imageAlt: "A woman sitting in the driver seat of a car",
        href: `${B}/did-you-hear-texstar-chiropractic-on-the-radio/`,
      },
      {
        slug: "glp1-skeleton-joint-pain",
        title: "The GLP-1 Skeleton: Managing Joint Pain During Rapid Weight Loss Recovery",
        excerpt:
          "Millions of people successfully shed pounds using modern GLP-1 medications like Ozempic, Wegovy, or Mounjaro. However, many patients experience a highly surprising and deeply frustrating physical [...]",
        image: `${A}/images/blog-glp1.jpg`,
        imageAlt: "A woman holding her knee while seated on a floor",
        href: `${B}/the-glp-1-skeleton-managing-joint-pain-during-rapid-weight-loss-recovery/`,
      },
    ],
  },

  newsletter: {
    heading: "Receive TexStar Health Tips Right in your Inbox",
  },

  /* ---------- inner pages ----------
     Every string below is taken from the reference site. Fields with no source
     copy are left as "" and their components omit the element entirely, so a
     visitor never sees a placeholder or a fabricated claim. */

  servicesPage: {
    eyebrow: "TEXSTAR SOLUTIONS",
    heading: "Personalized Treatment and Solutions",
    summary:
      "TexStar Chiropractic combines chiropractic care with advanced treatment options and an experienced team. Wherever your pain, our doctors work to find the root of it and deliver a tailored treatment plan.",
    items: [
      {
        slug: "chiropractic-care",
        title: "Chiropractic Care",
        summary:
          "A new patient visit starts with a consultation to identify your health goals, a neuro-musculo-skeletal exam to identify issues, a treatment session using one of our advanced service options, and a follow up consultation where your doctor reviews your exam findings and any recommendations.",
        relatedConditions: ["back-pain", "neck-pain", "knee-pain", "headaches"],
      },
      { slug: "cold-laser-therapy", title: "Cold Laser Therapy", summary: "", relatedConditions: [] },
      {
        slug: "knee-on-trac-decompression",
        title: "Knee on Trac\u00ae Decompression",
        summary: "",
        relatedConditions: ["knee-pain"],
      },
      {
        slug: "spinal-decompression",
        title: "Spinal Decompression Therapy",
        summary: "",
        relatedConditions: ["back-pain", "neck-pain"],
      },
      { slug: "cryotherapy", title: "Spot Cryotherapy", summary: "", relatedConditions: [] },
      { slug: "physical-rehab", title: "Physical Rehab Therapy", summary: "", relatedConditions: [] },
      {
        slug: "other-advanced-technologies",
        title: "Other Advanced Technologies",
        summary: "",
        relatedConditions: [],
      },
    ],
  },

  conditionsPage: {
    eyebrow: "CONDITIONS TREATED",
    heading: "Conditions Treated at TexStar Chiropractic",
    summary:
      "Our doctors treat lower back pain, neck pain, knee pain and headaches with a plan built around the cause of your pain rather than a quick fix.",
    items: [
      {
        slug: "back-pain",
        title: "Back Pain",
        description:
          "Lower back pain is one of the most common conditions we treat. Let the TexStar experts identify the source of pain, any underlying issues, and begin a plan of recovery.",
        icon: `${A}/images/solution-back-pain.png`,
      },
      {
        slug: "neck-pain",
        title: "Neck Pain",
        description:
          "Whether it\u2019s whiplash from a car accident or something deeper\u2014TexStar has a solution. We\u2019ll locate the pain and develop a care program tailored to your needs.",
        icon: `${A}/images/solution-neck-pain.png`,
      },
      {
        slug: "knee-pain",
        title: "Knee Pain",
        description:
          "Knee pain is a very common issue that can hold you back from everyday activities. Let the TexStar team help you get back on your feet with long-lasting recovery.",
        icon: `${A}/images/solution-knee-pain.png`,
      },
      {
        slug: "headaches",
        title: "Headaches",
        description:
          "Research shows that chiropractic treatment of the spine is an effective solution for tension headaches. Alleviate your chronic headaches with a personalized treatment plan.",
        icon: `${A}/images/solution-headaches.png`,
      },
    ],
  },

  aboutPage: {
    eyebrow: "ABOUT US",
    heading: "Your TexStar Local Chiropractic Team",
    summary:
      "TexStar Chiropractic was established in Austin in 2011 with the mission of providing access for all central Texans to a better approach to health care. The clinic has four locations across Central Texas.",
  },

  teamPage: {
    eyebrow: "MEET OUR DOCTORS",
    heading: "The TexStar Doctors",
    summary:
      "Every TexStar location is staffed by doctors trained to identify the underlying cause of your pain and build a recovery plan around it.",
    members: [
      { slug: "michael-p-henry", name: "Michael P. Henry", credential: "DC", bio: "", photo: "" },
      { slug: "ryan-t-woods", name: "Ryan T. Woods", credential: "DC", bio: "", photo: "" },
      { slug: "john-e-jacobson", name: "John E. Jacobson", credential: "DC", bio: "", photo: "" },
      { slug: "amy-m-ho", name: "Amy M. Ho", credential: "DC", bio: "", photo: "" },
      { slug: "corey-j-miller", name: "Corey J. Miller", credential: "DC", bio: "", photo: "" },
    ],
  },

  locationsPage: {
    eyebrow: "HOURS & LOCATIONS",
    heading: "TexStar Locations",
    summary:
      "TexStar Chiropractic serves the Central Texas area from four locations: Austin, Bee Cave, Buda and Dripping Springs.",
    items: [
      { slug: "austin", name: "Austin", addressLines: [], phone: "", hours: [], directionsUrl: "" },
      { slug: "bee-cave", name: "Bee Cave", addressLines: [], phone: "", hours: [], directionsUrl: "" },
      { slug: "buda", name: "Buda", addressLines: [], phone: "", hours: [], directionsUrl: "" },
      { slug: "dripping-springs", name: "Dripping Springs", addressLines: [], phone: "", hours: [], directionsUrl: "" },
    ],
  },

  contactPage: {
    eyebrow: "CONTACT US",
    heading: "Get in touch with TexStar Chiropractic",
    summary:
      "Call TexStar Chiropractic on +1 (512) 899-2228 to book an appointment, or use the online scheduler. The clinic serves patients across the Austin area from four Central Texas locations.",
  },

  testimonialsPage: {
    eyebrow: "REVIEWS & TESTIMONIALS",
    heading: "Reviews and Testimonials from our Clients",
    summary: "True stories from pain-free patients.",
  },

  faqPage: {
    eyebrow: "FAQ",
    heading: "Frequently asked questions",
    summary:
      "Answers about booking, the new patient special, insurance and where TexStar Chiropractic is located.",
    items: [
      {
        question: "How do I book an appointment?",
        answer:
          "Call +1 (512) 899-2228 or use the online scheduler. Mention the new patient special when scheduling.",
      },
      {
        question: "What does the $98 new patient special include?",
        answer:
          "An initial consultation to identify your health goals, a thorough neuro-musculo-skeletal exam to identify issues, a treatment session using one of our advanced service options, and a one-on-one follow up consultation with your doctor to review your exam findings and any recommendations.",
      },
      {
        question: "Will my insurance cover chiropractic treatment?",
        answer:
          "Due to federal regulations, some restrictions may apply. Services may be covered by your insurance. Call us and we will confirm your specific benefits.",
      },
      {
        question: "Where is TexStar Chiropractic located?",
        answer:
          "TexStar has four locations across Central Texas: Austin, Bee Cave, Buda and Dripping Springs.",
      },
    ],
  },

  blogIndexPage: {
    eyebrow: "HEALTH BLOG",
    heading: "The TexStar Health Blog",
    summary: "A vast chiropractic knowledge base from the TexStar doctors.",
  },

  navigation: [
    {
      label: "TexStar Solutions",
      href: `/services`,
      children: [
        { label: "TexStar Solutions", href: `/services` },
        { label: "Chiropractic Care", href: `/services#chiropractic-care` },
        { label: "Cold Laser Therapy", href: `/services#cold-laser-therapy` },
        { label: "Knee on Trac\u00a9 Decompression", href: `/services#knee-on-trac-decompression` },
        { label: "Spinal Decompression Therapy", href: `/services#spinal-decompression` },
        { label: "Spot Cryotherapy", href: `/services#cryotherapy` },
        { label: "Physical Rehab Therapy", href: `/services#physical-rehab` },
        { label: "Other Advanced Technologies", href: `/services#other-advanced-technologies` },
      ],
    },
    {
      label: "Conditions Treated",
      href: `/conditions`,
      children: [
        { label: "Conditions Treated", href: `/conditions` },
        { label: "Whiplash", href: `/conditions#headaches` },
        { label: "Pinched Nerves", href: `/conditions#neck-pain` },
        { label: "Neck Pain", href: `/conditions#neck-pain` },
        { label: "Lower Back Pain", href: `/conditions#back-pain` },
        { label: "Knee Pain", href: `/conditions#knee-pain` },
        { label: "Headaches", href: `/conditions#headaches` },
        { label: "Disc Injuries", href: `/conditions#back-pain` },
      ],
    },
    {
      label: "About Us",
      href: `/about`,
      children: [
        { label: "About Us", href: `/about` },
        { label: "Contact Us", href: `/contact` },
        { label: "Meet Our Doctors", href: `/team` },
        { label: "Michael P. Henry, DC", href: `/team#michael-p-henry` },
        { label: "Ryan T. Woods, DC", href: `/team#ryan-t-woods` },
        { label: "John E. Jacobson, DC", href: `/team#john-e-jacobson` },
        { label: "Amy M. Ho, DC", href: `/team#amy-m-ho` },
        { label: "Corey J. Miller, DC", href: `/team#corey-j-miller` },
        { label: "Insurance & Self Pay", href: `/faq#insurance` },
        { label: "FAQ\u2019s", href: `/faq` },
        { label: "Join Our Team", href: `/contact` },
        { label: "The TexStar Health Blog", href: `${B}/blog/` },
        { label: "Patient Reviews & Testimonials", href: `/testimonials` },
      ],
    },
    {
      label: "Hours & Locations",
      href: `/locations`,
      children: [
        { label: "Hours & Locations", href: `/locations` },
        { label: "Austin", href: `/locations#austin` },
        { label: "Bee Cave", href: `/locations#bee-cave` },
        { label: "Buda", href: `/locations#buda` },
        { label: "Dripping Springs", href: `/locations#dripping-springs` },
      ],
    },
  ],

  footerColumns: [
    {
      heading: "OUR LOCATIONS",
      links: [
        { label: "Austin", href: `/locations#austin` },
        { label: "Bee Cave", href: `/locations#bee-cave` },
        { label: "Buda", href: `/locations#buda` },
        { label: "Dripping Springs", href: `/locations#dripping-springs` },
      ],
    },
    {
      heading: "TEXSTAR SOLUTIONS",
      links: [
        { label: "Chiropractic Care", href: `/services#chiropractic-care` },
        { label: "Spinal Decompression", href: `/services#spinal-decompression` },
        { label: "Physical Rehab", href: `/services#physical-rehab` },
        { label: "Knee on Trac\u00a9 Decompression", href: `/services#knee-on-trac-decompression` },
        { label: "Cryotherapy", href: `/services#cryotherapy` },
        { label: "Cold Laser Therapy", href: `/services#cold-laser-therapy` },
        { label: "Other Advanced Technologies", href: `/services#other-advanced-technologies` },
      ],
    },
    {
      heading: "CONDITIONS TREATED",
      links: [
        { label: "Neck Pain", href: `/conditions#neck-pain` },
        { label: "Back Pain", href: `/conditions#back-pain` },
        { label: "Knee Pain", href: `/conditions#knee-pain` },
        { label: "Headaches", href: `/conditions#headaches` },
        { label: "Pinched Nerves", href: `/conditions#neck-pain` },
        { label: "Disc Injuries", href: `/conditions#back-pain` },
        { label: "Whiplash", href: `/conditions#headaches` },
      ],
    },
    {
      heading: "TEXSTAR RESOURCES",
      links: [
        { label: "Health Blog", href: `${B}/blog/` },
        { label: "FAQ\u2019s", href: `/faq` },
        { label: "Reviews and Testimonials", href: `/testimonials` },
        { label: "Contact Us", href: `/contact` },
        { label: "Schedule Appointment", href: `${B}/schedule-consultation/` },
      ],
    },
  ],

  footerAboutLinks: [
    { label: "The TexStar Difference", href: `/services` },
    { label: "Meet Our Doctors", href: `/team` },
    { label: "Hours and Locations", href: `/locations` },
    { label: "Join the Team", href: `/contact` },
  ],

  footerAbout: {
    linksHeading: "ABOUT US",
    socialHeading: "TEXSTAR SOCIAL",
    awardCaption: "Voted Best Chiropractor in the Austin area by Statesman",
    reviewCount: "648 reviews",
    reviewBadgeImage: `${A}/images/google-reviews-badge.png`,
  },

  social: [
    { label: "Facebook", href: "https://www.facebook.com/texstarchiropractic", icon: "facebook" },
    { label: "Instagram", href: "https://www.instagram.com/texstarchiropractic", icon: "instagram" },
    { label: "YouTube", href: "https://www.youtube.com/@texstarchiropractic", icon: "youtube" },
    { label: "Yelp", href: "https://www.yelp.com/biz/texstar-chiropractic", icon: "yelp" },
  ],

  footerNote: "\u00a9 2024 TexStar Chiropractic. Designed by Voixly.",
};
