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

/** A treatment or therapy offered by the clinic. */
export type Service = {
  slug: string;
  title: string;
  /**
   * Empty string means "copy not written yet". Components omit the paragraph
   * rather than rendering a placeholder, so no TODO ever reaches a visitor.
   */
  summary: string;
  /** Condition slugs this service relates to, when known. */
  relatedConditions: string[];
};

/** A condition the clinic treats. */
export type Condition = {
  slug: string;
  title: string;
  description: string;
  icon: string;
};

export type TeamMember = {
  slug: string;
  name: string;
  credential: string;
  /** Empty string means the bio has not been written yet. */
  bio: string;
  photo: string;
};

export type Location = {
  slug: string;
  name: string;
  /** Empty strings are rendered as a documented placeholder, never invented. */
  addressLines: string[];
  phone: string;
  hours: { days: string; time: string }[];
  /** Directions link, only when a real place is configured. */
  directionsUrl: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type PageIntro = {
  eyebrow: string;
  heading: string;
  /** Answer-first summary. Sits directly under the H1 for AEO. */
  summary: string;
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
    /** canonical origin of the source site; every internal link is built from it */
    origin: string;
    /** path prefix under /public for this page's downloaded assets */
    assetBase: string;
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
  /* ---------- inner pages (copy sourced from the reference site) ---------- */

  servicesPage: PageIntro & { items: Service[] };
  conditionsPage: PageIntro & { items: Condition[] };
  aboutPage: PageIntro;
  teamPage: PageIntro & { members: TeamMember[] };
  locationsPage: PageIntro & { items: Location[] };
  contactPage: PageIntro;
  testimonialsPage: PageIntro;
  faqPage: PageIntro & { items: FaqItem[] };
  blogIndexPage: PageIntro;

  navigation: NavGroup[];
  footerColumns: FooterColumn[];
  footerAboutLinks: NavChild[];
  /** headings and strings the lower footer strip needs, kept beside the rest of the copy */
  footerAbout: {
    linksHeading: string;
    socialHeading: string;
    awardCaption: string;
    reviewCount: string;
    reviewBadgeImage: string;
  };
  social: SocialLink[];
  footerNote: string;
};
