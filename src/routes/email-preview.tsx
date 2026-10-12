import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ArrowLeft, Check, ChevronRight, Mail, Monitor, Smartphone, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { getAuthEmailPreviews } from '@/lib/email-templates/auth-preview.functions'

const previewOptions = queryOptions({ queryKey: ['auth-email-previews'], queryFn: () => getAuthEmailPreviews(), staleTime: Infinity })

export const Route = createFileRoute('/email-preview')({
  validateSearch: (search: Record<string, unknown>): { template?: string; mobile?: boolean } => ({ template: typeof search['template'] === 'string' ? search['template'] : 'signup', mobile: search['mobile'] === true || search['mobile'] === 'true' }),
  loader: ({ context }) => context.queryClient.ensureQueryData(previewOptions),
  errorComponent: () => <p role="alert">Não foi possível carregar os modelos de e-mail.</p>,
  notFoundComponent: () => <p>Prévia não encontrada.</p>,
  head: () => ({ meta: [
    { title: 'ResoluxToolkit — Prévia dos e-mails de autenticação' },
    { name: 'description', content: 'Visualize os seis modelos de e-mail de autenticação do ResoluxToolkit, sem enviar mensagens.' },
    { property: 'og:title', content: 'ResoluxToolkit — Prévia dos e-mails' },
    { property: 'og:description', content: 'Confirmação, convite, acesso, recuperação, troca de e-mail e código de verificação.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: EmailPreviewPage,
})

const templates = [
  { id: 'signup', pt: 'Confirmação de cadastro', en: 'Confirm signup', subject: 'Confirm your email' },
  { id: 'invite', pt: 'Convite', en: 'Invitation', subject: "You've been invited" },
  { id: 'magiclink', pt: 'Link de acesso', en: 'Magic link', subject: 'Your login link' },
  { id: 'recovery', pt: 'Redefinição de senha', en: 'Password reset', subject: 'Reset your password' },
  { id: 'email_change', pt: 'Troca de e-mail', en: 'Email change', subject: 'Confirm your new email' },
  { id: 'reauthentication', pt: 'Código de verificação', en: 'Verification code', subject: 'Your verification code' },
] as const

function EmailPreviewPage() {
  const { data: previews } = useSuspenseQuery(previewOptions)
  const [locale, setLocale] = useState<'pt' | 'en'>('pt')
  const { template: requested = 'signup', mobile = false } = Route.useSearch()
  const current = templates.find(t => t.id === requested) ?? templates[0]
  const selected = current.id
  const pt = locale === 'pt'

  useEffect(() => {
    if (window.localStorage.getItem('resolux-locale') === 'en') setLocale('en')
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link to="/" className="brand"><span className="brand-glyph"><Sparkles /></span>ResoluxToolkit</Link>
          <Button asChild variant="ghost" size="sm"><Link to="/"><ArrowLeft className="size-4" />{pt ? 'Voltar ao site' : 'Back to site'}</Link></Button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase text-primary"><Mail className="size-4" />{pt ? 'Autenticação' : 'Authentication'}</p>
        <h1 className="text-3xl font-semibold sm:text-4xl">{pt ? 'Prévia dos e-mails' : 'Email previews'}</h1>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span>6 {pt ? 'modelos' : 'templates'}</span>
          <span className="flex items-center gap-2"><Check className="size-4 text-success" />{pt ? 'Nenhum e-mail será enviado' : 'No emails will be sent'}</span>
        </div>
        <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <nav aria-label={pt ? 'Modelos de e-mail' : 'Email templates'} className="grid content-start gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {templates.map((template, index) => (
              <Button asChild key={template.id} variant={selected === template.id ? 'outline' : 'ghost'} className={`h-auto min-h-14 justify-start whitespace-normal px-4 py-3 text-left text-sm ${selected === template.id ? 'border-primary/50 bg-accent' : ''}`}>
                <a href={`/email-preview?template=${template.id}&mobile=${mobile}`} aria-current={selected === template.id ? 'page' : undefined}>
                <span className="shrink-0 text-xs text-muted-foreground">0{index + 1}</span>
                <span className="flex-1">{template[locale]}</span>
                {selected === template.id && <ChevronRight className="size-4 shrink-0 text-primary" />}
                </a>
              </Button>
            ))}
          </nav>
          <section aria-label={current[locale]} className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">{current[locale]}</h2>
              <div className="flex gap-1 rounded-md border border-border p-1" role="group" aria-label={pt ? 'Tamanho da prévia' : 'Preview size'}>
                <Button asChild variant={mobile ? 'ghost' : 'outline'} size="icon-sm"><a href={`/email-preview?template=${selected}&mobile=false`} title="Desktop" aria-label="Desktop"><Monitor className="size-4" /></a></Button>
                <Button asChild variant={mobile ? 'outline' : 'ghost'} size="icon-sm"><a href={`/email-preview?template=${selected}&mobile=true`} title={pt ? 'Celular' : 'Mobile'} aria-label={pt ? 'Celular' : 'Mobile'}><Smartphone className="size-4" /></a></Button>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-border">
              <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 border-b border-border bg-card px-5 py-4 text-sm">
                <dt className="text-muted-foreground">{pt ? 'De' : 'From'}</dt><dd className="min-w-0 break-words">ResoluxToolkit - Landing &lt;noreply@resolux.app&gt;</dd>
                <dt className="text-muted-foreground">{pt ? 'Para' : 'To'}</dt><dd className="break-words">{selected === 'email_change' ? 'new@example.test' : 'user@example.test'}</dd>
                <dt className="text-muted-foreground">{pt ? 'Assunto' : 'Subject'}</dt><dd className="break-words font-medium">{current.subject}</dd>
              </dl>
              <div className="flex min-h-[540px] justify-center bg-muted p-3 sm:p-6">
                <iframe key={selected} title={`${pt ? 'Prévia' : 'Preview'}: ${current[locale]}`} srcDoc={previews[selected]} sandbox="" className={`h-[520px] min-w-0 rounded-md border-0 ${mobile ? 'w-[375px] max-w-full' : 'w-full'}`} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}