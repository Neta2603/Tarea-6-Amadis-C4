import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonMenuButton,
  IonButtons,
  IonSpinner,
  IonButton,
  IonBadge
} from '@ionic/react';
import { newspaperOutline, linkOutline, timeOutline, refreshOutline } from 'ionicons/icons';
import axios from 'axios';
import './News.css';

interface NewsItem {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  link: string;
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: [{
      source_url: string;
    }];
  };
}

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Using WordPress.org blog as example
  const WP_API_URL = 'https://techcrunch.com/wp-json/wp/v2/posts?per_page=3&_embed';

  const fetchNews = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(WP_API_URL);
      setNews(response.data);
    } catch (err) {
      setError('Error al cargar las noticias. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const stripHtml = (html: string): string => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-DO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const openLink = (url: string) => {
    window.open(url, '_blank');
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
              <IonIcon icon={newspaperOutline} />
              <span>Noticias</span>
            </div>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={fetchNews}>
              <IonIcon icon={refreshOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="news-content">
        <div className="news-container">
          {/* Header Section */}
          <div className="news-header fade-in">
            <div className="wordpress-logo">
              <svg viewBox="0 0 100 100" className="wp-icon">
                <rect width="100" height="100" rx="10" fill="#0a0" />
                <text x="50" y="60" font-size="50" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial">TC</text>
              </svg>
            </div>
            <h1>TechCrunch</h1>
          </div>

          {loading && (
            <div className="loading-container">
              <IonSpinner name="crescent" className="news-spinner" />
              <p className="loading-text">Cargando noticias...</p>
            </div>
          )}

          {error && (
            <IonCard className="error-card fade-in">
              <IonCardContent>
                <div className="error-content">
                  <IonIcon icon={newspaperOutline} className="error-icon" />
                  <h2>{error}</h2>
                  <IonButton onClick={fetchNews} color="primary">
                    <IonIcon icon={refreshOutline} slot="start" />
                    Reintentar
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          )}

          {!loading && news.length > 0 && (
            <div className="news-list">
              {news.map((item, index) => (
                <IonCard 
                  key={item.id} 
                  className="news-card fade-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {item._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                    <div className="news-image-container">
                      <img
                        src={item._embedded['wp:featuredmedia'][0].source_url}
                        alt={stripHtml(item.title.rendered)}
                        className="news-image"
                      />
                      <div className="news-overlay">
                        <IonBadge color="primary" className="news-badge">
                          Artículo #{index + 1}
                        </IonBadge>
                      </div>
                    </div>
                  )}

                  <IonCardHeader>
                    <div className="news-meta">
                      <IonIcon icon={timeOutline} className="meta-icon" />
                      <span className="news-date">{formatDate(item.date)}</span>
                    </div>
                    <IonCardTitle className="news-title">
                      {stripHtml(item.title.rendered)}
                    </IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent>
                    <p className="news-excerpt">
                      {stripHtml(item.excerpt.rendered).substring(0, 150)}...
                    </p>

                    <IonButton
                      expand="block"
                      onClick={() => openLink(item.link)}
                      className="visit-button"
                      color="primary"
                    >
                      <IonIcon icon={linkOutline} slot="start" />
                      Visitar Noticia
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default News;
