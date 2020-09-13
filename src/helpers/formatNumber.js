//const numberFormat = Intl.NumberFormat('pt-BR');

function formatWhatsAppNumber(number) {
  return (
    '(' +
    number.substring(0, 2) +
    ') ' +
    number.substring(2, 7) +
    '-' +
    number.substring(7, 11)
  );
}

function formatMessageForWhatsApp(queued) {
  const message = `?text=Olá, este é o Atendimento SAAEC! Meu nome é *${
    queued.attendant
  }*!%0ARecebemos a seguinte solicitação do seu número ${formatWhatsAppNumber(
    queued.numberWhatsApp
  )}: 
  Solicitante: ${queued.name} | Processo: ${queued.process} | CPF: ${formatCPF(
    queued.cpf
  )} | Endereço: ${queued.adress} | *Solicitação: ${queued.requestedService}*.`;
  message.split(' ').join('%20');
  return message;
}

function formatCPF(text) {
  const badchars = /[^\d]/g;
  const mask = /(\d{3})(\d{3})(\d{3})(\d{2})/;
  const cpf = String(text).replace(badchars, '');
  return cpf.replace(mask, '$1.$2.$3-$4');
}

export { formatWhatsAppNumber, formatCPF, formatMessageForWhatsApp };
