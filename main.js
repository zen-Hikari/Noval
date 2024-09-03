
const navMenu = document.querySelector(".nav-menu");

function active() {
    navMenu.classList.toggle("active");
}

window.onscroll = () => {
    navMenu.classList.remove("active");
};

window.addEventListener('scroll', function() { 
    const header = this.document.querySelector('nav');
    header.classList.toggle('sticky', window.scrollY > 0);
});



// img slider
let index = 0;

function showSlide(n) {
  const slides = document.querySelectorAll('.img-slider img');
  const totalSlides = slides.length;

  if (n >= totalSlides) index = 0;
  if (n < 0) index = totalSlides - 1;

  const offset = -index * 100;
  document.querySelector('.img-slider').style.marginLeft = `${offset}%`;

  updateNavigation(index);
}

function updateNavigation(index) {
  const navLinks = document.querySelectorAll('.navigation a');
  navLinks.forEach((link, i) => {
    if (i === index) {
      link.classList.add('active'); // Highlight the active dot
    } else {
      link.classList.remove('active');
    }
  });
}

function nextSlide() {
  index++;
  showSlide(index);
}

setInterval(nextSlide, 2666); // Change slide every 3 seconds

document.querySelectorAll('.navigation a').forEach((link, i) => {
  link.addEventListener('click', () => {
    index = i;
    showSlide(index);
  });
});

showSlide(index);

// email
const form = document.querySelector('form');
const fullName = document.getElementById("name"); 
const email = document.getElementById("email"); 
const phone = document.getElementById("phone"); 
const subject = document.getElementById("subject"); 
const mess = document.getElementById("message"); 

function sendEmail() {
  const bodyMessage = `Full Name: ${fullName.value}<br> Email:  ${email.value}<br> Phone Number:  ${phone.value}<br> Message:  ${mess.value}`; 
  


  Email.send({
    SecureToken : "79a659b7-e718-4380-90a9-e3f473269471",
    To : 'danorel048@gmail.com',
    From : "danorel048@gmail.com",
    Subject : subject.value,
    Body : bodyMessage
}).then(
  message => {
    if (message == "OK") {
      Swal.fire({
        title: "Succes!",
        text: "Message Sent Successfully!",
        icon: "success"
      });
       } 
     }
  );
}

function checkInputs () {
  const items = document.querySelectorAll(".item");

  for (const item of items) {
    if (item.value == ""){
        item.classList.add("error");
        item.parentElement.classList.add("error");
    }

    if (items[1].value != "") {
      checkEmail();
    }

    items[1].addEventListener("keyup", () => {
      checkEmail();
    });

    item.addEventListener("keyup", () => {
      if (item.value != "") {
          item.classList.remove("error");
          item.parentElement.classList.remove("error");
      }
      else {
          item.classList.add("error");
          item.parentElement.classList.add("error");
      }
    });
  }
}

function checkEmail() {
   const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
   const errorTxtEmail = document.querySelector(".error-txt.email");

   if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if (email.value != "") {
          errorTxtEmail.innerText = "Enter a Valid email address";
        }
        else {
          errorTxtEmail.innerText = "Email can't be blank";
        }
   }
   else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
   }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs ();

  if (!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") && !mess.classList.contains("error")) {
     sendEmail();
  }

  form.reset();
  return false

});
