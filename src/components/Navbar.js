'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { siteConfig } from '@/config/site.config';
import { getInitials } from '@/utils/formatters';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="glass-card sticky top-0 z-50 border-x-0 border-t-0 rounded-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg gradient-btn flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform">
              E
            </div>
            <span className="text-lg font-bold gradient-text hidden sm:block">
              {siteConfig.name}
            </span>
          </Link>

          {/* Navigation Links */}
          {user && (
            <div className="flex items-center gap-1">
              {siteConfig.navItems.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? 'bg-accent/15 text-accent'
                      : 'text-muted hover:text-foreground hover:bg-surface-hover'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* User Menu */}
          {user && (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold text-xs">
                  {getInitials(user.name)}
                </div>
                <span className="text-sm text-muted">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg text-sm text-danger hover:bg-danger/10 transition-all duration-200 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
