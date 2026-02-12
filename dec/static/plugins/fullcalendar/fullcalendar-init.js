document.addEventListener('DOMContentLoaded', function () {
    var mainCalendarEl = document.getElementById('calendar');
    var today = new Date();
    var mainCalendar = new FullCalendar.Calendar(mainCalendarEl, {
        headerToolbar: {
            left: 'title',
            center: 'prev,next',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
        },
        initialDate: today,
        weekNumbers: true,
        navLinks: true,
        editable: true,
        selectable: true,
        nowIndicator: true,
        events: {
            url: '/calender_events/',  // Replace with the actual URL of your Django view
            method: 'GET',
            failure: function () {
                alert('There was an error while fetching events!');
            },
            color: 'black',  // You can customize the event color
            textColor: 'white',  // You can customize the event text color
        },
        eventClick: function (infoEvent) {
            console.log(infoEvent.event.title);
            let infoModal = $("#event-details");
            infoModal.modal("show");
            console.log(infoModal.find(".event-title"));
            infoModal.find(".event-title").text(infoEvent.event.title);
        },
        eventLeave: function (info) {
            console.log('event left!', info.event);
        }
    });

    mainCalendar.render();
});
