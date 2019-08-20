export default async function timeConstructor(params) {
  try {
    const date = new Date(params);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const dayOfTheWeek = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    return (
      {
        dia: day,
        ano: year,
        mes: month+1,
        horas: hours,
        minutos: minutes,
        diasDaSemana: dayOfTheWeek
      }
    );
  } catch (error) { console.log(error); }
}

function toPortuguese(params) {
  const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  if (params === 'Sun') return diasDaSemana[0];
  else if (params === 'Mon') return diasDaSemana[1];
  else if (params === 'Tue') return diasDaSemana[2];
  else if (params === 'Wed') return diasDaSemana[3];
  else if (params === 'Thu') return diasDaSemana[4];
  else if (params === 'Fri') return diasDaSemana[5];
  else if (params === 'Sat') return diasDaSemana[6];
  else return 'Data Inválida';
}