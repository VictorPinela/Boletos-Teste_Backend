exports.codBarra = (cod) => {
  var info = [];
  var barra = orgBarra(cod);
  if (barra != 0) {
    var val = recolheValor(barra);
    var venc = recolheVencimento(barra);
    info.push({ "Codigo de barra": barra });
    info.push({ "Valor": val });
    info.push({ "Vencimento": venc });
    return info;
  } else {
    return 0;
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
  if (cod[2] == 7 || cod[2] == 9){
    val = aux;
    return ({"Valor referencia": val});
  }
};

function recolheVencimento(cod) {
  var i, aux = [];
  if(cod[1] != 6){
    for (i = 19; i <= 26; i++) {
      aux[i-19] = cod[i];
    }
  }else{
    for (i = 23; i <= 30; i++) {
      aux[i-23] = cod[i];
    }
  }
  console.log(aux);
  var a = aux[0]+aux[1]+aux[2]+aux[3];
  var m = aux[4]+aux[5];
  var d = aux[6]+aux[7];
  var ano = parseInt(a);
  var mes = parseInt(m);
  var dia = parseInt(d);
  console.log(ano);
  console.log(mes);
  console.log(dia);
  var data = new Date(ano, mes, dia);
  console.log(data)
  var venc = formataData(data);
  return (venc);
};

function orgBarra(cod) {
  var aux = [];
  var i, segval;
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
  segval = segvalidacao(aux);
  if (segval == 1) {
    return aux;
  } else {
    return 0;
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
      return 1;
    } else {
      return 0;
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
      val = cont % 11;
      if (val == 1) {
        val = 0;
      } else {
        if (val == 10) {
          val = 0;
        }
      };
    }
    if (val == chave) {
      return 1;
    } else {
      return 0;
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
