import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  // Access is enforced by middleware.ts — by the time this renders the user is signed in.
  return <Dashboard />;
}
