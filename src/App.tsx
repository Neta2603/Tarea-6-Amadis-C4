import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonMenuToggle,
  IonSplitPane
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  homeOutline,
  maleOutline,
  timeOutline,
  schoolOutline,
  cloudyOutline,
  gameController,
  newspaperOutline,
  informationCircleOutline,
  constructOutline
} from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './App.css';

/* Pages */
import Home from './pages/Home';
import Gender from './pages/Gender';
import Age from './pages/Age';
import Universities from './pages/Universities';
import Weather from './pages/Weather';
import Pokemon from './pages/Pokemon';
import News from './pages/News';
import About from './pages/About';

setupIonicReact();

const App: React.FC = () => {
  const menuItems = [
    { title: 'Inicio', url: '/home', icon: homeOutline },
    { title: 'Género', url: '/gender', icon: maleOutline },
    { title: 'Edad', url: '/age', icon: timeOutline },
    { title: 'Universidades', url: '/universities', icon: schoolOutline },
    { title: 'Clima RD', url: '/weather', icon: cloudyOutline },
    { title: 'Pokémon', url: '/pokemon', icon: gameController },
    { title: 'Noticias', url: '/news', icon: newspaperOutline },
    { title: 'Acerca de', url: '/about', icon: informationCircleOutline },
  ];

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <IonMenu contentId="main" type="overlay">
            <IonHeader>
              <IonToolbar>
                <IonTitle>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <IonIcon icon={constructOutline} style={{ fontSize: '24px', color: 'white' }} />
                    <span>Couteau Tools</span>
                  </div>
                </IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
                {menuItems.map((item, index) => (
                  <IonMenuToggle key={index} autoHide={false}>
                    <IonItem routerLink={item.url} routerDirection="none" lines="none" detail={false}>
                      <IonIcon slot="start" icon={item.icon} />
                      <IonLabel>{item.title}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                ))}
              </IonList>
            </IonContent>
          </IonMenu>

          <IonRouterOutlet id="main">
            <Route exact path="/home" component={Home} />
            <Route exact path="/gender" component={Gender} />
            <Route exact path="/age" component={Age} />
            <Route exact path="/universities" component={Universities} />
            <Route exact path="/weather" component={Weather} />
            <Route exact path="/pokemon" component={Pokemon} />
            <Route exact path="/news" component={News} />
            <Route exact path="/about" component={About} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
