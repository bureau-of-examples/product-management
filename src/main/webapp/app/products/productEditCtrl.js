(function(){
    "use strict";

    angular.module("productManagement").controller("productEditCtrl", ["product", "$state", "productResource", productEditCtrl]);

    function productEditCtrl(product, $state, productResource){
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

        vm.submit = function() {
            productResource.save(vm.product);
        };

        vm.cancel = function() {
            $state.go("productList");
        }
    }



}());

