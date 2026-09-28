import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RelatedLinks } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/BookingCta";
import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import { PageHero } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageHero";
import { PageSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageSection";
import { PageShell } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageShell";
import { BODY, H3 } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/type-scale";
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return siteContent.blog.posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = siteContent.blog.posts.find((item) => item.slug === slug);
  if (!post) {
    return pageMetadata({
      title: "Post not found",
      description: "This blog post could not be found.",
      path: `/blog/${slug}`,
    });
  }
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogImage: post.image,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = siteContent.blog.posts.find((item) => item.slug === slug);
  if (!post) notFound();

  const others = siteContent.blog.posts.filter((item) => item.slug !== slug);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <PageShell>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={articleJsonLd(post)} />

      <main>
        <PageHero eyebrow="HEALTH BLOG" heading={post.title} crumbs={crumbs}>
          <div className="mt-6 max-w-[520px]">
            <Image
              src={post.image}
              alt={post.imageAlt}
              width={307}
              height={240}
              className="h-auto w-full object-cover"
            />
          </div>
        </PageHero>

        <PageSection tone="cream">
          <div className="mx-auto max-w-[760px]">
            <h2 className={cn(H3, "font-bold text-[#382F2D]")}>In short</h2>
            <p className={cn(BODY, "mt-[15px]")}>{post.excerpt}</p>
            <p className={cn(BODY, "mt-[15px]")}>
              Questions about anything covered here? The TexStar doctors are happy to talk it
              through at your next visit.
            </p>
            <p className={cn(BODY, "mt-[15px]")}>
              <Link href="/contact" className="text-primary underline underline-offset-4">
                Contact TexStar Chiropractic
              </Link>
            </p>
          </div>
        </PageSection>

        <PageSection>
          <RelatedLinks
            heading="More from the blog"
            links={others.map((item) => ({
              label: item.title,
              href: `/blog/${item.slug}`,
              description: item.excerpt,
            }))}
          />
        </PageSection>
      </main>
    </PageShell>
  );
}
