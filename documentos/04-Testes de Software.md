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

## ETAPA 3

<table><!-- ct 003 Teste do serviço de exibição do calendário - mês-->
  <tr>
    <th colspan="2" width="1000">CT-003 - S<br>Teste do serviço de exibição do calendário</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o calendário exibe os agendamentos pendentes e aprovados, no dia adequado e com o nome do cliente.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Isabela Gontijo de Castro</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-008: O sistema deve permitir marcar o agendamento como “pendente” ou “confirmado”.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Rodar o script reset-and-seed.js: em `codigo-fonte/petgroomer-api` executar `node .\prisma\reset-and-seed.js`<br>
      2. Iniciar o backend: em `codigo-fonte/petgroomer-api` executar `npm run start:dev`<br>
      3. Iniciar o frontend: `codigo-fonte/front` executar `npm run dev`<br>
      4. Na página local aberta, navegar até Calendário.<br>
      5. Verificar os agendamentos no mês do teste.
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      userId: alice.id, data: today, status: 'PENDENTE'<br>
      userId: alice.id, data: day2, status: 'APROVADO'<br>
      userId: bob.id, data: day5, status: 'PENDENTE'<br>
      userId: bob.id, data: day6, status: 'NEGADO'<br>
  </tr> -->
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>
    - Deve ser possível ver um agendamento no nome da Alice para o dia do teste e para dois dias após o teste.<br>
    - Deve ser possível ver um agendamento no nome do Bob para 5 dias depois do teste.<br>
    - Ao clicar em um agendamento deve ser possível ver uma modal com os dados.<br>
    </td>
  </tr>
</table>

<table><!-- ct 003 Teste de insucesso do serviço de exibição do calendário - mês-->
  <tr>
    <th colspan="2" width="1000">CT-003 - I01<br>Teste de insucesso do serviço de exibição do calendário</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o calendário não exibe os agendamentos recusados.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Isabela Gontijo de Castro</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Insucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-008: O sistema deve permitir marcar o agendamento como “pendente” ou “confirmado”.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Rodar o script reset-and-seed.js: em `codigo-fonte/petgroomer-api` executar `node .\prisma\reset-and-seed.js`<br>
      2. Iniciar o backend: em `codigo-fonte/petgroomer-api` executar `npm run start:dev`<br>
      3. Iniciar o frontend: `codigo-fonte/front` executar `npm run dev`<br>
      4. Na página local aberta, navegar até Calendário.<br>
      5. Verificar os agendamentos no mês do teste.<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      userId: alice.id, data: today, status: 'PENDENTE'<br>
      userId: alice.id, data: day2, status: 'APROVADO'<br>
      userId: bob.id, data: day5, status: 'PENDENTE'<br>
      userId: bob.id, data: day6, status: 'NEGADO'<br>
  </tr> -->
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>
    - Não deve ser possível ver um agendamento no nome do Bob para 6 dias depois do teste.<br>
    - Ao clicar no dia 6 a partir da data do teste (dia seguinte ao agendamento pendente do bob) a modal que abre deve dizer: Nenhum agendamento neste dia.
    </td>
  </tr>
</table>

<table><!-- ct 004 Teste do serviço de exibição do calendário - ano-->
  <tr>
    <th colspan="2" width="1000">CT-004 - S<br>Teste do serviço de exibição anual do calendário</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se na visualização de ano o calendário exibe uma contagem dos dias </td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Isabela Gontijo de Castro</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-008: O sistema deve permitir marcar o agendamento como “pendente” ou “confirmado”.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Rodar o script reset-and-seed.js: em `codigo-fonte/petgroomer-api` executar `node .\prisma\reset-and-seed.js`<br>
      2. Iniciar o backend: em `codigo-fonte/petgroomer-api` executar `npm run start:dev`<br>
      3. Iniciar o frontend: `codigo-fonte/front` executar `npm run dev`<br>
      4. Na página local aberta, navegar até Calendário.<br>
      5. Clicar em Ano.<br>
      6 Verificar os agendamentos no ano do teste.<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      userId: alice.id, data: today, status: 'PENDENTE'<br>
      userId: alice.id, data: day2, status: 'APROVADO'<br>
      userId: bob.id, data: day5, status: 'PENDENTE'<br>
      userId: bob.id, data: day6, status: 'NEGADO'<br>
  </tr> -->
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>
    - Deve exibir uma contagem de 3 agendamentos de forma a refletir agendamentos feitos nos próximos 5 dias.<br> 
    Observação: caso o teste seja feito no fim do mês pode ser que esta contagem esteja dividida entre o mês atual e o seguinte.<br>
    </td>
  </tr>
</table>

