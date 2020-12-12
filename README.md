# Boletos-Teste_Backend
Autor: Victor Gabriel Oliveira Pinela

API criada para receber a linha digitavel dos boletos do tipo Titulos Bancarios e Convenio e retornar:
  Se a linha digitada é válida
  O valor do boleto, se existir
  A data de vencimento do boleto, se existir
  Os 44 dígitos correspondentes ao código de barras desse boleto

Para fins de teste de desenvolvimento em Backend

A entrada e saida dos dados é feita em formato json 
Com a entrada sendo no formato {"codigo": "linha digitavel"}
E a saida sendo [{"Linha digitada": "Valida" }
                 {"Valor": val }
                 {"Vencimento": venc }
                 {"Codigo de barra": barra }]

Api foi criada com nodemon para reinicio automatico e configurado para rodar com o comando: npm run dev
e foi testado utilizando o aplicativo Postman para os metodos get e post