(function(){
    "use strict";

    angular
        .module("productManagement")
        .controller("productDetailCtrl", [productDetailCtrl]);

    function productDetailCtrl(){

        var vm = this;

        vm.product = {
            "productId":1,
            "productName":"Leaf Rake",
            "productCode":"GDN001",
            "releaseDate":"2009-10-15",
            "description":"A great leaf rake.",
            "cost":9.00,
            "price":19.95,
            "category":"garden",
            "tags":["tag1`","tag2"],
            "imageUrl":"product/leafrake.jpg"
        };

        vm.title = "Product Detail: " + vm.product.productName;

        if(vm.product.tags){
            vm.product.tagList = vm.product.tags.toString();
        }
    }
}());