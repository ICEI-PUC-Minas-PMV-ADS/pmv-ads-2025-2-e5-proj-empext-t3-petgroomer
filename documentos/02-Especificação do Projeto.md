# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="01-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. 

## Usuários
| Tipo de Usuário   | Descrição | Responsabilidades |
|------------------|-----------|------------------|
| **xxx** | xxxxx | xxxxx |

### Exemplo

| Tipo de Usuário   | Descrição | Responsabilidades |
|------------------|-----------|------------------|
| **Administrador** | Gerencia a aplicação e os usuários. | Gerenciar usuários, configurar o sistema, acessar todos os relatórios. |
| **Funcionário** | Usa a aplicação para suas tarefas principais. | Criar e editar registros, visualizar relatórios. |


## Arquitetura e Tecnologias

Descreva brevemente a arquitetura definida para o projeto e as tecnologias a serem utilizadas. Sugere-se a criação de um diagrama de componentes da solução.

## Project Model Canvas

Deve ser desenvolvido a partir do microfundamento: Empreendedorismo e inovação.
Colocar a imagem do modelo construído apresentando a proposta de solução.

> **Links Úteis**:
> Disponíveis em material de apoio do projeto

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

Para mais informações, consulte os microfundamentos Fundamentos de Engenharia de Software e Engenharia de Requisitos de Software. 

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| O sistema deve permitir cadastrar clientes, incluindo nome, telefone e informações do pet (nome, espécie, raça, idade). | ALTA | 
|RF-002| O sistema deve permitir editar os dados de clientes ou pets já cadastrados.  | MÉDIA |
|RF-003| O sistema deve permitir agendar atendimentos, informando cliente, serviço, data e horário.  | ALTA |
|RF-004| O sistema deve permitir cancelar um agendamento previamente marcado.  | MÉDIA |
|RF-005| O sistema deve exibir todos os agendamentos do dia em ordem de horário.  | ALTA |
|RF-006| O sistema deve permitir localizar clientes por nome ou telefone.  | MÉDIA |
|RF-007| O sistema deve permitir cadastrar os serviços oferecidos (banho, tosa, etc.), com nome e valor.  | ALTA |
|RF-008| O sistema deve permitir marcar o agendamento como “pendente” ou “confirmado”.  | MÉDIA |
|RF-009| O sistema deve exibir uma lista com todos os clientes registrados.  | BAIXA |
|RF-010| O sistema deve permitir agendar atendimentos, informando cliente, serviço, data e horário.  | MÉDIA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| A interface deve ser intuitiva e responsiva, garantindo boa experiência tanto em computadores quanto em dispositivos móveis. | ALTA | 
|RNF-002| O sistema deve responder às requisições do usuário em até 3 segundos para as operações principais (cadastro, edição, busca e agendamento). |  ALTA | 
|RNF-003| Os dados de clientes e pets devem ser armazenados de forma segura, com criptografia de informações sensíveis (como telefone). | ALTA |
|RNF-004| O sistema deve estar disponível pelo menos 99% do tempo e garantir persistência das informações em caso de falhas. | ALTA |


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| O cadastro de clientes deve aceitar apenas números válidos de telefone |
|03| O sistema deve ser desenvolvido para mobile e plataforma web utilizando arquitetura cliente-servidor.|
|04| O desenvolvimento deve respeitar o orçamento disponível, sem custos adicionais de licenças proprietárias.|


## Diagrama de Caso de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

Para mais informações, consulte o microfundamento Engenharia de Requisitos de Software 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

## Modelo da Base de Dados

# Para banco de dados relacional:
- Apresentar o MER (Modelo Entidade-Relacionamento)
- Apresentar o Projeto Físico da Base de Dados (estrutura das tabelas, tipos de dados, chaves primárias e estrangeiras)
# Para banco de dados NoSQL:
Apresentar o Modelo da Base de Dados (estrutura dos documentos, coleções, ou grafos, conforme o tipo de NoSQL utilizado)

