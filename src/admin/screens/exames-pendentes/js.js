var dataAtual = new Date();
var dia = dataAtual.getDate();
var mes = dataAtual.getMonth() + 1;
var ano = dataAtual.getFullYear();
var dataFormatada = dia + "/" + mes + "/" + ano;
document.querySelector('.data').innerHTML = dataFormatada;




function verificarDiferenca() {
    var dataSolicitacao = new Date(document.getElementById('dataSolicitacao').value);
    
    var dataAtualInput = document.getElementById('dataAtual');
    var dataAtual = new Date();
    dataAtualInput.value = dataAtual.toISOString().split('T')[0]; 
    
    var diferencaDias = Math.floor((dataAtual - dataSolicitacao) / (1000 * 60 * 60 * 24));
    var mensagemElemento = document.getElementById('mensagem');
    
    if (diferencaDias > 7) {
      var diasVencidos = diferencaDias - 7;
      mensagemElemento.innerHTML = "O exame está vencido há " + diasVencidos + " dias";
    } else if (diferencaDias < 0) {
      mensagemElemento.innerHTML = "A data de solicitação é posterior à data atual";
    } else {
      var diasRestantes = 7 - diferencaDias;
      mensagemElemento.innerHTML = "Faltam " + diasRestantes + " dias para o exame vencer";
    }
    
    mensagemElemento.style.marginTop = "20px";

  
  }


  
  