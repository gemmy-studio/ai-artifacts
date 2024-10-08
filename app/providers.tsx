// app/providers.js
'use client'
import posthog from 'posthog-js'
import { PostHogProvider as PostHogProviderJS } from 'posthog-js/react'

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_ENABLE_POSTHOG) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '', {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'identified_only'
  })
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return process.env.NEXT_PUBLIC_ENABLE_POSTHOG ? (
    <PostHogProviderJS client={posthog}>
      {children}
    </PostHogProviderJS>
  ) : (
    children
  )
}
