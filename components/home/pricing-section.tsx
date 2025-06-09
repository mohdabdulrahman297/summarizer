import { CheckIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { PricingPlans } from "../../utils/constraints";
import { cn } from "../../lib/utils";

type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string;
};

const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
  priceId,
}: PriceType) => {
  return (
    <div className="relative w-full max-w-lg">
      <div
        className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl",
          id === "basic" && " gap-5 border-2",
          id === "pro" && "border-blue-500 gap-5 border-2"
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <p className="text-5xl tracking-tight font-extrabold">{price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold">USD</p>
            <p className="text-xs">/month</p>
          </div>
        </div>

        <div className="space-y-2.5 leading-relaxed text-base flex-1">
          {items.map((item, idx) => (
            <li className="flex items-center gap-2" key={idx}>
              <CheckIcon size={18} />
              {item}
            </li>
          ))}
        </div>

        <div className="space-y-2 flex justify-center w-full">
          <Link
            className={cn(
              "w-full rounded-md flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2",
              id === "basic" && "bg-blue-500",
              id === "pro" &&
                " bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            )}
            href={paymentLink}
          >
            Buy now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function PricingSection() {
  return (
    <section>
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center w-full pb-12">
          <h2 className="text-2xl font-bold uppercase mb-8 text-blue-500">
            Pricing
          </h2>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {PricingPlans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
