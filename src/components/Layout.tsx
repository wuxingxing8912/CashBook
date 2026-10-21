import { NavLink, Outlet } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: '首页', end: true },
  { to: '/add', label: '记一笔', end: false },
  { to: '/stats', label: '统计', end: false },
]

export default function Layout() {
  return (
    <div className="mx-auto flex h-full max-w-md flex-col bg-white shadow-sm">
      <main className="flex-1 overflow-y-auto pb-16">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-1/2 w-full max-w-md -translate-x-1/2 border-t bg-white">
        <ul className="flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.to} className="flex-1">
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `block py-3 text-center text-sm ${
                    isActive ? 'text-blue-600 font-medium' : 'text-gray-500'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
