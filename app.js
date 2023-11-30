// CROLL BUTTON CODE
let mybutton = document.getElementById("myBtn");

let clickAudio = document.getElementById("myAudio");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function Loader() {
	
	let main = document.getElementById("main");
	main.style.display = "block";
}

//Dark mode toggle
let x = document.createElement("LINK");
x.setAttribute("rel", "stylesheet");
x.setAttribute("type", "text/css");
x.setAttribute("href", "./Assets/css/dark.css");

let mode = document.getElementById('mode');
mode.addEventListener('click', () => {
	if (mode.src.match("moon")) {
		mode.src = "./Assets/img/sunrise.png";
		document.head.appendChild(x);
	} else {
		mode.src = "./Assets/img/moon.png";
		document.head.removeChild(x);
	}
});

//function to go to top
function scrollFunction() {
	if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
		mybutton.style.display = "block";
	} else {
		mybutton.style.display = "none";
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// FETCH PRODUCTS IN JSON 

function showTopShoes(startIndex, endIndex) {
	let topProducts = document.getElementById("topProducts");
	fetch('Assets/json/topProducts.json')
		.then(response => response.json())
		.then(data => {
			let shoes = data.shoes;
			// console.log(shoes);
			let str = "";
			for (startIndex; startIndex < endIndex; startIndex++) {
				str += `
			<div class="p-body">
			<div class="circle" style="background: linear-gradient(239deg, ${shoes[startIndex].bgGradient[0]} 0%, ${shoes[startIndex].bgGradient[1]} 100%);"></div>
                <img class="shoesImg" src="${shoes[startIndex].imgSrc}" alt="shoes">
                <div class="rating">
                    <i class="fa fa-star clicked"></i>
                    <i class="fa fa-star clicked"></i>
                    <i class="fa fa-star clicked"></i>
                    <i class="fa fa-star clicked"></i>
                    <i class="fa fa-star"></i>
                </div>
				<div class="top-p-text">
                	<p class="top-p-name">${shoes[startIndex].name}</p>
					<p class="top-p-price">${shoes[startIndex].price}<span id="liveToastBtn" onClick="addProduct(${shoes[startIndex].id},'${shoes[startIndex].name}','${shoes[startIndex].price}','${shoes[startIndex].imgSrc}');" class="material-symbols-outlined addIcon">add_shopping_cart</span></p>
				</div>
            </div>
			`;
			}
			topProducts.innerHTML = str;
		})
		.catch(err => console.error(err));
}
showTopShoes(0, 4);
// SHOW NUMBER OF PRODUCT IN CART LOGO 

function addProduct(id, name, price, imgSrc) {
	clickAudio.play()
	let quantity = 1;
	let toastLiveExample = document.getElementById('liveToast')
	let cartProduct = localStorage.getItem('cartProduct');
	const toast = new bootstrap.Toast(toastLiveExample);
	if (cartProduct == null) {
		cartArr = [];
	} else {
		cartArr = JSON.parse(cartProduct);
	}

	for (let i = 0; i < cartArr.length; i++) {
		if (cartArr[i].id == id) {
			quantity = (cartArr[i].quantity) + 1;
			cartArr.splice(i, 1);
		}
	}
	let cartObj = {
		'id': id,
		'name': name,
		'price': price,
		'imgSrc': imgSrc,
		'quantity': quantity
	};
	cartArr.push(cartObj);
	localStorage.setItem('cartProduct', JSON.stringify(cartArr))
	toast.show();
	let cartCount = document.getElementById("cartCount");
	cartCount.innerText = cartArr.length;
	// if (cartProducts.length == 0) {
	// 	cartProducts.push(cartObj);
	// 	localStorage.setItem('cartProduct', JSON.stringify(cartProducts))
	// } else {
	// 	for (let i = 0; i < cartProducts.length; i++) {
	// 		if (cartProducts[i].id == id) {
	// 			break;
	// 		} else {
	// 			// cartProducts.push(cartObj);
	// 			localStorage.setItem('cartProduct', JSON.stringify(cartProducts))
	// 		}
	// 	}
	// }
}

// DISPLAY ITEMS IN CART 
function displayCartPage() {
	let cartBody = document.getElementById("cartBody");
	let clearCartBtn = document.getElementById('clearCartBtn');
	let checkoutBtn = document.getElementById('checkoutBtn');
	let myCart = localStorage.getItem('cartProduct');

	if (myCart == null) {
		document.getElementById('emptyCart').style.display = "table-row";
		clearCartBtn.classList.add("disable");
		checkoutBtn.classList.add("disable");
		checkoutBtn.style.display = "none";
	} else {
		clearCartBtn.classList.remove("disable");
		checkoutBtn.classList.remove("disable");
		checkoutBtn.style.display = "block";
		clearCartBtn.classList.add("hero-btn");
		myCart = JSON.parse(myCart);
		// console.log(myCart);
		let str = "";
		for (let i = 0; i < myCart.length; i++) {
			str += `
					<tr>
						<th class="cart-prod" scope="row">
							<img src="${myCart[i].imgSrc}" alt="shoes">
							<div class="cart-text">
								<h5>${myCart[i].name}</h5>
								<h6>Price : ${myCart[i].price}</h6>
								<span id="${myCart[i].id}" onclick="removeFromCart(this.id)">Remove</span>
							</div>
						</th>
						<td>${myCart[i].quantity}</td>
						<td>$${parseFloat((myCart[i].price).substring(1, myCart[i].price.length)) * (myCart[i].quantity)}</td>
					</tr>
    `;
		}
		cartBody.innerHTML = str;
	}
}
// REMOVE ITEM FROM CART 
function removeFromCart(id) {
	clickAudio.play()
	let toastLiveExampleDelete = document.getElementById('liveToastDelete')
	const toast = new bootstrap.Toast(toastLiveExampleDelete)
	let myCartStr = localStorage.getItem('cartProduct');
	myCart = JSON.parse(myCartStr);
	for (let i = 0; i < myCart.length; i++) {
		if (myCart[i].id == id) {
			myCart.splice(i, 1);
		}
	}
	localStorage.setItem('cartProduct', JSON.stringify(myCart));
	showTotalPrice();
	displayCartPage();
	toast.show();
	if (myCart.length == 0) {
		clearCart();
	}
	document.getElementById("cartCount").innerText = myCart.length;
}


// CLEAR CART 
function clearCart() {
	localStorage.clear();
	let totalPrice = document.getElementById("totalPrice");
	let cartBody = document.getElementById("cartBody");
	cartBody.innerHTML = `<tr id="emptyCart">
	<td colspan="3" class="text-center">
	<img style="height: 500px;" src="./Assets/img/empty-cart.png" alt="empty-cart">
	</td>
	</tr>`;
	document.getElementById('clearCartBtn').classList.add("disable");
	totalPrice.innerText = "$0.00";
	document.getElementById('checkoutBtn').style.display = "none";
	document.getElementById("cartCount").innerText = "0";
}

// MALE AND FEMALE SHOES DISPLAY 

function displayNewShoes() {
	let toggleGender = document.getElementById("toggleGender");
	let sellerShoes = document.getElementById("sellerShoes");
	let shoesDisplay = document.getElementById("shoesDisplay");
	let bestSellerShoesText = document.getElementById("bestSellerShoesText");

	if (toggleGender.checked == true) {
		sellerShoes.src = './Assets/img/best-seller-women.png'
		shoesDisplay.style.background = 'linear-gradient(270deg, #FF3C78 0%, #FFB2B2 100%) ';
		bestSellerShoesText.innerText = 'Adidas Falcon Shoes for women - 2021 Edition (PINK)';
	} else {
		sellerShoes.src = './Assets/img/best-seller-men.png'
		shoesDisplay.style.background = 'linear-gradient(270deg, #2226d4 0%, #98cef9 100%) ';
		bestSellerShoesText.innerText = 'Adidas Falcon Shoes for men - 2021 Edition (BLUE)';
	}
}

function showCartPage() {
	document.getElementById('hiddenCartPage').style.display = "none";
	document.getElementById('cart-container').style.display = "block";
	displayCartPage();
	showTotalPrice();
}

// SHOW TOTAL PRICE OF CART 
function showTotalPrice() {
	let totalPrice = document.getElementById("totalPrice");
	let myCart = localStorage.getItem('cartProduct');
	if (myCart == null) {
		totalPrice.innerText = "$0";
	} else {
		myCart = JSON.parse(myCart);
		let sum = 0;
		for (let i = 0; i < myCart.length; i++) {
			sum += parseFloat((myCart[i].price).substring(1, myCart[i].price.length)) * (myCart[i].quantity);

		}
		totalPrice.innerText = "$" + sum;
	}
}


// SHOW ANIMATION WHEN CHECKOUT 
function showAnimation() {
	let lottie = document.getElementById('lottie');
	lottie.style.display = 'block';
	setTimeout(() => {
		lottie.style.display = "none";
	}, 4000);
	document.getElementById('checkoutBtn').classList.add('disable')
	clearCart();
	document.getElementById('checkoutBtn').style.display = "none";
}
