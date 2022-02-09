$(document).ready(function () {
  products = [];
  //check for duplicate sku --returns index
  $.fn.duplicateSKU = function (id) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].sku == id) {
        return true;
      }
    }
    return false;
  };
  //add product
  $("#add_product").click(function () {
    let sku = $("#product_sku").val();
    let name = $("#product_name").val();
    let price = $("#product_price").val();
    let quantity = $("#product_quantity").val();
    var if_valid = $.fn.validateForm(sku, name, price, quantity);
    if (!if_valid) {
      $(".error").show();
      $('.succss').hide();
    } else {
      $(".error").hide();
      products.push({ sku: sku, name: name, price: price, quantity: quantity });
      $(".success").show();
      $.fn.resetForm();
      $.fn.display();
    }
  });
  // close norification
  $("body").on("click", ".close ", function () {
    $(this).parent("div").fadeOut();
  });
  //display product
  $.fn.display = function () {
    $("#product_list").empty();
    $("#product_list").append("<table id=" + "product-table></table>");
    $("#product-table").append(
      "<th><tr><td>SKU</td><td>NAME</td><td>PRICE</td><td>QUANTITY</td><td>ACTION</td></tr></th>"
    );
    for (let i = 0; i < products.length; i++) {
      $("#product-table").append(
        "<tr><td>" +
          products[i].sku +
          "</td><td>" +
          products[i].name +
          "</td><td>" +
          products[i].price +
          "</td><td>" +
          products[i].quantity +
          "</td><td><a href='#' class='edit' data-pid=" +
          products[i].sku +
          ">Edit</a><a href='#' class='delete' data-pid=" +
          products[i].sku +
          ">Delete</a></td></tr></table>"
      );
    }
    $("#product-table").show();
  };
  // validate form
  $.fn.validateForm = function (id, name, price, quantity) {
    $(".error").empty();
    if (!id) {
      $(".error").append("<p>Product SKU is empty.</p>");
    } else if (isNaN(id)) {
      $(".error").append("<p>Product SKU must be a number.</p>");
    } else if ($.fn.duplicateSKU(id)) {
      $(".error").append("<p>Product SKU can not be duplicate.</p>");
    }
    if (!name) {
      $(".error").append("<p>Product Name field is empty.</p>");
    } else if (!isNaN(name)) {
      $(".error").append("<p>Product Name must be a string.</p>");
    }
    if (!price) {
      $(".error").append("<p>Product Price field is empty.</p>");
    } else if (isNaN(price)) {
      $(".error").append("<p>Product Price must be a number.</p>");
    }
    if (!quantity) {
      $(".error").append("<p>Product Quantity field is empty.</p>");
    } else if (isNaN(quantity)) {
      $(".error").append("<p>Product quality must be a number.</p>");
    }
    $(".error").append("<a href='#' class='close'>X</a>");
    if ($(".error").children().length > 1) {
      return false;
    }

    return true;
  };

  // reset form
  $.fn.resetForm = function (id) {
    $("#product_sku").val("");
    $("#product_name").val("");
    $("#product_price").val("");
    $("#product_quantity").val("");
    $("#add_product").show();
    $("#edit_product").hide();
  };

  // edit button
  $("#edit_product").click(function () {
    let new_sku = $("#product_sku").val();
    for (var i = 0; i < products.length; i++) {
      if (new_sku == products[i].sku) {
        break;
      }
    }
    products[i].name = $("#product_name").val();
    products[i].price = $("#product_price").val();
    products[i].quantity = $("#product_quantity").val();
    
    $.fn.display();
    $.fn.resetForm();
    $("#product_sku").attr("readonly", false);
  });

  // for edit-delete anchor

  $("body").on("click", ".edit", function () {
    $("#edit_product").show();
    $("#add_product").hide();
    let pid = $(this).data("pid");

    for (var i = 0; i < products.length; i++) {
      if (pid == products[i].sku) {
        break;
      }
    }

    $("#product_sku").val(products[i].sku);
    $("#product_sku").attr("readonly", true);
    $("#product_name").val(products[i].name);
    $("#product_price").val(products[i].price);
    $("#product_quantity").val(products[i].quantity);
  });
  $("body").on("click", ".delete", function () {
    let pid = $(this).data("pid");
    if (
      confirm("Are you sure you want to delete Product SKU " + pid + " ???")
    ) {
      for(var i=0; i<products.length; i++){
        if(products[i].sku==pid){
          break;
        }
      }
      products.splice(i,1);
      
      console.log(products);
      $.fn.display();
    } else {
      return false;
    }
  });
  //end file
});
