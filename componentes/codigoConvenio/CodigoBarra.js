exports.codBarra = (cod) => {

  var info = [];
  var barra = orgBarra(cod);

  if (barra != false) {

    var val = recolheValor(barra);
    var venc = recolheVencimento(barra);

    info.push(
      { "Linha digitada": "Valida" },
      { "Valor": val },
      { "Vencimento": venc },
      { "Codigo de barra": barra }
    );  

    return info;
  } else {
        info.push({ "Linha digitada": "Invalida" });
    return info;
  }
};

function orgBarra(cod) {

  var aux = [], i, x = 0;
  for (i = 0; i < 11; i++, x++) {
    aux[x] = cod[i];
  };
  for (i = 12; i < 23; i++, x++) {
    aux[x] = cod[i];
  };
  for (i = 24; i < 35; i++, x++) {
    aux[x] = cod[i];
  };
  for (i = 36; i < 47; i++, x++) {
    aux[x] = cod[i];
  };
  if (barraValidacao(aux)) {
    return aux;
  } else {
    return false;
  }
};

function barraValidacao(cod) {
  var dv = cod[2]
  var chave = cod[3];
  var i, mult = 2, aux = 0, cont = 0, val;
  if (dv == 6 || dv == 7) {
    for (i = 43; i >= 4; i -= 2) {
      aux = cod[i] * 2
      if (aux >= 10) {
        aux = aux - 9;
      }
      cont += aux;
    }
    for (i = 2; i >= 0; i -= 2) {
      aux = cod[i] * 2
      if (aux >= 10) {
        aux = aux - 9;
      }
      cont += aux;
    }
    for (i = 42; i >= 4; i -= 2) {
      cont += cod[i] * 1;
    }
    cont += cod[1] * 1;
    val = cont % 10;
    if (val == 0) {
      val = 10;
    }
    if (10 - val == chave) {
      return true;
    } else {
      return false;
    }
  } else {
    if (dv == 8 || dv == 9) {
      for (i = 43; i >= 0; i--) {
        if (i != 3) {
          cont += cod[i] * mult;
          mult++;
          if (mult == 10) {
            mult = 2
          }
        };
      };
      aux = cont % 11;
      if (aux == 1 || aux == 0) {
        val = 0;
      } else {
        if (aux == 10) {
          val = 1;
        } else {
          val = 11 - aux;
        }
      };
    }
    if (val == chave) {
      return true;
    } else {
      return false;
    }
  }
};

function recolheValor(cod) {
  var i, aux = 0, val, dv = cod[2];

  for (i = 4; i <= 14; i++) {
    aux += cod[i];
  }
  
  if (dv == 6 || dv == 8) {
    val = parseInt(aux) / 100;
    return (val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
  }

  if (dv == 7 || dv == 9) {
    return ({ "Valor referencia": aux });
  }
};

function recolheVencimento(cod) {

  var i, aux = [], val;

  if (cod[1] != 6) {
    for (i = 19; i <= 26; i++) {
      aux[i - 19] = cod[i];
    }

  } else {
    for (i = 23; i <= 30; i++) {
      aux[i - 23] = cod[i];
    }
  }

  var ano = parseInt(aux[0] + aux[1] + aux[2] + aux[3]);
  var mes = parseInt(aux[4] + aux[5]);
  var dia = parseInt(aux[6] + aux[7]);


  if (ano >= 2000 && ano <= 2030) {

    if (mes >= 1 && mes <= 12) {

      if (dia > 1 && dia <= 31) {
        val = true;

      } else {
        val = false;
      }
    } else {
      val = false;
    }
  } else {
    val = false;
  }

  if (val) {
    var data = new Date(ano, mes, dia);
    var venc = formataData(data);

    return (venc);
  } else {
    return ("Não possui");
  };

};

function formataData(data) {
  var dia = data.getDate().toString();
  var diaF = (dia.length == 1) ? '0' + dia : dia;
  var mes = (data.getMonth() + 1).toString();
  var mesF = (mes.length == 1) ? '0' + mes : mes;
  var anoF = data.getFullYear();
  return diaF + "/" + mesF + "/" + anoF;
};
