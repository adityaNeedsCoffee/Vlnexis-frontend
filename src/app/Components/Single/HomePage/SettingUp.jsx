import Image from "next/image";
import Reveal from "../../Reusable/Reveal";
import Button from "../../Reusable/Button";

export default function SettingUpBusiness() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      {/* Soft yellow dotted pattern in the background (Golden #f9d601 ke rgb: 249,214,1) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(rgba(249,214,1,0.28) 1.6px, transparent 1.6px)",
          backgroundSize: "14px 14px",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, black 0%, transparent 70%)",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto grid items-start gap-10 px-5 md:grid-cols-2 md:gap-14 xl:px-8 2xl:px-12">

        {/* Text (desktop pe right) */}
        <div className="md:pt-4 lg:pt-8">
          <Reveal direction="up">
            <h2 className="text-3xl font-bold leading-tight text-blackk md:text-5xl">
              Setting Up Your{" "}
              <span className="text-bluee">Business</span>
            </h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-yelloww" />
          </Reveal>

          <Reveal direction="up" delay={150}>
            <p className="mt-6 text-base leading-relaxed text-blackk md:text-xl">
              A smooth, end-to-end set-up with one point of contact.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti quos recusandae optio quis officia sit sapiente at soluta itaque expedita?
            </p>
          </Reveal>

          <Reveal direction="up" delay={300}>
            {/* White background section, isliye default primary (bluee) button */}
            <Button href="/contact" size="lg" className="mt-8">
              Setup Your Business
            </Button>
          </Reveal>
        </div>

        {/* Square image (desktop pe left) */}
        <Reveal
          direction="zoom"
          duration={1000}
          className="group md:order-first"
        >
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/HomePageImages/SettingUp.jpg"
              alt="Setting up your business in India"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="scale-125 object-cover transition-transform duration-[1400ms] ease-out group-data-[visible=true]:scale-100"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}