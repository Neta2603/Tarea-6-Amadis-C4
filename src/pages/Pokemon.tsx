import React, { useState, useRef } from 'react';
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
  IonBadge,
  IonChip,
  IonLabel
} from '@ionic/react';
import { gameController, searchOutline, volumeHighOutline, flashOutline, barChartOutline, playCircleOutline } from 'ionicons/icons';
import axios from 'axios';
import './Pokemon.css';

interface Pokemon {
  name: string;
  id: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  base_experience: number;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  cries?: {
    latest: string;
  };
}

const Pokemon: React.FC = () => {
  const [pokemonName, setPokemonName] = useState<string>('');
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement>(null);

  const typeColors: { [key: string]: string } = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };

  const getTypeColor = (typeName: string): string => {
    return typeColors[typeName] || '#68A090';
  };

  const fetchPokemon = async () => {
    if (!pokemonName.trim()) {
      setError('Por favor ingresa un nombre de Pokémon');
      return;
    }

    setLoading(true);
    setError('');
    setPokemon(null);

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      setPokemon(response.data);
    } catch (err) {
      setError('Pokémon no encontrado. Verifica el nombre e intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const playSound = () => {
    if (pokemon?.cries?.latest && audioRef.current) {
      audioRef.current.src = pokemon.cries.latest;
      audioRef.current.play();
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      fetchPokemon();
    }
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
              <IonIcon icon={gameController} />
              <span>Pokédex</span>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="pokemon-content">
        <div className="pokemon-container">
          <IonCard className="input-card fade-in">
            <IonCardContent>
              <div className="icon-header">
                <div className="pokeball-icon">
                  <div className="pokeball-top"></div>
                  <div className="pokeball-middle"></div>
                  <div className="pokeball-bottom"></div>
                </div>
              </div>
              
              <h2 className="card-title">Buscar Pokémon</h2>
              <p className="card-subtitle">Ingresa el nombre o número de un Pokémon</p>

              <IonInput
                value={pokemonName}
                placeholder="Ej: pikachu, charizard, 25..."
                onIonInput={(e: any) => setPokemonName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="custom-input"
                clearInput
              />

              <IonButton
                expand="block"
                onClick={fetchPokemon}
                disabled={loading}
                className="custom-button"
                style={{ '--background': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' }}
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

          {pokemon && (
            <IonCard className="pokemon-card fade-in">
              <div 
                className="pokemon-header"
                style={{
                  background: `linear-gradient(135deg, ${typeColors[pokemon.types[0].type.name]} 0%, ${typeColors[pokemon.types[0].type.name]}cc 100%)`
                }}
              >
                <div className="pokemon-id">#{pokemon.id.toString().padStart(3, '0')}</div>
                <div className="pokemon-image-container">
                  <img
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={pokemon.name}
                    className="pokemon-image"
                  />
                </div>
              </div>

              <IonCardContent>
                <h2 className="pokemon-name">{pokemon.name}</h2>

                <div className="pokemon-types">
                  {pokemon.types.map((type, index) => (
                    <IonChip
                      key={index}
                      className="type-chip"
                      style={{ background: getTypeColor(type.type.name) }}
                    >
                      {type.type.name}
                    </IonChip>
                  ))}
                </div>

                <div className="pokemon-stats-grid">
                  <div className="stat-item">
                    <IonIcon icon={barChartOutline} className="stat-icon" />
                    <div className="stat-info">
                      <p className="stat-label">Experiencia Base</p>
                      <p className="stat-value">{pokemon.base_experience}</p>
                    </div>
                  </div>

                  <div className="stat-item">
                    <IonIcon icon={flashOutline} className="stat-icon" />
                    <div className="stat-info">
                      <p className="stat-label">Tamaño</p>
                      <p className="stat-value">{(pokemon.height / 10).toFixed(1)} m</p>
                    </div>
                  </div>

                  <div className="stat-item">
                    <IonIcon icon={flashOutline} className="stat-icon" />
                    <div className="stat-info">
                      <p className="stat-label">Peso</p>
                      <p className="stat-value">{(pokemon.weight / 10).toFixed(1)} kg</p>
                    </div>
                  </div>
                </div>

                <div className="abilities-section">
                  <h3 className="section-title">Habilidades</h3>
                  <div className="abilities-list">
                    {pokemon.abilities.map((ability, index) => (
                      <IonChip key={index} className="ability-chip">
                        {ability.ability.name.replace('-', ' ')}
                        {ability.is_hidden && <IonBadge color="warning" className="hidden-badge">Hidden</IonBadge>}
                      </IonChip>
                    ))}
                  </div>
                </div>

                {pokemon.cries?.latest && (
                  <div className="sound-section">
                    <div style={{ textAlign: 'center' }}>
                      <IonChip onClick={playSound} className="play-sound-chip">
                        <IonIcon icon={playCircleOutline} />
                        <IonLabel>Reproducir Sonido</IonLabel>
                      </IonChip>
                    </div>
                    <audio ref={audioRef} src={pokemon.cries.latest} />
                  </div>
                )}
              </IonCardContent>
            </IonCard>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Pokemon;
