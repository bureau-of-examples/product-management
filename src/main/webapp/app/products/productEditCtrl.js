(function(){
    "use strict";

    angular.module("productManagement").controller("productEditCtrl", ["product", "$state", "productResource", "productService", productEditCtrl]);

    function productEditCtrl(product, $state, productResource, productService){
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

        vm.showError = false;

        vm.submit = function(isValid) {
            if(!isValid){
                alert("Please correct the validation errors first.");
                vm.showError = true;
                return;
            }
            productResource.save(vm.product).$promise.then(function(){
                toastr.success("Save successful.");
            });
        };

        vm.cancel = function() {
            $state.go("productList");
        };

        vm.addTags = function(tags){
            if(tags){
                var array = tags.split(',');
                vm.product.tags = vm.product.tags ? vm.product.tags.concat(array) : array;
                vm.newTags = "";
            } else {
                alert("Please enter one or more tags separated by commas.");
            }
        };

        vm.removeTag = function(idx){
            vm.product.tags.splice(idx, 1);
        };

        vm.priceOption="percent";

        vm.marginPercent = function(){
            return productService.calculateMarginPercent(vm.product.price, vm.product.cost);
        };

        vm.calculatePrice = function(){
            var price = 0;

            if(vm.priceOption == "percent"){
                price = productService.calculatePriceFromPercent(vm.product.cost, vm["markupPercent"]);
            } else if(vm.priceOption == "amount") {
                price = productService.calculatePriceFromAmount(vm.product.cost, vm["markupAmount"]);
            }

            vm.product.price = price;
        };

    }


}());

