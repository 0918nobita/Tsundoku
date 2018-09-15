import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import * as $ from 'jquery';
/*import * as firebase from 'firebase/app';
import "firebase/auth"*/

@Component({
  selector: 'app-twistamp',
  templateUrl: './twistamp.component.html',
  styleUrls: ['./twistamp.component.css']
})
export class TwistampComponent implements OnInit, AfterViewInit {
  functions: firebase.functions.Functions;

  constructor(private elementRef: ElementRef,
              private firebaseService: FirebaseService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.color = 'black';
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#E2E9EE';
  }

  login() {
    /*this.firebaseService.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then(result => {
        console.log(result.user);
      })
      .catch(error => console.log(error));*/
    $('#login').hide();
    $('#myself').show();
  }
}
