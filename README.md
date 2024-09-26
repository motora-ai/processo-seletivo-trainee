# Backend de Testes

O servidor, desenvolvido com NestJS, é projetado para fornecer informações em tempo real sobre veículos. Ele lê dados de veículos de um arquivo JSON localizado em [`src/vehicles/vehicles.data.json`](src/vehicles/vehicles.data.json) e os armazena na memória. Esses dados incluem informações básicas sobre cada veículo.

Além disso, o servidor gera e transmite dados aleatórios de posição e velocidade de veículos em tempo real para os clientes conectados. Isso é feito através de um WebSocket, implementado na classe [`VehiclesGateway`](src/vehicles/vehicles.gateway.ts). A cada segundo, o servidor seleciona um veículo aleatório e gera novos dados de latitude, longitude e velocidade para ele. Esses dados são então enviados para todos os clientes conectados.

Os clientes podem se conectar ao WebSocket e começar a receber esses dados em tempo real. Um exemplo de cliente que se conecta ao WebSocket e recebe esses dados pode ser encontrado em [`src/client/index.html`](src/client/index.html).

## Começando

Para começar a usar este projeto, clone o repositório e instale as dependências com `npm install`.

## Executando o servidor

Para executar o servidor, use o comando `npm run start`.

## Recursos

### Rota de Informações de Veículos (GET)

Para receber informações iniciais dos veículos faça um requisição `GET` no endereço `http://localhost:3000/vehicles`. O servidor deverá retornar uma resposta com status 200 e o seguinte JSON no corpo da resposta:

```json
[
  {
    "id": number,
    "type": string,
    "placa": string,
    "lat": number,
    "lng": number,
    "speed": number,
    "status": string // "stopped" ou "moving"
  },
  ...
]
```

### Rota de Obtenção de Veículo Específico (GET)

Para obter informações de um veículo específico, faça uma requisição GET no endereço http://localhost:3000/vehicles/{id}. O servidor deverá retornar uma resposta com status 200 e o seguinte JSON no corpo da resposta:

```json
  {
    "id": number,
    "type": string,
    "placa": string,
    "lat": number,
    "lng": number,
    "speed": number,
    "status": string // "stopped" ou "moving"
  }
```

### Rota de Criação de Veículo (POST)

Para criar um novo veículo, faça uma requisição POST no endereço http://localhost:3000/vehicles com o seguinte JSON no corpo da requisição, contendo os dados do veículo a ser salvo:

```json
  {
    "type": string,
    "placa": string,
  }
```

O servidor deverá retornar uma resposta com status 201 e o seguinte JSON no corpo da resposta, contendo as informações do novo veículo criado:

```json
  {
    "id": number,
    "type": string,
    "placa": string,
    "lat": number,
    "lng": number,
    "speed": number,
    "status": string // "stopped" ou "moving"
  }
```

### Rota de Atualização de Veículo (PUT)

Para atualizar as informações de um veículo existente, faça uma requisição PUT no endereço http://localhost:3000/vehicles/{id} com o seguinte JSON no corpo da requisição, contendo os dados a serem modificados:

```json
  {
    "type": string,
    "placa": string,
    "lat": number,
    "lng": number,
    "speed": number,
    "status": string // "stopped" ou "moving"
  }
```

O servidor deverá retornar uma resposta com status 200 e o seguinte JSON no corpo da resposta, com os dados do veículo atualizado:

```json
  {
    "type": string,
    "placa": string,
    "lat": number,
    "lng": number,
    "speed": number,
    "status": string // "stopped" ou "moving"
  }
```

### Rota de Exclusão de Veículo (DELETE)

Para excluir um veículo, faça uma requisição DELETE no endereço http://localhost:3000/vehicles/{id}. O servidor deverá retornar uma resposta com status 204 (sem conteúdo), indicando que a operação foi realizada com sucesso.

### Veículo Não Encontrado

Em todos os casos, se o veículo não for encontrado, o servidor deverá retornar uma resposta com status 404 e o seguinte JSON no corpo da resposta:

```json
{
  "message": "Vehicle not found",
  "error": "Not Found",
  "statusCode": 404
}
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
