import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { PageContainer } from "./PageContainer";

const services = [
  { label: "All services", to: "/services/" },
  { label: "Website design", to: "/website-design/" },
  { label: "Web applications", to: "/web-app-development/" },
  { label: "Digital marketing", to: "/digital-marketing/" },
  { label: "Business technology", to: "/business-tech-solutions/" },
  { label: "AI & automation", to: "/ai-automation/" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <PageContainer>
        <div className="footer-main">
          <div className="footer-brand-column">
            <Link className="brand brand-footer" to="/">
              <span className="brand-mark" aria-hidden="true">
                <svg viewBox="0 0 40 40" fill="none">
                  <path
                    d="M8 24c0-7.2 4.5-12 12-12s12 4.8 12 12"
                    stroke="currentColor"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M20 13v16M13 21h14"
                    stroke="#38c7a5"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="brand-copy">
                <span className="brand-name">techyfern</span>
                <span className="brand-descriptor">DIGITAL</span>
              </span>
            </Link>
            <p className="footer-tagline">Growing Ideas Through Technology.</p>
            <p className="footer-description">
              Digital experiences and practical technology for growing
              businesses.
            </p>
            <p className="footer-location">
              <MapPin size={16} aria-hidden="true" /> Bengaluru, India
            </p>
          </div>

          <div className="footer-link-column">
            <h2>Explore</h2>
            <Link to="/about">About</Link>
            <Link to="/our-process/">Our process</Link>
            <Link to="/services/">Services</Link>
            <Link to="/website-design/">Website design</Link>
            <Link to="/digital-marketing/">Digital marketing</Link>
            <Link to="/web-app-development/">Web applications</Link>
            <Link to="/business-tech-solutions/">Business technology</Link>
            <Link to="/ai-automation/">AI & automation</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy/">Privacy notice</Link>
          </div>

          <div className="footer-link-column footer-services-column">
            <h2>Digital services</h2>
            {services.map((service) => (
              <Link key={service.to} to={service.to}>
                {service.label}
              </Link>
            ))}
          </div>

          <div className="footer-cta-column">
            <p className="eyebrow">Have an idea?</p>
            <h2>Let’s make a thoughtful next step.</h2>
            <Link className="footer-contact-link" to="/contact">
              Discuss your project <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Techyfern Digital.</span>
          <span>Growing Ideas Through Technology.</span>
        </div>
      </PageContainer>
    </footer>
  );
}
