import {
  IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact, IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { homeOutline, personOutline, archiveOutline, homeSharp, personSharp, archiveSharp, logoMicrosoft } from 'ionicons/icons';
import SideBar from './Navigation/SideBar';
import Page from './pages/Page';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

import '@ionic/react/css/core.css';

import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.css';

setupIonicReact();

const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <SideBar />
          <IonTabs>
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                <Redirect to="/page" />
              </Route>

              <Route exact path="/tab1">
                <Tab1 />
              </Route>
              <Route exact path="/tab2">
                <Tab2 />
              </Route>
              <Route path="/tab3">
                <Tab3 />
              </Route>

              <Route path="/page" exact={true}>
                <Page />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="page" href="/page">
                <IonIcon ios={logoMicrosoft} md={logoMicrosoft} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon ios={homeOutline} md={homeSharp} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon ios={archiveOutline} md={archiveSharp} />
                <IonLabel>History</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon ios={personOutline} md={personSharp} />
                <IonLabel>Account</IonLabel>
              </IonTabButton>
            </IonTabBar>

          </IonTabs>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
