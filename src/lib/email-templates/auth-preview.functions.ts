import { createServerFn } from '@tanstack/react-start'

export const getAuthEmailPreviews = createServerFn({ method: 'GET' }).handler(async () => {
  const { renderAuthEmailPreview } = await import('./auth-preview')
  const types = ['signup', 'invite', 'magiclink', 'recovery', 'email_change', 'reauthentication']
  const entries = await Promise.all(types.map(async type => [type, await renderAuthEmailPreview(type)] as const))
  return Object.fromEntries(entries) as Record<string, string>
})