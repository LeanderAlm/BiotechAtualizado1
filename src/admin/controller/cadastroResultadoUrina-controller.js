import { pacienteService } from '../service/service.js';

const formulario = document.querySelector('#exame-form');
const pacienteId = obterIdDoPaciente();

formulario.addEventListener('submit', async (event) => {
  event.preventDefault();

  const novoExame = {
    exame2: "Exames de Urina",
    corurina: document.getElementById("corurina").value,
    aspectourina: document.getElementById("aspectourina").value,
    densidadeurina: document.getElementById("densidadeurina").value,
    phurina: document.getElementById("phurina").value,
    proteinasurina: document.getElementById("proteinasurina").value,
    glicoseurina: document.getElementById("glicoseurina").value,
    cetonasurina: document.getElementById("cetonasurina").value,
    bilirrubinaurina: document.getElementById("bilirrubinaurina").value,
    urobilinogeniourina: document.getElementById("urobilinogeniourina").value,
    hemaciasurina: document.getElementById("hemaciasurina").value,
    leucocitosurina: document.getElementById("leucocitosurina").value,
    nitritourina: document.getElementById("nitritourina").value,
    celulasepiteliaisurina: document.getElementById("celulasepiteliaisurina").value,
    cilindrosurina: document.getElementById("cilindrosurina").value,
    cristaisurina: document.getElementById("cristaisurina").value,
    bacteriasurina: document.getElementById("bacteriasurina").value,
  };

  try {
    await pacienteService.adicionaDadoExame(pacienteId, novoExame);
    window.location.href = '/src/admin/screens/exames-cadastrados/index.html';
  } catch (error) {
    console.error('Erro ao adicionar dado do exame de urina:', error);
  }
});

function obterIdDoPaciente() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}
