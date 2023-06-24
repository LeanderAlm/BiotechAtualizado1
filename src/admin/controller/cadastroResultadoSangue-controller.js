import { pacienteService } from '../service/service.js';

const formulario = document.querySelector('#exame-form');
const pacienteId = obterIdDoPaciente();

formulario.addEventListener('submit', async (event) => {
  event.preventDefault();

  const novoExame = {};
  novoExame.exame = "Exames de Sangue";
  novoExame.hemoglobina = document.getElementById("hemoglobina").value;
  novoExame.tsh = document.getElementById("tsh").value;
  novoExame.hematocritos = document.getElementById("hematocritos").value;
  novoExame.t4total = document.getElementById("t4total").value;
  novoExame.leucocitos = document.getElementById("leucocitos").value;
  novoExame.t4 = document.getElementById("t4").value;
  novoExame.plaquetas = document.getElementById("plaquetas").value;
  novoExame.alt = document.getElementById("alt").value;
  novoExame.reticulocitos = document.getElementById("reticulocitos").value;
  novoExame.ast = document.getElementById("ast").value;
  novoExame.colesteroltotal = document.getElementById("colesteroltotal").value;
  novoExame.tgp = document.getElementById("tgp").value;
  novoExame.hdlcolesterol = document.getElementById("hdlcolesterol").value;
  novoExame.tgo = document.getElementById("tgo").value;
  novoExame.ldlcolesterol = document.getElementById("ldlcolesterol").value;
  novoExame.triglicerideos = document.getElementById("triglicerideos").value;
  novoExame.glicemiajejum = document.getElementById("glicemiajejum").value;
  novoExame.glicemiaposprandial = document.getElementById("glicemiaposprandial").value;

  try {
    await pacienteService.adicionaDadoExame(pacienteId, novoExame);
    window.location.href = '/src/admin/screens/exames-cadastrados/index.html';
  } catch (error) {
    console.error('Erro ao adicionar dado do exame:', error);
  }
});

function obterIdDoPaciente() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}


