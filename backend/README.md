# Как запустить?
1. скачать [docker](https://docs.docker.com/desktop/install/windows-install/)
2. из 3dcon\backend
```sh
    docker compose up --build
```
когда запустится перейти на **http://localhost:8080/swagger/index.html**

# db
host=localhost port=5432 dbname=3dcon user=user password=password sslmode=disable