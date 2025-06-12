import { GetServerSideProps } from "next";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating?: { rate: number; count: number };
}

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="container mt-4">
      <Link href="/" className="btn btn-secondary mb-3">← Back</Link>
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} className="img-fluid" style={{ maxHeight: "400px", objectFit: "contain" }} />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p className="text-muted">{product.category}</p>
          <h4>${product.price}</h4>
          <p>{product.description}</p>
          <p>Rating: ⭐ {product.rating?.rate} ({product.rating?.count})</p>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
  const product = await res.json();
  return { props: { product } };
};
