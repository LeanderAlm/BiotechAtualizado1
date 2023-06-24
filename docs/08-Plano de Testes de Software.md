

|Caso de Teste        | [CT-01](09-Registro%20de%20Testes%20de%20Software.md) O site deve permitir o cadastro de Pacientes e guardar as suas informações|
|---------------------|--------------------------------------------------------------------|
|	Requisito Associado | [RF-01] Registro de pacientes; registrar informações de pacientes. |
| Objetivo do Teste 	 | Verificar se o sistema está permitindo o cadastro de pacientes. |
| Passos 	            | - Acessar através da página inicial no botão cadastrar paciente ; <br> - Preencher os campos pertinentes; <br> - Caso necessario inserir algum comentario sobre condições de saude. <br> - Clicar no botão "Cadastrar Paciente". |
| Critério de Êxito   | O usuario deve conseguir cadastrar o paciente e o mesmo será exibido na tela de preview, como  também a inserção dos dados que serão armazenados (utilizando JSON Server).|



|Caso de Teste        | [CT-02](09-Registro%20de%20Testes%20de%20Software.md)  O site deve permitir a verificação em duas etapas pelos profissionais 1 e 2|
|---------------------|--------------------------------------------------------------------|
|	Requisito Associado | [RF-04]  Análise de amostras; permitir o registro de informações sobre a análise de amostras, tipo de teste realizado, data da análise, resultados e observações. |
| Objetivo do Teste 	 | Verificar se o sistema está permitindo a validação em duas etapas pelos dois profissionais do exame selecionado. |
| Passos 	            | - Acessar através da página depois de digitalizar pedidos ; <br> - Preencher os campos obrigatórios corretamente; <br> -  Clicar no botão "Enviar". |
| Critério de Êxito   | A verificação do exame selecionado pelo usuário deve estar em conformidade ao dar positivo pelos dois profissionais e o mesmo será exibido como exame em conformidade ao clicar em enviar na tela de preview.|
