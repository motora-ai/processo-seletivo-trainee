# Backend de Testes

O servidor, desenvolvido com NestJS, é projetado para fornecer informações em tempo real sobre veículos. Ele lê dados de veículos de um arquivo JSON localizado em [`src/vehicles/vehicles.data.json`](src/vehicles/vehicles.data.json), dados de motoristas do arquivo [`src/drivers/drivers.data.json`], e dados de viagens do arquivo [`src/travels/travels.data.json`] e os armazena na memória. Esses dados incluem informações básicas sobre cada entidade do domínio do sistema.

Além disso, o servidor gera e transmite dados aleatórios em tempo real para os clientes conectados. Isso é feito através de WebSockets para veículos, motoristas e viagens. A cada vez que uma dessas entidades for criada, modificada ou deletada o socket enviará as atualizações para o cliente. Esses dados são então enviados para todos os clientes conectados.

Um exemplo de cliente que se conecta aos WebSockets e recebe esses dados pode ser encontrado em [`src/client/index.html`](src/client/index.html).

## Começando

Para começar a usar este projeto, clone o repositório e instale as dependências com o comando:

```$ npm install```

## Executando o servidor

Para executar o servidor, use o comando: 
```$ npm run start```.

## Recursos

### Veículos

#### Rota de Informações de Veículos (GET)

##### Get todos os veículos
Para receber informações iniciais dos veículos faça um requisição `GET` no endereço `http://localhost:3000/vehicles`. O servidor deverá retornar uma resposta com status 200 e o seguinte JSON no corpo da resposta:

```json
[
  {
    "id": number,
    "type": string,
    "plate": string,
    "lat": number,
    "lng": number,
    "speed": number,
    "status": string // "stopped" ou "moving"
  },
  ...
]
```

##### Get por status
Também é possível realizar o get por status do veículo. Para receber os veículos em status "stopped" faça um requisição `GET` no endereço `http://localhost:3000/vehicles/vehiclesByStatus/stopped`; para receber os veículos em status "moving" faça um requisição `GET` no endereço `http://localhost:3000/vehicles/vehiclesByStatus/moving`.

#### Rota de Obtenção de Veículo Específico (GET)

Para obter informações de um veículo específico, faça uma requisição GET no endereço `http://localhost:3000/vehicles/{id}`. O servidor deverá retornar uma resposta com status 200 e o seguinte JSON no corpo da resposta:

```json
  {
    "id": number,
    "type": string,
    "plate": string,
    "lat": number,
    "lng": number,
    "speed": number,
    "status": string // "stopped" ou "moving"
  }
```

#### Rota de Criação de Veículo (POST)

Para criar um novo veículo, faça uma requisição POST no endereço `http://localhost:3000/vehicles` com o seguinte JSON no corpo da requisição, contendo os dados do veículo a ser salvo:

```json
  {
    "type": string,
    "plate": string,
  }
```

O servidor deverá retornar uma resposta com status 201 e o seguinte JSON no corpo da resposta, contendo as informações do novo veículo criado:

```json
  {
    "id": number,
    "type": string,
    "plate": string,
    "lat": number,
    "lng": number,
    "speed": number,
    "status": string // "stopped" ou "moving"
  }
```

#### Rota de Atualização de Veículo (PUT ou PATCH)

##### Atualização completa dos dados(PUT)
Para atualizar todas as informações de um veículo existente, faça uma requisição PUT no endereço `http://localhost:3000/vehicles/{id}` com o seguinte JSON no corpo da requisição, contendo os dados a serem modificados:

```json
  {
    "type": string,
    "plate": string,
    "lat": number,
    "lng": number,
    "speed": number,
    "status": string // "stopped" ou "moving"
  }
```

##### Atualização parcial dos dados (PATCH)
Para atualizar apenas um subconjunto das informações de um veículo existente, faça uma requisição PATCH no endereço `http://localhost:3000/vehicles/{id}` com um JSON no corpo da requisição com alguma das propriedades de veículo, contendo os dados a serem modificados, como exemplo, para alterar a propriedade `type`:

```json
  {
    "type": string
  }
```

##### Retorno do endpoint
O servidor deverá retornar uma resposta com status 200 e o seguinte JSON no corpo da resposta, com os dados do veículo atualizado:

```json
  {
    "type": string,
    "plate": string,
    "lat": number,
    "lng": number,
    "speed": number,
    "status": string // "stopped" ou "moving"
  }
```

#### Rota de Exclusão de Veículo (DELETE)

Para excluir um veículo, faça uma requisição DELETE no endereço `http://localhost:3000/vehicles/{id}`. O servidor deverá retornar uma resposta com status 204 (sem conteúdo), indicando que a operação foi realizada com sucesso.

#### Veículo Não Encontrado

Em todos os casos, se o veículo não for encontrado, o servidor deverá retornar uma resposta com status 404 e o seguinte JSON no corpo da resposta:

```json
{
  "message": "Vehicle not found",
  "error": "Not Found",
  "statusCode": 404
}
```

#### Websocket de veículo

O websocket é atualizado com informações em tempo real de cada veículo. Para realizar a conexão utilize a biblioteca [Socket.IO](https://socket.io/docs/v4/client-api/) e utilize o endereço `http://localhost:3000/vehicles/ws`. As mensagens enviadas possuem o seguinte formato de resposta:

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

Os canais disponíveis para conexão no websocket de veículos são:

- `vehicle-created`: canal de notificação de criações de veículos
- `vehicle-updated`: canal de notificação de atualizações de veículos
- `vehicle-deleted`: canal de notificações de deleção de veículos
