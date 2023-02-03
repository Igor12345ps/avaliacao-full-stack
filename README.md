# Avaliação Full Stack - Tokio Marine
____

### Autor do código:

> #### Igor Pereira dos Santos

> Linkedin: <https://www.linkedin.com/in/igor-santos11>

> Email: <i.pereira.santos.is@gmail.com>

### Introdução

Este projeto web foi desenvolvido com a finalidade de realizar transferências financeiras agendadas.

Objetivos:

1. Cadastrar transferência;
2. Mostrar todas as transferências;


# Informações Gerais do Projeto

O projeto foi criado em *Java e React.js*.
Veja a seguir um pouco mais sobre as linguagens e bibliotecas utilizadas:

1. Backend:

> * Java - 17;
> * Spring:
>   * Boot;
>   * Data;
>   * Web;
> * Banco de dados H2;
> * Lombok;
> * Model Mapper;
> * Swagger;

2. Frontend:

> * JavaScript;
> * TypeScript;
> * React.js;
> * Toastify;
> * react-router-dom;
> * react-data-table-component;
> * Axios;
> * Moment;
> * TailwindCSS;
> * SemanticUI;

3. Ferramentas Utilizadas:

> * IntelliJ Idea;
> * Visual Studio Code;
> * Postman;

# Aviso: 
### Para fazer uma transferência, é necessário que você crie uma conta. Para criar uma conta, clique em algum dos botões escrito: "Criar minha conta bancária", ou "Criar Conta".

# Como Executar o Projeto:

Primeiramente, baixe o projeto na sua máquina da seguinte forma:

1. Copie o link deste repositório:

![Tutorial de como copiar link do repositorio github](url)

2. Crie uma pasta no seu computador, abra o terminal do git (git bash) nessa pasta e execute o seguinte comando inserindo o link da etapa acima sem os sinais <>:
    
        git clone <link que você copiou>

3. Inicie o backend, importando-o na sua IDE de preferência como projeto Maven, depois execute a classe FinancialApplication.java.

![Tutorial de como iniciar a aplicação do backend](url)

4. Agora, inicie o frontend abrindo o terminal de comando na pasta principal do projeto e digite os seguintes comandos no terminal:

        cd frontend
        npm run dev

### Frontend

Para visualizar o *frontend*, entre no seu navegador e digite:

    http://localhost:5173/

### Backend - Swagger

Para visualizar o *Swagger* do backend, entre no seu navegador e digite:

    http://localhost:8080/swagger-ui/index.html#/


# Detalhes do Backend

## Endpoints de Transferência:
![transfer-resource requests](url)

Método | Endpoint | Função
---------|---------- | ----------
**GET** | */transfers* | Busca todas as transferências.
**POST** | */transfers* | Realiza uma nova transferência.

## Endpoints de Conta:
![account-resource requests](url)

Método | Endpoint | Função
---------|---------- | ----------
**GET** | */accounts* | Busca todas as contas.
**GET** | */accounts/{number}* | Busca a conta pelo número.
**POST** | */accounts* | Cria uma nova conta automaticamente.

## Schemas de Input e Output de Dados (DTO)
![requests schemas](url)

Para saber mais, entre no swagger.

## Estrutura:
Optei por usar o padrão de camadas para melhor organização do código, com algumas pastas(packages) auxiliares.

![Estrutura de pastas(package)](url)

Responsabilidades:

1. Config: Configuraçõs de CORS, e ModelMapper;
2. Domain: Entities/Models da aplicação;
    - DTO: Objetos de transferência de dados;
3. Repositories: Interfaces do JPA para persistência de dados;
4. Resources: REST Controllers;
    - Exceptions: Handler de Exceptions e StandardError;
5. Services: Interfaces de serviços;
    - Impl: Implementação das interfaces de serviço;
    - Exceptions: Exceptions customizadas para erros;
6. Util: Métodos estáticos utilitarios;

# Detalhes do Frontend

- Todos os campos de formulários validam as informações;
- Interface simples e amigável com o usuário;
- Página 404 customizada;
- Alguns componentes customizados próprios;
- Foi utilizado o useContext para compartilhamento de dados entre componentes diferentes;

Dependências:
- **Axios** para realização de requisições;
- **Toasts** (react-toastify) são usados para mensagens de erro em requisições;
- **Semantic-UI** para criação de diversos componentes;
- **TailwindCSS** para escrita do css inline;
- **DataTable** (react-data-table-component) para as tabelas customizadas;
- **Moment** para manipulação de datas;
- **React-router-dom** para criação de rotas;


# Instruções e obrigações a serem cumpridos

## Entregáveis
 Pequena documentação no README explicando suas decisões arquiteturais, versões de linguagem,
ferramentas utilizadas e instruções para a subida do projeto.

 É obrigatório a criação de um projeto no seu Github para que vejamos os passos feitos
através dos commits.

## Avaliação

Desenvolver tanto a API quanto o front-end (Spring boot e Vue no front, caso não tenha conhecimentos de vue, aceitamos o front com angular)

O objetivo dessa tarefa é avaliar como você vai desenvolver o código em termos de estilo,
eficiência, qualidade e prazo de entrega.

A tarefa é a seguinte:

Desenvolver um sistema de agendamento de transferências financeiras.

1) O usuário deve poder agendar uma transferência financeira com as seguintes
 informações:
 Conta de origem (padrão XXXXXX)
 Conta de destino (padrão XXXXXX)
 Valor da transferência
 Taxa (a ser calculada)
 Data da transferência (data que será realizada a transferência)
 Data de agendamento (hoje)
 
2) Cada tipo de transação segue uma regra diferente para cálculo da taxa

 A: Tranferências no mesmo dia do agendamento tem uma taxa de $3 mais 3% do valor a
ser transferido;

B: Tranferências até 10 dias da data de agendamento possuem uma taxa de $12.

C: Operações do tipo C tem uma taxa regressiva conforme a data de
transferência:

 acima de 10 dias da data de agendamento 8.2%
 
 acima de 20 dias da data de agendamento 6.9%
 
 acima de 30 dias da data de agendamento 4.7%
 
 acima de 40 dias da data de agendamento 1.7%
 
 D: Operações do tipo D tem a taxa igual a A, B ou C dependendo do valor da
transferência.

 Valores até $1.000 seguem a taxação tipo A
 
 Valores de $1.001 até $2.000 seguem a taxação tipo B
 
 Valores maiores que $2.000 seguem a taxação tipo C
 
Obs: Caso não haja taxa aplicável, lançar um alerta sobre o erro.

3) O usuário deve poder ver todos os agendamentos cadastrados.

Nota: A persistência deve ser feita em banco de dados em memória (h2, por exemplo).
Boa sorte!