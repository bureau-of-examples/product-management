(function(){
    "use strict";

    angular.module("productManagement").controller("productEditCtrl", ["product", productEditCtrl]);

    function productEditCtrl(product){
        var vm = this;

        vm.product = product;

        if(vm.product && vm.product.productId){
            vm.title = "Edit: " + vm.product.productName;
        } else {
            vm.title = "New Product";
        }

        vm.isOpen = false;

        vm.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.isOpen = !vm.isOpen;
        };
    }



}());

