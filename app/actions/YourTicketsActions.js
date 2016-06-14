import alt from  '../alt';

class YourTicketsActions {
    constructor() {

    }

    getTickets(userId) {
        $.ajax({
            type: 'GET',
            url: `http://188.213.173.106:8080/webapp/getTickets?id=${userId}`,
            xhrFields: {
                withCredentials: false
            },
            success: (data, a, response) => {
                this.getTicketsDispatcher(data)
            },
            error: (err) => {
                Materialize.toast('Błąd podczas rejestracji!', 4000);
            }
        });
    }

    getTicketsDispatcher(data) {
        return data;
    }
}

export default alt.createActions(YourTicketsActions);
