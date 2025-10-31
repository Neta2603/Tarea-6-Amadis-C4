import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonIcon,
  IonMenuButton,
  IonButtons,
  IonList,
  IonItem,
  IonLabel,
  IonButton
} from '@ionic/react';
import {
  informationCircleOutline,
  mailOutline,
  cardOutline,
  logoGithub,
  phonePortraitOutline
} from 'ionicons/icons';
import './About.css';

const About: React.FC = () => {
  const contactInfo = {
    name: 'Edward Neftali Liriano Gomez',
    matricula: '2022-0437',
    email: 'neftalirn@gmail.com',
    github: 'https://github.com/Neta2603',
    phone: '+1 (809) 777-0697',
  };

  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  const sendEmail = () => {
    window.location.href = `mailto:${contactInfo.email}`;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="gradient-header">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <IonIcon icon={informationCircleOutline} />
              <span>Acerca de</span>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="about-content">
        <div className="about-container">
          {/* Profile Card */}
          <IonCard className="profile-card fade-in">
            <div className="profile-header">
              <div className="profile-image-container">
                <div className="profile-image">
                  <img src="/assets/foto_perfil.jpg" alt="Profile" className="profile-photo" />
                </div>
                <div className="profile-ring"></div>
              </div>
            </div>

            <IonCardContent>
              <h1 className="profile-name">{contactInfo.name}</h1>
            </IonCardContent>
          </IonCard>

          {/* Contact Information */}
          <IonCard className="contact-card fade-in" style={{ animationDelay: '0.1s' }}>
            <IonCardContent>
              <h2 className="section-title">
                <IonIcon icon={mailOutline} />
                Información de Contacto
              </h2>

              <IonList lines="none" className="contact-list">
                <IonItem className="contact-item">
                  <IonIcon icon={cardOutline} slot="start" color="primary" />
                  <IonLabel>
                    <p className="contact-label">Matrícula</p>
                    <h3 className="contact-value">{contactInfo.matricula}</h3>
                  </IonLabel>
                </IonItem>

                <IonItem className="contact-item" button onClick={sendEmail}>
                  <IonIcon icon={mailOutline} slot="start" color="danger" />
                  <IonLabel>
                    <p className="contact-label">Email</p>
                    <h3 className="contact-value">{contactInfo.email}</h3>
                  </IonLabel>
                </IonItem>

                <IonItem className="contact-item">
                  <IonIcon icon={phonePortraitOutline} slot="start" color="success" />
                  <IonLabel>
                    <p className="contact-label">Teléfono</p>
                    <h3 className="contact-value">{contactInfo.phone}</h3>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Social Links */}
          <IonCard className="social-card fade-in" style={{ animationDelay: '0.2s' }}>
            <IonCardContent>
              <h2 className="section-title">Redes Sociales</h2>

              <div className="social-buttons">
                <IonButton
                  expand="block"
                  onClick={() => openLink(contactInfo.github)}
                  className="social-button github-button"
                >
                  <IonIcon icon={logoGithub} slot="start" />
                  GitHub
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default About;
