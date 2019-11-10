import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';

export const Home: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Ionic Blank</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      The world is your oyster.
      <p>
        If you get lost, the
        {' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://ionicframework.com/docs/"
        >
          docs
        </a>
        {' '}
        will be your guide.
      </p>
    </IonContent>
  </IonPage>
);
