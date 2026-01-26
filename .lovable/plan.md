
# Plano: Corrigir a Sombra da Hero no Efeito de Scroll

## Problema Identificado

Quando o usuário rola a página, a Hero está sendo escalada para 85% (`scale: 0.85`), o que faz ela ficar menor que a tela. Como a Hero tem fundo preto e o container sticky tem `z-0`, a área preta ao redor da Hero escalada fica visível nas bordas da seção About (como mostrado na imagem - a borda preta na lateral esquerda).

## Solução Proposta

A solução é adicionar um fundo no container sticky que combine com a cor da seção About (`bg-secondary/30` que é um cinza claro). Assim, quando a Hero for escalada, o espaço ao redor dela terá a mesma cor da próxima seção, eliminando a "sombra" preta.

## Alterações Técnicas

### Arquivo: `src/components/ui/hero-scroll-animation.tsx`

**Linha 23 - AnimatedHero container:**
- Atual: `<div className="sticky top-0 h-screen z-0">`
- Novo: `<div className="sticky top-0 h-screen z-0 bg-secondary/30">`

Esta simples adição de `bg-secondary/30` no container sticky faz com que:
1. Quando a Hero escala para 85%, o espaço revelado ao redor seja da mesma cor da seção About
2. A transição entre Hero e About fica visualmente suave e sem bordas pretas visíveis
3. O efeito de animação continua funcionando normalmente (scale, rotate, borderRadius)
4. Funciona tanto no mobile quanto no desktop

## Por que Esta Solução Funciona

A estrutura atual:
```text
[Container sticky z-0] → fundo transparente (problema!)
  └── [Motion div com Hero] → fundo preto, escalado para 85%
```

Com a correção:
```text
[Container sticky z-0 bg-secondary/30] → fundo cinza claro
  └── [Motion div com Hero] → fundo preto, escalado para 85%
```

O espaço de ~15% ao redor da Hero escalada agora mostra `bg-secondary/30` (a mesma cor da seção About), criando uma transição invisível.

## Impacto

- **Nenhuma funcionalidade afetada** - apenas CSS visual
- **Zero alterações** no resto do site
- **Responsividade mantida** - funciona igual em todos os dispositivos
- **Fluidez mantida** - animações Framer Motion não são afetadas
