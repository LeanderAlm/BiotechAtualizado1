# Registro de Testes de Software

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>, <a href="8-Plano de Testes de Software.md"> Plano de Testes de Software</a>

Relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado em um plano de testes pré-definido.

## Avaliação

Discorra sobre os resultados do teste. Ressaltando pontos fortes e fracos identificados na solução. Comente como o grupo pretende atacar esses pontos nas próximas iterações. Apresente as falhas detectadas e as melhorias geradas a partir dos resultados obtidos nos testes.

> **Links Úteis**:
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)

| Registro de Teste| [CT-01](08-Plano%20de%20Testes%20de%20Software.md) - Cadastro de Paciente| 
|--------------|-----------------------|
|Objetivo de teste|Verificar se o sistema está permitindo o cadastro de pacientes.
![Captura de tela 2023-06-11 191053](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e1-proj-web-t5-pmv-ads-2023-1-e1-proj-web-t5-biotech/assets/111186037/cd851f45-9e73-4190-bc54-5aedf835f291)|
![Captura de tela 2023-06-11 191138](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e1-proj-web-t5-pmv-ads-2023-1-e1-proj-web-t5-biotech/assets/111186037/6a74b0dd-bdbb-42eb-b247-86dda3e0a2e2)

                                      {
                                        "nome": "Leandro",
                                        "sobrenome": "Azevedo",
                                        "genero": "masculino",
                                        "idade": "24",
                                        "dataNascimento": "1999-02-02",
                                        "endereco": "Rua Gamões Cunha",
                                        "cep": "35620-055",
                                        "convenio": "não tenho",
                                        "email": "leandro@gmail.com",
                                        "diabetes": "sim",
                                        "medicamentos": "Nenhum",
                                        "motivoConsulta": "rotina",
                                        "alergias": "Não",
                                        "dataCadastro": "2023-06-11",
                                        "doencaImportante": "não",
                                        "fuma": "não",
                                        "historicoFamiliar": "não",
                                        "cpf": "111.555.444-23",
                                        "id": 5
                                      }
| Critério de êxito              | • O teste teve êxito        |
|------------------------------- | ---------------------------|
| Retorno requisição POST com JSON | • O teste teve êxito  |                                         
                                     
  

| Registro de Teste| [CT-02](08-Plano%20de%20Testes%20de%20Software.md) - Validação em Duas Etapas| 
|--------------|-----------------------|
|Objetivo de teste|Verificar se o sistema está permitindo a verificação em duas etapas.
![Captura da Web_11-6-2023_23244_127 0 0 1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e1-proj-web-t5-pmv-ads-2023-1-e1-proj-web-t5-biotech/assets/131215693/a073deb1-380e-45bb-b3cd-35edd41cf535)


                                      {
                                        "escolha um exame": "Covid"
                                        "cpf": "15236978420"
                                        "nome": "Flavia Correia",
                                        "validação pelo primeiro profissional": "Maria" "Posistivo",
                                        "validação pelo segundo profissional": "Pedro" "Positivo"
                                        
                                      }
| Critério de êxito              | • O teste teve êxito        |
|------------------------------- | ---------------------------|
| Retorno requisição POST | • O teste teve êxito  |       


