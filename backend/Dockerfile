FROM golang:1.19 AS build

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o /backend cmd/app/main.go


FROM gcr.io/distroless/base-debian10

WORKDIR /

COPY --from=build /backend /backend

EXPOSE 8080

USER root

ENTRYPOINT ["/backend"]