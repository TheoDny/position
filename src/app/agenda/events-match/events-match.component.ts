import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import {JSDOM} from "jsdom"

@Component({
  selector: 'app-events-match',
  templateUrl: './events-match.component.html',
  styleUrls: ['./events-match.component.scss']
})
export class EventsMatchComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'list',
    googleCalendarApiKey: 'AIzaSyBRiuj9pN1ixeD--4LJXciubxHN4W0BOwg',
    locale: 'fr',
    headerToolbar : false,
    eventColor :"#fff",
    contentHeight:"auto",
    visibleRange: (currentDate)  => {
      // Generate a new date for manipulating in the next step
      var startDate = new Date(currentDate.valueOf());
      var endDate = new Date(currentDate.valueOf());

      // Adjust the start & end dates, respectively
      startDate.setDate(startDate.getDate() - 1); // One day in the past
      endDate.setDate(endDate.getDate() + 365); // Two days into the future

      return { start: startDate, end: endDate };
    },
    events: {
      className:"test",
      googleCalendarId: 'bghv1scrnrnf7efdvma75651jg@group.calendar.google.com',
    },
    eventDidMount: (event)=>{
      let element : HTMLElement = event.el;
      (element.querySelector("a") as HTMLElement).innerText+= "\n"+ event.event.extendedProps.location
      //@ts-ignore
      element.previousSibling.querySelector("a").style.color="#fff"
      //@ts-ignore
      element.previousSibling.querySelector("a").style.cursor="default"
      element.style.backgroundColor ="rgb(22,18,98,20%)";
      element.style.color ="white";

    },
    eventClick  :(eventclick) => {
      eventclick.jsEvent.preventDefault()
      window.open("https://www.google.com/maps/search/?api=1&query="+eventclick.event.extendedProps.location)
    },
    displayEventEnd : false,
  }

  constructor() {}

  ngOnInit(): void {
  }

}
