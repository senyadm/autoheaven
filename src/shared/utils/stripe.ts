import { loadStripe } from "@stripe/stripe-js";

// Your public Stripe key
const publicKey = "pk_live_51OmMXmBGaqXQluApPePvDIVXQYz1OzPBJErSx05vUDFcHOAXEAbG65pQBjdRbYBOuR52WWs9PI9eJUPvYJL0QTXH00rGofhc0E";

let stripePromise: ReturnType<typeof loadStripe> | null = null;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(publicKey);
  }
  return stripePromise;
};

export default getStripe;
