

export default function BookCard(props) {
  return (
    <div style={{ width: "200px", boxShadow: "0 0 10px #ccc", padding: "1px", borderRadius: "8px" }}data-testid="book-card">
      <img src={props.img} alt={""} style={{ width: "100%", height: "auto" }}/>
      <b>
        <div data-testid="book-card-title">
          {props.title}
          <span>{props.year}</span>
        </div>
      </b>
      <div data-testid="book-card-author">{props.tilte}</div>
      <div data-testid="book-card-price">{props.price}</div>
    </div>
  );
}

