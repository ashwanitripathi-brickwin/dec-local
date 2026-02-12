
!function($) {
    "use strict";

    var CalendarApp = function() {
        this.$body = $("body")
        this.$modal = $('#event-modal'),
        this.$event = ('#external-events div.external-event'),
        this.$calendar = $('#calendar'),
        this.$saveCategoryBtn = $('.save-category'),
        this.$categoryForm = $('#add-category form'),
        this.$extEvents = $('#external-events'),
        this.$calendarObj = null
    };


    /* on drop */
    CalendarApp.prototype.onDrop = function (eventObj, date) {
        var $this = this;
            // retrieve the dropped element's stored Event Object
            var originalEventObject = eventObj.data('eventObject');
            var $categoryClass = eventObj.attr('data-class');
            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);
            // assign it the date that was reported
            copiedEventObject.start = date;
            if ($categoryClass)
                copiedEventObject['className'] = [$categoryClass];
            // render the event on the calendar
            $this.$calendar.fullCalendar('renderEvent', copiedEventObject, true);
            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
                // if so, remove the element from the "Draggable Events" list
                eventObj.remove();
            }
    },
    /* on click on event */
    CalendarApp.prototype.onEventClick =  function (calEvent, jsEvent, view) {
        var $this = this;
            var form = $("<form class='event-form'></form>");
            form.append("<label>Change event name</label>");
            form.append("<div class='input-group'><input class='form-control' type=text value='" + calEvent.title + "' /><span class='input-group-append'><button type='submit' class='btn btn-success btn-md'>Save</button></span></div>");
            $this.$modal.modal({
                backdrop: 'static'
            });
            $this.$modal.find('.delete-event').show().end().find('.save-event').hide().end().find('.modal-body').empty().prepend(form).end().find('.delete-event').unbind('click').click(function () {
                $this.$calendarObj.fullCalendar('removeEvents', function (ev) {
                    return (ev._id == calEvent._id);
                });
                $this.$modal.modal('hide');
            });
            $this.$modal.find('form').on('submit', function () {
                calEvent.title = form.find("input[type=text]").val();
                $this.$calendarObj.fullCalendar('updateEvent', calEvent);
                $this.$modal.modal('hide');
                return false;
            });
    },
    /* on select */
    CalendarApp.prototype.onSelect = function (start, end, allDay) {
        var $this = this;
            $this.$modal.modal({
                backdrop: 'static'
            });
            var form = $("<form></form>");
            form.append("<div class='row'></div>");
            form.find(".row")
                .append("<div class='col-md-12'><div class='form-group'><label class='control-label'>Event Name</label><input class='form-control' type='text' name='title'/></div></div>")
                .append("<div class='col-md-12'><div class='form-group'><label class='control-label'>Category</label><select class='select form-control' name='category'></select></div></div>")
                .find("select[name='category']")
                .append("<option value='bg-danger'>Danger</option>")
                .append("<option value='bg-success'>Success</option>")
                .append("<option value='bg-purple'>Purple</option>")
                .append("<option value='bg-primary'>Primary</option>")
                .append("<option value='bg-pink'>Pink</option>")
                .append("<option value='bg-info'>Info</option>")
                .append("<option value='bg-inverse'>Inverse</option>")
                .append("<option value='bg-orange'>Orange</option>")
                .append("<option value='bg-brown'>Brown</option>")
                .append("<option value='bg-teal'>Teal</option>")
                .append("<option value='bg-warning'>Warning</option></div></div>");
            $this.$modal.find('.delete-event').hide().end().find('.save-event').show().end().find('.modal-body').empty().prepend(form).end().find('.save-event').unbind('click').click(function () {
                form.submit();
            });
            $this.$modal.find('form').on('submit', function () {
                var title = form.find("input[name='title']").val();
                var beginning = form.find("input[name='beginning']").val();
                var ending = form.find("input[name='ending']").val();
                var categoryClass = form.find("select[name='category'] option:checked").val();
                if (title !== null && title.length != 0) {
                    $this.$calendarObj.fullCalendar('renderEvent', {
                        title: title,
                        start:start,
                        end: end,
                        allDay: false,
                        className: categoryClass
                    }, true);
                    $this.$modal.modal('hide');
                }
                else{
                    alert('You have to give a title to your event');
                }
                return false;

            });
            $this.$calendarObj.fullCalendar('unselect');
    },
    CalendarApp.prototype.enableDrag = function() {
        //init events
        $(this.$event).each(function () {
            // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
            // it doesn't need to have a start or end
            var eventObject = {
                title: $.trim($(this).text()) // use the element's text as the event title
            };
            // store the Event Object in the DOM element so we can get to it later
            $(this).data('eventObject', eventObject);
            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });
        });
    }
    /* Initializing */
    CalendarApp.prototype.init = function() {
        this.enableDrag();
        /*  Initialize the calendar  */
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var form = '';
        var today = new Date($.now()+ 10000000);
        var defaultEvents =  [{
                title: 'Event Name 4',
                start: new Date($.now() + 148000000),
                className: 'bg-purple'
            },
            {
                title: 'Test Event 2',
                start: new Date($.now() + 168000000),
                className: 'bg-info'
            },
            {
                title: 'Test Event 3',
                start: new Date($.now() + 338000000),
                className: 'bg-primary'
            }];

        var $this = this;
        $this.$calendarObj = $this.$calendar.fullCalendar({
            slotDuration: '00:15:00', /* If we want to split day time each 15minutes */
            minTime: '07:00:00',
            maxTime: '23:00:00',
            defaultView: 'agendaDay',
            handleWindowResize: true,
            height: $(window).height() - 200,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'agendaDay,agendaWeek,month'
            },

            eventOverlap: false, // Prevent event overlap
            slotEventOverlap: false, // Prevent slot event overlap
            eventResizableFromStart: true,
                eventRender: function(event, element,view) {

                // Check if clientName is available in the event
                if (event.categoryName) {
                    // Append client name to the event title
                    if (event.categoryId === 23) {
                            // Append custom content for Google Calendar events
            var icon = $('<img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" style="height:18px;" class="google-calendar-icon">');
          //  var icon = $("<img src='{% static 'assets/img/Google_Calendar_icon.png' %}' style='height:20px;' alt='Layout Image'>");
            element.find('.fc-title').append(icon);                        } else {
                            // Append client name to the event title for other events
                            element.find('.fc-title').append('&nbsp&nbsp&nbsp&nbsp<span class="client-name">' + event.categoryName + '</span>');
                        }

                        // START CODE THIS IS THE CODE USED FOR WHEN EVENT TIME IS LESS THEN 15 MINUTE this code align that events
                        var eventDuration = moment(event.end).diff(moment(event.start), 'minutes');
                        if (eventDuration <= 15) {
                            // Increase minimum height for better visibility
                            element.css({
                                "min-height": "13px",  // Adjust height dynamically
                                "line-height": "16px", // Align text vertically
                                "font-size": "10px",   // Adjust font size to fit
                                "padding": "0px"       // Add padding for readability
                            });
                            // Force title visibility inside short events
                            element.find('.fc-title').css({
                                "font-size": "10px",
                                "white-space": "nowrap",
                                "overflow": "hidden",
                                "text-overflow": "ellipsis"
                            });
                            //START CODE FOR CROSS LINE ONLY DAY AND WEEK VIEW
                            if (event.eventStatus === 'declined') {
                                console.log('check decline');

                                // Apply cross-line only in Day and Week views
                                if (view.name === 'agendaDay' || view.name === 'agendaWeek') {
                                    element.append('<div class="cross-line"></div>');
                                }
                            }
                            //END CODE FOR CROSS LINE ONLY DAY AND WEEK VIEW


                        }
                // END CODE THIS IS THE CODE USED FOR WHEN EVENT TIME IS LESS THEN 15 MINUTE this code align that events




                }
                element.on('click', function() {
                    // Extract date/time info, for example:
//                    var clickedDate = $(this).data('date'); // Depends on your FullCalendar setup

                        $('#hiddenEventId').val(event.eventId);

                        // try {
                        //     $("#share_icon").attr("href", event.calenderEid);
                        //     var calenderEid = event.calenderEid;
                        //     if (calenderEid !== null) {
                        //         if (calenderEid.length > 10) {
                        //             $("#shareButton").show();
                        //             $("#declineButton").show();
                        //         } else {
                        //             $("#shareButton").hide();
                        //             $("#declineButton").hide();
                        //         }
                        //     } else {
                        //         $("#shareButton").hide();
                        //         $("#declineButton").hide();
                        //     }
                        // } catch (error) {
                        //     $("#shareButton").hide();
                        //     $("#declineButton").hide();
                        //     console.log("An error occurred: " + error.message);
                        // }

                        try {
                            $("#share_icon").attr("href", event.calenderEid);
                            var calenderEid = event.calenderEid;
                    
                            if (calenderEid !== null && calenderEid.length > 10) {
                                // Google event
                                $("#editButton").show();
                                $("#deleteButton").hide();
                                $("#shareButton").show();
                    
                                // Handle event status for buttons
                                if (event.eventStatus === "declined") {
                                    $("#acceptButton").show();
                                    $("#declineButton").hide();
                                } else {
                                    $("#acceptButton").hide();
                                    $("#declineButton").show();
                                }
                            } else if (calenderEid !== null && calenderEid.length <= 10) {
                                // Non-Google event
                                $("#editButton").show();
                                $("#deleteButton").show();
                                $("#shareButton").hide();
                                $("#acceptButton").hide();
                                $("#declineButton").hide();
                            } else {
                                // No valid calenderEid
                                $("#editButton").hide();
                                $("#deleteButton").hide();
                                $("#shareButton").hide();
                                $("#acceptButton").hide();
                                $("#declineButton").hide();
                            }
                        } catch (error) {
                            console.log("An error occurred: " + error.message);
                            $("#acceptButton").hide();
                            $("#declineButton").hide();
                        }
                    


                        $('#calender_date1').val(event.start.format('LL'));
                    // Open modal and pre-fill data
                        $('#modalStartTime1').val(event.start.format('h:mm A'));
                        //$('#modalEndTime1').val(event.end.format('h:mm A'));
                        if (event.end) {
                            // Use the actual end time if available
                            $('#modalEndTime1').val(event.end.format('h:mm A'));
                        } else {
                            // Default to 07:00 PM if end time is missing
                            $('#modalEndTime1').val('07:00 PM');
                        }
                        $('#mySelect3').val(event.clientId).trigger('change'); // For Select2
                            edit_fetchProjects(event.clientId, event.projectId);
                         $("#mySelect3").off('change').on('change', function () {
                                var clientId = $(this).val();
                                edit_fetchProjects(clientId, event.projectId);
                            });
                        //THIS CODE IS FOR AUTOMATICALLY SELECT OPTION FROM OPTIONS


                        console.log(event.categoryId,event.categoryName,'TEST5',event.projectId);
                        // START CODE OF ADD WORK CATEGORY IN OPTION if it not available in option BEFORE SELECT

                        if (event.categoryId !== 23 && $('select[name="category_id1"] option[value="' + event.categoryId + '"]').length === 0) {
                            // If it doesn't exist, create and append a new option
                            $('select[name="category_id1"]').append(
                                $('<option>', {
                                    value: event.categoryId,
                                    text: event.categoryName
                                })
                            );
                        }
                        // END CODE OF ADD WORK CATEGORY IN OPTION BEFORE SELECT
                        // BELOW CODE IS FOR SELECT THAT WORK CATEGORY OPTION


                        $('select[name="category_id1"]').val(event.categoryId);
                        $('textarea[name="description1"]').val(event.description);
                    // ... pre-fill other fields ...

                    // Hide buttons if the event is in the future
                    if (event.eventTimeframe === 'future_event') {
                        $('#editButton, #deleteButton, #declineButton, #quick_access').hide();
                    } else {
                        $('#editButton, #quick_access').show();
                    }

                    $('#edit_delete_event').modal('show');

//ASHOK START CODE FOR TIME DIFFERENCE
                // var startTime = event.start.format('h:mm A');
                // var endTime = event.end.format('h:mm A');
                
                // // Convert times to 24-hour format for easier calculation
                // var parts = startTime.match(/(\d+):(\d+) (\w+)/);
                // var hours = parseInt(parts[1], 10);
                // var minutes = parseInt(parts[2], 10);
                // var AMPM = parts[3];
                // if (AMPM == "PM" && hours < 12) hours += 12;
                // if (AMPM == "AM" && hours == 12) hours = 0;


                // var startTimeConverted = new Date(1970, 0, 1, hours, minutes);

                // var parts = endTime.match(/(\d+):(\d+) (\w+)/);
                // var hours = parseInt(parts[1], 10);
                // var minutes = parseInt(parts[2], 10);
                // var AMPM = parts[3];
                // if (AMPM == "PM" && hours < 12) hours += 12;
                // if (AMPM == "AM" && hours == 12) hours = 0;


                // var endTimeConverted = new Date(1970, 0, 1, hours, minutes);
                // var diff = endTimeConverted - startTimeConverted;

                // // Convert milliseconds into hours, minutes, seconds
                // var hours = Math.floor(diff / (1000 * 60 * 60));
                // diff -= hours * (1000 * 60 * 60);
                // var minutes = Math.floor(diff / (1000 * 60));
                // diff -= minutes * (1000 * 60);
                // var seconds = Math.floor(diff / (1000));

                // // Format the output
                // var diffFormatted = (hours < 10 ? "0" + hours : hours) + ":" +
                //                      (minutes < 10 ? "0" + minutes : minutes) + ":" +
                //                      (seconds < 10 ? "0" + seconds : seconds);
                // // Display the difference
                // document.getElementById('timeDifference1').innerHTML = diffFormatted;

                if (calculateTimeDifference4()) {
                    console.log('TIME DIFF4');
                    console.log(event.city,'CHEK CITY');

                            }

//ASHOK END CODE FOR TIME DIFFERENCE




                });
                //start delete event functionality
                $('#deleteButton').off('click').on('click', function() {
                    var eventIdToDelete = parseInt($('#hiddenEventId').val(), 10);
//                    alert(eventIdToDelete);
                    $.ajax({
                        url: '/delete_calender_events/',  // URL to your delete event endpoint
                        method: 'POST',
                        data: { entry_id: eventIdToDelete },
                        success: function(response) {
                            // Remove the event from FullCalendar
//                            console.log("Event deletion response:", response); // Debugging
                            $('#calendar').fullCalendar('removeEvents', function(event) {
                                if (event.eventId === eventIdToDelete) {
                                console.log('MATCH');
                                    return true; // This event should be removed
                                }
                                return false; // This event should not be removed
                            });
                            // Close the modal
                            $('#edit_delete_event').modal('hide');
                        },
                        error: function() {
                            // Handle errors here
                        }
                    });
                });
                //end delete event functionality

                //start decline event functionality
//                 $('#declineButton').off('click').on('click', function() {
//                     var eventIdToDecline = parseInt($('#hiddenEventId').val(), 10);
// //                    alert(eventIdToDelete);
//                     $.ajax({
//                         url: '/decline_calender_events/',  // URL to your delete event endpoint
//                         method: 'POST',
//                         data: { entry_id: eventIdToDecline },
//                         success: function(response) {
//                             // Remove the event from FullCalendar
// //                            console.log("Event deletion response:", response); // Debugging
//                             $('#calendar').fullCalendar('removeEvents', function(event) {
//                                 if (event.eventId === eventIdToDecline) {
//                                 console.log('MATCH');
//                                     return true; // This event should be removed
//                                 }
//                                 return false; // This event should not be removed
//                             });
//                             // Close the modal
//                             $('#edit_delete_event').modal('hide');
//                         },
//                         error: function() {
//                             // Handle errors here
//                         }
//                     });
//                 });

                    $('#declineButton').off('click').on('click', function() {
                        var eventIdToDecline = parseInt($('#hiddenEventId').val(), 10);

                        $.ajax({
                            url: '/decline_calender_events/',
                            method: 'POST',
                            data: { entry_id: eventIdToDecline },
                            success: function(response) {
                                var eventToDecline = $('#calendar').fullCalendar('clientEvents', function(event) {
                                    return event.eventId === eventIdToDecline;
                                })[0];

                                $('#calendar').fullCalendar('removeEvents', function(event) {
                                    if (event.eventId === eventIdToDecline) {
                                    console.log('MATCH');
                                        return true; // This event should be removed
                                    }
                                    return false; // This event should not be removed
                                });

                                if (!eventToDecline) {
                                    console.error("Event not found:", eventIdToDecline);
                                    return;
                                }

                                // Update event properties
                                eventToDecline.className = ["declined-event"]; // Use an array
                                eventToDecline.color = "#FFE5CC";
                                eventToDecline.textColor = "#000000";
                                eventToDecline.eventStatus = 'declined';
                                // Re-render the updated event
                                $('#calendar').fullCalendar('renderEvent', eventToDecline, true);
                                $('#acceptButton').show();
                                $('#declineButton').hide();

                                $('#edit_delete_event').modal('hide');
                            },
                            error: function() {
                                console.error("Failed to decline event.");
                            }
                        });
                    });

                    //end decline event functionality
                    // START CODE FOR ACCEPT DECLINE BUTTON Accept button reverse the changes

                    $('#acceptButton').off('click').on('click', function() {
                        var eventIdToAccept = parseInt($('#hiddenEventId').val(), 10);

                        $.ajax({
                            url: '/accept_calender_events/', // Your backend endpoint for accepting events
                            method: 'POST',
                            data: { entry_id: eventIdToAccept },
                            success: function(response) {
                                var eventToAccept = $('#calendar').fullCalendar('clientEvents', function(event) {
                                    return event.eventId === eventIdToAccept;
                                })[0];

                                if (!eventToAccept) {
                                    console.error("Event not found:", eventIdToAccept);
                                    return;
                                }

                                // Remove declined-event class and restore original colors
                                eventToAccept.className = []; // Clear declined class
                                eventToAccept.color = eventToAccept.originalColor || '#55ce63!important'; // Default color or original
                                eventToAccept.textColor = eventToAccept.originalTextColor || '#ffffff'; // Default text color or original
                                eventToAccept.eventStatus = null;
                                // Re-render the updated event
                                $('#calendar').fullCalendar('updateEvent', eventToAccept);
                                // Hide modal after accepting
                                $('#edit_delete_event').modal('hide');
                            },
                            error: function() {
                                console.error("Failed to accept event.");
                            }
                        });
                    });


                    // END CODE FOR ACCEPT DECLINE BUTTON Accept button reverse the changes




              // START ADD EVENT FUNCTIONALITY
                  $('#addButton').off('click').on('click', function(event) {
//                   var eventIdToDelete = parseInt($('#hiddenEventId').val(), 10);


                    var eventStartTime = $('#modalStartTime').val();
                    var eventEndTime = $('#modalEndTime').val();
                    // var validation = isTimeRangeValid(eventStartTime, eventEndTime);

                    //         if (!validation.isValid) {
                    //             event.preventDefault(); // Prevent form submission
                    //             $('#timeDifference').text(validation.message).css("color", "red");
                    //             return;
                    //         }
                    
                    if (eventStartTime === eventEndTime) {
                        console.log('Start and End times are the same');
                        $('#timeDifference').text('Start and End times cannot be the same.');
                        event.preventDefault(); // Prevent form submission
                        return;
                    }


                    if (!calculateTimeDifference3()) {
                        console.log('TIME DIFF');
                        $('#timeDifference').text('Invalid Time Range AM/PM');
                                    event.preventDefault(); // Prevent form submission if validation fails
                                    return;
                                }
                    // $('#add_event').modal('hide');


                    var eventSelect2 = $('#mySelect2').val();
                    var selectedClient_name = $('#mySelect2 option:selected').text();
                    var eventCategory = $('select[name="category_id"]').val();
                    var selectedCategory_name = $('#workCategory option:selected').text();
                    var other_category = $('#other_category_id').val();
                    var eventDescription = $('textarea[name="description"]').val();
                    var eventDate = $("#calender_date").val();
                    var eventProjectId = $('#projectName').val();// MAY BE UPDATE KARNA HO
                    var selectedProject_name = $('#projectName option:selected').text();
                //START VALIDATION
                let isValid = true;
                if (!eventSelect2) {
                    $("#clientError").show();
                    isValid = false;
                } else {
                    $("#clientError").hide();
                }

                // Validate Work Category
                if (!eventCategory) {
                    $("#categoryError").show();
                    isValid = false;
                } else {
                    $("#categoryError").hide();
                }

                // Prevent AJAX request if validation fails
                if (!isValid) {
                    event.preventDefault();  // Stop the function if validation fails
                    $('#add_event').modal('show');
                    return;
                }
                $('#add_event').modal('hide');
                //END VALIDATION


//                    alert(eventIdToDelete);
                    $.ajax({
                        url: '/calender/',  // URL to your delete event endpoint
                        method: 'POST',
                        data: {calender_date:eventDate, start_time: eventStartTime,end_time: eventEndTime,client_id: eventSelect2,category_id: eventCategory,description: eventDescription,other_category:other_category,project_id:eventProjectId},
                        success: function(response) {
                            // Remove the event from FullCalendar
                            var newEvent = {
                                title: response.title, // Adjust these properties to match your response
                                start: response.start,
                                end: response.end,
                                clientId: response.clientId,
                                categoryId: response.categoryId,
                                description: response.description,
                                categoryName: response.categoryName,
                                eventId: response.eventId,
                                color: response.color,
                                projectId: response.projectId,

                                // Include any other event properties you need
                            };

                            // Add the event to FullCalendar
                            $('#calendar').fullCalendar('renderEvent', newEvent, true);
                            // Close the modal

                            $('#add_event').modal('hide');
                            $('#mySelect2').val('');
                            $('#workCategory').val('');
                            $('#projectName').val('');
                            $('#description').val('');
                            $('#other_category_id').val('');
                            //alert('Hi');
                        },
                        error: function() {
                            // Handle errors here
                        }
                    });
                });

              // END ADD EVENT FUNCTIONALITY

                    // START Dynamic hiding of validation messages on user selection
                    $('#mySelect2').on('change', function() {
                        if ($(this).val()) {
                            $("#clientError").hide();
                        }
                    });

                    $('#workCategory').on('change', function() {
                        if ($(this).val()) {
                            $("#categoryError").hide();
                        }
                    });
// End Dynamic hiding of validation messages on user selection



              // START COPY EVENT FUNCTIONALITY
                  $('#copyButton').off('click').on('click', function() {
//                   var eventIdToDelete = parseInt($('#hiddenEventId').val(), 10);
                    var eventStartTime = $('#modalStartTime1').val();
                    //alert(eventStartTime);
                    var eventEndTime = $('#modalEndTime1').val();
                    var eventSelect2 = $('#mySelect3').val();
                    var selectedClient_name = $('#mySelect3 option:selected').text();
                    var eventCategory = $('select[name="category_id1"]').val();
                    var selectedCategory_name = $('#workCategory1 option:selected').text();
                    var eventProject = $('select[name="project_id1"]').val();
                    var selectedProject_name = $('#projectName1 option:selected').text();
                    var other_category = $('#other_category_id').val();
                    var eventDescription = $('textarea[name="description1"]').val();
                    var eventDate = $("#calender_date1").val();
                   // alert(eventDate);
                    $('#mySelect2').val(eventSelect2);
                    $('#workCategory').val(eventCategory);
                    $('#projectName').val(eventProject);
                    $('#description').val(eventDescription);
                    $('#modalStartTime').val(eventStartTime);
                    $('#modalEndTime').val(eventEndTime);
                    $('#calender_date').val(eventDate);
                    var startTime = eventStartTime;
                    var endTime = eventEndTime;
                    // Convert times to 24-hour format for easier calculation
                    var parts = startTime.match(/(\d+):(\d+) (\w+)/);
                    var hours = parseInt(parts[1], 10);
                    var minutes = parseInt(parts[2], 10);
                    var AMPM = parts[3];
                    if (AMPM == "PM" && hours < 12) hours += 12;
                    if (AMPM == "AM" && hours == 12) hours = 0;


                    var startTimeConverted = new Date(1970, 0, 1, hours, minutes);

                    var parts = endTime.match(/(\d+):(\d+) (\w+)/);
                    var hours = parseInt(parts[1], 10);
                    var minutes = parseInt(parts[2], 10);
                    var AMPM = parts[3];
                    if (AMPM == "PM" && hours < 12) hours += 12;
                    if (AMPM == "AM" && hours == 12) hours = 0;


                    var endTimeConverted = new Date(1970, 0, 1, hours, minutes);
                    var diff = endTimeConverted - startTimeConverted;

                    // Convert milliseconds into hours, minutes, seconds
                    var hours = Math.floor(diff / (1000 * 60 * 60));
                    diff -= hours * (1000 * 60 * 60);
                    var minutes = Math.floor(diff / (1000 * 60));
                    diff -= minutes * (1000 * 60);
                    var seconds = Math.floor(diff / (1000));

                    // Format the output
                    var diffFormatted = (hours < 10 ? "0" + hours : hours) + ":" +
                                         (minutes < 10 ? "0" + minutes : minutes) + ":" +
                                         (seconds < 10 ? "0" + seconds : seconds);
                    // Display the difference
                    document.getElementById('timeDifference').innerHTML = diffFormatted;
                    $('#edit_delete_event').modal('hide');
                    $('#add_event').modal('show');



//                    alert(eventIdToDelete);
//                    $.ajax({
//                        url: '/calender/',  // URL to your delete event endpoint
//                        method: 'POST',
//                        data: {calender_date:eventDate, start_time: eventStartTime,end_time: eventEndTime,client_id: eventSelect2,category_id: eventCategory,description: eventDescription,other_category:other_category,copy_event:copyEvent},
//                        success: function(response) {
//                            // Remove the event from FullCalendar
//                            var newEvent = {
//                                title: response.title, // Adjust these properties to match your response
//                                start: response.start,
//                                end: response.end,
//                                clientId: response.clientId,
//                                categoryId: response.categoryId,
//                                description: response.description,
//                                categoryName: response.categoryName,
////                                eventId: response.eventId,
//                                color: response.color,
//
//                                // Include any other event properties you need
//                            };
//
//                            // Add the event to FullCalendar
////                            $('#calendar').fullCalendar('renderEvent', newEvent, true);
//                            // Close the modal
//                            $('#mySelect2').val(response.clientId);
//                            $('#workCategory').val(response.categoryId);
//                            $('#description').val(response.description);
//                            $('#modalStartTime').val(eventStartTime);
//                            $('#modalEndTime').val(eventEndTime);
//                            $('#calender_date').val(eventDate);
//                var startTime = eventStartTime;
//                var endTime = eventEndTime;
//                // Convert times to 24-hour format for easier calculation
//                var parts = startTime.match(/(\d+):(\d+) (\w+)/);
//                var hours = parseInt(parts[1], 10);
//                var minutes = parseInt(parts[2], 10);
//                var AMPM = parts[3];
//                if (AMPM == "PM" && hours < 12) hours += 12;
//                if (AMPM == "AM" && hours == 12) hours = 0;
//
//
//                var startTimeConverted = new Date(1970, 0, 1, hours, minutes);
//
//                var parts = endTime.match(/(\d+):(\d+) (\w+)/);
//                var hours = parseInt(parts[1], 10);
//                var minutes = parseInt(parts[2], 10);
//                var AMPM = parts[3];
//                if (AMPM == "PM" && hours < 12) hours += 12;
//                if (AMPM == "AM" && hours == 12) hours = 0;
//
//
//                var endTimeConverted = new Date(1970, 0, 1, hours, minutes);
//                var diff = endTimeConverted - startTimeConverted;
//
//                // Convert milliseconds into hours, minutes, seconds
//                var hours = Math.floor(diff / (1000 * 60 * 60));
//                diff -= hours * (1000 * 60 * 60);
//                var minutes = Math.floor(diff / (1000 * 60));
//                diff -= minutes * (1000 * 60);
//                var seconds = Math.floor(diff / (1000));
//
//                // Format the output
//                var diffFormatted = (hours < 10 ? "0" + hours : hours) + ":" +
//                                     (minutes < 10 ? "0" + minutes : minutes) + ":" +
//                                     (seconds < 10 ? "0" + seconds : seconds);
//                // Display the difference
//                document.getElementById('timeDifference').innerHTML = diffFormatted;
//
//
//                            $('#add_event').modal('show');
////                            $('#mySelect2').val('');
////                            $('#workCategory').val('');
////                            $('#description').val('');
////                            $('#other_category_id').val('');
//                            $('#edit_delete_event').modal('hide');
//                        },
//                        error: function() {
//                            // Handle errors here
//                        }
//                    });
                });

              // END COPY EVENT FUNCTIONALITY




                //start edit event functionality
                  $('#editButton').off('click').on('click', function(event) {
                   var eventIdToDelete = parseInt($('#hiddenEventId').val(), 10);
                    var eventStartTime = $('#modalStartTime1').val();
                    var eventEndTime = $('#modalEndTime1').val();

                    // var validation = isTimeRangeValid(eventStartTime, eventEndTime);

                    // if (!validation.isValid) {
                    //     event.preventDefault(); // Prevent form submission
                    //     $('#timeDifference1').text(validation.message).css("color", "red");
                    //     return;
                    // }

                    if (eventStartTime === eventEndTime) {
                        console.log('Start and End times are the same');
                        $('#timeDifference1').text('Start and End times cannot be the same.');
                        event.preventDefault(); // Prevent form submission
                        return;
                    }



                    if (!calculateTimeDifference4()) {
                        console.log('TIME DIFF4');
                        $('#timeDifference1').text('Invalid Time Range AM/PM');
                        event.preventDefault();
                            return;
    
                                }

                    var eventSelect3 = $('#mySelect3').val();
                    var selectedClient_name = $('#mySelect3 option:selected').text();
                    var eventCategory = $('select[name="category_id1"]').val();
                    var selectedCategory_name = $('#workCategory1 option:selected').text();
                    var eventDescription = $('textarea[name="description1"]').val();
                    var eventProjectId = $('#projectName1').val();// MAY BE UPDATE KARNA HO
                    var selectedProject_name = $('#projectName1 option:selected').text();
//                    alert(eventIdToDelete);
                    $.ajax({
                        url: '/edit_calender_events/',  // URL to your delete event endpoint
                        method: 'POST',
                        data: { entry_id: eventIdToDelete,start_time1: eventStartTime,end_time1: eventEndTime,client_id1: eventSelect3,category_id1: eventCategory,description1: eventDescription,project_id1:eventProjectId},
                        success: function(response) {
                            // Remove the event from FullCalendar
                            var eventToUpdate = $('#calendar').fullCalendar('clientEvents', function(event) {
                            console.log(event.eventId,eventIdToDelete);
                                if (event.eventId === eventIdToDelete) {
//                                console.log('MATCH');
                                    return true; // This event should be update
                                }
                                return false; // Adjust comparison based on ID type
                            })[0];
                            if (eventToUpdate) {
                                // Update the event's properties
                                eventToUpdate.start = response.start_formatted; // Ensure correct format
                                eventToUpdate.end = response.end_formatted; // Ensure correct format
                                eventToUpdate.clientId = eventSelect3;
                                eventToUpdate.title = selectedClient_name;
                                eventToUpdate.categoryId = eventCategory;
                                eventToUpdate.categoryName = selectedCategory_name;
                                eventToUpdate.description = eventDescription;
                                eventToUpdate.projectId = eventProjectId;


                                // Update the event in FullCalendar
                                $('#calendar').fullCalendar('updateEvent', eventToUpdate);
                               // alert(eventToUpdate.end);
                            }
                            // Close the modal

                            $('#edit_delete_event').modal('hide');
                        },
                        error: function() {
                            // Handle errors here
                        }
                    });
                });
                //end edit event functionality


            },


//DRAG AND DROP FUNCTIONALITY START FROM HERE


    editable: true, // Enables dragging
    eventOverlap: true, // Allows events to overlap
    eventDrop: function(event, delta, revertFunc) {
        // This function is called when an event is dragged to a new time
        // Implementation from previous example
        //alert('ASHOK1');
        var newStartTime = event.start.format('h:mm A'); // Adjust to your required format
        var newEndTime = event.end.format('h:mm A'); // Adjust to your required format
       // alert(newStartTime);
        // Make AJAX call to update the event's start and end times in the backend
        $.ajax({
            url: '/edit_calender_events/',  // Your endpoint for updating event times
            method: 'POST',
            data: {
                entry_id: event.eventId,
                start_time1: newStartTime,
                end_time1: newEndTime,
                client_id1:event.clientId,
                category_id1:event.categoryId,
                description1:event.description,
                project_id1:event.projectId
                // Add other event fields as necessary
            },
            success: function(response) {
                // Update was successful
          //      alert('Event duration updated.');
            },
            error: function() {
                // Handle errors
                revertFunc(); // Reverts the event duration to its original
           //     alert('Failed to update event duration.');
            }
        });
    },

    eventResize: function(event, delta, revertFunc) {
        // This function is called when an event's duration is changed (resized)
        var newStartTime = event.start.format('h:mm A'); // Adjust to your required format
        var newEndTime = event.end.format('h:mm A'); // Adjust to your required format

    //    alert(newStartTime);
    //    alert('ASHOK2');
        // Make AJAX call to update the event's start and end times in the backend
        $.ajax({
            url: '/edit_calender_events/',  // Your endpoint for updating event times
            method: 'POST',
            data: {
                entry_id: event.eventId,
                start_time1: newStartTime,
                end_time1: newEndTime,
                client_id1:event.clientId,
                category_id1:event.categoryId,
                description1:event.description,
                project_id1:event.projectId
                // Add other event fields as necessary
            },
            success: function(response) {
                // Update was successful
      //          alert('Event duration updated.');
            },
            error: function() {
                // Handle errors
                revertFunc(); // Reverts the event duration to its original
        //        alert('Failed to update event duration.');
            }
        });
    },

// DRAG AND DROP FUNCTIONALITY END FROM HERE




           /* views: {
                agendaDay: { // or 'agendaDay' if using an agenda view
                    dayCellContent: function(cellInfo) {
                        cellInfo.el.append('<div class="my-custom-class">Your Content Here</div>');
                    }
                }
            },*/
            // dayRender: function(date, cell) {
            //     var $customContent = $('<a href="#" class="custom-content"><div >test</div></a>');
            //     $(cell).append($customContent);
            // },
            // events: defaultEvents,
            events: {
                url: '/calender_events/',  // Replace with the actual URL of your Django view
                method: 'GET',
                success: function(response) {
                // Check if the response indicates that the token has expired
                if (response.status === false) {
                console.log('Token has expired and needs to be refreshed.');
                var modal = document.getElementById('token_message');
                modal.style.display = 'block';
                modal.classList.add('show');

                // Set a timeout to click the anchor tag after 5 seconds
                setTimeout(function() {
                document.getElementById('external_calender_setting').click();
                }, 3000); // 5000 milliseconds = 5 seconds

                } else {
                // Handle the successful response with events data
                console.log('Events fetched successfully:', response);
                // You can process and display the events here
                 // Below 1 line code remove duplicacy when a new event created that event was shown two timw when click on month       
                $('#calendar').fullCalendar('removeEvents');
                }
                },
                failure: function () {
                    alert('There was an error while fetching events!');
                },
                color: 'black',  // You can customize the event color
                textColor: 'white',  // You can customize the event text color
            },
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar !!!
            eventLimit: true, // allow "more" link when too many events
            selectable: true,
            selectHelper: true,
            select: function(start, end) {
                var eventData;
                var readableStart = start.format('LLLL');
                var readableEnd = end.format('LLLL');
                var readableDate = start.format('LL'); // Formats the start date

                var readableStartTime = start.format('LT'); // 'LT' for Local Time
                var readableEndTime = end.format('LT');
                $('#modalStartTime').val(readableStartTime); // Replace 'modalStartTime' with your actual input field's ID
                $('#modalEndTime').val(readableEndTime);
                $('#calender_date').val(readableDate);

                $('#otherCategoryInput').hide();
                $('#projectDiv').hide();
                $('#workCategory').val('');
                $('#mySelect2').val('');
                $('#projectName').val('');
                $("#categoryError").hide();
                $("#clientError").hide();
                console.log('YOU Clicked ON BAR');

                $('#add_event').modal('show');

//ASHOK START CODE FOR TIME DIFFERENCE
                var startTime = document.getElementById('modalStartTime').value;
                var endTime = document.getElementById('modalEndTime').value;
                // Convert times to 24-hour format for easier calculation
                var parts = startTime.match(/(\d+):(\d+) (\w+)/);
                var hours = parseInt(parts[1], 10);
                var minutes = parseInt(parts[2], 10);
                var AMPM = parts[3];
                if (AMPM == "PM" && hours < 12) hours += 12;
                if (AMPM == "AM" && hours == 12) hours = 0;


                var startTimeConverted = new Date(1970, 0, 1, hours, minutes);

                var parts = endTime.match(/(\d+):(\d+) (\w+)/);
                var hours = parseInt(parts[1], 10);
                var minutes = parseInt(parts[2], 10);
                var AMPM = parts[3];
                if (AMPM == "PM" && hours < 12) hours += 12;
                if (AMPM == "AM" && hours == 12) hours = 0;


                var endTimeConverted = new Date(1970, 0, 1, hours, minutes);
                var diff = endTimeConverted - startTimeConverted;

                // Convert milliseconds into hours, minutes, seconds
                var hours = Math.floor(diff / (1000 * 60 * 60));
                diff -= hours * (1000 * 60 * 60);
                var minutes = Math.floor(diff / (1000 * 60));
                diff -= minutes * (1000 * 60);
                var seconds = Math.floor(diff / (1000));

                // Format the output
                var diffFormatted = (hours < 10 ? "0" + hours : hours) + ":" +
                                     (minutes < 10 ? "0" + minutes : minutes) + ":" +
                                     (seconds < 10 ? "0" + seconds : seconds);
                // Display the difference
                document.getElementById('timeDifference').innerHTML = diffFormatted;

//ASHOK END CODE FOR TIME DIFFERENCE



                // alert('Start: ' + readableStartTime + '\nEnd: ' + readableEndTime);
                // alert(readableDate);
                // var title = prompt('Event Title:'); // Simple prompt for the event title

                // if (title) {
                //     eventData = {
                //         title: title,
                //         start: start,
                //         end: end
                //     };
                //     $('#calendar').fullCalendar('renderEvent', eventData, true); // stick the event
                // }

                $('#calendar').fullCalendar('unselect');
            },
            drop: function(date) { $this.onDrop($(this), date); },
            // select: function (start, end, allDay) { $this.onSelect(start, end, allDay); },
            eventClick: function(calEvent, jsEvent, view) { $this.onEventClick(calEvent, jsEvent, view); }

        });

        //on new event
        this.$saveCategoryBtn.on('click', function(){
            var categoryName = $this.$categoryForm.find("input[name='category-name']").val();
            var categoryColor = $this.$categoryForm.find("select[name='category-color']").val();
            if (categoryName !== null && categoryName.length != 0) {
                $this.$extEvents.append('<div class="external-event bg-' + categoryColor + '" data-class="bg-' + categoryColor + '" style="position: relative;"><i class="mdi mdi-checkbox-blank-circle m-r-10 vertical-middle"></i>' + categoryName + '</div>')
                $this.enableDrag();
            }

        });
    },

   //init CalendarApp
    $.CalendarApp = new CalendarApp, $.CalendarApp.Constructor = CalendarApp

}(window.jQuery),

//initializing CalendarApp
function($) {
    "use strict";
    $.CalendarApp.init()
}(window.jQuery);

