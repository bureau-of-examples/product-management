(function () {
    "use strict";
    angular
        .module("productManagement")
        .controller("productListCtrl", [productListCtrl]);

    function productListCtrl(){
        var vm = this;
        vm.products = [
            {
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
            },
            {
                "productId":5,
                "productName":"Hammer",
                "productCode":"Tool",
                "releaseDate":"2012-10-30",
                "description":"A powerful hammer.",
                "cost":1.00,
                "price":11.95,
                "category":"tool",
                "tags":["tag1`","tag2"],
                "imageUrl":"product/hammer.jpg"
            }
        ];

        vm.showImage = false;

        vm.toggleImage = function(){

            vm.showImage = !vm.showImage;
        };


    }


}());
