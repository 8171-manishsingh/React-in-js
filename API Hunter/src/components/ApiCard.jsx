import './ApiCard.css';

function ApiCard({ api, isFavorite, toggleFavorite, openApi }) {
  const favText = isFavorite ? 'Heart' : 'NoHeart';
  const authText = api.auth === 'None' ? 'Free' : 'Key';
  const corsText = api.cors === 'Yes' ? 'CORS Yes' : 'CORS ?';
  const cls = "fav-btn" + (isFavorite ? " active" : "");
  const cCls = "tag tag-cors" + (api.cors === 'Yes' ? " tag-yes" : "");
  return (
    <div className="api-card" onClick={() => openApi(api)}>
      <div className="card-header">
        <span className="card-category">{api.category}</span>
        <button className={cls} onClick={(e) => { e.stopPropagation(); toggleFavorite(api.id); }}>
          {favText}
        </button>
      </div>
      <h3 className="card-title">{api.name}</h3>
      <p className="card-desc">{api.description}</p>
      <div className="card-footer">
        <div className="card-tags">
          <span className="tag tag-auth">{authText}</span>
          <span className={cCls}>{corsText}</span>
        </div>
        <span className="card-price">{api.pricing}</span>
      </div>
    </div>
  );
}

export default ApiCard;
