var dataAtual = new Date();
var dia = dataAtual.getDate();
var mes = dataAtual.getMonth() + 1;
var ano = dataAtual.getFullYear();
var dataFormatada = dia + "/" + mes + "/" + ano;
document.querySelector('.data').innerHTML = dataFormatada;

const form = document.querySelector('.form__doencas');
const radios1 = form.querySelectorAll('input[name="opcao1"]');
const radios2 = form.querySelectorAll('input[name="opcao"]');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const isChecked1 = radios1[0].checked;
  const isChecked2 = radios2[0].checked;
  
  if (isChecked1 && isChecked2) {
    const value1 = radios1[0].value;
    const value2 = radios2[0].value;
    
    if (value1 === value2) {
      alert('Exame em conformidade');
    } else {
      alert('Erro: Os campos de validação não estão em conformidade');
    }
    } else {
    alert('Erro: Os campos de validação devem ser marcados iguais');
    }
    });