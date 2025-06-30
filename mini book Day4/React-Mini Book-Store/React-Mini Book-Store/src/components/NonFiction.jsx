import NonFictionData from "../nonfiction.json"
import BookCard from "./BookCard";
export default function NonFiction() {
  return (
    <div >
      <h1 data-testid="books-container-title" style={{  textAlign:"center"}}>Non-Fiction Book</h1>

      <div className="books-container" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)",gap: "1rem"}}>
      {NonFictionData.map((el,i)=> <BookCard author={el.author} img={el.img} price={el.price} title={el.title} year={el.year} />)}
      <flag props={NonFictionData}/>

      </div>
    </div>
  );
}

