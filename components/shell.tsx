"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { roles, roleConfig, type RoleId } from "@/lib/role-config";
import Topbar from "@/components/topbar";
import Sidebar from "@/components/sidebar";

export default function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const segments = pathname.split("/").filter(Boolean);
  const pathRole = segments[0] as RoleId;
  const role = roles.some((r) => r.id === pathRole) ? pathRole : "admin";
  const activePage = segments[1] || roleConfig[role].defaultPage;

  const handleRoleChange = (newRole: RoleId) => {
    router.push(`/${newRole}/dashboard`);
  };

  const handleNav = (page: string) => {
    router.push(`/${role}/${page}`);
  };

  return (
    <div className="relative z-[2] grid h-screen grid-cols-1 lg:grid-cols-[264px_1fr] lg:grid-rows-[64px_1fr]">
      <Topbar
        role={role}
        onRoleChange={handleRoleChange}
        onMenuClick={() => setSidebarOpen(true)}
      />
      <Sidebar
        role={role}
        activePage={activePage}
        onNav={handleNav}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="col-start-1 row-start-2 overflow-y-auto lg:col-start-2">
        {children}
      </main>
    </div>
  );
}
