// app/components/AuthFlow.tsx
'use client'

import { createClient } from '@/lib/supabase/client'
import { Provider } from '@supabase/supabase-js'
import { useCallback } from 'react'

export function AuthFlow() {
  const handleAuth = useCallback(async (provider: Provider) => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    })

    if (error) {
      console.error('Auth error:', error)
    }

    if (data?.url) {
      window.location.href = data.url
    }
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => handleAuth('google')}
        className="px-4 py-2 bg-white text-gray-800 rounded-lg border shadow-sm hover:shadow-md transition-all"
      >
        Continue with Google
      </button>
      <button
        onClick={() => handleAuth('linkedin_oidc')}
        className="px-4 py-2 bg-[#0077B5] text-white rounded-lg border shadow-sm hover:shadow-md transition-all"
      >
        Continue with LinkedIn
      </button>
    </div>
  )
}