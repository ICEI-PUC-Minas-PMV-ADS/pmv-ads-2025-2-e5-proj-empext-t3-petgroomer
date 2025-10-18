# Planos de Testes de Software

Apresentação dos casos de testes utilizados na realização da verificação e validação da aplicação.

Para demonstração da robustez da aplicação, foram escolhidos cenários de testes que demonstrem os requisitos sendo satisfeitos bem como o tratamento de erros.

##### Tipos de Teste Realizados:
- **Sucesso**: Tem o objetivo de verificar se as funcionalidades funcionam corretamente.
- **Insucesso**: Tem o objetivo de verificar se o sistema trata erros de maneira correta.


## ETAPA 2
Exemplo de Caso de Teste de Sucesso
O caso de teste de sucesso deve ser identificado por CT - xxx - S

<table><!-- ct 001 Cadastro de clientes com dados válidos-->
  <tr>
    <th colspan="2" width="1000">CT-001 - S<br>Cadastro de clientes com dados válidos</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema permite cadastrar clientes.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Jonatas Coelho</td>
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
      1. Inserir email.<br>
      2. Inserir senha.<br>
      3. Inserir nome.<br>
      4. Definir role. <br>
      5. Clicar em executar.
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
    <td>- O usuário deve passar a constar no banco de dados.</td>
  </tr>
</table>

<table><!-- ct 001 Cadastro de clientes com dados válidos-->
  <tr>
    <th colspan="2" width="1000">CT-001 - I01S<br>Login dos clientes com dados inválidos</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema identifica logins válidos ou inválidos.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Jonatas Coelho</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Insucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-001: O sistema deve permitir cadastrar petshops contratantes, incluindo nome, telefone, endereço e pessoa de contato.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Inserir email.<br>
      2. Inserir senha.<br>
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
    <td> 
    - Deve retornar resposta 401 do server.<br>
    - Deve retornar resposta 200 da tentativa de envio.<br>
    - Response body deve dizer: "message": "Credenciais inválidas", "error": "Unauthorized", "statusCode": 401</td>
  </tr>
</table>

------

<table><!-- ct 002 Teste do serviço backend de hospedagem de fotos-->
  <tr>
    <th colspan="2" width="1000">CT-002 - S<br>Teste do serviço backend de hospedagem de fotos</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o serviço de upload de fotos aceita formatos válidos de fotos e os hospeda na pasta do Cloudinary.</td>
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
    <td>RF-003: O sistema deve permitir que a cliente adicione fotos de seus serviços e que essas fotos sejam exibidas no portfólio.</td>
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
    - Deve cair na pasta do projeto do cloudinary.<br>
    - O swagger deve retornar dois códigos 200 e response body com [nomeArquivo], [url] e [dataUpload].
    </td>
  </tr>
</table>

--------

<!-- Teste de Insucesso: Os casos de testes de insucesso devem ser identificados por CT - xxx - I + sequencial de insucesso.-->

 <table> <!--ct 002 I01 upload de foto grande demais -->
  <tr>
    <th colspan="2" width="1000">CT-002 - I01<br>Upload de foto de tamanho grande demais</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o serviço de upload de fotos recusa arquivos de tamanhos fora do padrão.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Ariel Ortega</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Insucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-003: O sistema deve permitir que a cliente adicione fotos de seus serviços e que essas fotos sejam exibidas no portfólio.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar no swagger.<br>
      2. Clicar em [Escolher arquivo].<br>
      3. Selecionar arquivo com mais de 10MB.<br>
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
    - Deve retornar resposta 500 do Cloudinary.<br>
    - Deve retornar resposta 200 da tentativa de envio.<br>
    - Response body deve dizer: "erro": "Falha ao enviar a imagem para o Cloudinary.",  "detalhes": "File size too large. Got [size]. Maximum is 10485760."
    </td>
  </tr>
</table>

--------

