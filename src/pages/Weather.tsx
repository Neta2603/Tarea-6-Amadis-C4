import React, { useState, useEffect } from 'react';
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
  IonSpinner,
  IonRefresher,
  IonRefresherContent,
  IonBadge
} from '@ionic/react';
import {
  cloudyOutline,
  sunnyOutline,
  rainyOutline,
  thermometerOutline,
  waterOutline,
  speedometerOutline,
  refreshOutline
} from 'ionicons/icons';
import axios from 'axios';
import './Weather.css';

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  icon: string;
}

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  
  const fetchWeather = async () => {
    setLoading(true);
    setError('');

    try {
      // Using wttr.in as a free alternative that doesn't require API key
      const response = await axios.get(
        'https://wttr.in/SantoDomingo?format=j1'
      );
      
      const current = response.data.current_condition[0];
      
      setWeather({
        temperature: parseInt(current.temp_C),
        description: current.weatherDesc[0].value,
        humidity: parseInt(current.humidity),
        windSpeed: parseInt(current.windspeedKmph),
        feelsLike: parseInt(current.FeelsLikeC),
        icon: getWeatherIcon(current.weatherDesc[0].value)
      });
    } catch (err) {
      setError('Error al obtener datos del clima. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherIcon = (description: string): string => {
    const desc = description.toLowerCase();
    if (desc.includes('rain') || desc.includes('shower')) return 'rainy';
    if (desc.includes('cloud')) return 'cloudy';
    if (desc.includes('clear') || desc.includes('sunny')) return 'sunny';
    return 'cloudy';
  };

  const handleRefresh = (event: CustomEvent) => {
    fetchWeather().then(() => {
      event.detail.complete();
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="gradient-header">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Clima en República Dominicana</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="weather-content">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className="weather-container">
          {loading && (
            <div className="loading-container">
              <IonSpinner name="crescent" className="weather-spinner" />
              <p className="loading-text">Cargando clima...</p>
            </div>
          )}

          {error && (
            <IonCard className="error-card fade-in">
              <IonCardContent>
                <div className="error-content">
                  <IonIcon icon={cloudyOutline} className="error-icon" />
                  <h2>{error}</h2>
                  <IonButtons>
                    <IonIcon 
                      icon={refreshOutline} 
                      className="refresh-button"
                      onClick={fetchWeather}
                    />
                  </IonButtons>
                </div>
              </IonCardContent>
            </IonCard>
          )}

          {weather && !loading && (
            <>
              <IonCard className="main-weather-card fade-in">
                <IonCardContent>
                  <div className="location-badge">
                    <IonBadge color="primary">Santo Domingo</IonBadge>
                  </div>

                  <div className="weather-icon-container">
                    {weather.icon === 'sunny' && <IonIcon icon={sunnyOutline} className="main-weather-icon sunny-icon" />}
                    {weather.icon === 'cloudy' && <IonIcon icon={cloudyOutline} className="main-weather-icon cloudy-icon" />}
                    {weather.icon === 'rainy' && <IonIcon icon={rainyOutline} className="main-weather-icon rainy-icon" />}
                  </div>

                  <div className="temperature-display">
                    <span className="temperature-value">{weather.temperature}</span>
                    <span className="temperature-unit">°C</span>
                  </div>

                  <div className="weather-description">
                    {weather.description}
                  </div>

                  <div className="feels-like">
                    Sensación térmica: {weather.feelsLike}°C
                  </div>
                </IonCardContent>
              </IonCard>

              <div className="weather-details-grid">
                <IonCard className="detail-card fade-in" style={{ animationDelay: '0.1s' }}>
                  <IonCardContent>
                    <IonIcon icon={thermometerOutline} className="detail-icon temperature-icon" />
                    <div className="detail-label">Temperatura</div>
                    <div className="detail-value">{weather.temperature}°C</div>
                  </IonCardContent>
                </IonCard>

                <IonCard className="detail-card fade-in" style={{ animationDelay: '0.2s' }}>
                  <IonCardContent>
                    <IonIcon icon={waterOutline} className="detail-icon humidity-icon" />
                    <div className="detail-label">Humedad</div>
                    <div className="detail-value">{weather.humidity}%</div>
                  </IonCardContent>
                </IonCard>

                <IonCard className="detail-card fade-in" style={{ animationDelay: '0.3s' }}>
                  <IonCardContent>
                    <IonIcon icon={speedometerOutline} className="detail-icon wind-icon" />
                    <div className="detail-label">Viento</div>
                    <div className="detail-value">{weather.windSpeed} km/h</div>
                  </IonCardContent>
                </IonCard>
              </div>

              <div className="last-updated fade-in" style={{ animationDelay: '0.4s' }}>
                <p>Última actualización: {new Date().toLocaleTimeString('es-DO')}</p>
                <IonIcon 
                  icon={refreshOutline} 
                  className="refresh-icon"
                  onClick={fetchWeather}
                />
              </div>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Weather;
