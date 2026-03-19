import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/pesticides', label: 'Pesticides' },
  { to: '/fertilizers', label: 'Fertilizers' },
  { to: '/crop-solutions', label: 'Crop Solutions' },
  { to: '/order-now', label: 'Order Now' },
  { to: '/track-order', label: 'Track Order' },
  { to: '/contact', label: 'Contact' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-emerald-900" onClick={closeMenu}>
          <span className="grid h-9 w-9 place-content-center rounded-full bg-emerald-700 text-xs font-bold tracking-widest text-white">
            JAC
          </span>
          <span className="text-base font-bold tracking-tight md:text-lg">Jamil Agro Chemical</span>
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-md border border-emerald-200 px-3 py-1.5 text-sm font-semibold text-emerald-800 md:hidden"
        >
          Menu
        </button>

        <nav className="hidden items-center gap-5 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? 'text-emerald-700 underline decoration-2 underline-offset-8'
                  : 'text-slate-600 transition hover:text-emerald-700'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {isOpen && (
        <div className="border-t border-emerald-100 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? 'rounded-md bg-emerald-50 px-3 py-2 text-emerald-700'
                    : 'rounded-md px-3 py-2 text-slate-700 hover:bg-emerald-50'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