<table> <!--CT-002 - I02 Upload de formato inadequado para foto -->
  <tr>
    <th colspan="2" width="1000">CT-002 - I02<br>Upload de formato inadequado para foto</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o serviço de upload de fotos recusa arquivos que não sejam de foto.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Ariel Ortega</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Insucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-003: O sistema deve permitir que a cliente adicione fotos de seus serviços e que essas fotos sejam exibidas no portfólio.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Executar no swagger.<br>
      2. Clicar em [Escolher arquivo].<br>
      3. Selecionar arquivo de vídeo de tamanho inferior a 10MB.<br>
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
    - Deve retornar resposta 500 do Cloudinary.<br>
    - Deve retornar resposta 200 da tentativa de envio.<br>
    - Response body deve dizer: "erro": "Falha ao enviar a imagem para o Cloudinary.",
  "detalhes": "Invalid image file"
    </td>
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
<table><!--CT-002 Evidência do Ariel do Teste do serviço backend de hospedagem de fotos.-->
  <tr>
    <th colspan="6" width="1000">CT-002<br>Teste do serviço backend de hospedagem de fotos.</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">- Deve cair na pasta do projeto do cloudinary.<br>
    - O swagger deve retornar dois códigos 200 e response body com [nomeArquivo], [url] e [dataUpload].</td>
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

----------

<table> <!--a fazer: CT-002 - I01 Evidência do Ariel do Teste do upload de foto grande demais -->
  <tr>
    <th colspan="6" width="1000">CT-002 - I01<br>Upload de foto de tamanho grande demais</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">- Deve retornar resposta 500 do Cloudinary.<br>
    - Deve retornar resposta 200 da tentativa de envio.<br>
    - Response body deve dizer: "erro": "Falha ao enviar a imagem para o Cloudinary.",  "detalhes": "File size too large. Got [size]. Maximum is 10485760."</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Ariel Ortega Acerbi </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">20/09/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está impedindo o upload de foto grande corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong> 
    <img width="1420" height="706" alt="image" src="https://github.com/user-attachments/assets/46242262-2783-4376-815d-482e573382b1" />
</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video  src="[link]"/></td>
  </tr>
</table>

----------------

<table> <!--a fazer: CT-002 - I02 Evidência do Ariel do Teste do Upload de formato inadequado para foto-->
  <tr>
    <th colspan="6" width="1000">CT-002<br>Upload de formato inadequado para foto.</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">-- Deve retornar resposta 500 do Cloudinary.<br>
    - Deve retornar resposta 200 da tentativa de envio.<br>
    - Response body deve dizer: "erro": "Falha ao enviar a imagem para o Cloudinary.",
  "detalhes": "Invalid image file".</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Ariel Ortega Acerbi </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">20/09/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está impedindo o upload de formato inadequado corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong>
    <img width="1419" height="703" alt="image" src="https://github.com/user-attachments/assets/19e2d135-42e3-49bb-98d1-cd8073f56959" />

</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video  src="[link]"/></td>
  </tr>
</table>

----------------------

<!-- ### ETAPA 3
Evidências de teste etapa 3

### ETAPA 4
Evidências de teste etapa 3 -->

## Parte 2 - Testes por pares
A fim de aumentar a qualidade da aplicação desenvolvida, cada funcionalidade deve ser testada por um colega e os testes devem ser evidenciados. O colega "Tester" deve utilizar o caso de teste criado pelo desenvolvedor responsável pela funcionalidade (desenvolveu a funcionalidade e criou o caso de testes descrito no plano de testes) e caso perceba a necessidade de outros casos de teste, deve acrescentá-los na sessão "Plano de Testes".

### ETAPA 2

<table> <!--a fazer: CT-002 Evidência da Isa do Teste do serviço backend de hospedagem de fotos-->
  <tr>
    <th colspan="6" width="1000">CT-002<br>Teste do serviço backend de hospedagem de fotos.</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">- Deve cair na pasta do projeto do cloudinary.<br>
    - O swagger deve retornar dois códigos 200 e response body com [nomeArquivo], [url] e [dataUpload].</td>
  </tr>
    <tr>
      <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Ariel Ortega </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Isabela Castro </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">21/09/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está retornando as requisições corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><img width="1920" height="1491" alt="image" src="https://github.com/user-attachments/assets/8ac44402-6b88-4e27-bda7-40d8bcb24d41" />
