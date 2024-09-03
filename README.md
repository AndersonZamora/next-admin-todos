
## Development
Pasos para levantar la app en desarrollo

1. Levantas la base de datos Postgres
```
docker compose up -d
```
2. Renombra el .env.template a .env
3. Remplazar las variables de entorno
4. Ejecutar le SEED para [crear la base de datos](http://localhost:3000/api/seed)
5. Ejecutar el comando npm run dev para ejecutar aplicación en desarrollo
6. Ejecutar estos comandos de Prisma


## Prisma commnads

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

7. Ejecutar el SEED para crear la base de datos local

## Nota: Usuario por defecto

usuario: test1@google.com password: 123456

