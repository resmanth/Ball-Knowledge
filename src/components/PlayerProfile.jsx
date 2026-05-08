

import  React from 'react';

const  PlayerProfile = ({ player, imageUrl }) => {
  if  (!player) return null;

  const  getAge = (dateString) => {
    if ( !dateString) return 'N/A';
    const  today = new Date();
    const  birthDate = new Date(dateString);
    let  age = today.getFullYear() - birthDate.getFullYear();
    const  m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const  formatValue = (value, currency) => {
    if ( !value) return 'N/A';
    const  formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'EUR',
      maximumFractionDigits: 0,
    });
    return  formatter.format(value);
  };

  return (
    <div className="player-profile-card">
      <div className="profile-header">
        <div className="profile-main-info">
          <div className="player-avatar-container">
            <img src={imageUrl || "/player-avatar.png"} alt={player.name} className="player-avatar" />
          </div>
          <div  className="jersey-number">{player.jerseyNumber || player.shirtNumber || '-'}</div>
          <div  className="name-container">
            <h2  className="player-name">{player.name}</h2>
            <div  className="player-badges">
              <span  className="badge position-badge">{player.position}</span>
              {player.country?.name && (
                <span  className="badge country-badge">{player.country.name}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div  className="profile-body">
        <div  className="stats-grid premium-grid">
          <div  className="stat-box">
            <div  className="stat-label">Age</div>
            <div  className="stat-value small-val">{getAge(player.dateOfBirth)}</div>
          </div>
          <div  className="stat-box">
            <div  className="stat-label">Height</div>
            <div  className="stat-value small-val">{player.height ? `${player.height} cm` : 'N/A'}</div>
          </div>
          <div  className="stat-box">
            <div  className="stat-label">Foot</div>
            <div className="stat-value small-val">{player.preferredFoot || 'N/A'}</div>
          </div>
          <div  className="stat-box">
            <div  className="stat-label">Market Value</div>
            <div className="stat-value small-val  highlight-val">
              {formatValue(player.proposedMarketValueRaw?.value,  player.proposedMarketValueRaw?.currency)}
            </div>
          </div>
        </div>

        {player.team && (
          <div className="team-section">
            <h3 className="section-title">Current Team</h3>
            <div className="team-card">
              <div className="team-info">
                <div className="team-name">{player.team.name}</div>
                <div className="tournament-name">{player.team.tournament?.name}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerProfile;
