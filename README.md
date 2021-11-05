# Api Banco

<p>
JavaScript | NodeJS | Express<br>
API REST utilizando configuração de rotas, controladores, frameworks e módulos para o NodeJS. Tudo com uso de programação assíncrona, integração de api externa e codificação JSON e Swagger.
</p>

[Deploy](https://apicubosbank.herokuapp.com/docs/)<br>

<h2>📷 Preview</h2>

<img src="./desafio back-api-banco.gif">





![](https://i.imgur.com/xG74tOh.png)

# Desafio | Back-end - Módulo 2

Você acabou de ser contratado pela melhor empresa de tecnologia do mundo: a **CUBOS**.
Sua primeira tarefa como desenvolvedor é criar uma API para um Banco Digital. Esse será um projeto **piloto**, ou seja, no futuro outras funcionalidades serão implementadas, portanto, dados do banco (nome, agência, etc.) serão imutáveis.

Seu papel é construir uma RESTful API que permita:

- Criar conta bancária
- Atualizar os dados do usuário da conta bancária
- Depósitar em uma conta bancária
- Sacar de uma conta bancária
- Transferir valores entre contas bancárias
- Consultar saldo da conta bancária
- Emitir extrato bancário
- Excluir uma conta bancária

## Requisitos obrigatórios

- Sua API deve seguir o padrão REST
- Seu código deve estar organizado, delimitando as responsabilidades de cada arquivo adequadamente. Ou seja, é esperado que ele tenha, no mínimo:
  - Um arquivo index.js
  - Um arquivo servidor.js
  - Um arquivo de rotas
  - Um pasta com controladores
- Qualquer valor (dinheiro) deverá ser representado em centavos (Ex.: R$ 10,00 reais = 1000)
- Evite códigos duplicados. Antes de copiar e colar, pense se não faz sentido esse pedaço de código estar centralizado numa função.

## Persistências dos dados

Os dados serão persistidos em memória, no objeto existente dentro do arquivo `bancodedados.js`. Todas as transações e contas bancárias deverão ser inseridas dentro deste objeto, seguindo a estrutura que já existe.

### Estrutura do objeto no arquivo `bancodedados.js`

```javascript
{
    banco: {
        nome: "Cubos Bank",
        numero: "123",
        agencia: "0001",
        senha: "Cubos123Bank",
    },
    contas: [
        // array de contas bancárias
    ],
    saques: [
        // array de saques
    ],
    depositos: [
        // array de depósitos
    ],
    transferencias: [
        // array de transferências
    ],
}
```

## Status Code

Abaixo, listamos os possíveis `status code` esperados como resposta da API.

```javascript
// 200 = requisição bem sucedida
// 201 = requisição bem sucedida e algo foi criado
// 400 = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 404 = o servidor não pode encontrar o recurso solicitado
```

## Endpoints

### Listar contas bancárias

#### `GET` `/contas?senha=123`

Esse endpoint deverá listar todas as contas bancárias existentes.

- Você deverá, **OBRIGATORIAMENTE**:

  - Verificar se a senha do banco foi informada (passado como query params na url)
  - Validar se a senha do banco está correta

- Entrada (query params)

  - Senha do banco

- Saída
  - listagem de todas as contas bancárias existentes

#### Exemplo de retorno

```javascript
// 2 contas encontradas
[
    {
        numero: "1",
        saldo: 0,
        usuario: {
            nome: 'Foo Bar',
            cpf: '00011122233',
            data_nascimento: '2021-03-15',
            telefone: '71999998888',
            email: 'foo@bar.com',
            senha: '1234'
        }
    },
    {
        numero: "2",
        saldo: 1000,
        usuario: {
            nome: 'Foo Bar 2',
            cpf: '00011122234',
            data_nascimento: '2021-03-15',
            telefone: '71999998888',
            email: 'foo@bar2.com',
            senha: '12345'
        }
    }
]

// nenhuma conta encontrada
[]
```

### Criar conta bancária

#### `POST` `/contas`

Esse endpoint deverá criar uma conta bancária, onde será gerado um número único para identificação da conta (número da conta).

- Você deverá, **OBRIGATORIAMENTE**:

  - Criar uma nova conta cujo número é único
  - CPF deve ser um campo único.
  - E-mail deve ser um campo único.
  - Verificar se todos os campos foram informados (todos são obrigatórios)
  - Definir o saldo inicial da conta como 0

- Entradas

  - Nome
  - Cpf
  - Data Nascimento
  - Telefone
  - Email
  - Senha

- Saída

  - Dados usuário
  - Número da conta
  - Saldo

#### Função

```javascript
function criarConta(...) {
    //
}
```

#### Saída

```javascript
// HTTP Status 201
{
    numero:  "1",
    saldo: 0,
    usuario: {
        nome: 'Foo Bar',
        cpf: '00011122233',
        data_nascimento: '2021-03-15',
        telefone: '71999998888',
        email: 'foo@bar.com',
        senha: '1234'
    }
}

// HTTP Status 400, 404
{
    mensagem: 'Mensagem do erro!'
}
```

### Atualizar usuário da conta bancária

#### `PUT` `/contas/:numeroConta/usuario`

Esse endpoint deverá atualizar apenas os dados do usuário de uma conta bancária.

- Você deverá, **OBRIGATORIAMENTE**:

  - Verificar se foi passado, ao menos, um campo no body da requisição
  - Verificar se o numero da conta passado como parametro na URL é válida
  - Se o CPF for informado, verificar se já existe outro registro com o mesmo CPF
  - Se o E-mail for informado, verificar se já existe outro registro com o mesmo E-mail
  - Atualizar um ou mais campos dos dados do usuário de uma conta bancária

- Entradas

  - Nome
  - Cpf
  - Data Nascimento
  - Telefone
  - Email
  - Senha

- Saída

  - Dados usuário
  - Número da conta
  - Saldo

#### Função

```javascript
function atualizarUsuarioConta(...) {
    //
}
```

#### Saída

```javascript
// HTTP Status 200
{
  mensagem: "Conta atualizada com sucesso!";
}

// HTTP Status 400, 404
{
  mensagem: "Mensagem do erro!";
}
```

### Excluir Conta

#### `DELETE` `/contas/:numeroConta`

Esse endpoint deve excluir uma conta bancária existente.

- Você deverá, **OBRIGATORIAMENTE**:

  - Verificar se o numero da conta passado como parametro na URL é válida
  - Permitir excluir uma conta bancária apenas se o saldo for 0 (zero)
  - Remover a conta do objeto de persistência de dados.

- Entradas

  - Numero da conta bancária (passado como parâmetro na rota)

- Saida

  - Sucesso ou erro

#### Função

```javascript
function excluirConta(...) {
    //
}
```

#### Saída

```javascript
// HTTP Status 200
{
  mensagem: "Conta excluída com sucesso!";
}

// HTTP Status 400, 404
{
  mensagem: "Mensagem do erro!";
}
```

### Depositar

#### `POST` `/transacoes/depositar`

Esse endpoint deverá somar o valor do depósito ao saldo de uma conta válida e registrar essa transação.

- Você deverá, **OBRIGATORIAMENTE**:

  - Verificar se o numero da conta e o valor do deposito foram informados no body
  - Verificar se a conta bancária informada existe
  - Não permitir depósitos com valores negativos ou zerados
  - Somar o valor de depósito ao saldo da conta encontrada

- Entrada

  - Número da conta
  - Valor

- Saida

  - Sucesso ou erro

#### Função

```javascript
function depositar(...) {
    //
}
```

#### Saída

```javascript
// HTTP Status 200
{
  mensagem: "Depósito realizado com sucesso!";
}

// HTTP Status 400, 404
{
  mensagem: "Mensagem do erro!";
}
```

#### Exemplo do registro de um depósito

```javascript
{
    data: "2021-08-10 23:40:35",
    numero_conta: "1",
    valor: 10000
}
```

### Sacar

#### `POST` `/transacoes/sacar`

Esse endpoint deverá realizar o saque de um valor em uma determinada conta bancária e registrar essa transação.

- Você deverá, **OBRIGATORIAMENTE**:

  - Verificar se o numero da conta, o valor do saque e a senha foram informados no body
  - Verificar se a conta bancária informada existe
  - Verificar se a senha informada é uma senha válida para a conta informada
  - Verificar se há saldo disponível para saque
  - Subtrair o valor sacado do saldo da conta encontrada

- Entrada

  - Número da conta
  - Valor
  - Senha

- Saída

  - Sucesso ou erro

#### Função

```javascript
function sacar(...) {
    //
}
```

#### Saída

```javascript
// HTTP Status 200
{
  mensagem: "Saque realizado com sucesso!";
}

// HTTP Status 400, 404
{
  mensagem: "Mensagem do erro!";
}
```

#### Exemplo do registro de um saque

```javascript
{
    data: "2021-08-10 23:40:35",
    numero_conta: "1",
    valor: 10000
}
```

### Tranferir

#### `POST` `/transacoes/transferir`

Esse endpoint deverá permitir a transferência de recursos (dinheiro) de uma conta bancária para outra e registrar essa transação.

- Você deverá, **OBRIGATORIAMENTE**:

  - Verificar se o número da conta de origem, de destino, senha da conta de origem e valor da transferência foram informados no body
  - Verificar se a conta bancária de origem informada existe
  - Verificar se a conta bancária de destino informada existe
  - Verificar se a senha informada é uma senha válida para a conta de origem informada
  - Verificar se há saldo disponível na conta de origem para a transferência
  - Subtrair o valor da transfência do saldo na conta de origem
  - Somar o valor da transferência no saldo da conta de destino

- Entrada

  - Número da conta (origem)
  - Senha da conta (origem)
  - Valor
  - Número da conta (destino)

- Saída

  - Sucesso ou erro

#### Função

```javascript
function tranferir(...) {
    //
}
```

#### Saída

```javascript
// HTTP Status 200
{
  mensagem: "Transferência realizada com sucesso!";
}

// HTTP Status 400, 404
{
  mensagem: "Mensagem do erro!";
}
```

#### Exemplo do registro de uma transferência

```javascript
{
    data: "2021-08-10 23:40:35",
    numero_conta_origem: "1",
    numero_conta_destino: "2",
    valor: 10000
}
```

### Saldo

#### `GET` `/transacoes/saldo?numero_conta=123&senha=123`

Esse endpoint deverá retornar o saldo de uma conta bancária.

- Você deverá, **OBRIGATORIAMENTE**:

  - Verificar se o numero da conta e a senha foram informadas (passado como query params na url)
  - Verificar se a conta bancária informada existe
  - Verificar se a senha informada é uma senha válida
  - Exibir o saldo da conta bancária em questão

- Entrada (query params)

  - Número da conta
  - Senha

- Saída

  - Saldo da conta

#### Função

```javascript
function saldo(...) {
    //
}
```

#### Saída

```javascript
// HTTP Status 200
{
  saldo: 13000;
}

// HTTP Status 400, 404
{
  mensagem: "Mensagem do erro!";
}
```

### Extrato

#### `GET` `/conta/extrato?numero_conta=123&senha=123`

Esse endpoint deverá listar as transações realizadas de uma conta específica.

- Você deverá, **OBRIGATORIAMENTE**:

  - Verificar se o numero da conta e a senha foram informadas (passado como query params na url)
  - Verificar se a conta bancária informada existe
  - Verificar se a senha informada é uma senha válida
  - Retornar a lista de transferências, depósitos e saques da conta em questão.

- Entrada (query params)

  - Número da conta
  - Senha

- Saída
  - Relatório da conta

#### Função

```javascript
function extrato(...) {
    //
}
```

#### Saída

```javascript
// HTTP Status 200
{
  depositos: [
    {
      data: "2021-08-18 20:46:03",
      numero_conta: "1",
      valor: 10000
    },
    {
      data: "2021-08-18 20:46:06",
      numero_conta: "1",
      valor: 10000
    }
  ],
  saques: [
    {
      data: "2021-08-18 20:46:18",
      numero_conta: "1",
      valor: 1000
    }
  ],
  transferenciasEnviadas: [
    {
      data: "2021-08-18 20:47:10",
      numero_conta_origem: "1",
      numero_conta_destino: "2",
      valor: 5000
    }
  ],
  transferenciasRecebidas: [
    {
      data: "2021-08-18 20:47:24",
      numero_conta_origem: "2",
      numero_conta_destino: "1",
      valor: 2000
    },
    {
      data: "2021-08-18 20:47:26",
      numero_conta_origem: "2",
      numero_conta_destino: "1",
      valor: 2000
    }
  ]
}

// HTTP Status 400, 404
{
    mensagem: 'Mensagem do erro!'
}
```

## Aulas úteis:

- [Roteador e Controlador](https://plataforma.cubos.academy/curso/b0149c95-5986-4ac2-ac4c-a0f323353f26/data/28/07/2021/aula/b648d8cb-a9db-4224-96dc-ed83e99bcc7b/27eebd29-2318-41eb-b789-201f075be137)
- [Aula API REST](https://plataforma.cubos.academy/curso/b0149c95-5986-4ac2-ac4c-a0f323353f26/data/26/07/2021/aula/059dc3f1-f8b5-4e5b-86ec-cea2736645b8/)
- [Formatando datas com date-fns](https://plataforma.cubos.academy/curso/b0149c95-5986-4ac2-ac4c-a0f323353f26/data/02/08/2021/aula/506a987e-ba14-4ee4-9326-c9e1aa62b7f7/5d2dceac-f1b3-460a-856e-b83701fa5206)
- [Aula de funções e objetos](https://plataforma.cubos.academy/curso/b0149c95-5986-4ac2-ac4c-a0f323353f26/data/21/06/2021/aula/5fbcc043-aa55-45a4-bced-4c59751fc2d8/)
- [Aula de Revisão](https://plataforma.cubos.academy/curso/b0149c95-5986-4ac2-ac4c-a0f323353f26/data/18/08/2021/aula/cbf59ce0-e7c7-405d-938e-e70afcbba534/)

**LEMBRE-SE**: é melhor feito do que perfeito!!!

###### tags: `back-end` `módulo 2` `nodeJS` `API REST` `desafio`
