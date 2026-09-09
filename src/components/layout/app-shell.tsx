import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollProgress } from "@/components/layout/scroll-progress";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}