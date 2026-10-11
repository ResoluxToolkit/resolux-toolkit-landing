import { renderToStaticMarkup } from 'react-dom/server'
import { SignupEmail } from './signup'
import { InviteEmail } from './invite'
import { MagicLinkEmail } from './magic-link'
import { RecoveryEmail } from './recovery'
import { EmailChangeEmail } from './email-change'
import { ReauthenticationEmail } from './reauthentication'

// Public previews use fictional data only; this module never imports send helpers.
const siteName = 'ResoluxToolkit - Landing'
const sample = { siteName, siteUrl: 'https://resolux.app', confirmationUrl: 'https://example.test/preview' }

export async function renderAuthEmailPreview(type: string) {
  const render = (element: Parameters<typeof renderToStaticMarkup>[0]) => `<!doctype html>${renderToStaticMarkup(element)}`
  switch (type) {
    case 'signup': return render(<SignupEmail {...sample} recipient="user@example.test" />)
    case 'invite': return render(<InviteEmail {...sample} />)
    case 'magiclink': return render(<MagicLinkEmail {...sample} />)
    case 'recovery': return render(<RecoveryEmail {...sample} />)
    case 'email_change': return render(<EmailChangeEmail {...sample} oldEmail="user@example.test" email="new@example.test" newEmail="new@example.test" />)
    case 'reauthentication': return render(<ReauthenticationEmail token="123456" />)
    default: throw new Error('Unknown preview template')
  }
}