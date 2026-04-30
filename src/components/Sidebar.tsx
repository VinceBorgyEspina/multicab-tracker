'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Truck, Home, Wallet, Wrench, CalendarOff } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/multicabs', label: 'Multicabs', icon: Truck },
    { href: '/boundaries', label: 'Boundaries', icon: Wallet },
    { href: '/expenses', label: 'Expenses', icon: Wrench },
    { href: '/rest-days', label: 'Rest Days', icon: CalendarOff },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Truck size={28} />
        <span>Borgy's Multicab</span>
      </div>
      <nav className="nav-links">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
          return (
            <Link key={link.href} href={link.href} className={`nav-link ${isActive ? 'active' : ''}`}>
              <Icon size={20} />
              {link.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
