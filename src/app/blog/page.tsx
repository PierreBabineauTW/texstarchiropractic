import Image from "next/image";
import Link from "next/link";

import { BookingCta } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/BookingCta";
import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import { PageHero } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageHero";
import { PageSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageSection";
import { PageShell } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageShell";
import { BODY, CARD, H5 } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/type-scale";
import { JsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

const page = siteContent.blogIndexPage;

export const metadata = pageMetadata({
  title: page.heading,
  description: page.summary,
  path: "/blog",
});

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
];

export default function BlogIndexPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <main>
        <PageHero
          eyebrow={page.eyebrow}
          heading={page.heading}
          summary={page.summary}
          crumbs={crumbs}
        />

        <PageSection tone="cream">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {siteContent.blog.posts.map((post) => (
              <li key={post.slug} className={cn(CARD, "flex flex-col p-5")}>
                <Link href={`/blog/${post.slug}`} className="block">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    width={307}
                    height={240}
                    className="h-auto w-full object-cover"
                  />
                  <h2 className={cn(H5, "mt-5 font-semibold text-[#382F2D]")}>{post.title}</h2>
                  <p className={cn(BODY, "mt-4 flex-1 text-[15px] leading-[23px]")}>{post.excerpt}</p>
                  <span className="mt-5 inline-flex h-[44px] items-center justify-center self-start rounded-[2px] border-2 border-[#EA7600] bg-white px-6 font-sans text-[16px] font-normal text-[#EA7600]">
                    Read more
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </PageSection>

        <BookingCta />
      </main>
    </PageShell>
  );
}
