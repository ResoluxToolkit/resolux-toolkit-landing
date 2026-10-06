# Front-end web do ResoluxToolkit em projeto separado

## Objetivo
Criar um novo projeto Lovable, com repositório próprio, para transformar os mockups enviados em uma interface web real do ResoluxToolkit. A landing page atual permanece independente e não será alterada.

## Organização
- Criar um novo projeto para o produto web, separado desta landing page.
- Usar os três mockups como referência visual, sem incorporá-los como imagens na aplicação.
- Reaproveitar neste novo projeto o contexto do ResoluxToolkit por meio de uma menção ao projeto atual ou reenviando a documentação relevante.
- Manter o motor Swift no macOS como camada separada; este trabalho cobre apenas a interface web e os contratos necessários para conectá-la futuramente.

## Primeira entrega
- Reconstruir em React e HTML semântico a tela principal do Assistente.
- Implementar a navegação superior: Quick Play, Câmera, Monitor, Assistente, Starter e Ajustes.
- Implementar a lista lateral de conversas e capacidades.
- Implementar a conversa central, mensagens, ações rápidas, indicador de processamento, contexto e composer.
- Implementar o painel lateral de fontes, memória e estado da conexão.
- Criar comportamento adaptável para telas menores, convertendo os painéis laterais em áreas acessíveis sem sobreposição.
- Criar estados demonstráveis para repouso, foco, processamento, gravação, conexão, fonte ativa/inativa e agente trabalhando.

## Direção visual
- Preservar o conceito Liquid Glass: superfícies translúcidas discretas, bordas luminosas finas, profundidade controlada e fundo quase preto.
- Manter laranja como marca; verde, vermelho, azul e violeta apenas para estados funcionais.
- Traduzir os valores do mockup para tokens semânticos, garantindo contraste, foco por teclado e consistência.
- Usar animações sutis e desativáveis quando o sistema pedir redução de movimento.

## Libraries Pro
- Ler as referências oficiais antes de instalar ou configurar qualquer efeito.
- Usar **Thinking Orbs** para os estados reais do agente: ocioso, ouvindo, buscando, escrevendo e trabalhando.
- Usar **Border Beam** no campo de comando somente enquanto uma ação demorada estiver sendo processada.
- Usar **Voice Glow** apenas quando captura de voz estiver ativa.
- Não empilhar efeitos no mesmo elemento nem usar efeitos WebGL onde uma solução leve for suficiente.
- Vincular todas as animações a estados reais da interface, nunca como decoração contínua.

## Interações da versão inicial
- Alternar entre conversas e abas principais.
- Enviar uma mensagem simulada e visualizar os estados de processamento e resposta.
- Acionar e interromper o modo de voz demonstrativo.
- Abrir as fontes e o painel de memória.
- Exibir estados claros para conexão, gravação, carregamento, vazio e erro.
- Manter os dados simulados isolados para substituição posterior pela comunicação com o motor Swift.

## Fora desta primeira etapa
- Comunicação real com o motor Swift.
- Persistência de conversas e memória.
- Captura real de câmera, áudio ou monitor do Arena.
- Autenticação e distribuição do produto.

## Verificação
- Conferir fidelidade visual contra os mockups em desktop.
- Testar adaptação para notebook, tablet e celular.
- Testar teclado, foco, contraste e redução de movimento.
- Validar cada estado da interface e confirmar que não há textos ou controles sobrepostos.

## Próximo passo
Criar o novo projeto Lovable e, dentro dele, mencionar este projeto com `@` e anexar novamente os três mockups. A implementação deve acontecer no novo projeto para que ele já nasça no repositório correto.
