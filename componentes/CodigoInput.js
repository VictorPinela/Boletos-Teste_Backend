const primValidacao = require ('./Validacao');
const codBarra = require ('./CodigoBarra');

exports.codigoInput = (codigo) => {
    var info = [];
    var val1 = primValidacao.primValidacao(codigo);
    if (val1 == 1) {
        info = codBarra.codBarra(codigo);
        return info;
    }else{
        return 0;
    };
};