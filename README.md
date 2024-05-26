# Sistema de Controle de Assinaturas de Aplicativos

## Descrição
Este projeto consiste no desenvolvimento de um sistema de backend para gerenciar assinaturas de aplicativos. Ele é composto por quatro microserviços, cada um com um banco de dados próprio, e utiliza RabbitMQ para comunicação entre serviços através de um API Gateway. A arquitetura proposta visa garantir alta performance e escalabilidade, especialmente para operações de verificação de validade de assinaturas.

## Funcionalidades
- Cadastrar, editar e listar aplicativos.
- Cadastrar, editar e listar clientes.
- Cadastrar assinaturas de aplicativos por clientes.
- Atualizar o valor do custo mensal de um aplicativo.
- Responder se um par cliente/assinatura continua válido.
- Listar assinaturas de um cliente.
- Listar assinantes de um aplicativo.
- Receber notificação de pagamento de uma assinatura e atualizar a data de validade.

## Estrutura do Projeto
- API Gateway: Porta de entrada para todas as requisições, gerencia a autenticação e direciona as requisições para os serviços apropriados.
- Serviço de Cadastramento: Gerencia operações relacionadas ao cadastro de usuários.
- Serviço de Pagamentos: Responsável por processar e gerenciar pagamentos.
- Serviço de Assinaturas Válidas: Verifica e gerencia assinaturas válidas dos usuários.

## Pré-requisitos
- Node.js
- NPM (Node Package Manager)
- Amazon RDS
- RabbitMQ

## Instalação
Passos para instalar o projeto:

Clonar o repositório:
- git clone https://github.com/matiascazarotto/projeto-pucrs-dsb.git

## Uso
Instruções de como executar e utilizar o projeto:

- Abra a pasta apps no VSCode.
- No terminal, acesse os diretórios de cada aplicação e execute os comandos: npm install e npm run start
- Os sistemas serão iniciados. Certifique-se de iniciar todos os serviços simultaneamente para evitar inconsistências nos dados.
- As requisições que contêm [AUTH] em sua descrição requerem um access_token no cabeçalho. O token deve ser gerado na requisição Login e tem validade de 10 minutos. Use as seguintes credenciais para login: {Usuário: matias, Senha: 1234}

## Observações
- As tabelas serão dropadas e recriadas a cada inicialização, com alguns registros adicionados automaticamente.
- Para testar o sistema, inicie e encerre todos os serviços juntos.
- Um arquivo PUCRS.postman_collection.json está disponível para importação no Postman, facilitando os testes das APIs.

Autor
Matias Cazarotto