// The "Issuer" URL from your Clerk JWT template named "convex".
// Set it later with:  npx convex env set CLERK_JWT_ISSUER_DOMAIN https://<your-app>.clerk.accounts.dev
// Until then we publish an empty provider list so the backend can deploy without Clerk.
const domain = process.env.CLERK_JWT_ISSUER_DOMAIN;

export default {
  providers: domain ? [{ domain, applicationID: "convex" }] : [],
};
