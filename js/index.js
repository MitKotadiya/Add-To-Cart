let form = document.querySelector("form");
editindex = null

form.addEventListener("submit" , (event) => {

  event.preventDefault();
  clearError();

  let image = document.getElementById("productimage").value;
  let name = document.getElementById("productname").value;
  let description = document.getElementById("productdes").value;
  let price = document.getElementById("productprice").value;

    if (image === "") {
      document.getElementById("imageerror").innerHTML = "Plase Enter image url"
      return;
    }
    if (name === "") {
      document.getElementById("nameerror").innerHTML = "Plase Enter Product Name"
      return;
    }
    if (description === "") {
      document.getElementById("decerror").innerHTML = "Plase Enter Product description"
      return;
    }
    if (price == "" || price < 0) {
      document.getElementById("priceerror").innerHTML = "Enater Price in Positive Number"
      return;
    } else{

        let user = JSON.parse(localStorage.getItem("key")) || []
        let id = Math.floor(Math.random() * 90000) + 10000;

        let productobj = {
          id: id,
          image: image,
          name: name,
          description: description,
          price: price
        };
        
        user.push(productobj);
        localStorage.setItem("key" , JSON.stringify(user))
        form.reset();
        display()
    }
});


// CLEAR ERROR


let clearError = () => {
 let errors =  document.querySelectorAll(".error");
 errors.forEach((element) => {
  element.innerHTML = "";
 });
}


// ADD DATA


let display = () => {
  let user = JSON.parse(localStorage.getItem("key")) || [];
  let show = document.querySelector(".row");
  show.innerHTML = "";

user.forEach((item , index) => {
let col =`<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mt-4">
  <div class="shop-content me-4">
    <div class="shop-imge mb-4">
      <img src="${item.image}" alt="image">
    </div>
    <div class="shop-description mb-4 text-center">
      <h2>${item.name}</h2>
      <p>${item.description}</p>
    </div>
    <div class="shop-control d-flex justify-content-between align-items-center flex-wrap">
      <span class="w-100 text-center mb-2">₹${item.price}</span>
      <div class="shop-btn mt-2 w-100 d-flex flex-wrap gap-2 justify-content-center align-items-center">
        
        <button onClick="addCart(${index})"><i class="ri-shopping-cart-line"></i></button>
        <button data-bs-toggle="modal" data-bs-target="#edit-modal" onClick="editItem(${index})"><i class="ri-edit-line"></i></button>
        <button onClick="deleteItem(${index})"><i class="ri-delete-bin-line"></i></button>
        <button class="w-100">Buy</button>
      </div>
    </div>
  </div>
</div>` ;
  show.innerHTML += col;
});
};
display();

// DELETE PRODUCT

let deleteItem = (index) => {

  let user = JSON.parse(localStorage.getItem("key")) || [];
  user.splice(index , 1);
  localStorage.setItem("key" , JSON.stringify(user));
  display();

}

// EDIT PRODUCT

let editItem = (index) => {
  let user = JSON.parse(localStorage.getItem("key")) || [];
  editvalue = user[index];
  
  let edimage = document.getElementById("edproductimage");
  let edname = document.getElementById("edproductname");
  let eddescription = document.getElementById("edproductdes"); 
  let edprice = document.getElementById("edproductprice");   

  edimage.value = editvalue.image;
  edname.value = editvalue.name;
  eddescription.value = editvalue.description;
  edprice.value = editvalue.price;
  
  editindex = index

}

  let edform = document.getElementById("edit-form");
  edform.addEventListener("submit" , (event) => {
    event.preventDefault();
    clearError()

    let user = JSON.parse(localStorage.getItem("key")) || [];
    let edimage = document.getElementById("edproductimage").value
    let edname = document.getElementById("edproductname").value
    let eddescription = document.getElementById("edproductdes").value
    let edprice = document.getElementById("edproductprice").value

    if (edimage === "") {
      document.getElementById("edimageerror").innerHTML = "Plase Enter image url"
      return;
    }
    if (edname === "") {
      document.getElementById("ednameerror").innerHTML = "Plase Enter Product Name"
      return;
    }
    if (eddescription === "") {
      document.getElementById("eddecerror").innerHTML = "Plase Enter Product description"
      return;
    }
    if (edprice == "" || edprice < 0) {
      document.getElementById("edpriceerror").innerHTML = "Enater Price in Positive Number"
      return;
    }
      user[editindex] = {
        id: user[editindex].id,
        image: edimage,
        name: edname,
        description: eddescription,
        price: edprice
    };
    localStorage.setItem("key", JSON.stringify(user));
    display();
    edform.reset();
    editindex = null;
  let hidemodal = document.getElementById("edit-modal");
  
  })

