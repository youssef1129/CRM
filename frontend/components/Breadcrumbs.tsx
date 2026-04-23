'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiChevronRight, FiHome } from 'react-icons/fi';
import { useMemo } from 'react';

export default function Breadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    if (pathname === '/') return [];

    const pathArray = pathname.split('/').filter((path) => path);
    
    return pathArray.map((path, index) => {
      const href = `/${pathArray.slice(0, index + 1).join('/')}`;
      
      let label = path.charAt(0).toUpperCase() + path.slice(1);
      
      if (!isNaN(Number(path))) {
        label = index === 0 ? "Fiche Client" : "Fiche Animal";
      }

      if (path === 'animals') label = "Animaux";

      return { label, href, isLast: index === pathArray.length - 1 };
    });
  }, [pathname]);

  if (pathname === '/') return null;

  return (
    <nav className="m-4 flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm font-medium">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-slate-400 transition-colors hover:text-teal-600"
          >
            <FiHome className="text-base" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        </li>
        
        {breadcrumbs.map((breadcrumb) => (
          <li key={breadcrumb.href} className="flex items-center space-x-2">
            <FiChevronRight className="text-slate-300" />
            {breadcrumb.isLast ? (
              <span className="text-slate-800 font-bold" aria-current="page">
                {breadcrumb.label}
              </span>
            ) : (
              <Link
                href={breadcrumb.href}
                className="text-slate-400 transition-colors hover:text-teal-600"
              >
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
