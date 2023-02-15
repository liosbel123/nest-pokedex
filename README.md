<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar

```
npm install
```

3. Tener Nest CLI instalado

````
npm install -g @nestjs/cli
```

4. Levantar la BD
```
docker-compose up -d
```
5. Clonar el archivo _.env.example_ y renombrar a _.env_
6. Llenar las variables de entorno definidas
7. Ejecutar la aplicación en dev
```
npm rum start:dev
```
8. Reconstruir la base de datos con una semilla
```
http://localhost:3000/api/v2/seed
```

## Stack usado
*MongoDB
*NestJS

# Production Build
1. Crear archivo ````.env.prod```
2. Llenar las variables de entorno de producción
3. Crear la imagen 
````
docker-composer -f docker-compose.prod.yml --env-file .env.prod up --build
```

