# Landing page base — ResoluxToolkit

## Objetivo
Criar uma landing page bilíngue (português e inglês) para operadores de Resolume, apresentando o ResoluxToolkit e captando interessados para a lista de lançamento.

## Estrutura da página
- **Topo compacto:** marca ResoluxToolkit, navegação curta, seletor PT/EN e botão “Entrar na lista”.
- **Primeira tela:** proposta direta para operadores de Resolume, benefício principal e formulário de e-mail visível imediatamente.
- **Produto em ação:** composição inspirada nas três referências enviadas, mostrando o assistente, monitoramento do Arena e estados do sistema sem reutilizar as imagens como conteúdo bruto.
- **Benefícios:** controle assistido, monitoramento em tempo real, operação local/offline e segurança por padrão.
- **Como funciona:** conexão com o Resolume Arena, leitura do set e assistência contextual.
- **Estado do projeto:** apresentação honesta do macOS como foco atual, com iOS ainda em evolução.
- **Chamada final:** segundo formulário para entrar na lista.
- **Rodapé:** marca, idioma e aviso de produto em desenvolvimento.

## Direção visual
- Seguir a identidade das referências: fundo quase preto, superfícies de vidro discretas, bordas finas e laranja como cor principal.
- Usar verde, azul, vermelho e violeta somente como sinais funcionais de status.
- Tipografia sem serifa, interface densa e profissional, com aparência nativa do ecossistema Apple.
- Animações leves nos indicadores e contornos, respeitando a preferência de movimento reduzido.
- Layout completo para celular e computador, sem sobreposição de textos ou controles.

## Lista de interessados
- Ativar Lovable Cloud para armazenar cada inscrição com e-mail, idioma e data.
- Validar o e-mail no navegador e no envio, limitar tentativas repetidas e impedir leitura pública da lista.
- Exibir estados claros de envio, sucesso e erro nos dois idiomas.
- As inscrições ficarão disponíveis em **Cloud → Database → waitlist_signups**.
- E-mails automáticos ao proprietário não serão ativados nesta primeira versão, pois ainda não há endereço nem domínio de envio verificado informados.

## Conteúdo e precisão
- Basear os textos somente no que a documentação confirma: macOS, integração com Arena, monitor, assistente local, Foundation Models/Ollama e política segura de escrita.
- Não prometer recursos que ainda aparecem como roadmap, especialmente uma experiência iOS completa.
- Criar títulos, descrições e compartilhamento social específicos para a página em português e inglês.

## Verificação
- Testar troca de idioma, navegação e os dois formulários em celular e computador.
- Fazer uma inscrição de teste, confirmar que ela chegou à lista e remover apenas esse registro de teste.
- Conferir contraste, foco por teclado, redução de movimento e ausência de erros visíveis.

## Detalhes técnicos
- Manter a página principal em `/` e usar os componentes e tokens visuais do projeto.
- Implementar o seletor de idioma na própria página, preservando a escolha durante a visita.
- Usar funções seguras no servidor para gravar inscrições; a lista nunca será exposta ao navegador.
