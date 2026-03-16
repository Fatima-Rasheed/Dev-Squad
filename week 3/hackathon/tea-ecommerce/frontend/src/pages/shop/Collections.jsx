import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProducts } from '../../api/products';
import Navbar from '../../components/layout/Navbar';

const flavors = [
  { label: 'Spicy', value: 'cinnamon' },
  { label: 'Classic', value: 'classic' },
  { label: 'Floral', value: 'floral' },
  { label: 'Mint', value: 'mint' },
  { label: 'Jasmine', value: 'jasmine' },
];

const Collections = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || '';
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    flavor: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'newest',
    page: 1,
  });

  const [openSections, setOpenSections] = useState({
    collections: true,
    origin: false,
    flavor: false,
    qualities: false,
    caffeine: false,
    allergens: false,
  });

  useEffect(() => {
    setLoading(true);
    const params = {
      page: filters.page,
      limit: 9,
      sortBy: filters.sortBy,
    };
    if (categoryFromUrl) params.category = categoryFromUrl;
    if (filters.flavor) params.flavor = filters.flavor;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;

    getProducts(params)
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [categoryFromUrl, filters]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const SidebarSection = ({ title, sectionKey, count, children }) => (
    <div className="border-b border-gray-100 mb-1">
      <div
        onClick={() => toggleSection(sectionKey)}
        className="flex justify-between items-center py-3 cursor-pointer"
      >
        <span className="text-[11px] tracking-widest text-gray-800 font-semibold flex items-center">
          {title}
          {count > 0 && (
            <span className="ml-2 bg-gray-900 text-white rounded-full px-1.5 py-0.5 text-[10px]">
              {count}
            </span>
          )}
        </span>
        <span className="text-gray-400 text-sm">
          {openSections[sectionKey] ? '−' : '+'}
        </span>
      </div>
      {openSections[sectionKey] && (
        <div style={{ paddingBottom: '10px' }}>
          {children}
        </div>
      )}
    </div>
  );

  const CheckboxItem = ({ label, checked, onChange }) => (
    <div
      onClick={onChange}
      className="flex items-center gap-2 py-1 cursor-pointer group"
    >
      <div className={`w-3.5 h-3.5 border flex-shrink-0 flex items-center justify-center transition-colors
        ${checked ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-300 group-hover:border-gray-500'}`}
      >
        {checked && <span className="text-white text-[8px]">✓</span>}
      </div>
      <span className={`text-[13px] ${checked ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{label}</span>
    </div>
  );

  return (
    <div className="bg-white min-h-screen font-serif flex flex-col">
      <Navbar />

      {/* Banner */}
      <div className="w-full h-32 md:h-48 lg:h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=1400"
          alt="Collections Banner"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Breadcrumb & Mobile Filter Toggle */}
      <div className="px-6 md:px-12 py-4 flex justify-between items-center border-b md:border-none border-gray-100">
        <div className="text-[11px] text-gray-500 tracking-wider font-sans">
          <Link to="/" className="text-gray-500 hover:text-gray-900 no-underline transition-colors block md:inline">HOME</Link>
          <span className="hidden md:inline"> / </span>
          <Link to="/collections" className="text-gray-500 hover:text-gray-900 no-underline transition-colors hidden md:inline">COLLECTIONS</Link>
          {categoryFromUrl && (
            <span className="hidden md:inline"> / {categoryFromUrl.toUpperCase().replace('-', ' ')}</span>
          )}
        </div>
        
        {/* Mobile Filter Toggle */}
        <button 
          className="md:hidden text-xs bg-gray-100 px-4 py-2 text-gray-800 tracking-wider font-sans border border-gray-200"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        >
          {mobileFiltersOpen ? 'HIDE FILTERS' : 'SHOW FILTERS'}
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto w-full px-6 md:px-12 pb-16 gap-10 flex-grow">

        {/* Sidebar Filters */}
        <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} md:block w-full md:w-56 flex-shrink-0 pt-2`}>

          {/* Collections */}
          <SidebarSection title="COLLECTIONS" sectionKey="collections" count={categoryFromUrl ? 1 : 0}>
            {[
              { label: 'All Teas', value: '' },
              { label: 'Black Tea', value: 'black-tea' },
              { label: 'Green Tea', value: 'green-tea' },
              { label: 'White Tea', value: 'white-tea' },
              { label: 'Herbal Tea', value: 'herbal-tea' },
              { label: 'Oolong Tea', value: 'oolong-tea' },
            ].map((cat) => (
              <Link
                key={cat.label}
                to={cat.value ? `/collections?category=${cat.value}` : '/collections'}
                className={`block py-1.5 pl-2 text-[13px] border-l-2 no-underline transition-colors
                  ${categoryFromUrl === cat.value 
                    ? 'text-gray-900 border-gray-900 font-medium' 
                    : 'text-gray-500 border-transparent hover:text-gray-900'}`}
              >
                {cat.label}
              </Link>
            ))}
          </SidebarSection>

          {/* Origin */}
          <SidebarSection title="ORIGIN" sectionKey="origin" count={0}>
            {['India', 'China', 'Japan', 'South Africa'].map((o) => (
              <CheckboxItem key={o} label={o} checked={false} onChange={() => {}} />
            ))}
          </SidebarSection>

          {/* Flavour */}
          <SidebarSection title="FLAVOUR" sectionKey="flavor" count={filters.flavor ? 1 : 0}>
            {flavors.map((f) => (
              <CheckboxItem
                key={f.value}
                label={f.label}
                checked={filters.flavor === f.value}
                onChange={() => setFilters((prev) => ({
                  ...prev,
                  flavor: prev.flavor === f.value ? '' : f.value,
                  page: 1,
                }))}
              />
            ))}
          </SidebarSection>

          {/* Qualities */}
          <SidebarSection title="QUALITIES" sectionKey="qualities" count={0}>
            {['Energy', 'Relax', 'Protein', 'Digestion'].map((q) => (
              <CheckboxItem key={q} label={q} checked={false} onChange={() => {}} />
            ))}
          </SidebarSection>

          {/* Caffeine */}
          <SidebarSection title="CAFFEINE" sectionKey="caffeine" count={0}>
            {['No Caffeine', 'Low Caffeine', 'Medium Caffeine', 'High Caffeine'].map((c) => (
              <CheckboxItem key={c} label={c} checked={false} onChange={() => {}} />
            ))}
          </SidebarSection>

          {/* Allergens */}
          <SidebarSection title="ALLERGENS" sectionKey="allergens" count={0}>
            {['Gluten Free', 'Dairy Free', 'Nut Free', 'Soy Free'].map((a) => (
              <CheckboxItem key={a} label={a} checked={false} onChange={() => {}} />
            ))}
          </SidebarSection>

          {/* Organic Toggle */}
          <div className="flex justify-between items-center py-4 border-b border-gray-100">
            <span className="text-[11px] tracking-widest text-gray-800 font-semibold">ORGANIC</span>
            <div className="w-8 h-4 bg-gray-300 rounded-full cursor-pointer relative">
              <div className="w-3.5 h-3.5 bg-white rounded-full absolute top-[1px] left-[1px]" />
            </div>
          </div>

          {/* Price Filter */}
          <div className="pt-4">
            <p className="text-[11px] tracking-widest text-gray-800 font-semibold mb-3">PRICE</p>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value, page: 1 }))}
                className="w-full border border-gray-200 px-2 py-1.5 text-xs focus:outline-none focus:border-gray-400"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value, page: 1 }))}
                className="w-full border border-gray-200 px-2 py-1.5 text-xs focus:outline-none focus:border-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Products Area */}
        <div className="flex-1 w-full">

          {/* Sort bar */}
          <div className="flex justify-between md:justify-end items-center mb-6 pt-2">
            <span className="text-xs text-gray-500 tracking-wider mr-2 font-sans md:hidden">SORT RESULTS</span>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 tracking-wider mr-2 font-sans hidden md:inline">SORT BY</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value, page: 1 }))}
                className="border-none text-sm text-gray-900 bg-transparent cursor-pointer focus:outline-none focus:ring-0"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-24 text-gray-400">Loading...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 text-gray-400">No products found</div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-x-6 md:gap-y-10">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="no-underline text-inherit group"
                >
                  <div className="bg-orange-50/30 aspect-square overflow-hidden flex items-center justify-center mb-3 group-hover:bg-orange-50/60 transition-colors">
                    {product.images && product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <span className="text-4xl md:text-5xl">🍵</span>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-xs md:text-sm text-gray-800 mb-0.5 group-hover:text-black">{product.name}</p>
                    <p className="text-[10px] md:text-xs text-gray-400 mb-1.5 font-sans track-wider">
                      {product.category.replace('-', ' ')}
                    </p>
                    <p className="text-xs md:text-sm text-gray-900 font-medium">
                      Rs. {product.variants[0]?.price}
                      <span className="text-[10px] md:text-xs text-gray-400 font-normal ml-1">/ {product.variants[0]?.name}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12 mb-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, page: p }));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-8 h-8 flex items-center justify-center text-sm transition-colors border
                    ${p === filters.page 
                      ? 'border-gray-900 bg-gray-900 text-white' 
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-auto py-12 px-6 md:px-12 font-sans">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-xs tracking-[0.15em] mb-4 text-gray-100 font-semibold">COLLECTIONS</h4>
            {['Black Tea', 'Green Tea', 'White Tea', 'Herbal Tea', 'Matcha', 'Chai', 'Oolong', 'Rooibos'].map((item) => (
              <p key={item} className="text-[13px] text-gray-400 hover:text-white cursor-pointer mb-2 transition-colors">{item}</p>
            ))}
          </div>
          <div>
            <h4 className="text-xs tracking-[0.15em] mb-4 text-gray-100 font-semibold">LEARN</h4>
            {['About us', 'About our teas', 'Tea academy'].map((item) => (
              <p key={item} className="text-[13px] text-gray-400 hover:text-white cursor-pointer mb-2 transition-colors">{item}</p>
            ))}
          </div>
          <div>
            <h4 className="text-xs tracking-[0.15em] mb-4 text-gray-100 font-semibold">CUSTOMER SERVICE</h4>
            {['Ordering and payment', 'Delivery', 'Privacy and policy', 'Terms & Conditions'].map((item) => (
              <p key={item} className="text-[13px] text-gray-400 hover:text-white cursor-pointer mb-2 transition-colors">{item}</p>
            ))}
          </div>
          <div>
            <h4 className="text-xs tracking-[0.15em] mb-4 text-gray-100 font-semibold">CONTACT US</h4>
            <p className="text-[13px] text-gray-400 mb-2">📍 3 South Tea Pleasure Ave</p>
            <p className="text-[13px] text-gray-400 mb-2">✉ info@teahouse.com</p>
            <p className="text-[13px] text-gray-400 mb-2">📞 +92-300-0000000</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-gray-800 pt-6 text-center">
          <p className="text-xs text-gray-500 tracking-wide">© 2026 TEAHOUSE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Collections;
