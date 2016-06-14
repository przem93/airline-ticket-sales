import alt from  '../alt';

class SearchActions {
    constructor() {
        
    }

    setLoading(value) {
        return value;
    }

    buyTicket(ticket) {
        this.setLoading(true);

        $.ajax({
            type: 'POST',
            url: `http://188.213.173.106:8080/webapp/buyTicket`,
            contentType: 'application/json',
            data: JSON.stringify(ticket),
            xhrFields: {
                withCredentials: false
            },
            success: (data) => {
                Materialize.toast('Bilet został kupiony!', 4000);
                this.setLoading(false);
            },
            error: (err) => {
                console.log(err);
                this.setLoading(false);
            }
        });
    }

    search(from, to) {
        this.setLoading(true);
        
        $.ajax({
            type: 'GET',
            url: `http://188.213.173.106:8080/webapp/shortestPath?start=${from.substring(1, from.length)}&end=${to.substring(1, to.length)}`,
            contentType: 'text/plain',
            xhrFields: {
                withCredentials: false
            },
            success: (data) => {
                this.searchDispatcher(data);
            },
            error: (err) => {
                console.log(err);
                this.setLoading(false);
            }
        });
    }

    searchDispatcher(data) {
        return {
            connections: data[0],
            airports: data[1]
        }
    }

    searchAirports(property, value) {
        if(!value){
            this.searchAirportsToDispatcher(property, []);
        } else {
            $.ajax({
                type: 'GET',
                url: `http://188.213.173.106:8080/webapp/findAirport?name=${value}`,
                contentType: 'text/plain',
                xhrFields: {
                    withCredentials: false
                },
                success: (data) => {
                    this.searchAirportsToDispatcher(property, data, value);
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
    }

    searchAirportsToDispatcher(property, result, searchValue) {
        return {
            property: property,
            value: result,
            searchValue: searchValue
        }
    }
}

export default alt.createActions(SearchActions);
