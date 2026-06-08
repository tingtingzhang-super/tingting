import { useEffect } from "react";
import {
  HashRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";
import { navGroups, allItems } from "./nav";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand__logo">M</div>
        <div>
          <div className="brand__name">MOOUI</div>
          <div className="brand__sub">MOBILE COMPONENTS</div>
        </div>
      </div>
      {navGroups.map((group) => (
        <nav className="nav-group" key={group.title}>
          <div className="nav-group__title">{group.title}</div>
          {group.items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              <span className="nav-link__dot" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      ))}
    </aside>
  );
}

function Topbar() {
  const { pathname } = useLocation();
  const current = allItems.find((i) => i.path === pathname);
  return (
    <div className="topbar">
      <div className="topbar__crumb">
        MOOUI / <b>{current ? current.label : "概览"}</b>
      </div>
      <span className="topbar__tag">Design Spec v1.0</span>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.querySelector(".content")?.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar />
          <Routes>
            {allItems.map((item) => {
              const Element = item.element;
              return <Route key={item.path} path={item.path} element={<Element />} />;
            })}
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
