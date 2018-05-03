let urlParams = new URLSearchParams(window.location.search);

let id = urlParams.get("id");
console.log("i want to get article: " + id);


fetch("http://canyouseethrough.me/kea2/theme7/wordpress/wp-json/wp/v2/volunteering/"+id)
  .then(e=>e.json())
  .then(showSinglePost)


function showSinglePost(aPost){
  console.log(aPost);
  document.querySelector("#singleCar h1").textContent=aPost.title.rendered;


  //show carsection
  document.querySelector("#singleCar").classList.add("slideInCar");
}