</td>
  </tr>
</table>

-----------------

<table> <!--a fazer: CT-002 - I01 Evidência da Isa do Teste do Upload de foto de tamanho grande demais-->
  <tr>
    <th colspan="6" width="1000">CT-002 - I01<br>Upload de foto de tamanho grande demais</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">- Deve retornar resposta 500 do Cloudinary.<br>
    - Deve retornar resposta 200 da tentativa de envio.<br>
    - Response body deve dizer: "erro": "Falha ao enviar a imagem para o Cloudinary.",  "detalhes": "File size too large. Got [size]. Maximum is 10485760."</td>
  </tr>
    <tr>
      <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Ariel Ortega </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Isabela Castro </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">21/09/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está impedindo o upload de foto grande corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><img width="1920" height="1499" alt="image" src="https://github.com/user-attachments/assets/8acce61b-6ff9-4edc-a3a9-6473ef0b37f4" />
</td>
  </tr>
</table>

-----------------

<table> <!--a fazer: CT-002 - I02 Evidência da Isa do Teste do Upload de formato inadequado para foto-->
  <tr>
    <th colspan="6" width="1000">CT-002 - I02<br>Upload de formato inadequado para foto.</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">- Deve retornar resposta 500 do Cloudinary.<br>
    - Deve retornar resposta 200 da tentativa de envio.<br>
    - Response body deve dizer: "erro": "Falha ao enviar a imagem para o Cloudinary.",
  "detalhes": "Invalid image file"</td>
  </tr>
    <tr>
      <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Ariel Ortega </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Isabela Castro </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">21/09/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está impedindo o upload de formato inadequado corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><img width="1920" height="1499" alt="image" src="https://github.com/user-attachments/assets/2e84d287-5705-40c4-b45a-5c123e18c442" />
</td>
  </tr>
</table>

-----------------


 ### ETAPA 3

<table> <!--a fazer: Testar login-->
  <tr>
    <th colspan="6" width="1000">CT-001<br>Cadastro de clientes com dados válidos.</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">- Deve constar no banco de dados.<br>
    - O swagger deve retornar dois códigos 200 e response body com [access], [id], [email], [name], [role] e [createdAt].</td>
  </tr>
    <tr>
      <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Jonatas Coelho </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Ariel Ortega </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">18/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está retornando as requisições corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><img width="1419" height="876" alt="image" src="https://github.com/user-attachments/assets/4ad135b7-e05a-4878-bff3-28010fd4a640" /><img width="1420" height="636" alt="image" src="https://github.com/user-attachments/assets/471c9347-1431-477e-96ae-781cf8d217f6" /> <img width="1364" height="736" alt="image" src="https://github.com/user-attachments/assets/8758c78a-0265-4d2b-ad22-25d7a0e00f67" />


    
</td>
  </tr>
</table>

<table> <!--a fazer: Testar login-->
  <tr>
    <th colspan="6" width="1000">CT-001 - I01S<br>Login dos clientes com dados inválidos</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">
    - Deve retornar resposta 401 do server.<br>
    - Deve retornar resposta 200 da tentativa de envio.<br>
    - Response body deve dizer: "message": "Credenciais inválidas", "error": "Unauthorized", "statusCode": 401</td>
  </tr>
    <tr>
      <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Jonatas Coelho </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Ariel Ortega </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">18/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está impedindo o login com credenciais inválidas.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><img width="1419" height="846" alt="image" src="https://github.com/user-attachments/assets/e68d2685-2072-4b22-826e-e1ea81e549f0" />    
</td>
  </tr>
</table>

<!--### ETAPA 4
Colocar evidências de teste da etapa 4
 -->
