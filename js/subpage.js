let urlParams = new URLSearchParams(window.location.search);

let id = urlParams.get("id");
console.log("i want to get article: " + id);


fetch("http://www.mrbertea.com/wordpress/theme7/wp-json/wp/v2/venue/"+id)
  .then(e=>e.json())
  .then(showSinglePost)


function showSinglePost(aPost){
  console.log(aPost);
  document.querySelector("#singleCar h1").textContent=aPost.title.rendered;


  //show carsection
  document.querySelector("#singleCar").classList.add("slideInCar");
}
