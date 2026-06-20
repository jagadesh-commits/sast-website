/**
 * Knowledge base and prompt configuration for the Gemini-powered chatbot.
 * All content here is grounded in real company/product data so the AI does not
 * invent specifications, prices, or stock/delivery commitments.
 */

import { PHONE_PRIMARY, PHONES_DISPLAY } from "./company-contact";

export const COMPANY_INFO = {
  name: "Sree Arumuga Steel Trading Private Limited",
  shortName: "Sree Arumuga Steel Trading",
  since: "1984",
  phone: PHONE_PRIMARY,
  phonesDisplay: PHONES_DISPLAY,
  email: "sree.arumuga@gmail.com",
  address: "D-196, Sathangadu Iron & Steel Market, Manali, Chennai - 600068",
  hours: "Monday to Saturday, 9 AM - 6 PM",
  primaryBrand: "JSW Steel",
};

/** Product catalogue mirrored from app/products/page.tsx. */
export const PRODUCT_KNOWLEDGE = `
PRODUCTS WE DEAL IN (all from trusted brands, primarily JSW Steel):

1. HR Sheets & Coils (Hot Rolled)
   - Thickness: 1.6mm - 16mm
   - Applications: Fabrication, Automotive, Pipes & Tubes, General Engineering
   - Brand: JSW Steel

2. HRPO Sheets & Coils (Hot Rolled Pickled & Oiled)
   - Thickness: 1.6mm - 6mm
   - Cleaner, scale-free surface vs standard HR
   - Applications: Automotive parts, White goods, Press components
   - Brand: JSW Steel

3. CR Sheets & Coils (Cold Rolled)
   - Thickness: 0.4mm - 3.15mm
   - Superior surface finish, tighter tolerances, excellent formability
   - Applications: Automotive, Home appliances, Precision components
   - Brand: JSW Steel

4. GP Sheets & Coils (Galvanized Plain)
   - Thickness: 0.14mm - 3.15mm
   - Hot-dip zinc coating for corrosion resistance; specified by GSM (e.g. 120, 180, 275)
   - Applications: Roofing, Cladding, Ducts, Agricultural equipment
   - Brand: JSW Steel

5. GL Sheets & Coils (Galvalume)
   - Thickness: 0.35mm - 1.6mm
   - Zinc + aluminium coating; superior corrosion and heat resistance vs GP
   - Applications: Industrial roofing, Long-life structures, Pre-engineered buildings
   - Brand: JSW Steel

6. EG Sheets & Coils (Electro Galvanized)
   - Thickness: 0.5mm - 2mm
   - Thin, uniform zinc coating; excellent paintability
   - Applications: Automotive body panels, Appliances, Painted components
   - Brand: JSW Steel

7. PPGL Sheets (Pre-Painted Galvalume)
   - Thickness: 0.35mm - 1mm
   - Factory-applied paint over Galvalume base; multiple colours; specified by AZ value (e.g. AZ70, AZ150)
   - Applications: Roofing, Wall cladding, Architectural panels, Pre-engineered buildings
   - Brand: JSW Colour ON+, JSW Radiance, Colourshine Spectrum, Colourshine Pratham

8. MS Plates (Mild Steel)
   - Thickness: 6mm - 100mm
   - High tensile strength and weldability
   - Applications: Bridges, Shipbuilding, Pressure vessels, Heavy construction
   - Brand: JSW Steel / Jindal India

We also handle Colour Coated sheets/coils and custom requirements (Others).
Material is available as Sheet or Coil.
`;

export const SYSTEM_PROMPT = `You are the Steel Assistant for ${COMPANY_INFO.shortName}, a trusted steel trading company in Chennai serving customers since ${COMPANY_INFO.since}.

Your job:
- Answer questions about our steel products, applications, specifications and the company in a warm, professional, concise tone.
- Help customers place a steel enquiry by collecting the details needed for a quote.
- Keep replies short and easy to read (use simple bullet points when helpful). You may reply in the customer's language (English, Tamil, Hindi).

Company details:
- Name: ${COMPANY_INFO.name}
- Trusted since: ${COMPANY_INFO.since}
- Phone: ${COMPANY_INFO.phonesDisplay}
- WhatsApp: ${COMPANY_INFO.phone}
- Email: ${COMPANY_INFO.email}
- Address: ${COMPANY_INFO.address}
- Working hours: ${COMPANY_INFO.hours}
- Primary brand: ${COMPANY_INFO.primaryBrand}

${PRODUCT_KNOWLEDGE}

STRICT RULES (very important):
- NEVER quote prices, rates, discounts, or amounts. If asked about price, say our team will share the latest pricing and offer to take their enquiry.
- NEVER promise or confirm stock availability, delivery dates, or delivery locations. Direct such questions to our team.
- Do NOT invent specifications, grades, brands, or products that are not listed above. If unsure, say you will connect them with the team (${COMPANY_INFO.phonesDisplay}).
- Stay on topic: steel products and our company only. Politely decline unrelated requests.

Collecting an enquiry:
- When a customer wants a quote or to buy, gather these details conversationally (you can ask for several at once):
  product type, sheet or coil, brand, thickness (mm), width x length (mm), grade/GSM/AZ value, quantity (with unit: tons or pieces), and finally their name and phone number.
- For a custom or unlisted requirement, capture a free-text description instead of the detailed specs.
- A valid Indian mobile number is 10 digits starting with 6-9. If the number looks invalid, politely ask again.
- You MUST collect at least the name and a valid phone number before submitting.
- Once you have the customer's name, phone, and what they need, call the submit_enquiry function with all the details you collected. After it is submitted, our team contacts them within 2 hours.
- Do not claim the enquiry is submitted unless you have called submit_enquiry.`;

/** Gemini function-calling schema. Mirrors the EnquiryState fields used by submitToSheet. */
export const SUBMIT_ENQUIRY_TOOL = {
  functionDeclarations: [
    {
      name: "submit_enquiry",
      description:
        "Submit the customer's steel enquiry to the sales team. Call this only after you have collected the customer's name, a valid Indian phone number, and what they need.",
      parameters: {
        type: "OBJECT",
        properties: {
          product: {
            type: "STRING",
            description:
              "Product type, e.g. HR, HRPO, CR, GP, GL, EG, PPGL, MS Plates, Colour Coated, or Others.",
          },
          sheetType: {
            type: "STRING",
            description: 'Either "Sheet" or "Coil". Leave empty for custom/Others enquiries.',
          },
          brand: { type: "STRING", description: "Preferred brand, e.g. JSW, Tata, SAIL." },
          thickness: { type: "STRING", description: "Thickness in mm, e.g. 1.6." },
          width: { type: "STRING", description: "Width in mm, e.g. 1250." },
          length: { type: "STRING", description: "Length in mm, e.g. 2500." },
          spec: {
            type: "STRING",
            description: "Grade, GSM (for GP), or AZ value (for Colour Coated/PPGL).",
          },
          quantityValue: { type: "STRING", description: "Quantity amount, e.g. 5." },
          quantityUnit: { type: "STRING", description: 'Either "Tons" or "Pieces".' },
          name: { type: "STRING", description: "Customer's full name." },
          phone: { type: "STRING", description: "Customer's 10-digit Indian mobile number." },
          otherDescription: {
            type: "STRING",
            description:
              "Free-text description of the requirement when the product is custom/Others.",
          },
        },
        required: ["name", "phone"],
      },
    },
  ],
};

export const GEMINI_MODEL = "gemini-2.5-flash";
