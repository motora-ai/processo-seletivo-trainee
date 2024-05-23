# Backend de Testes

O servidor, desenvolvido com NestJS, é projetado para fornecer informações em tempo real sobre veículos. Ele lê dados de veículos de um arquivo JSON localizado em [`src/vehicles/vehicles.data.json`](src/vehicles/vehicles.data.json) e os armazena na memória. Esses dados incluem informações básicas sobre cada veículo.

Além disso, o servidor gera e transmite dados aleatórios de posição e velocidade de veículos em tempo real para os clientes conectados. Isso é feito através de um WebSocket, implementado na classe [`VehiclesGateway`](src/vehicles/vehicles.gateway.ts). A cada segundo, o servidor seleciona um veículo aleatório e gera novos dados de latitude, longitude e velocidade para ele. Esses dados são então enviados para todos os clientes conectados.

Os clientes podem se conectar ao WebSocket e começar a receber esses dados em tempo real. Um exemplo de cliente que se conecta ao WebSocket e recebe esses dados pode ser encontrado em [`src/client/index.html`](src/client/index.html).

## Começando

Para começar a usar este projeto, clone o repositório e instale as dependências com `npm install`.

## Executando o servidor

Para executar o servidor, use o comando `npm run start`.

## Recursos

### Rota de Informações de Veículos

Para receber informações iniciais dos veículos faça um requisição `GET` no endereço `http://localhost:3000/vehicles`. O servidor deverá retornar uma resposta com status 200 e o seguinte JSON no corpo da resposta:

```json
[
  {
    "id": number,
    "type": string,
    "lat": number,
    "lng": number,
    "speed": number,
    "status": string // "stopped" ou "moving"
  },
]
```

### Websocket

O websocket é atualizado com informações em tempo real de cada veículo. Para realizar a conexão utilize a biblioteca [Socket.IO](https://socket.io/docs/v4/client-api/) e utilize o endereço `http://localhost:3000/vehicles/ws`. As mensagens enviadas possuem o seguinte formato:

```json
{
  "data": {
    "id": number,
    "type": string,
    "lat": number,
    "lng": number,
    "speed": number,
    "status": string // "stopped" ou "moving"
  }
}
```
