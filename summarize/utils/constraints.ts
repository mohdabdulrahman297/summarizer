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

export const containerVariants = {
  hidden: {
    opacity: 0,},
  visible: {
    opacity: 1, 

    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};
export const itemVariants = { 
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20,
      duration: 0.8,
    },
  },
};