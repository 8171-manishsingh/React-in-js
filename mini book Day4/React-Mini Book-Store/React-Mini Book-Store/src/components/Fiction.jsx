import ficationalData from "../fiction.json"
 import BookCard from "./BookCard";
export default function Fiction() {
  return (
    <div   >
      <h1 data-testid="books-container-title" style={{ textAlign:"center"}}> Fictional Books</h1>
      <div
        className="books-container"
        style={{display:"grid", gridTemplateColumns: "repeat(3,1fr)",gap: "1rem"}}
      >
        {/* Map all Fictional Books here */}
         {ficationalData.map((el,i)=> <BookCard author={el.author} img={el.img} price={el.price} title={el.title} year={el.year} />)}
      </div>
    </div>
  );
}