<table><!-- ct 005 Teste do cadastro de serviços-->
  <tr>
    <th colspan="2" width="1000">CT-005<br>Teste de sucesso do cadastro de serviços</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se é possível cadastrar um serviço</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Ariel</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-007: O sistema deve permitir cadastrar os serviços oferecidos (banho, tosa, hidratação, etc.), com nome e valor.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Iniciar o backend: em `codigo-fonte/petgroomer-api` executar `npm run start:dev`<br>
      2. Iniciar o frontend: `codigo-fonte/front` executar `npm run dev`<br>
      3. Na página local aberta, navegar até Adicionar Serviço.<br>
      5. Cadastrar um serviço válido com os dados fornecidos abaixo.<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      Nome: Tosa<br>
      Valor: 40<br>
      </td>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>
    - Deve cadastrar e exibir tosa com o valor cadastrado.
    </td>
  </tr>
</table>

<table><!-- ct 005 - I01 Teste do cadastro de serviços-->
  <tr>
    <th colspan="2" width="1000">CT-005 - I01<br>Teste de insucesso do cadastro de serviços</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema impede de cadastrar um serviço com valor inválido</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Ariel</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Insucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-007: O sistema deve permitir cadastrar os serviços oferecidos (banho, tosa, hidratação, etc.), com nome e valor.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Iniciar o backend: em `codigo-fonte/petgroomer-api` executar `npm run start:dev`<br>
      2. Iniciar o frontend: `codigo-fonte/front` executar `npm run dev`<br>
      3. Na página local aberta, navegar até Adicionar Serviço.<br>
      5. Cadastrar um serviço inválido com os dados fornecidos abaixo.<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      Nome: 214 Coisa<br>
      Valor: AAAAA124&@<br>
      </td>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>
    - O sistema deve impedir o cadastro com a mensagem 'informe um valor válido'
    </td>
  </tr>
</table>

<!--## ETAPA 4
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

### ETAPA 3
<table> <!--CT-003 -->
  <tr>
    <th colspan="6" width="1000">CT-003<br>Teste do serviço de exibição do calendário</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">- Deve ser possível ver um agendamento no nome da Alice para o dia do teste e para dois dias após o teste.<br>
    - Deve ser possível ver um agendamento no nome do Bob para 5 dias depois do teste.<br>
    - Ao clicar em um agendamento deve ser possível ver uma modal com os dados.<br></td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Isabela Gontijo de Castro </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">- O sistema está exibindo os três agendamentos corretamente.<br>
    - Ao clicar nas datas agendadas os dados do agendamento são exibidos corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong> 
    <img width="1920" height="1079" alt="image" src="https://github.com/user-attachments/assets/5f12504f-ffd5-453c-a560-556b33914c7e" />

</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video  src="[link]"/></td>
  </tr>
</table>

<table> <!--CT-003 - I01 -->
  <tr>
    <th colspan="6" width="1000">CT-003 - I01<br>Teste do serviço de exibição do calendário</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">- Não deve ser possível ver um agendamento no nome do Bob para 6 dias depois do teste.<br>
    - Ao clicar no dia 6 a partir da data do teste (dia seguinte ao agendamento pendente do bob) a modal que abre deve dizer: Nenhum agendamento neste dia.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Isabela Gontijo de Castro </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">- O sistema não está exibindo nenhum agendamento recusado.<br>
    - Ao clicar no dia 25/10 a modal diz que não há agendamentos.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong> 
    <img width="1920" height="1079" alt="image" src="https://github.com/user-attachments/assets/f05ad36c-2d5d-49ce-9e63-5c4b8bfaabf5" />

</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video  src="[link]"/></td>
  </tr>
</table>

<table> <!--CT-004 -->
  <tr>
    <th colspan="6" width="1000">CT-004<br>Teste do serviço de exibição anual do calendário</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">- Deve exibir uma contagem de 3 agendamentos de forma a refletir agendamentos feitos nos próximos 5 dias.<br> 
    Observação: caso o teste seja feito no fim do mês pode ser que esta contagem esteja dividida entre o mês atual e o seguinte.<br></td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Isabela Gontijo de Castro </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está exibindo a contagem de agendamentos em outubro e em nenhum outro mês corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong> 
    <img width="1920" height="1079" alt="image" src="https://github.com/user-attachments/assets/f79d1d83-7bf0-4044-8b46-09fe47f1760c" />

</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video  src="[link]"/></td>
  </tr>
</table>

<!-- ### ETAPA 4
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

<table> <!--CT-002 - I02 Evidência da Isa do Teste do Upload de formato inadequado para foto-->
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

