import { pacienteService } from "../service/service.js";

(async () => {
  const pegaURL = new URL(window.location);
  const id = pegaURL.searchParams.get('id');
  const dados = await pacienteService.idCarregarPaciente(id);
  const inputPaciente = document.querySelector('#nome-paciente');
  const inputData = document.querySelector('#data');
  const inputExame = document.querySelector('#exame');

  // Código para obter a data ao carregar a tela
  const dataAtual = new Date();
  const dia = dataAtual.getDate();
  const mes = dataAtual.getMonth() + 1;
  const ano = dataAtual.getFullYear();
  const dataFormatada = `${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
  inputData.value = dataFormatada;

  const nomeCompleto = `${dados.nome} ${dados.sobrenome}`;
  inputPaciente.value = nomeCompleto;
  inputData.value = dataFormatada;

  const formulario = document.querySelector('#exame-form');

  formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const exame = inputExame.value;

    // Verifica se o paciente já possui um exame com o mesmo nome
    const exameExistente = dados.Exame && dados.Exame.find(item => item.exame.toLowerCase() === exame.toLowerCase());

    if (exameExistente) {
      // Exibe o campo de confirmação
      const confirmacaoExameExistente = document.querySelector('#confirmacao-exame-existente');
      confirmacaoExameExistente.style.display = 'block';

      const btnCadastrarResultados = document.querySelector('#btn-cadastrar-resultados');

      btnCadastrarResultados.addEventListener('click', () => {
        // Redireciona para a página correta com base no tipo de exame existente
        switch (exameExistente.exame.toLowerCase()) {
          case 'exames de sangue':
            window.location.href = `/src/admin/screens/digitalizacao-pedidos/sangue.html?id=${id}`;
            break;
          case 'exame de urina':
            window.location.href = `/src/admin/screens/digitalizacao-pedidos/urina.html?id=${id}`;
            break;
          case 'exame de fezes':
            window.location.href = `/src/admin/screens/digitalizacao-pedidos/fezes.html?id=${id}`;
            break;
          default:
            console.log('Tipo de exame não válido');
            break;
        }
      });
    } else {
      await pacienteService.atualizarExame(id, exame, inputData.value);
      window.location.href = '/src/admin/screens/exames-cadastrados/index.html';
    }
  });
})();

