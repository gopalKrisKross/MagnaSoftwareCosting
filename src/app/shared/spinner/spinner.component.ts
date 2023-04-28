import { Component, OnInit } from '@angular/core';
import { PubsubService } from 'src/app/services/punsub/pubsub.service';

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

  constructor(private pubsub: PubsubService) {
    this.pubsub.loaderShow$.subscribe((res) => {
      if (res) {
        this.isLoaderPresent = res ? true : false;
      }
    });
  }

  ngOnInit(): void {}
}
