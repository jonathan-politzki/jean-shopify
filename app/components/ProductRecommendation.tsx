// app/components/ProductRecommendations.tsx
interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  url: string;
  reasoning?: string;
}

interface RecommendationsProps {
  products: Product[];
}

export function ProductRecommendations({ products }: RecommendationsProps) {
  if (!products?.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
          {product.image && (
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-48 object-cover"
            />
          )}
          
          <div className="p-4">
            <h3 className="font-semibold text-lg">{product.title}</h3>
            <p className="text-gray-600 mb-2">{product.price}</p>
            
            {product.reasoning && (
              <p className="text-sm text-gray-600 mb-4">{product.reasoning}</p>
            )}
            
            <a 
              href={product.url}
              className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Product
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}