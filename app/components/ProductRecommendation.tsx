// app/components/ProductRecommendation.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  url: string;
}

export function ProductRecommendation() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
          throw new Error('Not authenticated')
        }

        const response = await fetch('/api/recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: session.user.id
          })
        })

        if (!response.ok) {
          throw new Error('Failed to fetch recommendations')
        }

        const data = await response.json()
        setProducts(data.products)
      } catch (error) {
        console.error('Recommendation error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  if (loading) {
    return <div>Loading recommendations...</div>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4">
          <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
          <h3 className="mt-2 font-semibold">{product.title}</h3>
          <p className="text-gray-600">{product.price}</p>
          <a 
            href={product.url}
            className="mt-2 block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Product
          </a>
        </div>
      ))}
    </div>
  )
}