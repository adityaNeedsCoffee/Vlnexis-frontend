import Image from "next/image";
import { assetPath } from "../../../../../libs/assetPath";

const textShadow = {
  textShadow: "0 2px 4px rgba(0,0,0,0.45), 0 4px 18px rgba(0,0,0,0.35)",
};

const Hero = () => {
  return (
    <div className="mx-auto w-full px-5 xl:px-8 2xl:px-12">
      {/* Animations */}
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
        }
        @keyframes heroGrow {
          from { width: 0; opacity: 0; }
          to   { width: 4rem; opacity: 1; }
        }
        @keyframes heroZoom {
          from { transform: scale(1.08); }
          to   { transform: scale(1); }
        }
        .hero-zoom   { animation: heroZoom 1.8s ease-out both; }
        .hero-line-1 { animation: heroFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s both; }
        .hero-line-2 { animation: heroFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.35s both; }
        .hero-bar    { animation: heroGrow 0.7s ease-out 0.75s both; }
        .hero-para   { animation: heroFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.95s both; }
        .hero-kw     { display: inline-block; animation: heroFadeUp 0.6s ease-out both; }

        @media (prefers-reduced-motion: reduce) {
          .hero-zoom, .hero-line-1, .hero-line-2,
          .hero-bar, .hero-para, .hero-kw { animation: none; }
        }
      `}</style>

      <section className="relative isolate mt-2 overflow-hidden rounded-2xl bg-grayy md:h-[430px] md:rounded-xl">
        {/* Layer 1: image (pehle -z-20 tha, ab z-0) */}
        <Image
          src={assetPath("/HomePageImages/HeroPic02.jpg")}
          alt="Business handshake"
          fill
          priority
          sizes="100vw"
          className="hero-zoom z-0 object-cover object-right"
        />

        {/* Layer 2: overlay (pehle -z-10 tha, ab z-10) */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(23,23,23,0.92) 0%, rgba(23,23,23,0.80) 30%, rgba(23,23,23,0.35) 55%, rgba(23,23,23,0) 75%)",
          }}
        />

        {/* Layer 3: content (relative z-20 add kiya) */}
        <div className="relative z-20 flex min-h-[420px] items-center px-6 py-12 lg:px-12 xl:px-16 md:h-full md:min-h-0 md:py-0">
          <div className="max-w-[620px]">
            <h1
              className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl xl:text-6xl"
              style={textShadow}
            >
              <span className="hero-line-1 block text-white">Global Expertise</span>
              <span className="hero-line-2 block text-yelloww">Innovative Solutions</span>
            </h1>

            <div className="hero-bar mt-5 h-1 w-16 rounded-full bg-yelloww shadow-md" />

            <p
              className="hero-para mt-5 max-w-[520px] text-base font-medium leading-relaxed text-white sm:text-lg"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.35)" }}
            >
              Offering a full spectrum of{" "}
              <strong className="hero-kw font-bold text-yelloww" style={{ animationDelay: "1.2s" }}>
                Advisory
              </strong>
              ,{" "}
              <strong className="hero-kw font-bold text-yelloww" style={{ animationDelay: "1.35s" }}>
                Strategy
              </strong>
              , and{" "}
              <strong className="hero-kw font-bold text-yelloww" style={{ animationDelay: "1.5s" }}>
                Compliance
              </strong>{" "}
              Services
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;