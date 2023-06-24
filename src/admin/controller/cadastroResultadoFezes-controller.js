import { pacienteService } from '../service/service.js';

const formulario = document.querySelector('#exame-fezes-form');
const pacienteId = obterIdDoPaciente();

formulario.addEventListener('submit', async (event) => {
  event.preventDefault();

  const novoExameFezes = {};
  novoExameFezes.exame1 = "Exames de Fezes";
  novoExameFezes.consistencia = document.getElementById("consistencia").value;
  novoExameFezes.cor = document.getElementById("cor").value;
  novoExameFezes.sangueoculto = document.getElementById("sangueoculto").value;
  novoExameFezes.leucocitosfezes = document.getElementById("leucocitosfezes").value;
  novoExameFezes.vparasitas = document.getElementById("vparasitas").value;
  novoExameFezes.ovosparasitas = document.getElementById("ovosparasitas").value;
  novoExameFezes.bacterias = document.getElementById("bacterias").value;

  try {
    await pacienteService.adicionaDadoExame(pacienteId, novoExameFezes);
    window.location.href = '/src/admin/screens/exames-cadastrados/index.html';
  } catch (error) {
    console.error('Erro ao adicionar dado do exame de fezes:', error);
  }
});

function obterIdDoPaciente() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}
