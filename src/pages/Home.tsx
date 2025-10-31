import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonIcon,
  IonMenuButton,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import {
  maleOutline,
  timeOutline,
  schoolOutline,
  cloudyOutline,
  gameController,
  newspaperOutline,
  constructOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const history = useHistory();

  const tools = [
    {
      title: 'Predictor de Género',
      subtitle: 'Descubre el género por nombre',
      icon: maleOutline,
      color: '#667eea',
      path: '/gender'
    },
    {
      title: 'Calculador de Edad',
      subtitle: 'Estima la edad por nombre',
      icon: timeOutline,
      color: '#764ba2',
      path: '/age'
    },
    {
      title: 'Universidades',
      subtitle: 'Busca universidades por país',
      icon: schoolOutline,
      color: '#4ade80',
      path: '/universities'
    },
    {
      title: 'Clima RD',
      subtitle: 'Pronóstico del tiempo actual',
      icon: cloudyOutline,
      color: '#60a5fa',
      path: '/weather'
    },
    {
      title: 'Pokédex',
      subtitle: 'Información de Pokémon',
      icon: gameController,
      color: '#fbbf24',
      path: '/pokemon'
    },
    {
      title: 'Noticias',
      subtitle: 'Últimas noticias WordPress',
      icon: newspaperOutline,
      color: '#f87171',
      path: '/news'
    }
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="gradient-header">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <IonIcon icon={constructOutline} />
              <span>Couteau Tools</span>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="home-content">
        {/* Hero Section con imagen de caja de herramientas */}
        <div className="hero-section">
          <div className="hero-overlay">
            <div className="hero-content fade-in">
              <IonIcon icon={constructOutline} className="hero-icon" />
              <h1>Caja de Herramientas</h1>
              <p>Todo lo que necesitas en una sola aplicación</p>
            </div>
          </div>
        </div>

        {/* Grid de herramientas */}
        <div className="tools-section">
          <h2 className="section-title">Herramientas Disponibles</h2>
          <IonGrid>
            <IonRow>
              {tools.map((tool, index) => (
                <IonCol size="12" sizeMd="6" sizeLg="4" key={index}>
                  <IonCard 
                    className="tool-card fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => history.push(tool.path)}
                    button
                  >
                    <div 
                      className="card-icon-container"
                      style={{ background: `linear-gradient(135deg, ${tool.color} 0%, ${tool.color}cc 100%)` }}
                    >
                      <IonIcon icon={tool.icon} className="card-icon" />
                    </div>
                    <IonCardHeader>
                      <IonCardTitle>{tool.title}</IonCardTitle>
                      <IonCardSubtitle>{tool.subtitle}</IonCardSubtitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </div>

        {/* Footer */}
        <div className="footer-section">
          <p>Desarrollado por Edward Neftali Liriano Gomez</p>
          <p className="footer-subtitle">2022-0437</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
