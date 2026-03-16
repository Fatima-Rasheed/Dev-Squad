import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import CartDrawer from '../common/CartDrawer';

const Navbar = () => {
  const { user, logout, cartOpen, openCart, closeCart } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav style={{ borderBottom: '1px solid #eee', padding: '16px 48px', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', color: '#1a1a1a', letterSpacing: '0.05em' }}>
              🌿 Brand Name
            </span>
          </Link>

          {/* Center Links */}
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
            {[
              { label: 'Tea Collections', path: '/collections' },
              { label: 'Accessories', path: '/' },
              { label: 'Blog', path: '/' },
              { label: 'Contact Us', path: '/' },
            ].map((item) => (
              <Link key={item.label} to={item.path}
                style={{ fontSize: '0.85rem', color: '#444', textDecoration: 'none', letterSpacing: '0.02em' }}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button onClick={() => setSearchOpen(!searchOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: '#444' }}>
              🔍
            </button>
            <Link to={user ? '/my-orders' : '/login'}
              style={{ textDecoration: 'none', fontSize: '1.1rem', color: '#444' }}>
              👤
            </Link>
            <button
              onClick={() => user ? openCart() : navigate('/login')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: '#444' }}>
              🛒
            </button>
          </div>
        </div>

        {searchOpen && (
          <div style={{ maxWidth: '1200px', margin: '12px auto 0', padding: '0 48px' }}>
            <input
              type="text"
              placeholder="Search for teas..."
              autoFocus
              style={{ width: '100%', border: 'none', borderBottom: '1px solid #ccc', padding: '8px 0', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>
        )}
      </nav>

      <CartDrawer isOpen={cartOpen} onClose={closeCart} />
    </>
  );
};

export default Navbar;