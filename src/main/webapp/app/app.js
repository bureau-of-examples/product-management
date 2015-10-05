(function () {
    "use strict";
    var app = angular.module(
        "productManagement",
        ["common.services", "ui.router", "ui.mask", "ui.bootstrap", "angularCharts", "productResourceMock"]);

    app.config(["$provide", decorateExceptionHandler]);

    function decorateExceptionHandler($provide){
        $provide.decorator("$exceptionHandler", ["$delegate", function($delegate){

            return function(exception, cause){
                exception.message = "Please contact the Help Desk!\n Message:" + exception.message;
                $delegate(exception, cause);
                alert(exception.message);
            };
        }]);
    }

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

        $stateProvider.state("priceAnalytics", {
            url: "/priceAnalytics",
            templateUrl: "app/prices/priceAnalyticsView.html",
            controller: "priceAnalyticsCtrl",
            resolve: {
                productResource: "productResource",
                products: ["productResource", function(productResource){
                    return productResource.query(
                        function(){},
                        function(response){
                            if(response.status == 404) {
                                alert("Error accessing resource: " + response.config.method + " " + response.config.url);
                            } else {
                                alert(response.statusText);
                            }
                        }
                    ).$promise;
                }]
            }
        });
    }

}());

