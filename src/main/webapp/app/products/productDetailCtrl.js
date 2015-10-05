(function(){
    "use strict";

    angular
        .module("productManagement")
        .controller("productDetailCtrl", ["product", "productService", productDetailCtrl]);

    function productDetailCtrl(product, productService){

        var vm = this;

        vm.product = product;

        vm.title = "Product Detail: " + vm.product.productName;

        vm.marginPercent = productService.calculateMarginPercent(product.price, product.cost);

        if(vm.product.tags){
            vm.product.tagList = vm.product.tags.toString();
        }
    }
}());