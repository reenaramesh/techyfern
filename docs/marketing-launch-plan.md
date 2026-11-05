# Marketing launch plan

This plan prepares landing pages and tracking recommendations only. It does
not create, fund or activate advertising campaigns. Budgets, offers, targeting,
customer demand and keyword metrics have not been supplied and are not
assumed.

## Search campaign groups

| Campaign group | Keyword themes | Landing page | Readiness notes |
|---|---|---|---|
| Website design and development | Website design, business websites, responsive design, WordPress/React builds, e-commerce and redesign in Bangalore | `/website-design/` | Confirm supported platforms, scope and contact handling before ads. |
| Digital marketing and SEO | SEO, local SEO, Google Business Profile, Google Ads/PPC, Meta Ads and small-business marketing | `/digital-marketing/` | Do not promise rankings or returns. Confirm analytics consent, account access and campaign ownership. |
| Custom web applications | Web apps, React, Django, SaaS, portals, booking and dashboards | `/web-app-development/` | Clarify qualification, technical discovery and service capacity before spend. |
| Business technology | CRM, business software, invoicing, inventory, workflow and management systems | `/business-tech-solutions/` | Make clear that requirements are assessed; do not advertise an unverified ready-made product. |
| AI and automation | AI integration, process automation, customer-service workflows and document processing | `/ai-automation/` | Describe human review, data limits and safeguards; avoid exaggerated AI claims. |

Start with tightly themed Search campaigns and a review of actual search terms.
Use separate campaigns/ad groups where measurement and budget allow; do not
launch all themes simply because they are listed here. Display or remarketing
requires separately approved creative, audience/consent review and privacy
configuration.

## Negative keyword ideas

Review these as candidate exclusions against the actual offer and search-term
reports; do not apply them blindly:

- jobs, careers, salary, internship, hiring, vacancy
- course, classes, training, certification, tutorial, how to learn
- free template, free download, source code, examples
- DIY, personal project, student project
- unrelated consumer support or product-download terms

For broad terms such as “free”, “software”, “WordPress” or “AI”, inspect user
intent before excluding them; some may be relevant to discovery or education.

## Organic content priorities

1. Keep the five service pages as distinct, useful landing pages and update
   them only when capability and delivery details are approved.
2. Add original, practical resources answering real customer questions, such
   as website platform selection, local SEO foundations, application
   requirements, workflow mapping and responsible automation.
3. Publish case studies only after client permission and fact-checking. Report
   outcomes only when independently verified.
4. Maintain accurate business name, phone, address and service details on
   owner-controlled profiles. Confirm whether the provided address is a
   public-facing location or mailing/contact address before representing it
   as a walk-in office.
5. Do not create near-duplicate Bangalore neighborhood pages. Keep service
   area statements accurate and consistent.

## Landing page and conversion checks

- Keep the service heading, deliverables, limitations and CTA aligned with the
  ad group.
- Service-page CTAs now pass a service category to the contact form; the
  contact form can also be opened as a general enquiry.
- Verify the supplied phone number is reachable and monitored. A WhatsApp
  destination is not configured; verify the account before adding that CTA.
- The GitHub Pages preview disables both lead forms. Do not send ad traffic to
  it as a lead-generation destination.
- Before promotion, deploy and test the Django API or provide another
  verified, privacy-reviewed contact path.

## Tracking requirements

The code supports GA4 page views and these recommended events:

| Event | Firing condition | Data policy |
|---|---|---|
| `generate_lead` | Only after Django confirms a contact enquiry was saved | Service category only; never send name, email, phone, message or business name. |
| `contact_click` | Visitor selects the `tel:` link | Contact method only; do not include the phone number as an event parameter. |
| `whatsapp_click` | Visitor selects a verified WhatsApp link, if one is added | Location label only; do not include message text or identifiers. |
| `quote_request_start` | Visitor first focuses a quotation form control | No form values or personal information. |
| `quote_request_submit` | Only after the API confirms the consultation request | Service category only; never send entered form data. |

GA4 has no configured measurement ID and no GTM container is configured.
Review privacy notice accuracy, consent obligations, consent-management
behavior, regional requirements and vendor settings before enabling analytics
or advertising tags. No advertising pixels should be activated before that
review. Campaign UTM values are attached to a lead submission by the frontend;
include this behavior in the approved privacy notice.

## Promotion blockers

- Production origin, API host, PostgreSQL, SMTP, backups and lead monitoring
  are not configured.
- The privacy notice, data retention/deletion policy, hosting/data location
  and authorized data access require owner review.
- Confirm business address representation, phone reachability and profile
  consistency. Do not claim a customer-facing office without confirmation.
- Confirm Google Business Profile ownership/eligibility and accurately
  represent any service-area business. No profile, review or rating was
  verified by this work.
- Approve channel budgets, actual keyword data, offers and campaign
  measurement before creating ads.
- Do not index or promote the temporary GitHub Pages preview.
