import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { PageContainer } from "./PageContainer";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero-section">
      <div aria-hidden="true" className="hero-orbit hero-orbit-one" />
      <div aria-hidden="true" className="hero-orbit hero-orbit-two" />
      <PageContainer className="hero-grid">
        <div className="hero-copy">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="hero-kicker">
              <span className="status-dot" /> DIGITAL MADE PURPOSEFUL
            </p>
            <h1>Smart Digital Solutions for Growing Businesses.</h1>
            <p className="hero-description">
              From professional websites and custom business applications to
              digital marketing and intelligent automation, Techyfern Digital
              helps businesses build, connect and grow.
            </p>
            <div className="hero-actions">
              <PrimaryButton to="/contact">Discuss Your Project</PrimaryButton>
              <SecondaryButton to="/#services" icon>
                Explore Our Services
              </SecondaryButton>
            </div>
            <div className="hero-trust-line">
              <span>
                <Check aria-hidden="true" size={15} /> Built around your goals
              </span>
              <span>
                <Check aria-hidden="true" size={15} /> Designed to grow with you
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="hero-art-wrap"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
        >
          <div className="hero-art-glow" />
          <svg
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
                <stop offset="1" stopColor="#f2f8f5" />
              </linearGradient>
              <linearGradient id="growth" x1="164" x2="438" y1="287" y2="192">
                <stop stopColor="#145a46" />
                <stop offset="1" stopColor="#18b79e" />
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
                  floodColor="#0d352c"
                  floodOpacity=".12"
                  stdDeviation="22"
                />
              </filter>
            </defs>
            <circle cx="302" cy="247" fill="#dff3eb" r="200" />
            <circle
              cx="300"
              cy="250"
              r="180"
              fill="none"
              stroke="#bddfd1"
              strokeDasharray="3 10"
            />
            <g filter="url(#shadow)">
              <rect
                fill="url(#panel)"
                height="335"
                rx="24"
                stroke="#dcebe4"
                width="420"
                x="91"
                y="80"
              />
              <path d="M91 131h420" stroke="#dcebe4" />
              <circle cx="117" cy="106" fill="#ef9b87" r="4" />
              <circle cx="132" cy="106" fill="#e8c76b" r="4" />
              <circle cx="147" cy="106" fill="#7ac6a4" r="4" />
              <rect
                fill="#fff"
                height="29"
                rx="8"
                stroke="#e7eee9"
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
                fill="#e6f3ec"
                height="40"
                rx="12"
                width="40"
                x="121"
                y="157"
              />
              <path
                d="M131 180c0-7 4-12 10-12s10 5 10 12"
                stroke="#145a46"
                strokeLinecap="round"
                strokeWidth="2.4"
              />
              <path
                d="M141 169v15m-6-8h12"
                stroke="#16a98f"
                strokeLinecap="round"
                strokeWidth="2.4"
              />
              <path
                d="M173 165h103m-103 13h68"
                stroke="#c6d6ce"
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
              <circle cx="276" cy="236" fill="#18b79e" r="5" />
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
                fill="#eef6f1"
                height="27"
                rx="8"
                width="116"
                x="333"
                y="255"
              />
              <circle cx="347" cy="268" fill="#145a46" r="5" />
              <path d="M359 268h74" stroke="#c0d2c8" strokeWidth="3" />
              <rect
                fill="#eef6f1"
                height="27"
                rx="8"
                width="116"
                x="333"
                y="296"
              />
              <circle cx="347" cy="309" fill="#18b79e" r="5" />
              <path d="M359 309h58" stroke="#c0d2c8" strokeWidth="3" />
            </g>
            <g filter="url(#shadow)">
              <rect
                fill="#145a46"
                height="78"
                rx="17"
                width="176"
                x="47"
                y="344"
              />
              <circle cx="78" cy="382" fill="#246d58" r="19" />
              <path
                d="M70 382h16m-8-8v16"
                stroke="#a2e4d0"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <text
                fill="#bce2d5"
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
              <circle cx="430" cy="182" fill="#e5f3eb" r="15" />
              <path
                d="M423 182l5 5 9-11"
                fill="none"
                stroke="#145a46"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.4"
              />
              <path
                d="M455 177h82m-82 11h55"
                stroke="#cbd9d1"
                strokeLinecap="round"
                strokeWidth="3"
              />
            </g>
            <circle cx="486" cy="405" fill="#15b49b" r="7" />
            <circle cx="101" cy="185" fill="#f1c96b" r="5" />
          </svg>
          <div className="hero-caption">
            <span className="caption-mark">TF</span>
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
