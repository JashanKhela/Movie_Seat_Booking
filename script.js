const container = document.querySelector(".__container");
const seats = document.querySelectorAll(".__row .__seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");


//the plus before the value turns it into a number
let ticketPrice = +movieSelect.value;

const setMovieData = (movieIndex , moviePrice) => {
  localStorage.setItem('selectedMovie', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);


}

const updatedSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".__row .__seat.selected");
  
  //get seat indexes
  const seatIndexes = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  console.log(seatIndexes);
  //add to LS
  localStorage.setItem('selectedSeats', JSON.stringify(seatIndexes));
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

//get data from ls and populate UI
const populate = () =>{
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat , index) =>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
    if(selectedMovie !== null) {
        movieSelect.selectedIndex = selectedMovie;
    };


}

populate();


movieSelect.addEventListener('change', (e)=>{
ticketPrice = +e.target.value;
setMovieData(e.target.selectedIndex , event.target.value);
updatedSelectedCount();
})


container.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("__seat") &&
    !event.target.classList.contains("occupied")
  ) {
    event.target.classList.toggle("selected");
    updatedSelectedCount();
  }
});

updatedSelectedCount();