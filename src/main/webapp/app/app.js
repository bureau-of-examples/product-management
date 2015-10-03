(function () {
    "use strict";
    var app = angular.module("productManagement", ["common.services", "ui.router", "productResourceMock"]);

    app.config(["$stateProvider", "$urlRouterProvider", configureStateProvider]);

    function configureStateProvider($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise("/products");

        $stateProvider.state("productList", {
            url: "/products",
            templateUrl:"app/products/productListView.html",
            controller: "productListCtrl as vm"
        });
    }

}());

