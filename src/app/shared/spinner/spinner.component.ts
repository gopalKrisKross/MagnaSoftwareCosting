import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { PubsubService } from 'src/app/services/pubsub/pubsub.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  isLoaderPresent: boolean = false;
  get showLoader(): boolean {
    return this.isLoaderPresent;
  }

  constructor(private pubsub: PubsubService) {}

  ngOnInit(): void {
    this.pubsub.loaderShow$.pipe(delay(0)).subscribe((res) => {
      this.isLoaderPresent = res ? true : false;
    });
    // console.log('loadder', this.pubsub.loaderShow$);
  }
}
