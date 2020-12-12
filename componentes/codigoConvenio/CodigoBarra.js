exports.codBarra = (cod) => {
  var info = [];
  var barra = orgBarra(cod);
  if (barra != false) {
    var val = recolheValor(barra);
    var venc = recolheVencimento(barra);
    info.push({ "Linha digitada": "Valida" });
    info.push({ "Valor": val });
    info.push({ "Vencimento": venc });
    info.push({ "Codigo de barra": barra });
    return info;
  } else {
    info.push({ "Linha digitada": "Invalida" });
    return info;
  }
};


function recolheValor(cod) {
  var i, aux = 0, val;
  for (i = 4; i <= 14; i++) {
    aux += cod[i];
  }
  if (cod[2] == 6 || cod[2] == 8) {
    val = parseInt(aux) / 100;
    return (val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
  }
  if (cod[2] == 7 || cod[2] == 9) {
    val = aux;
    return ({ "Valor referencia": val });
  }
};

function recolheVencimento(cod) {
  var i, aux = [];
  if (cod[1] != 6) {
    for (i = 19; i <= 26; i++) {
      aux[i - 19] = cod[i];
    }
  } else {
    for (i = 23; i <= 30; i++) {
      aux[i - 23] = cod[i];
    }
  }
  var a = aux[0] + aux[1] + aux[2] + aux[3];
  var m = aux[4] + aux[5];
  var d = aux[6] + aux[7];
  var ano = parseInt(a);
  var mes = parseInt(m);
  var dia = parseInt(d);
  if (ano >= 2000 && ano <= 2030) {
    if (mes >= 1 && mes <= 12) {
      if (dia > 1 && dia <= 31) {
        var data = new Date(ano, mes, dia);
        var venc = formataData(data);
        return (venc);
      }
    }
  } else {
    return ("Não possui");
  };

};

function orgBarra(cod) {
  var aux = [];
  var i;
  for (i = 0; i < 11; i++) {
    aux[i] = cod[i];
  };
  for (i = 12; i < 23; i++) {
    aux[i - 1] = cod[i];
  };
  for (i = 24; i < 35; i++) {
    aux[i - 2] = cod[i];
  };
  for (i = 36; i < 47; i++) {
    aux[i - 3] = cod[i];
  };
  if (segvalidacao(aux)) {
    return aux;
  } else {
    return false;
  }
};

function segvalidacao(cod) {
  var dv = cod[2]
  var chave = cod[3];
  var i, mult = 2, aux = 0, cont = 0, val;
  if (dv == 6 || dv == 7) {
    for (i = 43; i >= 4; i -= 2) {
      aux = cod[i] * 2
      if (aux >= 10) {
        aux = aux - 10 + 1;
      }
      cont += aux;
    }
    for (i = 2; i >= 0; i -= 2) {
      aux = cod[i] * 2
      if (aux >= 10) {
        aux = aux - 10 + 1;
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

function formataData(data) {
  var dia = data.getDate().toString(),
    diaF = (dia.length == 1) ? '0' + dia : dia,
    mes = data.getMonth().toString(),
    mesF = (mes.length == 1) ? '0' + mes : mes,
    anoF = data.getFullYear();
  return diaF + "/" + mesF + "/" + anoF;
};
