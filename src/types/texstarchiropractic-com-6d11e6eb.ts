/**
 * Content interfaces for the texstarchiropractic.com home page clone.
 * Namespaced to <site-key> so later clones cannot collide with these shapes.
 */

export type Solution = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  cta: string;
  href: string;
};

export type OfferStep = {
  icon: string;
  label: string;
};

export type CommitPoint = {
  title: string;
  description: string;
};

export type MapLocation = {
  name: string;
  /** percentage offsets of the star marker inside the map canvas */
  x: number;
  y: number;
  href: string;
};

export type Review = {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  stars: number;
  text: string;
  truncated: string;
  verified: boolean;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  href: string;
};

export type NavChild = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  href: string;
  children: NavChild[];
};

export type FooterColumn = {
  heading: string;
  links: NavChild[];
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "facebook" | "instagram" | "youtube" | "yelp";
};

export type SiteContent = {
  brand: {
    name: string;
    phone: string;
    phoneHref: string;
    address: string;
  };
  hero: {
    eyebrow: string;
    heading: string;
    body: string;
    awardCaption: string;
    awardImage: string;
    awardImageAlt: string;
    photo: string;
    photoAlt: string;
  };
  rootPain: {
    heading: string;
    body: string;
    image: string;
    imageAlt: string;
  };
  offer: {
    price: string;
    title: string;
    note: string;
    cta: string;
    ctaHref: string;
    includesHeading: string;
    steps: OfferStep[];
    finePrint: string;
    readMore: string;
  };
  solutions: {
    heading: string;
    subheading: string;
    items: Solution[];
  };
  commit: {
    heading: string;
    body: string;
    points: CommitPoint[];
    image: string;
    imageAlt: string;
  };
  locations: {
    heading: string;
    subheading: string;
    cta: string;
    ctaHref: string;
    markers: MapLocation[];
  };
  localTeam: {
    heading: string;
    paragraphs: { text: string; links: { label: string; href: string }[] }[];
    image: string;
    imageAlt: string;
  };
  dedicate: {
    quote: string;
    attribution: string;
    cta: string;
    ctaHref: string;
    image: string;
    imageAlt: string;
  };
  reviews: {
    heading: string;
    subheading: string;
    cta: string;
    ctaHref: string;
    items: Review[];
  };
  blog: {
    heading: string;
    subheading: string;
    cta: string;
    ctaHref: string;
    posts: BlogPost[];
  };
  newsletter: {
    heading: string;
  };
  navigation: NavGroup[];
  footerColumns: FooterColumn[];
  footerAboutLinks: NavChild[];
  social: SocialLink[];
  footerNote: string;
};
