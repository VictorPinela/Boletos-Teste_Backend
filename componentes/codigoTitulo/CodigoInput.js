const primValidacao = require ('./Validacao');
const codBarra = require ('./CodigoBarra');

exports.codigoInputTitulo = (codigo) => {
    var info = [];
    if (primValidacao.primValidacao(codigo) == 1) {
        info = codBarra.codBarra(codigo);
        return info;
    }else{
        return 0;
    };
};