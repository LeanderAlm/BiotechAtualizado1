import { pacienteService } from '../service/service.js';

const formulario = document.querySelector('[data-form]');
const pacienteId = obterIdDoPaciente();

// Preencher os campos do formulário com os dados do paciente existente
preencherCamposDoFormulario();

formulario.addEventListener('submit', async (event) => {
  event.preventDefault();

  const paciente = {};

  // Obter os dados do formulário
  paciente.nome = document.getElementById("nome").value;
  paciente.sobrenome = document.getElementById("sobrenome").value;
  paciente.genero = document.getElementById("gênero").value;
  paciente.idade = document.getElementById("idade").value;
  paciente.dataNascimento = document.getElementById("data-nascimento").value;
  paciente.endereco = document.getElementById("endereço").value;
  paciente.cep = document.getElementById("cep").value;
  paciente.convenio = document.getElementById("convênio").value;
  paciente.email = document.getElementById("email").value;
  paciente.diabetes = document.getElementById("diabetes").value;
  paciente.medicamentos = document.getElementById("medicamentos").value;
  paciente.motivoConsulta = document.getElementById("motivo-consulta").value;
  paciente.alergias = document.getElementById("alergias").value;
  paciente.doencaImportante = document.getElementById("doença-importante").value;
  paciente.fuma = document.getElementById("fuma").value;
  paciente.historicoFamiliar = document.getElementById("historico-familiar").value;
  paciente.observacoes = document.getElementById("observacoes").value;
  paciente.cpf = formatarCPF(document.getElementById("cpf").value);

  try {
    // Fazer a requisição PUT para atualizar o paciente existente
    await pacienteService.atualizarPaciente(pacienteId, paciente);
    window.location.href = '/src/admin/screens/exames-cadastrados/index.html';
  } catch (error) {
    console.error('Erro ao atualizar paciente:', error);
  }
});

async function preencherCamposDoFormulario() {
  try {
    // Fazer a requisição GET para obter os dados do paciente existente
    const paciente = await pacienteService.idCarregarPaciente(pacienteId);

    // Preencher os campos do formulário com os dados do paciente
    document.getElementById("nome").value = paciente.nome;
    document.getElementById("sobrenome").value = paciente.sobrenome;
    document.getElementById("gênero").value = paciente.genero;
    document.getElementById("idade").value = paciente.idade;
    document.getElementById("data-nascimento").value = paciente.dataNascimento;
    document.getElementById("endereço").value = paciente.endereco;
    document.getElementById("cep").value = paciente.cep;
    document.getElementById("convênio").value = paciente.convenio;
    document.getElementById("email").value = paciente.email;
    document.getElementById("diabetes").value = paciente.diabetes;
    document.getElementById("medicamentos").value = paciente.medicamentos;
    document.getElementById("motivo-consulta").value = paciente.motivoConsulta;
    document.getElementById("alergias").value = paciente.alergias;
    document.getElementById("doença-importante").value = paciente.doencaImportante;
    document.getElementById("fuma").value = paciente.fuma;
    document.getElementById("historico-familiar").value = paciente.historicoFamiliar;
    document.getElementById("observacoes").value = paciente.observacoes;
    document.getElementById("cpf").value = paciente.cpf;
  } catch (error) {
    console.error('Erro ao obter dados do paciente:', error);
  }
}

function obterIdDoPaciente() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

function formatarCPF(cpf) {
  return cpf.replace(/[^\d]/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