<table> <!--a fazer: CT-005 Evidência da Isa do Teste de sucesso do cadastro de serviços-->
  <tr>
    <th colspan="6" width="1000">CT-005<br>Teste de sucesso do cadastro de serviços.</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">- - Deve cadastrar e exibir tosa com o valor cadastrado.</td>
  </tr>
    <tr>
      <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Ariel Ortega </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Isabela Castro </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está cadastrando e exibindo a tosa corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><img width="1920" height="1079" alt="image" src="https://github.com/user-attachments/assets/b9651a53-0908-4d5c-a9ac-021b3d24c50f" />
</td>
  </tr>
</table>

<table> <!--a fazer: CT-005 - I01 Evidência da Isa do Teste de insucesso do cadastro de serviços-->
  <tr>
    <th colspan="6" width="1000">CT-005 - I01<br>Teste de insucesso do cadastro de serviços.</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">- O sistema deve impedir o cadastro com a mensagem 'informe um valor válido'</td>
  </tr>
    <tr>
      <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Ariel Ortega </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Isabela Castro </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está impedindo o cadastro e exibindo a mensagem de erro esperada.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><img width="1920" height="1079" alt="image" src="https://github.com/user-attachments/assets/0bb07597-a30c-4abb-aa63-ab8a271fafd3" />
</td>
  </tr>
</table>

<table> <!--a fazer: CT-006 evidencia do trem do pedro-->
  <tr>
    <th colspan="6" width="1000">CT-006<br>Teste de sucesso do pedido de agendamento</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">- O sistema deve permitir o cadastro do agendamento e deve enviar para o banco com status pendente.</td>
  </tr>
    <tr>
      <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Pedro Amorim </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Isabela Castro </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema permitiu o cadastro corretamente e refletiu no banco de dados.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
    <img width="1920" height="1032" alt="image" src="https://github.com/user-attachments/assets/38b439ba-32bb-45c5-9652-c3e33c68ef05" />
    <img width="1920" height="1032" alt="image" src="https://github.com/user-attachments/assets/5fc78818-a673-4fd7-88ce-c7f2771dd318" />


</td>
  </tr>
</table>

<table> <!--CT-003 -->
  <tr>
    <th colspan="6" width="1000">CT-003<br>Teste do serviço de exibição do calendário</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">- Deve ser possível ver um agendamento no nome da Alice para o dia do teste e para dois dias após o teste.<br>
    - Deve ser possível ver um agendamento no nome do Bob para 5 dias depois do teste.<br>
    - Ao clicar em um agendamento deve ser possível ver uma modal com os dados.<br></td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Isabela Gontijo de Castro </td>
    <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Ariel Ortega </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">-O aplicativo retornou o agendamento da Alice com sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong> <img width="1326" height="735" alt="image" src="https://github.com/user-attachments/assets/85e03f47-ee8f-4b74-95e4-b08e00c9a21b" />

    

</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video  src="[link]"/></td>
  </tr>
</table>

<table> <!--CT-003 - I01 -->
  <tr>
    <th colspan="6" width="1000">CT-003 - I01<br>Teste do serviço de exibição do calendário</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">- Não deve ser possível ver um agendamento no nome do Bob para 6 dias depois do teste.<br>
    - Ao clicar no dia 6 a partir da data do teste (dia seguinte ao agendamento pendente do bob) a modal que abre deve dizer: Nenhum agendamento neste dia.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Isabela Gontijo de Castro </td>
    <td><strong>Responsável pelo teste</strong></td>
    <td width="430"> Ariel Ortega </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">- Não foi possível ver o agendamento do Bob.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong> <img width="1326" height="735" alt="image" src="https://github.com/user-attachments/assets/fbec738c-e418-4ad1-bf01-c6b32fd8b686" />

    IMG

</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video  src="[link]"/></td>
  </tr>
</table>

<table> <!--CT-004 -->
  <tr>
    <th colspan="6" width="1000">CT-004<br>Teste do serviço de exibição anual do calendário</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">- Deve exibir uma contagem de 3 agendamentos de forma a refletir agendamentos feitos nos próximos 5 dias.<br> 
    Observação: caso o teste seja feito no fim do mês pode ser que esta contagem esteja dividida entre o mês atual e o seguinte.<br></td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Isabela Gontijo de Castro </td>
    <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Ariel Ortega </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema exibiu corretamente a exibição anual do calendário.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong> <img width="1333" height="734" alt="image" src="https://github.com/user-attachments/assets/98e93c9e-d6cb-4c90-bede-d0d95219f2bd" />

    IMG

</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video  src="[link]"/></td>
  </tr>
</table>

<!--### ETAPA 4
Colocar evidências de teste da etapa 4
 -->
