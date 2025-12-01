# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




npm run build //after frontend changes


.env File sollte auf den connection-string agepasst werden der mongoDB



ToDO:
Mock auth middleware 
?middleware for logging in?
DB and routes connection to DB



Add User over Insomnia:

1. POST:   http://localhost:3000/api/register
JSON {"email":""}


2. PUT:   localhost:3000/api/register/<emailtoken from mongoDB>
JSON {
	"first_name":"",
	"last_name":"",
	"password":""
}

3. POST: localhost:3000/api/token
Form URL Encoded: 
    grant_type      password
    username        <aus user_auth>
    password        <welches man hergegeben hat bei 2.>
    client_id       client

4. POST: localhost:3000/api/todo/
JSON {
    "title":""
}

HEADER: Add:
    authorization       "Bearer <access_token>"
    

5. permission unter user table auf write: true


r6. Falls access Token abgelaufen:
    POST: localhost:3000/api/token
        grant_type      refresh_token
        client_id       client        
        refresh_token   <refreshtoken>



