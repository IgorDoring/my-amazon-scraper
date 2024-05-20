let products;
function insertProducts(products) {
  document.getElementById("products-wrapper").innerHTML = "";
  for (let product of products) {
    let productEl = document.createElement("div");
    productEl.className = "product";

    let productImgEl = document.createElement("img");
    let productTitleEl = document.createElement("h4");
    let productInfoEL = document.createElement("p");
    productImgEl.src = product.imgUrl;
    productImgEl.alt = product.name;
    productTitleEl.innerText = product.name;
    productInfoEL.innerText = product.rating + " (" + product.reviews + ")";
    productEl.appendChild(productImgEl);
    productEl.appendChild(productTitleEl);
    productEl.appendChild(productInfoEL);
    document.getElementById("products-wrapper").appendChild(productEl);
  }
}

function scrape() {
  let keyword = document.getElementById("k").value;
  if (keyword) {
    keyword = keyword.trim();
    keyword = keyword.replace(" ", "+");
  }
  const xhttp = new XMLHttpRequest();
  console.log("requesting");
  xhttp.onreadystatechange = function () {
    document.getElementById("loading").style.display = "block";
    if (this.readyState == 4 && this.status == 200) {
      console.log("request successful", this.responseText);
      document.getElementById("loading").style.display = "none";
      products = JSON.parse(this.responseText);
      insertProducts(products);
    }
    if (this.readyState == 4 && this.status != 200) {
      console.log("request failed", this.responseText);
      document.getElementById("loading").innerText =
        "Sorry, something went wrong";
    }
  };
  xhttp.open("GET", "/api/scrape?keyword=" + keyword);
  xhttp.send();
}
