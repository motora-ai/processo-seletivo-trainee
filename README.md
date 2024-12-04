# Backend de Testes

O servidor, desenvolvido com NestJS, é projetado para fornecer informações em tempo real sobre veículos. Ele lê dados de veículos de um arquivo JSON localizado em [`src/vehicles/vehicles.data.json`](src/vehicles/vehicles.data.json), dados de motoristas do arquivo [`src/drivers/drivers.data.json`], e dados de viagens do arquivo [`src/travels/travels.data.json`] e os armazena na memória. Esses dados incluem informações básicas sobre cada entidade do domínio do sistema.

Além disso, o servidor gera e transmite dados aleatórios em tempo real para os clientes conectados. Isso é feito através de WebSockets para veículos, motoristas e viagens. A cada vez que uma dessas entidades for criada, modificada ou deletada o socket enviará as atualizações para o cliente. Esses dados são então enviados para todos os clientes conectados.

Um exemplo de cliente que se conecta aos WebSockets e recebe esses dados pode ser encontrado em [`src/client/index.html`](src/client/index.html).

## Começando

Para começar a usar este projeto, clone o repositório e instale as dependências com o comando:

```bash
$ npm install
```

## Executando o servidor

Para executar o servidor, use o comando:

```bash
$ npm run start
```

## Executando o simulador

Um simulador é disponibilizado junto a este projeto para criar, encerrar e atualizar viagens. Para rodá-lo, utilize o comando:

```bash
$ npm run simulate
```

## Testando as requisições com o Insomnia

Na pasta [`resources`](resources), você pode encontrar uma coleção de requisições que podem ser importadas no Insomnia para testar as chamadas para este sistema. Elas estão dividas por entidade e documentam todos os recursos disponíveis para utilização.

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

### Motoristas

#### Rota de Informações de Motoristas (GET)

##### Get todos os motoristas

Para receber informações iniciais dos motoristas faça um requisição `GET` no endereço `http://localhost:3000/drivers`. O servidor deverá retornar uma resposta com status 200 e o seguinte JSON no corpo da resposta:

```json
[
  {
    "id": number,
    "name": string,
    "cpf": string,
    "cnh": string,
    "status": string // "driving" ou "idle"
  },
  ...
]
```

##### Get por status

Também é possível realizar o get por status do motorista. Para receber os motoristas em status "driving" faça um requisição `GET` no endereço `http://localhost:3000/drivers/driversByStatus/driving`; para receber os motoristas em status "idle" faça um requisição `GET` no endereço `http://localhost:3000/drivers/driversByStatus/idle`.

#### Rota de Obtenção de Motorista Específico (GET)

Para obter informações de um motorista específico, faça uma requisição GET no endereço `http://localhost:3000/drivers/{id}`. O servidor deverá retornar uma resposta com status 200 e o seguinte JSON no corpo da resposta:

```json
  {
    "id": number,
    "name": string,
    "cpf": string,
    "cnh": string,
    "status": string // "driving" ou "idle"
  }
```

#### Rota de Criação de Motorista (POST)

Para criar um novo motorista, faça uma requisição POST no endereço `http://localhost:3000/drivers` com o seguinte JSON no corpo da requisição, contendo os dados do motorista a ser salvo:

```json
  {
    "name": string,
    "cpf": string,
    "cnh": string,
  }
```

O servidor deverá retornar uma resposta com status 201 e o seguinte JSON no corpo da resposta, contendo as informações do novo motorista criado:

```json
  {
    "id": number,
    "name": string,
    "cpf": string,
    "cnh": string,
    "status": string = "idle"
  }
```

#### Rota de Atualização de Motorista (PUT ou PATCH)

##### Atualização completa dos dados(PUT)

Para atualizar todas as informações de um motorista existente, faça uma requisição PUT no endereço `http://localhost:3000/drivers/{id}` com o seguinte JSON no corpo da requisição, contendo os dados a serem modificados:

```json
  {
    "name": string,
    "cpf": string,
    "cnh": string,
    "status": string,
  }
```

##### Atualização parcial dos dados (PATCH)

Para atualizar apenas um subconjunto das informações de um motorista existente, faça uma requisição PATCH no endereço `http://localhost:3000/drivers/{id}` com um JSON no corpo da requisição com alguma das propriedades de motorista, contendo os dados a serem modificados, como exemplo, para alterar a propriedade `name`:

