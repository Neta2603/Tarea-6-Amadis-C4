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
import { timeOutline, searchOutline, personOutline } from 'ionicons/icons';
import axios from 'axios';
import './Age.css';

interface AgeData {
  name: string;
  age: number;
  count: number;
}

const Age: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [ageData, setAgeData] = useState<AgeData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getAgeCategory = (age: number): { category: string; emoji: string; color: string } => {
    if (age < 18) {
      return { 
        category: 'Joven', 
        emoji: '👶',
        color: '#4ade80'
      };
    } else if (age < 60) {
      return { 
        category: 'Adulto', 
        emoji: '👨',
        color: '#667eea'
      };
    } else {
      return { 
        category: 'Anciano', 
        emoji: '👴',
        color: '#f59e0b'
      };
    }
  };

  const fetchAge = async () => {
    if (!name.trim()) {
      setError('Por favor ingresa un nombre');
      return;
    }

    setLoading(true);
    setError('');
    setAgeData(null);

    try {
      const response = await axios.get(`https://api.agify.io/?name=${name}`);
      setAgeData(response.data);
    } catch (err) {
      setError('Error al obtener datos. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      fetchAge();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="gradient-header">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Calculador de Edad</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="age-content">
        <div className="age-container">
          <IonCard className="input-card fade-in">
            <IonCardContent>
              <div className="icon-header">
                <IonIcon icon={timeOutline} className="time-icon" />
              </div>
              
              <h2 className="card-title">Estima la Edad</h2>
              <p className="card-subtitle">Ingresa un nombre y descubre su edad estimada</p>

              <IonInput
                value={name}
                placeholder="Ej: Carlos, Ana, Luis..."
                onIonInput={(e: any) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="custom-input"
                clearInput
              />

              <IonButton
                expand="block"
                onClick={fetchAge}
                disabled={loading}
                className="custom-button"
                style={{ '--background': 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)' }}
              >
                {loading ? (
                  <IonSpinner name="crescent" />
                ) : (
                  <>
                    <IonIcon icon={searchOutline} slot="start" />
                    Calcular Edad
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

          {ageData && ageData.age && (
            <IonCard className="result-card fade-in">
              <IonCardContent>
                <div className="result-header">
                  <div className="emoji-container">
                    <span className="age-emoji">{getAgeCategory(ageData.age).emoji}</span>
                  </div>
                </div>

                <h2 className="result-name">{ageData.name}</h2>
                
                <div className="age-display">
                  <div className="age-number">{ageData.age}</div>
                  <div className="age-label">años</div>
                </div>

                <div className="category-badge-container">
                  <IonBadge 
                    className="category-badge"
                    style={{ 
                      backgroundColor: getAgeCategory(ageData.age).color
                    }}
                  >
                    {getAgeCategory(ageData.age).category.toUpperCase()}
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

export default Age;
