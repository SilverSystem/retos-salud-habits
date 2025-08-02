# Cómo correr el proyecto localmente

## Requisitos previos

- Tener instalado:
  - [Docker](https://www.docker.com/)
  - [Docker Compose](https://docs.docker.com/compose/)

- Crear un archivo `.env` en la raíz del proyecto usando el de ejemplo:

```
    cp .env.sample .env
```

- Inicie docker
```
    docker-compose up
```

- Una vez iniciado se puede encontrar la documentacion en 
```
    http://localhost:${PUERTO_DEFINIDO_ENV}$/docs
```