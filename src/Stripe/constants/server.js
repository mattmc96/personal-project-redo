const STRIPE_PUBLISHABLE =
    process.env.NODE_ENV === "production" ? "process.env.STRIPE_PUBLIC_TEST_KEY" : "process.env.STRIPE_PUBLIC_KEY";

export default STRIPE_PUBLISHABLE;
