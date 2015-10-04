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

        var resolveProductById = {
            productResource:"productResource",

            product:["productResource", "$stateParams", function(productResource, $stateParams){
                var productId = $stateParams.productId;
                return productResource.get({productId:productId}).$promise;
            }]

        };

        $stateProvider.state("productEdit", {
            abstract: true,
            url: "/products/edit/:productId",
            templateUrl:"app/products/productEditView.html",
            controller: "productEditCtrl as vm",
            resolve: resolveProductById
        })
            .state("productEdit.info", {
               url:"/info",
                templateUrl:"app/products/productEditInfoView.html"
            })
            .state("productEdit.price", {
                url:"/price",
                templateUrl:"app/products/productEditPriceView.html"
            })
            .state("productEdit.tags", {
                url:"tags",
                templateUrl:"app/products/productEditTagsView.html"
            });

        $stateProvider.state("productDetail", {
            url: "/products/:productId",
            templateUrl:"app/products/productDetailView.html",
            controller: "productDetailCtrl as vm",
            resolve: resolveProductById
        });
    }

}());

