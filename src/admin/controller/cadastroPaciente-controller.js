
import { pacienteService } from '../service/service.js';

const formulario = document.querySelector('[data-form]');

formulario.addEventListener('submit', async (event) => {
  event.preventDefault();

  const paciente = {};

  
  const nome = document.getElementById("nome").value;
  if (nome) {
    paciente.nome = nome;
  }

  const sobrenome = document.getElementById("sobrenome").value;
  if (sobrenome) {
    paciente.sobrenome = sobrenome;
  }

  const genero = document.getElementById("gênero").value;
  if (genero) {
    paciente.genero = genero;
  }

  const idade = document.getElementById("idade").value;
  if (idade) {
    paciente.idade = idade;
  }

  const dataNascimento = document.getElementById("data-nascimento").value;
  if (dataNascimento) {
    paciente.dataNascimento = dataNascimento;
  }

  const endereco = document.getElementById("endereço").value;
  if (endereco) {
    paciente.endereco = endereco;
  }

  const cep = document.getElementById("cep").value;
  if (cep) {
    paciente.cep = cep;
  }

  const convenio = document.getElementById("convênio").value;
  if (convenio) {
    paciente.convenio = convenio;
  }

  const email = document.getElementById("email").value;
  if (email) {
    paciente.email = email;
  }

  const diabetes = document.getElementById("diabetes").value;
  if (diabetes) {
    paciente.diabetes = diabetes;
  }

  const medicamentos = document.getElementById("medicamentos").value;
  if (medicamentos) {
    paciente.medicamentos = medicamentos;
  }

  const motivoConsulta = document.getElementById("motivo-consulta").value;
  if (motivoConsulta) {
    paciente.motivoConsulta = motivoConsulta;
  }

  const alergias = document.getElementById("alergias").value;
  if (alergias) {
    paciente.alergias = alergias;
  }
  
  const dataCadastro = new Date().toISOString().split('T')[0];
  paciente.dataCadastro = dataCadastro;
  
  const doencaImportante = document.getElementById("doença-importante").value;
  const doencaImportanteOutro = document.getElementById("doença-importante-outro").value;
  if (doencaImportante === "sim" && doencaImportanteOutro) {
    paciente.doencaImportante = doencaImportanteOutro;
  } else if (doencaImportante) {
    paciente.doencaImportante = doencaImportante;
  }

  const fuma = document.getElementById("fuma").value;
  if (fuma) {
    paciente.fuma = fuma;
  }

  const historicoFamiliar = document.getElementById("historico-familiar").value;
  if (historicoFamiliar) {
    paciente.historicoFamiliar = historicoFamiliar;
  }

  const observacoes = document.getElementById("observacoes").value;
  if (observacoes) {
    paciente.observacoes = observacoes;
  }

  var cpf = document.getElementById("cpf").value;
  if (cpf) {
    cpf = cpf.replace(/[^\d]/g, "");

    if (cpf.length === 11) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      paciente.cpf = cpf;
    } else {
      console.alert("Invalid CPF length");
      return;
    }
  }

  // Verificar se o CPF já existe na base de dados antes de fazer a requisição POST
  try {
    const cpfExists = await pacienteService.verificarCPFExistente(cpf);
    if (cpfExists) {
      alert('CPF já existe na base de dados. Por favor, verifique os dados informados.');
      return;
    }
  } catch (error) {
    console.error('Erro ao verificar CPF existente:', error);
    return;
  }

  // Fazer a requisição POST para cadastrar o paciente
  try {
    await pacienteService.cadastroPaciente(paciente);
    window.location.href = '/src/admin/screens/exames-cadastrados/index.html';
  } catch (error) {
    console.error('Erro ao cadastrar paciente:', error);
  }
});
