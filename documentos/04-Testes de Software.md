# Planos de Testes de Software

Apresentação dos casos de testes utilizados na realização da verificação e validação da aplicação.

Para demonstração da robustez da aplicação, foram escolhidos cenários de testes que demonstrem os requisitos sendo satisfeitos bem como o tratamento de erros.

##### Tipos de Teste Realizados:
- **Sucesso**: Tem o objetivo de verificar se as funcionalidades funcionam corretamente.
- **Insucesso**: Tem o objetivo de verificar se o sistema trata erros de maneira correta.


## ETAPA 2
Exemplo de Caso de Teste de Sucesso
O caso de teste de sucesso deve ser identificado por CT - xxx - S

<table>
  <tr>
    <th colspan="2" width="1000">CT-001 - S<br>Cadastro de clientes com dados válidos</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema permite cadastrar clientes e seus pets corretamente..</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">[Nome do Responsável pelo Requisito]</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-001: O sistema deve permitir cadastrar clientes, incluindo nome, telefone e informações do pet (nome, espécie, raça, idade).</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir o aplicativo.<br>
      2. Navegar até a tela “Cadastrar Cliente”.<br>
      3. Preencher campos do cliente: nome, telefone, e-mail (se houver).<br>
      4. Preencher informações do pet: nome, espécie, raça, idade. <br>
      5. Clicar em “Salvar”.
      </td>
  </tr>
    <!-- <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>CPF:</strong> Colocar CPF cadastrado na base<br>
      - <strong>Senha:</strong> Colocar valor de senha válida
  </tr> -->
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>- O cliente deve passar a constar no banco de dados.</td>
  </tr>
</table>

------

<table>
  <tr>
    <th colspan="2" width="1000">CT-002 - S<br>Upload de foto</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o serviço de upload de fotos aceita formatos válidos de fotos.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Ariel Ortega</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>[RF-00X: Requisito.]</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar no swagger.<br>
      2. Clicar em [Escolher arquivo].<br>
      3. Selecionar arquivo de foto.<br>
      4. Execute.<br>
      </td>
  </tr>
    <!-- <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Dado:</strong> Descrição do dado<br>
      - <strong>Dado:</strong> Descrição do dado<br>
  </tr> -->
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>
    - Deve cair na pasta do projeto do cloudnary.<br>
    - O swagger deve retornar código 200 e response body:<br> 
    ```
    {
  "nomeArquivo": "[nomearquivo].jpg",
  "url": "https://res.cloudinary.com/dzgbrk7nk/image/upload/[imagelink].jpg",
  "dataUpload": "[data]"
}
```
    </td>
  </tr>
</table>

--------

<!-- #### Exemplo de Caso de Teste de Insucesso
Os casos de testes de insucesso devem ser identificados por CT - xxx - I + sequencial de insucesso.
Para cada etapa do projeto, criar uma seção com o nome da Etapa do projeto: Etapa 2, Etapa 3 e Etapa 4 -->
<table>
  <tr>
    <th colspan="2" width="1000">CT-002 - I01<br>Envio de fotos com API</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica o fluxo entre o backend e o servidor de hospedagem de fotos.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Ariel Ortega Acerbi</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-003: O sistema deve permitir que a cliente adicione fotos de seus serviços e que essas fotos sejam exibidas no portfólio.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Enviar o arquivo selecionado.<br>
      2. O backend manda o arquivo para a nuvem.<br>
      3. Retornar um link da imagem hospedada.<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Arquivo:</strong> Enviar o arquivo e receber o link da imagem.<br>
    
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve apresentar o link da imagem hospedada.</td>
  </tr>
</table>

--------

<!-- ## ETAPA 3
Casos de teste etapa 3

## ETAPA 4
Casos de teste etapa 4 -->
 
# Evidências de Testes de Software

Apresente imagens e/ou vídeos que comprovam que um determinado teste foi executado, e o resultado esperado foi obtido. Normalmente são screenshots de telas, ou vídeos do software em funcionamento.

## Parte 1 - Testes de desenvolvimento
Cada funcionalidade desenvolvida deve ser testada pelo próprio desenvolvedor, utilizando casos de teste, tanto de sucesso quanto de insucesso, elaborados por ele. Todos os testes devem ser evidenciados.

### ETAPA 2
<table>
  <tr>
    <th colspan="6" width="1000">CT-002<br>Adicione fotos de seus serviços e que essas fotos sejam hospedadas na web.</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve responder a requisição corratamente, fornecendo o link da imagem na web.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Ariel Ortega Acerbi </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">20/09/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está retornando as requisições corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video  src="https://github.com/user-attachments/assets/47253110-6001-44ef-900b-19b7b1b6e8dd"/></td>
  </tr>
</table>

### ETAPA 3
Evidências de teste etapa 3

### ETAPA 4
Evidências de teste etapa 3

## Parte 2 - Testes por pares
A fim de aumentar a qualidade da aplicação desenvolvida, cada funcionalidade deve ser testada por um colega e os testes devem ser evidenciados. O colega "Tester" deve utilizar o caso de teste criado pelo desenvolvedor responsável pela funcionalidade (desenvolveu a funcionalidade e criou o caso de testes descrito no plano de testes) e caso perceba a necessidade de outros casos de teste, deve acrescentá-los na sessão "Plano de Testes".

### ETAPA 2

### Exemplo
<table>
  <tr>
    <th colspan="6" width="1000">CT-001<br>Login com credenciais válidas - EXEMPLO</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve redirecionar o usuário para a página inicial do aplicativo após o login bem-sucedido.</td>
  </tr>
    <tr>
      <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">José da Silva </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Maria Oliveira </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">08/05/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está permitindo o login corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/82043220/2e3c1722-7adc-4bd4-8b4c-3abe9ddc1b48"/></td>
  </tr>
</table>

### ETAPA 3
Colocar evidências de teste da etapa 3

### ETAPA 4
Colocar evidências de teste da etapa 4

