import Image from "next/image";

import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";

const IMAGES = "/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/images";

/** Colour (not white) wordmark, logo left / copyright right, hairline rule above. */
export function FooterBottom() {
  return (
    <section className="relative border-t border-[#E5E3DF] pt-[30px]">
      <div className="mx-auto flex max-w-[1220px] flex-col items-center gap-3 pb-6 text-center md:flex-row md:justify-between md:gap-6 md:pb-[42px] md:text-right">
        <Image
          src={`${IMAGES}/logo-texstar-color-horizontal.png`}
          alt={siteContent.brand.name}
          width={150}
          height={50}
          className="h-auto w-[120px] md:w-[150px]"
        />
        <p className="font-sans text-[13px] leading-[26px] font-normal text-[#382F2D]">
          {siteContent.footerNote}
        </p>
      </div>
    </section>
  );
}
