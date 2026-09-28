import Image from "next/image";

import { Button } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/Button";
import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import { cn } from "@/lib/utils";

const TITLE = "text-[24px] leading-[31px] md:text-[32px] md:leading-[37px] lg:text-[38px] lg:leading-[44px]";
const CARD_TITLE = "text-[18px] leading-[25px] md:text-[20px] md:leading-[25px] lg:text-[24px] lg:leading-[29px]";
const COPY = "font-sans text-[15px] leading-[23px] font-normal md:text-[16px] md:leading-[26px]";

const CARD =
  "flex flex-col items-center rounded-[2px] border border-[#ECEAE7] bg-white px-5 pt-7 pb-6 text-center shadow-[0_10px_20px_0_rgba(1,7,39,0.05)] md:px-[42px] md:pt-[30px] md:pb-[25px]";

export function SolutionsSection() {
  const { heading, subheading, items } = siteContent.solutions;

  return (
    <section className="ts-gradient-cream relative px-[21px] pt-10 pb-[50px] md:px-[30px] lg:pt-20">
      <div className="mx-auto w-full max-w-[1220px]">
        <div className="mx-auto w-full max-w-[488px] pt-9 text-center lg:h-[210px] lg:pt-10">
          <h2 className={cn(TITLE, "font-bold text-primary")}>{heading}</h2>
          <p className={cn(COPY, "mt-[15px] text-foreground")}>{subheading}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 md:gap-6 lg:mt-3">
          {items.map((item) => (
            <article key={item.slug} className={CARD}>
              <Image
                src={item.icon}
                alt=""
                width={100}
                height={100}
                className="mb-5 h-20 w-auto max-w-full md:h-[100px]"
              />
              <h3 className={cn(CARD_TITLE, "mb-[15px] font-bold text-foreground")}>
                {item.title}
              </h3>
              <p className={cn(COPY, "mb-[15px] max-w-[500px] text-foreground")}>
                {item.description}
              </p>
              <Button href={item.href} variant="solidOrange" className="mt-auto">
                {item.cta}
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
