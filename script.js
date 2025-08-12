function enviarFormulario(event) {
  event.preventDefault();
  const nome = document.getElementById("nomeContato").value;
  const email = document.getElementById("emailContato").value;
  const telefone = document.getElementById("telefoneContato").value;

  const mensagem = `
    <br>
    ${nome}, sua mensagem foi enviada com sucesso!
  `;

  document.getElementById("mensagem-confirmacao").innerHTML = mensagem;
}