```json
  {
    "name": string,
  }
```

##### Retorno do endpoint

O servidor deverá retornar uma resposta com status 200 e o seguinte JSON no corpo da resposta, com os dados do motorista atualizado:

```json
  {
    "name": string,
    "cpf": string,
    "cnh": string,
    "status": string,
  }
```

#### Rota de Exclusão de Motorista (DELETE)

Para excluir um motorista, faça uma requisição DELETE no endereço `http://localhost:3000/drivers/{id}`. O servidor deverá retornar uma resposta com status 204 (sem conteúdo), indicando que a operação foi realizada com sucesso.

#### Motorista Não Encontrado

Em todos os casos, se o motorista não for encontrado, o servidor deverá retornar uma resposta com status 404 e o seguinte JSON no corpo da resposta:

```json
{
  "message": "Driver not found",
  "error": "Not Found",
  "statusCode": 404
}
```

#### Websocket de motorista

O websocket é atualizado com informações em tempo real de cada motorista. Para realizar a conexão utilize a biblioteca [Socket.IO](https://socket.io/docs/v4/client-api/) e utilize o endereço `http://localhost:3000/drivers/ws`. As mensagens enviadas possuem o seguinte formato de resposta:

```json
{
  "data": {
    "id": number,
    "name": string,
    "cpf": string,
    "cnh": string,
    "status": string,
  }
}
```

Os canais disponíveis para conexão no websocket de motoristas são:

- `driver-created`: canal de notificação de criações de motoristas
- `driver-updated`: canal de notificação de atualizações de motoristas
- `driver-deleted`: canal de notificações de deleção de motoristas

### Viagens

#### Rota de Informações de Viagens (GET)

##### Get todas as viagens

Para receber informações iniciais das viagens faça um requisição `GET` no endereço `http://localhost:3000/travels`. O servidor deverá retornar uma resposta com status 200 e o seguinte JSON no corpo da resposta:

```json
[
  {
    "id": number,
    "driverId": number,
    "vehicleId": number,
    "status": string, // "finished" ou "ongoing"
    "start": string,
    "end": string,
  },
  ...
]
```

##### Get por status

Também é possível realizar o get por status da viagem. Para receber as viagens com status "ongoing" faça um requisição `GET` no endereço `http://localhost:3000/travels/travelsByStatus/ongoing`; para receber as viagens com status "completed" faça um requisição `GET` no endereço `http://localhost:3000/travels/travelsByStatus/completed`. O servidor deverá retornar uma resposta com status 200 e o seguinte JSON no corpo da resposta:

```json
[
  {
    "id": number,
    "driverId": number,
    "vehicleId": number,
    "status": string, // "finished" ou "ongoing"
    "start": string,
    "end": string,
  },
  ...
]
```

##### Get por Veículo

Também é possível realizar o get por veículo que realizou as viagens. Para receber as viagens de um veículo, faça uma requisição `GET` no endereço `http://localhost:3000/travels/travelsByVehicle/{vehicleId}`.
O servidor deverá retornar uma resposta com status 200 e o seguinte JSON no corpo da resposta:

```json
[
  {
    "id": number,
    "driverId": number,
    "vehicleId": number,
    "status": string, // "finished" ou "ongoing"
    "start": string,
    "end": string,
  },
  ...
]
```

##### Get por Motorista

Também é possível realizar o get por motorista que realizou as viagens. Para receber as viagens de um motorista, faça uma requisição `GET` no endereço `http://localhost:3000/travels/travelsByDriver/{driverId}`.
O servidor deverá retornar uma resposta com status 200 e o seguinte JSON no corpo da resposta:

```json
[
  {
    "id": number,
    "driverId": number,
    "vehicleId": number,
    "status": string, // "finished" ou "ongoing"
    "start": string,
    "end": string,
  },
  ...
]
```

#### Rota de Obtenção de Viagem Específica (GET)

Para obter informações de uma viagem específica, faça uma requisição GET no endereço `http://localhost:3000/travels/{id}`. O servidor deverá retornar uma resposta com status 200 e o seguinte JSON no corpo da resposta:

```json
  {
    "id": number,
    "driverId": number,
    "vehicleId": number,
    "status": string, // "finished" ou "ongoing"
    "start": string,
    "end": string,
  }
```

#### Rota de Criação de Viagem (POST)

Para criar uma nova viagem, faça uma requisição POST no endereço `http://localhost:3000/travels` com o seguinte JSON no corpo da requisição, contendo os dados da viagem a ser salva:

```json
  {
    "driverId": number,
    "vehicleId": number,
    "status": string, // "finished" ou "ongoing"
    "start": string,
    "end": string,
  }
```

O servidor deverá retornar uma resposta com status 201 e o seguinte JSON no corpo da resposta, contendo as informações da nova viagem criada:

```json
  {
    "id": number,
    "driverId": number,
    "vehicleId": number,
    "status": string, // "finished" ou "ongoing"
    "start": string,
    "end": string,
  }
```

**Atenção** esta rota apenas cria uma entidade de viagem no banco, mas não atualiza o estado do motorista nem do veículo vinculados a ela. Para iniciar uma viagem veja o tópico ` Rota de inicialização de uma viagem
`.

#### Rota de Atualização de Viagem (PUT ou PATCH)

As rotas de atualização de viagem apenas modificam a entidade viagem. Para encerrar uma viagem atualizando devidamente as entidades de motorista e veículos vinculadas, veja `Rota de encerramento de viagem`.

##### Atualização completa dos dados(PUT)

Para atualizar todas as informações de uma viagem existente, faça uma requisição PUT no endereço `http://localhost:3000/travels/{id}` com o seguinte JSON no corpo da requisição, contendo os dados a serem modificados:

```json
  {
    "driverId": number,
    "vehicleId": number,
    "status": string, // "finished" ou "ongoing"
    "start": string,
    "end": string,
  }
```

##### Atualização parcial dos dados (PATCH)

Para atualizar apenas um subconjunto das informações de uma viagem existente, faça uma requisição PATCH no endereço `http://localhost:3000/travels/{id}` com um JSON no corpo da requisição com alguma das propriedades de viagem, contendo os dados a serem modificados, como exemplo, para alterar a propriedade `vehicleId`:

```json
  {
    "vehicleId": number,
  }
```

##### Retorno do endpoint

O servidor deverá retornar uma resposta com status 200 e o seguinte JSON no corpo da resposta, com os dados da viagem atualizada:

```json
  {
    "id": number,
    "driverId": number,
    "vehicleId": number,
    "status": string, // "finished" ou "ongoing"
    "start": string,
    "end": string,
  }
```

### Rota de inicialização de uma viagem

Para iniciar uma nova viagem, utilize o endpoint `http://localhost:3000/travels/beginTravel` com o seguinte JSON no corpo da requisição, contendo os dados da viagem a ser iniciada:

```json
{
		"vehicleId": number,
		"driverId": number
}
```

Caso queira especificar um momento de inicio para a viagem, passe também a propriedade start. Caso não seja passada, a viagem será iniciada no momento que for processada pelo backend.

O servidor deverá retornar uma resposta com status 201 e o seguinte JSON no corpo da resposta, contendo as informações da nova viagem criada:

```json
  {
    "id": number,
    "driverId": number,
    "vehicleId": number,
    "status": string, // "ongoing"
    "start": string,
  }
```

### Rota de finalização de uma viagem

Para finalizar uma viagem, utilize o seguinte endpoint `http://localhost:3000/travels/stopTravel/{id}`. Não é necessário enviar um JSON no corpo da requisição. A viagem será encerrada no momento que a requisição for processada pelo backend.

O servidor deverá retornar uma resposta com status 201 e o seguinte JSON no corpo da resposta, contendo as informações da nova viagem criada:

```json
  {
    "id": number,
    "driverId": number,
    "vehicleId": number,
    "status": string, // "finished"
    "start": string,
    "end": string,
  }
```

#### Websocket de veículo

O websocket é atualizado com informações em tempo real de cada veículo. Para realizar a conexão utilize a biblioteca [Socket.IO](https://socket.io/docs/v4/client-api/) e utilize o endereço `http://localhost:3000/travels/ws`. As mensagens enviadas possuem o seguinte formato de resposta:

```json
  {
    "id": number,
    "driverId": number,
    "vehicleId": number,
    "status": string, // "finished" ou "ongoing"
    "start": string,
    "end": string,
  }
```

Os canais disponíveis para conexão no websocket de veículos são:

- `travel-created`: canal de notificação de criações de veículos
- `travel-updated`: canal de notificação de atualizações de veículos
- `travel-deleted`: canal de notificações de deleção de veículos