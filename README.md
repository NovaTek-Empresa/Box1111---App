# BOX1111 - Frontend React (Vite)

Conversão do `APP-TESTE.HTML` para um frontend React minimal (sem backend). O objetivo foi manter o frontend visual e as principais interações simuladas localmente.

Como rodar (Windows PowerShell):

1. Instale dependências:

```powershell
npm install
```

2. Rode em modo desenvolvimento:

```powershell
npm run dev
```

3. Abra no navegador o endereço que o `vite` imprimir (normalmente http://localhost:5173).

Notas:
- A splash screen foi removida conforme solicitado.
- Toda a lógica está simulada em memória (sem servidor). Para persistência, podemos adicionar localStorage ou uma API.
- Se quiser, eu converto tudo para TypeScript, separar componentes em arquivos separados, ou incorporar TODO o CSS original em `src/styles.css`.
 
Dicas para teste:
- Usuário administrador: `admin@box1111.com` (senha não verificada, login simulado)
- Usuário vendedor: `vendedor@box1111.com`
- Usuário comprador: `cliente@box1111.com`
