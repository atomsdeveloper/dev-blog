## Applications

SSR - Renderização no lado do servidor.
CSR - Renderização no lado do cliente.
ISR - Renderização estática incremental.

- Por padrão o next usa rotas `static` mas podemos _forçar_ a usar rotas `dynamic`, como por exemplo, adicionado uma nova rota com parâmetro.

## Rotas

### Static

Rotas definidas com o caminho fixo, como `/home` ou `/sobre`.

Usado com SSG estrega o HTML pronto.

### Dynamic

Rotas que usando parâmetros, como `/post/:id` ou `/user/:username`.

Não entrega nada pronto.

### Static ISR

Entrega o HTML pronto (SSG). A página pode ser atualizada (Dynamic) se modificando de Static para Dynamic.

## Rotas App

| Rota               | Acesso  | Renderização | Method        |
| ------------------ | ------- | ------------ | ------------- |
| `/`                | Pública | CSR          | None          |
| `/post/[slug]`     | Pública | SSG          | None          |
| `/admin/post`      | Privado | SSG          | Read / Delete |
| `/admin/post/[id]` | Privado | SSG          | Update        |
| `/admin/post/new`  | Privado | SSG          | Create        |
| `/admin/login`     | Pública | SSG          | None          |
