import { loadStripe } from "@stripe/stripe-js";

// Your public Stripe key
const publicKey = "pk_test_51OvY7V04EX91HcTebLO1aPD6bXYLHqFn1qTtUzDBVA5hI1NSGnNasiM8w3Rs9asLFos8PMi94DVXA98sagPBHBzS009fEEwIQC";

let stripePromise: ReturnType<typeof loadStripe> | null = null;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(publicKey);
  }
  return stripePromise;
};

export default getStripe;
