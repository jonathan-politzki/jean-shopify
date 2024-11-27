// app/hooks/useAuth.ts
import { useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Provider } from '@supabase/supabase-js'
import { getBaseUrl } from '@/lib/utils'

export function useAuth() {
  const handleSignIn = useCallback(async (provider: Provider) => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${getBaseUrl()}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    })

    if (error) {
      console.error('Auth error:', error)
      return
    }

    if (data?.url) {
      window.location.href = data.url
    }
  }, [])

  const handleSignOut = useCallback(async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }, [])

  return { handleSignIn, handleSignOut }
}