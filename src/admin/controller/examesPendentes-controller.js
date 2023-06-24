import { pacienteService } from "../service/service.js";

// Função para carregar os exames do paciente pelo ID
function carregarExames(id) {
  return pacienteService.carregarExames(id);
}

// Função para carregar nomes de pacientes sem a chave "Exame" no dropdown
function carregarNomesPacientes() {
  const dropdown = document.getElementById('nomePaciente');

  pacienteService.carregarPacientes()
    .then(pacientes => {
      for (const paciente of pacientes) {
        if (!paciente.hasOwnProperty('Exame')) { // Verifica se o paciente não possui a chave "Exame"
          const option = document.createElement('option');
          option.value = paciente.id;
          option.textContent = paciente.nome;
          dropdown.appendChild(option);
        }
      }
    })
    .catch(erro => {
      console.error('Erro ao carregar pacientes:', erro);
    });
}


// Função para atualizar a data de cadastro do paciente selecionado
function atualizarDataCadastro() {
  const dropdown = document.getElementById('nomePaciente');
  const dataEntrada = document.getElementById('dataSolicitacao');

  dropdown.addEventListener('change', () => {
    const idPacienteSelecionado = dropdown.value;

    if (!idPacienteSelecionado) {
      dataEntrada.value = '';
      return;
    }

    pacienteService.idCarregarPaciente(idPacienteSelecionado)
      .then(paciente => {
        dataEntrada.value = paciente.dataCadastro;
        const cpfPaciente = document.getElementById('cpfPaciente');

        // Obter o CPF do paciente
        const cpf = paciente.cpf;

        // Exibir o CPF
        cpfPaciente.textContent = `CPF: ${cpf}`;

      })
      .catch(erro => {
        console.error('Erro ao carregar paciente:', erro);
      });
  });
}

// Obter ID do paciente selecionado e redirecionar para URL com o ID como parâmetro
function redirecionarParaURL(id) {
  const url = `../cadastro-pedido-exame/index.html?id=${id}`;
  window.location.href = url;
}

// Evento ao clicar no botão "Verificar"
function verificarDiferenca() {
  const dropdown = document.getElementById('nomePaciente');
  const idPacienteSelecionado = dropdown.value;

  if (!idPacienteSelecionado) {
    console.log('Nenhum paciente selecionado');
    return;
  }

  redirecionarParaURL(idPacienteSelecionado);
}

// Carregar nomes de pacientes ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  carregarNomesPacientes();
  atualizarDataCadastro();

  // Atualizar o campo de data atual com a data atual
  const dataAtual = document.getElementById('dataAtual');
  const dataAtualValue = new Date().toISOString().split('T')[0];
  dataAtual.value = dataAtualValue;
});

// Evento ao clicar no botão "Verificar"
const buttonVerificar = document.getElementById('buttonVerificar');
buttonVerificar.addEventListener('click', verificarDiferenca);
