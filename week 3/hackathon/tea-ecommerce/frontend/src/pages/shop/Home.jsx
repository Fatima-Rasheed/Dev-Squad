import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts } from '../../api/products';
import Navbar from '../../components/layout/Navbar';

const collections = [
  { name: 'BLACK TEA', category: 'black-tea', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400' },
  { name: 'GREEN TEA', category: 'green-tea', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400' },
  { name: 'WHITE TEA', category: 'white-tea', img: 'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=400' },
  { name: 'MATCHA', category: 'green-tea', img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400' },
  { name: 'HERBAL TEA', category: 'herbal-tea', img: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400' },
  { name: 'CHAI', category: 'black-tea', img: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400' },
  { name: 'OOLONG', category: 'oolong-tea', img: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400' },
  { name: 'FOODGE', category: 'herbal-tea', img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400' },
  { name: 'TEAWARE', category: 'white-tea', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
];

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts({ limit: 6, sortBy: 'rating' })
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-white font-serif">
      <Navbar />

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[400px] md:min-h-[500px]">
        {/* Left - Image */}
        <div className="overflow-hidden md:order-1 order-2 h-64 md:h-auto">
          <img
            src="https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800"
            alt="Tea"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Right - Text */}
        <div className="flex flex-col justify-center px-8 py-12 md:p-16 lg:pl-24 bg-white md:order-2 order-1 text-center md:text-left">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-gray-900 mb-6">
            Every day is unique,<br className="hidden md:block" />just like our tea
          </h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8 max-w-sm mx-auto md:mx-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mattis lorem vitae ante diam ornare. Donec orci.
          </p>
          <div>
            <Link to="/collections"
              className="bg-gray-900 text-white px-8 py-3 text-xs md:text-sm tracking-widest no-underline inline-block hover:bg-black transition-colors">
              BROWSE TEAS
            </Link>
          </div>
        </div>
      </section>

      {/* Gap */}
      <div className="h-6 md:h-8 bg-white" />

      {/* Features Bar */}
      <section className="bg-gray-50 border-y border-gray-100 py-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 gap-6 md:gap-0">
          <div className="grid grid-cols-2 md:flex md:flex-row gap-4 md:gap-8 w-full md:w-auto">
            {[
              { icon: '🌿', text: '400+ KINDS OF LOOSELEAF TEA' },
              { icon: '✓', text: 'CERTIFICATED ORGANIC TEAS' },
              { icon: '🚚', text: 'FREE DELIVERY' },
              { icon: '🎁', text: 'SAMPLE FOR ALL TEAS' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-base md:text-lg">{f.icon}</span>
                <span className="text-[10px] md:text-xs tracking-wider text-gray-600 font-sans">{f.text}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-2 md:mt-0 w-full md:w-auto">
            <Link to="/collections"
              className="border border-gray-300 px-6 py-2 text-[10px] md:text-xs tracking-widest text-gray-800 no-underline inline-block bg-white hover:bg-gray-50 transition-colors w-full md:w-auto">
              LEARN MORE
            </Link>
          </div>
        </div>
      </section>
    

      {/* Collections Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 text-center mb-8 md:mb-10">
            Our Collections
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
            {collections.map((col) => (
              <Link
                key={col.name}
                to={`/collections?category=${col.category}`}
                className="no-underline block group"
              >
                <div className="w-full aspect-square overflow-hidden bg-gray-50 rounded-sm">
                  <img
                    src={col.img}
                    alt={col.name}
                    className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <p className="text-center text-[10px] md:text-xs tracking-[0.15em] text-gray-800 mt-3 font-sans">
                  {col.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 md:pt-16 pb-6 px-6 md:px-12 font-sans">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div>
            <h4 className="text-xs tracking-[0.15em] mb-4 text-gray-100 font-semibold">COLLECTIONS</h4>
            {['Black Tea', 'Green Tea', 'White Tea', 'Herbal Tea', 'Matcha', 'Chai', 'Oolong', 'Rooibos', 'Teaware'].map((item) => (
              <p key={item} className="text-sm text-gray-400 hover:text-white cursor-pointer mb-2 transition-colors">{item}</p>
            ))}
          </div>
          <div>
            <h4 className="text-xs tracking-[0.15em] mb-4 text-gray-100 font-semibold">LEARN</h4>
            {['Our story', 'Blog', 'About our teas', 'Tea academy'].map((item) => (
              <p key={item} className="text-sm text-gray-400 hover:text-white cursor-pointer mb-2 transition-colors">{item}</p>
            ))}
          </div>
          <div>
            <h4 className="text-xs tracking-[0.15em] mb-4 text-gray-100 font-semibold">CUSTOMER SERVICE</h4>
            {['Track your order', 'Shipping', 'Privacy policy', 'Terms & conditions'].map((item) => (
              <p key={item} className="text-sm text-gray-400 hover:text-white cursor-pointer mb-2 transition-colors">{item}</p>
            ))}
          </div>
          <div>
            <h4 className="text-xs tracking-[0.15em] mb-4 text-gray-100 font-semibold">CONTACT US</h4>
            <p className="text-sm text-gray-400 mb-2">📍 3 South Tea Pleasure Ave, P.O. Box 456</p>
            <p className="text-sm text-gray-400 mb-2">✉ info@teahouse.com</p>
            <p className="text-sm text-gray-400 mb-2">📞 +92-300-0000000</p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto border-t border-gray-800 pt-6 text-center">
          <p className="text-xs text-gray-500 tracking-wide">© 2026 TEAHOUSE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;