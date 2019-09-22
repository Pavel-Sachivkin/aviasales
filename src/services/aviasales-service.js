
export default class AviasalesService {

    getResource = async (url) => {
        const keyRequest = await fetch(url);
        const key = await keyRequest.json();
        const tickets = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${key.searchId}`);
        return tickets.json();
    }

    getTickets = async () => {
        const tickets =  await this.getResource("https://front-test.beta.aviasales.ru/search")
        return tickets;
    }
}
