import  React from 'react';
import { useNavigate } from 'react-router-dom';
 
const  TeamProfile = ({ teamData, imageUrl, squadData }) => {
  const  navigate = useNavigate();

  if  (!teamData || !teamData.team) return null;
  const  { team, pregameForm } = teamData;

  const  handlePlayerClick = (id) => {
     navigate(`/players/${id}`);
  };

  const  formatNumber = (num) => {
    if  (!num) return 'N/A';
    return  new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="player-profile-card team-profile-card">
      <div  className="profile-header team-header">
        <div  className="profile-main-info">
          <div  className="player-avatar-container team-crest-container">
            <img  src={imageUrl || "/player-avatar.png"} alt={team.name} className="player-avatar team-crest" />
          </div>
          <div  className="name-container">
            <h2  className="player-name">{team.name}</h2>
            <div  className="player-badges">
              {team.country?.name && (
                <span  className="badge country-badge">{team.country.name}</span>
              )}
              {team.primaryUniqueTournament?.name && (
                <span className="badge position-badge tournament-badge">
                  {team.primaryUniqueTournament.name}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div  className="profile-body">
        {pregameForm && (
          <div  className="form-section">
            <div  className="form-rating-box">
              <span  className="rating-label">Avg Rating</span>
              <span  className="rating-value">{pregameForm.avgRating || 'N/A'}</span>
            </div>
            {pregameForm.form && pregameForm.form.length > 0 && (
              <div   className="recent-form">
                <span  className="form-label">Recent Form</span>
                <div  className="form-badges-container">
                  {pregameForm.form.map((res, idx) => (
                    <span key={idx} className="form-badge">{res}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div  className="stats-grid premium-grid">
          <div  className="stat-box">
            <div  className="stat-label">Manager</div>
            <div  className="stat-value text-val">{team.manager?.name || 'N/A'}</div>
          </div>
          <div  className="stat-box">
            <div  className="stat-label">Stadium</div>
            <div  className="stat-value text-val">{team.venue?.name || 'N/A'}</div>
            {team.venue?.city?.name && <div className="stat-sublabel">{team.venue.city.name}</div>}
          </div>
          <div  className="stat-box">
            <div  className="stat-label">Capacity</div>
            <div  className="stat-value small-val">{formatNumber(team.venue?.capacity)}</div>
          </div>
        </div>

        {squadData && squadData.length > 0 && (
          <div  className="squad-section mt-4">
            <h3  className="squad-title">Projected Starting XI</h3>
            <div  className="squad-grid starting-xi-grid">
              {squadData.slice(0, 11).map((squadMember) => (
                  <div
                    key={squadMember.player.id}
                    className="squad-player-card"
                    onClick={() => handlePlayerClick(squadMember.player.id)}
                  >
                  <img 
                    src="/player-avatar.png"
                    alt={squadMember.player.name}
                    className="squad-player-img"
                  />
                 
                  <span className="squad-player-name">{squadMember.player.shortName || squadMember.player.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamProfile;