// ADD TO CART

let addCart = (index) => {
  document.getElementById("cart-warning").style.display = "none"
  let user = JSON.parse(localStorage.getItem("key")) || [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let indexvalue = user[index];

  let checkcart = cart.some((item) => {
    if (item.id === indexvalue.id) {
      item.quantity += 1;
      return true;
    }
    return false;
  });

  if (!checkcart) {
    indexvalue.quantity = 1;
    cart.push(indexvalue);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  let showcart = document.getElementById("cart-row");
  showcart.innerHTML = "";

    let gs = 0;
    cart.forEach((element) => {
    gs += element.price * element.quantity;
    let row = `
      <div class="col-md-5 mb-4">
        <div class="cart-image text-center mt-sm-4 mt-md-0">
          <img src="${element.image}" alt="image" class="img-fluid rounded shadow-sm">
        </div>
      </div>
      <div class="col-md-4">
        <div class="cart-info ms-md-4 me-md-4 mt-sm-4 mt-md-0 text-center">
          <h3 class="fw-semibold mb-2">${element.name}</h3>
          <p class="text-white">${element.description}</p>
          <div class="text-white fw-bold fs-5">₹${element.price}</div>
        </div>
      </div>
      <div class="col-md-3 text-center">
        <div class="cart-qty">
          <p class="mb-2 fw-semibold">Quantity</p>
          <div class="d-flex justify-content-center align-items-center">
            <button class="mathsign me-2" onclick="minuse(${element.id})"><i class="ri-subtract-line"></i></button>
            <span class="mx-2">${element.quantity}</span>
            <button class="mathsign ms-2" onclick="pluse(${element.id})"><i class="ri-add-line"></i></button>
          </div>
          <button class="mathsign ms-2 mt-2" onclick="deleteCart(${element.id})"><i class="ri-delete-bin-line"></i></button>
          <p class="mt-3 mb-0 fw-bold text-white">Total: ₹${element.price * element.quantity}</p>
        </div>
      </div>
      <hr class="mt-2">`
    showcart.innerHTML += row;
  });

  let totalRow = 
    `<div class="text-end mt-4 pe-3">
      <h4 class="fw-bold">Grand Total: ₹<span id="grand-total">${gs}</span></h4>
    </div>`
  showcart.innerHTML += totalRow;
};

let pluse = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach((item) => {
    if (item.id === id) {
      item.quantity++;
    }
  });

  localStorage.setItem("cart", JSON.stringify(cart)); 

  let showcart = document.getElementById("cart-row");
  showcart.innerHTML = "";

    let gs = 0;
    cart.forEach((element) => {
    gs += element.price * element.quantity;
    let row = `
      <div class="col-md-5 mb-4">
        <div class="cart-image text-center mt-sm-4 mt-md-0">
          <img src="${element.image}" alt="image" class="img-fluid rounded shadow-sm">
        </div>
      </div>
      <div class="col-md-4">
        <div class="cart-info ms-md-4 me-md-4 mt-sm-4 mt-md-0 text-center">
          <h3 class="fw-semibold mb-2">${element.name}</h3>
          <p class="text-white">${element.description}</p>
          <div class="text-white fw-bold fs-5">₹${element.price}</div>
        </div>
      </div>
      <div class="col-md-3 text-center">
        <div class="cart-qty">
          <p class="mb-2 fw-semibold">Quantity</p>
          <div class="d-flex justify-content-center align-items-center">
            <button class="mathsign me-2" onclick="minuse(${element.id})"><i class="ri-subtract-line"></i></button>
            <span class="mx-2">${element.quantity}</span>
            <button class="mathsign ms-2" onclick="pluse(${element.id})"><i class="ri-add-line"></i></button>
          </div>
          <button class="mathsign ms-2 mt-2" onclick="deleteCart(${element.id})"><i class="ri-delete-bin-line"></i></button>
          <p class="mt-3 mb-0 fw-bold text-white">Total: ₹${element.price * element.quantity}</p>
        </div>
      </div>
      <hr class="mt-2">`
    showcart.innerHTML += row;
  });

  let totalRow = 
    `<div class="text-end mt-4 pe-3">
      <h4 class="fw-bold">Grand Total: ₹<span id="grand-total">${gs}</span></h4>
    </div>`
  showcart.innerHTML += totalRow;
};

let minuse = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach((item) => {
    if (item.id === id && item.quantity > 1) {
      item.quantity--;
    }
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  let showcart = document.getElementById("cart-row");
  showcart.innerHTML = "";

    let gs = 0;
    cart.forEach((element) => {
    gs += element.price * element.quantity;
        let row = `
      <div class="col-md-5 mb-4">
        <div class="cart-image text-center mt-sm-4 mt-md-0">
          <img src="${element.image}" alt="image" class="img-fluid rounded shadow-sm">
        </div>
      </div>
      <div class="col-md-4">
        <div class="cart-info ms-md-4 me-md-4 mt-sm-4 mt-md-0 text-center">
          <h3 class="fw-semibold mb-2">${element.name}</h3>
          <p class="text-white">${element.description}</p>
          <div class="text-white fw-bold fs-5">₹${element.price}</div>
        </div>
      </div>
      <div class="col-md-3 text-center">
        <div class="cart-qty">
          <p class="mb-2 fw-semibold">Quantity</p>
          <div class="d-flex justify-content-center align-items-center">
            <button class="mathsign me-2" onclick="minuse(${element.id})"><i class="ri-subtract-line"></i></button>
            <span class="mx-2">${element.quantity}</span>
            <button class="mathsign ms-2" onclick="pluse(${element.id})"><i class="ri-add-line"></i></button>
          </div>
          <button class="mathsign ms-2 mt-2" onclick="deleteCart(${element.id})"><i class="ri-delete-bin-line"></i></button>
          <p class="mt-3 mb-0 fw-bold text-white">Total: ₹${element.price * element.quantity}</p>
        </div>
      </div>
      <hr class="mt-2">`
    showcart.innerHTML += row;
  });

  let totalRow = 
    `<div class="text-end mt-4 pe-3">
      <h4 class="fw-bold">Grand Total: ₹<span id="grand-total">${gs}</span></h4>
    </div>`
  showcart.innerHTML += totalRow;
};

let deleteCart = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.forEach((item, index) => {
    if (item.id === id) {
      cart.splice(index, 1);
    }
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  let showcart = document.getElementById("cart-row");
  showcart.innerHTML = "";
  
    let gs = 0;
    cart.forEach((element) => {
    gs += element.price * element.quantity;
        let row = `
      <div class="col-md-5 mb-4">
        <div class="cart-image text-center mt-sm-4 mt-md-0">
          <img src="${element.image}" alt="image" class="img-fluid rounded shadow-sm">
        </div>
      </div>
      <div class="col-md-4">
        <div class="cart-info ms-md-4 me-md-4 mt-sm-4 mt-md-0 text-center">
          <h3 class="fw-semibold mb-2">${element.name}</h3>
          <p class="text-white">${element.description}</p>
          <div class="text-white fw-bold fs-5">₹${element.price}</div>
        </div>
      </div>
      <div class="col-md-3 text-center">
        <div class="cart-qty">
          <p class="mb-2 fw-semibold">Quantity</p>
          <div class="d-flex justify-content-center align-items-center">
            <button class="mathsign me-2" onclick="minuse(${element.id})"><i class="ri-subtract-line"></i></button>
            <span class="mx-2">${element.quantity}</span>
            <button class="mathsign ms-2" onclick="pluse(${element.id})"><i class="ri-add-line"></i></button>
          </div>
          <button class="mathsign ms-2 mt-2" onclick="deleteCart(${element.id})"><i class="ri-delete-bin-line"></i></button>
          <p class="mt-3 mb-0 fw-bold text-white">Total: ₹${element.price * element.quantity}</p>
        </div>
      </div>
      <hr class="mt-2">`
    showcart.innerHTML += row;
  });

  let totalRow = 
    `<div class="text-end mt-4 pe-3">
      <h4 class="fw-bold">Grand Total: ₹<span id="grand-total">${gs}</span></h4>
    </div>`
  showcart.innerHTML += totalRow;
}










