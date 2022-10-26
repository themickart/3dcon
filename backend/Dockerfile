FROM golang:1.19 AS build

WORKDIR /app

COPY . ./
RUN go mod download

RUN go build -o /backend

## Deploy
FROM gcr.io/distroless/base-debian10

WORKDIR /

COPY --from=build /backend /backend

EXPOSE 8080

USER nonroot:nonroot

ENTRYPOINT ["/backend"]