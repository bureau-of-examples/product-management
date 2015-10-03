(function () {
    "use strict";
    var app = angular.module("productManagement", ["common.services", "ui.router", "productResourceMock"]);

    app.config(["$stateProvider", "$urlRouterProvider", configureStateProvider]);

    function configureStateProvider($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise("/");

        $stateProvider.state("home", {
            url: "/",
            templateUrl: "app/welcomeView.html"
        });

        $stateProvider.state("productList", {
            url: "/products",
            templateUrl:"app/products/productListView.html",
            controller: "productListCtrl as vm"
        });

        $stateProvider.state("productEdit", {
            url: "/products/edit/:productId",
            templateUrl:"app/products/productEditView.html",
            controller: "productEditCtrl as vm"
        });

        $stateProvider.state("productDetail", {
            url: "/products/:productId",
            templateUrl:"app/products/productDetailView.html",
            controller: "productDetailCtrl as vm"
        });
    }

}());

