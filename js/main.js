let template = document.querySelector("#uctemp").content;
let carlist = document.querySelector("#carlist");
let page = 1;
let lookingForData = false;

function fetchUsedCars(){
  lookingForData=true;

  let urlParams = new URLSearchParams(window.location.search);

  let catid = urlParams.get("category");
  let endpoint = "http://www.mrbertea.com/wordpress/theme7/wp-json/wp/v2/venue?_embed&per_page=2&page="+page
  if(catid){ // DRY
    endpoint = "http://www.mrbertea.com/wordpress/theme7/wp-json/wp/v2/venue?_embed&per_page=2&page="+page + "&categories="+catid
  }



    fetch(endpoint)
      .then(e => e.json())
      .then(showCars);


}

function showCars(data){
  console.log(data)
  lookingForData=false;
  data.forEach(showSingleCar);
}

function showSingleCar(aCar){
  let clone = template.cloneNode(true);
  clone.querySelector("h1").textContent = aCar.title.rendered;
  clone.querySelector(".descript").innerHTML = aCar.content.rendered;
	clone.querySelector(".price span").textContent = aCar.acf.price;
	clone.querySelector(".hour span").textContent = aCar.acf.hour;
	clone.querySelector(".date span").textContent = aCar.acf.date;


  if(aCar._embedded["wp:featuredmedia"]){//img is there
     clone.querySelector("img").setAttribute("src", aCar._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
  } else { // no img
      clone.querySelector("img").remove()
  }

  clone.querySelector('.readmore').href="subpage.html?id=" + aCar.id;


  carlist.appendChild(clone);
}
fetchUsedCars();


//found this stuff online
setInterval(function(){

  if(bottomVisible() && lookingForData===false){
    console.log("We've reached rock bottom, fetching articles")
    page++;
    fetchUsedCars();
  }
}, 1000)

function bottomVisible() {
  const scrollY = window.scrollY
  const visible = document.documentElement.clientHeight
  const pageHeight = document.documentElement.scrollHeight
  const bottomOfPage = visible + scrollY >= pageHeight
  return bottomOfPage || pageHeight < visible
}







