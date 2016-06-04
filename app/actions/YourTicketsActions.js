import alt from  '../alt';

class YourTicketsActions {
    constructor() {
        
    }

    getTickets() {
        return [
            {
                from: "Poznań",
                to: "Warszawa",
                price: 300.45
            },
            {
                from: "Poznań",
                to: "Warszawa",
                price: 300.45
            },
            {
                from: "Poznań",
                to: "Warszawa",
                price: 300.45
            },
            {
                from: "Poznań",
                to: "Warszawa",
                price: 300.45
            }
        ];
    }
}

export default alt.createActions(YourTicketsActions);
