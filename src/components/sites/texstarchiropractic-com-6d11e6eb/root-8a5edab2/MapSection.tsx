import Image from "next/image";

import { Button } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/Button";
import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";

const MARKER =
  `${siteContent.brand.assetBase}/images/map-marker-star.svg`;

/**
 * The live section is an Elfsight Google-Maps embed (tiles fetched at runtime,
 * iframe src empty), so it is reproduced as a static neutral panel carrying the
 * four location markers. No external map request is made.
 */
export function MapSection() {
  const { heading, subheading, cta, ctaHref, markers } = siteContent.locations;

  return (
    <section className="relative px-[33px] pt-[25px] pb-[100px] md:px-10 xl:px-0">
      <div className="mx-auto max-w-[1220px]">
        <div className="flex min-h-[140px] flex-col items-center gap-4 text-center md:flex-row md:items-center md:justify-between md:gap-0 md:text-left">
          <div>
            <h2 className="text-[28px]/[33px] font-bold text-[#005EB8] md:text-[32px]/[37px] xl:text-[38px]/[44px]">
              {heading}
            </h2>
            <p className="mt-3 text-[16px]/[26px] font-normal text-[#382F2D]">{subheading}</p>
          </div>
          <Button href={ctaHref} variant="solidOrange">
            {cta}
          </Button>
        </div>

        <div className="relative h-[550px] w-full overflow-hidden rounded-[2px] border border-[#CFCFCF] bg-[#E5E3DF] md:h-[740px]">
          {markers.map((marker) => (
            <a
              key={marker.name}
              href={marker.href}
              /* the name goes on the link; the marker image stays decorative */
              aria-label={marker.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            >
              <Image
                src={MARKER}
                alt=""
                width={44}
                height={45}
                className="h-8 w-8 md:h-[45px] md:w-[44px]"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
