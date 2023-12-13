import { Component , OnInit} from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

//import carousel1 from '../../../../assets/images/carousel1.png';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class CarouselComponent {


  event_list = [
    {
      event:' Event 1',
      eventLocation:'',
      eventDescription:'',
      // img: '../../../../assets/images/banner/MicrosoftDefender.png',
      img: '../../../../assets/images/Final banner - section 1300 x 200 px.png',
      eventStartDate: new Date('2019/05/20'),
      eventEndingDate: new Date('2019/05/24')
    },
    {
      event:' Event 2',
      eventLocation:'',
      eventDescription:'',
      img: '../../../../assets/images/offerbanner.png',
      eventStartDate: new Date('2018/05/20'),
      eventEndingDate: new Date('2018/05/24')
    },
     {
      event:' Event 3',
      eventLocation:'',
      eventDescription:'',
      // img: '../../../../assets/images/banner/AzureActiveDirectory.png',
      img: '../../../../assets/images/Final banner 2 - section 1300 x 200 px.png',
      eventStartDate: new Date('2019/07/28'),
      eventEndingDate: new Date('2019/07/30')
    },
    {
      event:' Event 4',
      eventLocation:'',
      eventDescription:'',
      img: '../../../../assets/images/Final banner - section 3 -1300 x 200 px.jpg',
      eventStartDate: new Date('2020/05/20'),
      eventEndingDate: new Date('2020/05/24')
    },
     /*{
      event:' Event 4',
      eventLocation:'',
      eventDescription:'',
      img: '../../../../assets/images/banner/MicrosoftPurview.png',
      eventStartDate: new Date('2018/05/20'),
      eventEndingDate: new Date('2018/05/24')
    },
    {
      event:' Event 5',
      eventLocation:'',
      eventDescription: '',
      img: '../../../../assets/images/banner/MicrosoftIntune.png',
      eventStartDate: new Date('2017/07/10'),
      eventEndingDate: new Date('2017/08/14')
    },*/
    /*{
      event:' Event 6',
      eventLocation:'Mumbai',
      eventDescription:'Mumbai is hub of startups',
      img: 'https://picsum.photos/900/500?random&t=8',
      eventStartDate: new Date(),
      eventEndingDate: new Date()
    },
    {
      event:' Event 7',
      eventLocation:'Barcelona',
      eventDescription:'Barcelona is another good city',
      img: 'https://picsum.photos/900/500?random&t=6',
      eventStartDate: new Date(),
      eventEndingDate: new Date()
    },*/
  ]

  upcoming_events =  this.event_list.filter( event => event.eventStartDate > new Date());
  past_events = this.event_list.filter(event => event.eventEndingDate < new Date());
  current_events =  this.event_list.filter( event => (event.eventStartDate >= new Date() && (event.eventEndingDate <= new Date())))
  constructor() {
  }

  ngOnInit() {
  }

}