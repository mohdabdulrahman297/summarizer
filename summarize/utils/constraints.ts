import { isDev } from "./helpers";

export const PricingPlans = [
  {
    name: "basic",
    price: 10,
    description: "For Occasional use",
    items: ["5 PDF summaries per month", "Basic support", "Email support"],
    id: "basic",
    paymentLink: isDev ? 'https://buy.stripe.com/test_aFaeVfdow9vSfLdgXF3AY00' : '',
    priceId: isDev ? 'price_1RWKaSQP82AtOqvctUUoYKoQ' : '',
  },
  {
    name: "pro",
    price: 20,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority support",
      "24/7 priority support",
      "Markdown export",
    ],
    id: "pro",
    paymentLink: isDev ? 'https://buy.stripe.com/test_fZu5kF0BK4by9mPcHp3AY01' : '',
    priceId: isDev ? 'price_1RWKaSQP82AtOqvcddMlvPAc' : '',
  },
];