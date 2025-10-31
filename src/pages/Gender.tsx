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
  IonIcon,
  IonMenuButton,
  IonButtons,
  IonSpinner,
  IonBadge
} from '@ionic/react';
import { maleOutline, femaleOutline, searchOutline } from 'ionicons/icons';
import axios from 'axios';
import './Gender.css';

interface GenderData {
  name: string;
  gender: string;
  probability: number;
  count: number;
}

const Gender: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [genderData, setGenderData] = useState<GenderData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchGender = async () => {
    if (!name.trim()) {
      setError('Por favor ingresa un nombre');
      return;
    }

    setLoading(true);
    setError('');
    setGenderData(null);

    try {
      const response = await axios.get(`https://api.genderize.io/?name=${name}`);
      setGenderData(response.data);
    } catch (err) {
      setError('Error al obtener datos. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      fetchGender();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="gradient-header">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Predictor de Género</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="gender-content">
        <div className="gender-container">
          <IonCard className="input-card fade-in">
            <IonCardContent>
              <div className="icon-header">
                <IonIcon icon={maleOutline} className="gender-icon male" />
                <IonIcon icon={femaleOutline} className="gender-icon female" />
              </div>
              
              <h2 className="card-title">Descubre el Género</h2>
              <p className="card-subtitle">Ingresa un nombre y descubre su género predicho</p>

              <IonInput
                value={name}
                placeholder="Ej: María, Juan, Alex..."
                onIonInput={(e: any) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="custom-input"
                clearInput
              />

              <IonButton
                expand="block"
                onClick={fetchGender}
                disabled={loading}
                className="custom-button"
                style={{ '--background': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              >
                {loading ? (
                  <IonSpinner name="crescent" />
                ) : (
                  <>
                    <IonIcon icon={searchOutline} slot="start" />
                    Predecir Género
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

          {genderData && (
            <IonCard 
              className={`result-card fade-in ${genderData.gender === 'male' ? 'male-result' : 'female-result'}`}
            >
              <IonCardContent>
                <div className="result-header">
                  <IonIcon 
                    icon={genderData.gender === 'male' ? maleOutline : femaleOutline}
                    className="result-icon"
                  />
                </div>

                <h2 className="result-name">{genderData.name}</h2>
                
                <div className="gender-badge-container">
                  <IonBadge 
                    className="gender-badge"
                    color={genderData.gender === 'male' ? 'primary' : 'secondary'}
                  >
                    {genderData.gender === 'male' ? 'MASCULINO' : 'FEMENINO'}
                  </IonBadge>
                </div>
              </IonCardContent>
            </IonCard>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Gender;
