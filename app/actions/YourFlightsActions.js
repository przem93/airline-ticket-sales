import alt from  '../alt';

class YourFlightsActions {
    constructor() {

    }

    getFlights(userId, action) {
        $.ajax({
            type: 'GET',
            url: `http://188.213.173.106:8080/webapp/getFlights?id=${userId}`,
            xhrFields: {
                withCredentials: false
            },
            success: (data, a, response) => {
                this.getFlightsDispatcher(data)
                action();
            },
            error: (err) => {
                Materialize.toast('Brak dodanych przelotów!', 4000);
                action();
            }
        });
    }

    getFlight(rid) {
        $.ajax({
            type: 'GET',
            url: `http://188.213.173.106:8080/webapp/getFlightByRid?id=${rid}`,
            xhrFields: {
                withCredentials: false
            },
            success: (data, a, response) => {
                this.getFlightDispatcher(data)
            },
            error: (err) => {
                Materialize.toast(`Brak przelotu o id ${rid}!`, 4000);
            }
        });
    }
    
    addFlight(from, to, month, day, hour, seats, duration, price) {
        $.ajax({
            type: 'POST',
            url: `http://188.213.173.106:8080/webapp/addFlight`,
            xhrFields: {
                withCredentials: false
            },
            contentType: 'application/json',
            data: JSON.stringify({
                seats: seats,
                duration: duration,
                price: price,
                dayOfWeek: day,
                monthOfYear: month,
                hour: hour,
                airline: sessionStorage.userId ? sessionStorage.userId : localStorage.userId,
                in: from,
                out: to
            }),
            success: (data, a, response) => {
                Materialize.toast('Dodano przelot!', 4000);
            },
            error: (err) => {
                Materialize.toast('Błąd podczas dodawania!', 4000);
            }
        });
    }

    editFlight(rid, from, to, month, day, hour, seats, duration, price) {
        $.ajax({
            type: 'POST',
            url: `http://188.213.173.106:8080/webapp/editFlight`,
            xhrFields: {
                withCredentials: false
            },
            contentType: 'application/json',
            data: JSON.stringify({
                rid: rid,
                seats: seats,
                duration: duration,
                price: price,
                dayOfWeek: day,
                monthOfYear: month,
                hour: hour,
                airline: sessionStorage.userId ? sessionStorage.userId : localStorage.userId,
                in: from,
                out: to
            }),
            success: (data, a, response) => {
                Materialize.toast('Dodano przelot!', 4000);
            },
            error: (err) => {
                Materialize.toast('Błąd podczas dodawania!', 4000);
            }
        });
    }

    getFlightsDispatcher(data) {
        return data;
    }

    getFlightDispatcher(data) {
        return data;
    }
}

export default alt.createActions(YourFlightsActions);
