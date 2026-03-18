(function () {
  var buttons = document.querySelectorAll(".remove-btn");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var productId = button.getAttribute("data-product-id");

      fetch("/cart/" + productId, {
        method: "DELETE",
        headers: {
          Accept: "application/json"
        }
      })
        .then(function (response) {
          if (!response.ok) {
            return response.json().then(function (body) {
              throw new Error(body.error || "Failed to remove item");
            });
          }
          window.location.reload();
        })
        .catch(function (error) {
          alert(error.message);
        });
    });
  });
})();