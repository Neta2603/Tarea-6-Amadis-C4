import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonMenuButton,
  IonButtons,
  IonSpinner,
  IonList,
  IonItem,
  IonLabel,
  IonBadge
} from '@ionic/react';
import { schoolOutline, searchOutline, globeOutline, linkOutline } from 'ionicons/icons';
import axios from 'axios';
import './Universities.css';

interface University {
  name: string;
  domains: string[];
  web_pages: string[];
  country: string;
}

const Universities: React.FC = () => {
  const [country, setCountry] = useState<string>('');
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchUniversities = async () => {
    if (!country.trim()) {
      setError('Por favor ingresa un país');
      return;
    }

    setLoading(true);
    setError('');
    setUniversities([]);

    try {
      // Using the original API endpoint
      const response = await axios.get(
        `http://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`
      );
      
      if (response.data && response.data.length > 0) {
        setUniversities(response.data);
      } else {
        setError('No se encontraron universidades para este país. Intenta con el nombre en inglés.');
      }
    } catch (err) {
      setError('Error al obtener datos. Verifica el nombre del país en inglés (ej: Dominican Republic)');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      fetchUniversities();
    }
  };

  const openWebsite = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="gradient-header">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Universidades</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="universities-content">
        <div className="universities-container">
          <IonCard className="input-card fade-in">
            <IonCardContent>
              <div className="icon-header">
                <IonIcon icon={schoolOutline} className="school-icon" />
                <IonIcon icon={globeOutline} className="globe-icon" />
              </div>
              
              <h2 className="card-title">Buscar Universidades</h2>
              <p className="card-subtitle">Ingresa el nombre de un país en inglés</p>

              <IonInput
                value={country}
                placeholder="Ej: Dominican Republic, United States..."
                onIonInput={(e: any) => setCountry(e.target.value)}
                onKeyPress={handleKeyPress}
                className="custom-input"
                clearInput
              />

              <IonButton
                expand="block"
                onClick={fetchUniversities}
                disabled={loading}
                className="custom-button"
                style={{ '--background': 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)' }}
              >
                {loading ? (
                  <IonSpinner name="crescent" />
                ) : (
                  <>
                    <IonIcon icon={searchOutline} slot="start" />
                    Buscar
                  </>
                )}
              </IonButton>

              {error && (
                <div className="error-message fade-in">
                  {error}
                </div>
              )}
            </IonCardContent>
          </IonCard>

          {universities.length > 0 && (
            <div className="results-header fade-in">
              <IonBadge color="success" className="results-badge">
                {universities.length} Universidades Encontradas
              </IonBadge>
            </div>
          )}

          <IonList className="universities-list">
            {universities.map((uni, index) => (
              <IonCard 
                key={index} 
                className="university-card fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <IonCardHeader>
                  <div className="university-header">
                    <IonIcon icon={schoolOutline} className="uni-icon" />
                    <IonCardTitle className="university-name">{uni.name}</IonCardTitle>
                  </div>
                </IonCardHeader>
                <IonCardContent>
                  <IonList lines="none" className="info-list">
                    <IonItem className="info-item">
                      <IonIcon icon={globeOutline} slot="start" color="primary" />
                      <IonLabel>
                        <p className="info-label">Dominio</p>
                        <h3 className="info-value">{uni.domains[0]}</h3>
                      </IonLabel>
                    </IonItem>
                    
                    <IonItem className="info-item">
                      <IonIcon icon={linkOutline} slot="start" color="success" />
                      <IonLabel>
                        <p className="info-label">Sitio Web</p>
                        <h3 
                          className="info-value link-value"
                          onClick={() => openWebsite(uni.web_pages[0])}
                        >
                          Visitar →
                        </h3>
                      </IonLabel>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Universities;
