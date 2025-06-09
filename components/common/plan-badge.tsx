import { currentUser } from "@clerk/nextjs/server";
import { Badge, Crown, CrownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { getPriceIdForActiveUser } from "../../lib/user";
import { PricingPlans } from "../../utils/constraints";
import { cn } from "../../lib/utils";

export default async function PlanBadge() {
  const user = await currentUser();
  if (!user?.id) return null;
  const email = user?.emailAddresses?.[0]?.emailAddress;

  let priceId: string | null = null;

  if (email) {
    priceId = await getPriceIdForActiveUser(email);
  }

  let planName = "Buy a plan";

  const plan = PricingPlans.find((plan) => plan.priceId === priceId);
  if (plan) {
    planName = plan.name;
  }
  return (
    <Button
      className={cn(
        "ml-2 bg-linear-to-r cursor-pointer from-amber-100 to-amber-200 border-amber-300 hiden lg:flex flex-row items-center rounded-md text-black"
      )}
    >
      <CrownIcon
        className={cn(
          "w-4 h-4 mr-1 text-amber-600",
          !priceId && "text-red-600"
        )}
      />
      {planName}
    </Button>
  );
}
