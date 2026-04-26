import { Link, NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand">WS06 React</Link>
        <nav className="nav">
          {/* Add navigation links as you complete routes. */}
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>Home</NavLink>
          <NavLink to="/blog" className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>Blog</NavLink>
          {/* Add: /about, /contact, /posts/new */}
          <NavLink to = "/about" className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>About</NavLink>
          <NavLink to = "/contact" className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>Contact</NavLink>
          <NavLink to = "/posts/new" className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>New Post</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
