# Website illustrations

The illustrations were generated with the built-in ImageGen tool for this
site. They are conceptual artwork; the people are fictional characters,
not a photograph of the TechyPraxis team. The supplied logo is unchanged.

## Assets and placement

All deployed files are in `public/illustrations/`.

| File stem | Placement | Responsive widths |
| --- | --- | --- |
| `digital-workspace` | Homepage hero | 640, 1280 |
| `creative-collaboration` | About hero and homepage people section | 640, 1280 |
| `connected-services` | Services overview hero | 640, 1280 |
| `digital-ai-background` | Capabilities, About industries, process quality and shared CTA | 960, 1920 |
| `digital-ai-background-light` | AI automation and default homepage technology theme | 960, 1920 |
| `web-design-background` | Website design, Services, Portfolio and website concept pages | 960, 1920 |
| `digital-marketing-background` | Digital marketing and campaign concept pages | 960, 1920 |
| `workflow-automation-background` | Application development, business systems, workflow concepts and specialist sections | 960, 1920 |
| `collaboration-background` | About, Our Process, Contact, Request a Quote and service FAQs | 960, 1920 |
| `privacy-security-background` | Privacy and About principles | 960, 1920 |

WebP exports use quality 84. Foreground images include descriptive alt text,
explicit dimensions, responsive sources and Vite base-aware URLs. Hero images
load eagerly; the lower homepage illustration loads lazily. Backgrounds are
decorative CSS images with a dark overlay to maintain text contrast. Vite
rewrites their public asset paths for the configured deployment base.

The shared layout selects a background theme from the current route, including
direct navigation and prerendering. Shared CSS uses that theme in hero and
pale-indigo sections; selected sections override it to match their own subject.
The dark AI background remains on deep-indigo emphasis sections. Full prompts
for the five additional subjects are in [illustration-prompts.md](./illustration-prompts.md).

## Generation prompt set

Shared art direction: bespoke dimensional editorial illustrations, tactile
matte surfaces, crisp geometric forms, subtle paper grain and soft shadows.
Use approved indigo `#3730A3`, deep indigo `#2B257D`, amber `#F59E0B`, pale
indigo `#EEF2FF`, white and charcoal. No logos, text, watermarks or invented
business results.

- **Digital workspace:** A connected laptop and mobile website, modular
  workflow blocks, a design pen and an amber sprout. One cohesive landscape
  scene with generous breathing room and large shapes legible on mobile.
- **Creative collaboration:** Three fictional illustrated people around a
  worktable with a laptop, paper wireframes, design swatches and modular
  software blocks. Natural skin tones; professional, friendly collaboration.
- **Connected services:** Three connected isometric stations: a website
  window and design pen, an amber marketing megaphone, and interlocking
  business software blocks with an automation gear. Delicate paths connect
  the stations on a pale indigo stage.
- **Digital and AI background:** Panoramic 3:1 abstract landscape with fine
  circuit traces, a neural network of connected nodes, a microchip outline,
  translucent software panels and modular shapes. Concentrate details in
  the right third; keep the left two thirds calm deep indigo for white
  website text. Muted indigo linework and sparse amber connection points;
  edges fade into `#2B257D`. No robot faces or bright science-fiction effects.
- **Light digital and AI background:** Edit the dark background into a
  light-theme companion, preserving the panoramic composition, chip,
  circuitry, software panels and neural network on the right. Use an
  edge-to-edge `#EEF2FF` ground with faint indigo linework at 8–15 percent
  visual opacity, subdued amber points and translucent white panels. Keep
  the left two thirds calm for indigo headings and charcoal body text;
  no dark areas, strong glows, text, logos or watermarks.
