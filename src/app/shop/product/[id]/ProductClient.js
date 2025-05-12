'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, ArrowLeft, Shield, Check, Info } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { addToCart as simpleAddToCart, debugCart } from '@/utils/simpleCart';

/* ------------------------------------------------------------------ */
/*  FULL PRODUCT‑DETAIL COMPONENT – identical to your old code         */
/*  except it receives the product ID as a prop instead of useParams   */
/* ------------------------------------------------------------------ */
export default function ProductClient({ id }) {
  const [product,       setProduct]       = useState(null);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);
  const [quantity,      setQuantity]      = useState(1);
  const [isAdding,      setIsAdding]      = useState(false);
  const [addons,        setAddons]        = useState([]);
  const [selected,      setSelected]      = useState({});
  const { addToCart }                     = useCart();   // if you still use context

  /* -------- fetch product whenever ID changes -------- */
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || 'Failed to fetch product details');
        }
        const data = await res.json();
        setProduct(data);

        /* --- extract add‑ons (same logic) --- */
        const ex = extractAddons(data);
        setAddons(ex);

        /* defaults */
        const def = {};
        ex.forEach(a => {
          if (a.type === 'checkbox' || a.type === 'multiple_choice') {
            def[a.name] = a.options.filter(o => o.default).map(o => o.label);
          }
        });
        setSelected(def);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  /* ----- helper: extract add‑ons from Woo meta ----- */
  const extractAddons = (prod) => {
    if (!prod?.meta_data) return [];
    const keys = ['_product_addons', 'product_addons', '_wc_pb_addon_data'];
    for (const m of prod.meta_data) {
      if (keys.includes(m.key)) {
        try {
          if (typeof m.value === 'string') return JSON.parse(m.value);
          if (Array.isArray(m.value))     return m.value;
        } catch {}
      }
    }
    if (prod.addons) return prod.addons;
    return [];
  };

  /* ----- add‑on checkbox handling & price calc ----- */
  const handleAddonChange = (name, opt, checked) => {
    setSelected(p => {
      const cur = p[name] || [];
      return { ...p, [name]: checked ? [...cur, opt] : cur.filter(x => x !== opt) };
    });
  };

  const addonPrice = () => {
    let extra = 0;
    Object.entries(selected).forEach(([name, opts]) => {
      const add = addons.find(a => a.name === name);
      opts.forEach(o => {
        const obj = add?.options?.find(x => x.label === o);
        if (obj?.price) extra += parseFloat(obj.price);
      });
    });
    return extra;
  };

  /* ----- add to cart ----- */
  const handleAdd = () => {
    if (!product || isAdding) return;
    setIsAdding(true);
    try {
      const p = {
        ...product,
        selected_addons: selected,
        addon_price: addonPrice(),
        image: product.images?.[0]?.src || null,
      };
      simpleAddToCart(p, quantity);      // or addToCart(p, quantity) if you prefer context
      debugCart && debugCart();
      alert(`Added ${quantity} × ${product.name} to cart`);
    } finally {
      setIsAdding(false);
    }
  };

  /* ----- loading / error states ----- */
  if (loading) return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0E294B]" />
    </div>
  );

  if (error) return (
    <div className="container mx-auto px-4 py-16">
      <div className="bg-red-50 p-4 rounded-md text-red-700 mb-8">Error: {error}</div>
      <Link href="/shop" className="text-[#0E294B] flex items-center">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
      </Link>
    </div>
  );

  if (!product) return (
    <div className="container mx-auto px-4 py-16">
      <div className="bg-yellow-50 p-4 rounded-md text-yellow-700 mb-8">Product not found</div>
      <Link href="/shop" className="text-[#0E294B] flex items-center">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
      </Link>
    </div>
  );

  /* ---------- FULL ORIGINAL JSX (unchanged) ---------- */
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link href="/shop" className="text-[#0E294B] flex items-center text-sm mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
            {product.images?.length ? (
              <img
                src={product.images[0].src}
                alt={product.name}
                className="object-contain p-4 w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="text-gray-400 text-center">
                  <Shield className="h-16 w-16 mx-auto mb-2" />
                  <span className="text-sm">Product Image Placeholder</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

          {product.categories?.length > 0 && (
            <div className="mb-4">
              <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                {product.categories[0].name}
              </span>
            </div>
          )}

          <div className="text-2xl font-bold text-[#0E294B] mb-4">
            ${(parseFloat(product.price) + addonPrice()).toFixed(2)}
            {addonPrice() > 0 && (
              <span className="text-sm font-normal ml-2 text-gray-600">
                (Base: ${parseFloat(product.price).toFixed(2)} + Add‑ons: ${addonPrice().toFixed(2)})
              </span>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <div
              className="text-gray-600 prose"
              dangerouslySetInnerHTML={{
                __html: product.description || product.short_description || 'No description available.',
              }}
            />
          </div>

          {/* Add‑ons */}
          {addons.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Options & Add‑ons</h2>
              <div className="space-y-4">
                {addons.map((addon, i) => (
                  <div key={i} className="border border-gray-200 rounded-md p-4">
                    <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                      {addon.name}
                      {addon.description && (
                        <div className="group relative ml-2">
                          <Info className="h-4 w-4 text-gray-400 cursor-help" />
                          <div className="absolute left-0 bottom-full mb-2 w-48 bg-gray-800 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            {addon.description}
                          </div>
                        </div>
                      )}
                    </h3>
                    {addon.options?.map((opt, j) => {
                      const checked = selected[addon.name]?.includes(opt.label);
                      return (
                        <label key={j} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => handleAddonChange(addon.name, opt.label, e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-[#0E294B] focus:ring-[#0E294B]"
                          />
                          <span className="text-gray-700">{opt.label}</span>
                          {opt.price > 0 && (
                            <span className="text-gray-600 text-sm">(+${parseFloat(opt.price).toFixed(2)})</span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Selected add‑ons summary */}
              {Object.keys(selected).length > 0 &&
                Object.values(selected).some(v => v.length) && (
                  <div className="mt-3 bg-gray-50 p-3 rounded-md">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Selected options:</h4>
                    <ul className="text-sm text-gray-600">
                      {Object.entries(selected).map(([nm, opts]) =>
                        opts.length ? (
                          <li key={nm} className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                            <span>
                              <span className="font-medium">{nm}:</span> {opts.join(', ')}
                            </span>
                          </li>
                        ) : null
                      )}
                    </ul>

                    {addonPrice() > 0 && (
                      <div className="mt-2 font-medium text-[#0E294B]">
                        Additional cost: +${addonPrice().toFixed(2)}
                      </div>
                    )}
                  </div>
                )}
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label htmlFor="qty" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(p => Math.max(1, p - 1))}
                className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100"
              >
                –
              </button>
              <input
                id="qty"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-y border-gray-300 py-1 focus:outline-none"
              />
              <button
                onClick={() => setQuantity(p => p + 1)}
                className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            disabled={isAdding || product.stock_status !== 'instock'}
            className={`w-full py-3 px-4 rounded-md font-medium flex items-center justify-center ${
              product.stock_status === 'instock'
                ? isAdding
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-[#0E294B] text-white hover:bg-[#1E5C97]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {isAdding
              ? 'Adding...'
              : product.stock_status === 'instock'
              ? 'Add to Cart'
              : 'Out of Stock'}
          </button>

          {/* Stock status */}
          <div className="mt-4 text-sm">
            <span
              className={`font-medium ${
                product.stock_status === 'instock' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
