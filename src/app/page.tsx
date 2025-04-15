import { LandingPageRoute } from "@/modules/shop";
import { ReactQueryProvider } from "@/providers";

export default function Home() {
  return (
    <ReactQueryProvider>
      <LandingPageRoute />
    </ReactQueryProvider>
  );
}
