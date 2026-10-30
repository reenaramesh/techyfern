import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { fadeUpVariants, staggerChildrenVariants } from "../lib/motionVariants";
import { useIsHydrated } from "../lib/useIsHydrated";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { PageContainer } from "./PageContainer";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const motionReady = useIsHydrated();

  return (
    <section className="hero-section">
      <div aria-hidden="true" className="hero-orbit hero-orbit-one" />
      <div aria-hidden="true" className="hero-orbit hero-orbit-two" />
      <PageContainer className="hero-grid">
        <div className="hero-copy">
          <motion.div
            animate="visible"
            initial={motionReady && reduceMotion === false ? "hidden" : false}
            key={motionReady ? "animated" : "static"}
            variants={staggerChildrenVariants}
          >
            <motion.p className="hero-kicker" variants={fadeUpVariants}>
              <span className="status-dot" /> DIGITAL MADE PURPOSEFUL
            </motion.p>
            <motion.h1 variants={fadeUpVariants}>
              Smart Digital Solutions for Growing Businesses.
            </motion.h1>
            <motion.p
              className="hero-description"
              variants={fadeUpVariants}
            >
              From professional websites and custom business applications to
              digital marketing and intelligent automation, TechyPraxis Digital
              helps businesses build, connect and grow.
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUpVariants}>
              <PrimaryButton to="/contact">Discuss Your Project</PrimaryButton>
              <SecondaryButton to="/#services" icon>
                Explore Our Services
              </SecondaryButton>
            </motion.div>
            <motion.div className="hero-trust-line" variants={fadeUpVariants}>
              <span>
                <Check aria-hidden="true" size={15} /> Built around your goals
              </span>
              <span>
                <Check aria-hidden="true" size={15} /> Designed to grow with you
              </span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate="visible"
          className="hero-art-wrap"
          initial={motionReady && reduceMotion === false ? "hidden" : false}
          key={motionReady ? "animated" : "static"}
          variants={fadeUpVariants}
        >
          <div className="hero-art-glow" />
          <motion.svg
            aria-labelledby="hero-visual-title"
            className="hero-illustration"
            role="img"
            viewBox="0 0 600 510"
          >
            <title id="hero-visual-title">
              Abstract illustration of connected business tools and a growing
              digital presence
            </title>
            <defs>
              <linearGradient id="panel" x1="95" x2="506" y1="73" y2="438">
                <stop stopColor="#fff" />
                <stop offset="1" stopColor="#f1f8fa" />
              </linearGradient>
              <linearGradient id="growth" x1="164" x2="438" y1="287" y2="192">
                <stop stopColor="#3730a3" />
                <stop offset="1" stopColor="#f59e0b" />
              </linearGradient>
              <filter
                id="shadow"
                height="150%"
                width="150%"
                x="-25%"
                y="-20%"
              >
                <feDropShadow
                  dx="0"
                  dy="19"
                  floodColor="#3730a3"
                  floodOpacity=".12"
                  stdDeviation="22"
                />
              </filter>
            </defs>
            <circle cx="302" cy="247" fill="#eef2ff" r="200" />
            <circle
              cx="300"
              cy="250"
              r="180"
              fill="none"
              stroke="#fcd34d"
              strokeDasharray="3 10"
            />
            <g filter="url(#shadow)">
              <rect
                fill="url(#panel)"
                height="335"
                rx="24"
                stroke="#e2e8f0"
                width="420"
                x="91"
                y="80"
              />
              <path d="M91 131h420" stroke="#e2e8f0" />
              <circle cx="117" cy="106" fill="#ef9b87" r="4" />
              <circle cx="132" cy="106" fill="#e8c76b" r="4" />
              <circle cx="147" cy="106" fill="#f59e0b" r="4" />
              <rect
                fill="#fff"
                height="29"
                rx="8"
                stroke="#e7eef0"
                width="146"
                x="177"
                y="92"
              />
              <path
                d="M194 106h111"
                stroke="#ccd8d2"
                strokeLinecap="round"
                strokeWidth="3"
              />
              <rect
                fill="#fffbeb"
                height="40"
                rx="12"
                width="40"
                x="121"
                y="157"
              />
              <path
                d="M131 180c0-7 4-12 10-12s10 5 10 12"
                stroke="#3730a3"
                strokeLinecap="round"
                strokeWidth="2.4"
              />
              <path
                d="M141 169v15m-6-8h12"
                stroke="#f59e0b"
                strokeLinecap="round"
                strokeWidth="2.4"
              />
              <path
                d="M173 165h103m-103 13h68"
                stroke="#cbd5e1"
                strokeLinecap="round"
                strokeWidth="4"
              />
              <rect
                fill="#fff"
                height="117"
                rx="16"
                stroke="#e4ece7"
                width="179"
                x="121"
                y="218"
              />
              <text
                fill="#72857c"
                fontFamily="Manrope, sans-serif"
                fontSize="10"
                fontWeight="700"
                x="140"
                y="241"
              >
                YOUR DIGITAL PRESENCE
              </text>
              <path
                d="M142 307l28-27 24 8 27-30 28 12 27-34"
                fill="none"
                stroke="url(#growth)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
              />
              <path
                d="M142 318h142M142 293h142M142 268h142"
                stroke="#eef3f0"
                strokeWidth="1.4"
              />
              <circle cx="276" cy="236" fill="#f59e0b" r="5" />
              <rect
                fill="#fff"
                height="117"
                rx="16"
                stroke="#e4ece7"
                width="154"
                x="315"
                y="218"
              />
              <text
                fill="#72857c"
                fontFamily="Manrope, sans-serif"
                fontSize="10"
                fontWeight="700"
                x="333"
                y="241"
              >
                CONNECTED TOOLS
              </text>
              <rect
                fill="#eef2ff"
                height="27"
                rx="8"
                width="116"
                x="333"
                y="255"
              />
              <circle cx="347" cy="268" fill="#3730a3" r="5" />
              <path d="M359 268h74" stroke="#cbd5e1" strokeWidth="3" />
              <rect
                fill="#fffbeb"
                height="27"
                rx="8"
                width="116"
                x="333"
                y="296"
              />
              <circle cx="347" cy="309" fill="#f59e0b" r="5" />
              <path d="M359 309h58" stroke="#cbd5e1" strokeWidth="3" />
            </g>
            <g filter="url(#shadow)">
              <rect
                fill="#3730a3"
                height="78"
                rx="17"
                width="176"
                x="47"
                y="344"
              />
              <circle cx="78" cy="382" fill="#3730a3" r="19" />
              <path
                d="M70 382h16m-8-8v16"
                stroke="#fbbf24"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <text
                fill="#fffbeb"
                fontFamily="Manrope, sans-serif"
                fontSize="9"
                fontWeight="700"
                x="106"
                y="374"
              >
                BUILT AROUND
              </text>
              <text
                fill="#fff"
                fontFamily="Manrope, sans-serif"
                fontSize="13"
                fontWeight="700"
                x="106"
                y="394"
              >
                Your next step
              </text>
            </g>
            <g filter="url(#shadow)">
              <rect
                fill="#fff"
                height="69"
                rx="15"
                stroke="#e2eee7"
                width="153"
                x="404"
                y="148"
              />
              <circle cx="430" cy="182" fill="#fffbeb" r="15" />
              <path
                d="M423 182l5 5 9-11"
                fill="none"
                stroke="#3730a3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.4"
              />
              <path
                d="M455 177h82m-82 11h55"
                stroke="#cbd5e1"
                strokeLinecap="round"
                strokeWidth="3"
              />
            </g>
            <circle cx="486" cy="405" fill="#f59e0b" r="7" />
            <circle cx="101" cy="185" fill="#f1c96b" r="5" />
          </motion.svg>
          <div className="hero-caption">
            <span className="caption-mark">TP</span>
            <span>
              <strong>One connected digital presence</strong>
              <small>Thoughtful tools. Clear next steps.</small>
            </span>
            <ArrowUpRight aria-hidden="true" size={18} />
          </div>
        </motion.div>
      </PageContainer>
      <Link aria-label="Scroll to services" className="hero-scroll" to="/#services">
        <ArrowDown aria-hidden="true" size={16} />
      </Link>
    </section>
  );
}
