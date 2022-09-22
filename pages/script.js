var lineItem = document.querySelectorAll(".animate__animated");
lineItem.forEach((item, index) => {
 item.className += " animate__fadeInUp animate__delay_" + index;
});