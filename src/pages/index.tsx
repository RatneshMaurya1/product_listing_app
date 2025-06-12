import { useState, useEffect } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
}

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const [searchText, setSearchText] = useState("");
  const [productData, setProductData] = useState<Product[]>(products);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(1);

  const items = 10;
  const totalPages = Math.ceil(productData.length / items);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setProductData(filtered);
      setIndex(1); 
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchText, products]);

  const startIndex = (index - 1) * items;
  const currentItems = productData.slice(startIndex, startIndex + items);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Product Listing</h1>
      <input
        type="text"
        placeholder="Search products..."
        className="form-control mb-4"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <>
          <div className="row">
            {currentItems.map((product) => (
              <div className="col-md-6 mb-4" key={product.id}>
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top mt-2"
                    style={{ height: "250px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">${product.price}</p>
                    <p className="card-text text-muted">{product.category}</p>
                    <p className="card-text">
                      ⭐ {product.rating?.rate} ({product.rating?.count})
                    </p>
                    <Link href={`/product/${product.id}`} className="btn btn-info">View</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="d-flex  justify-content-center">
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i + 1} className={`page-item ${index === i + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setIndex(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL);
  const products = await res.json();
  return { props: { products } };
};
