(function(){
    "use strict";

    angular.module("productManagement").controller("priceAnalyticsCtrl", ["$scope", "products", "productService", "$filter", priceAnalyticsCtrl]);

    function priceAnalyticsCtrl($scope, products, productService, $filter){
        $scope.title = "Price Analytics";

        //calculate the computed fields
        for(var i=0; i<products.length; i++){
            products[i].marginPercent = productService.calculateMarginPercent(products[i].price, products[i].cost);
            products[i].marginAmount = productService.calculateMarginAmount(products[i].price, products[i].cost);
        }

        //select data
        var orderedProductsAmount = $filter("orderBy")(products, "marginAmount", true);
        var filteredProductsAmount = $filter("limitTo")(orderedProductsAmount, 5);

        var chartDataAmount = [];
        for(i=0; i<filteredProductsAmount.length; i++){
            chartDataAmount.push({
                x:filteredProductsAmount[i].productName,
                y:[
                    filteredProductsAmount[i].cost,
                    filteredProductsAmount[i].price,
                    filteredProductsAmount[i].marginAmount
                ]
            });
        }

        $scope.dataAmount = {
            series: ["Cost", "Price", "Margin Amount"],
            data: chartDataAmount
        };

        $scope.configAmount = {
            title: "Top $ Margin Products",
            tooltips: true,
            labels: false,
            mouseover: function(){},
            mouseout: function(){},
            click: function(){},
            legend: {
                display: true,
                position: 'right'
            }
        };

        var orderedProductsPercent = $filter("orderBy")(products, "marginPercent", true);
        var filteredProductsPercent = $filter("limitTo")(orderedProductsPercent, 5);

        var chartDataPercent = [];
        for(i=0; i<filteredProductsPercent.length; i++){
            chartDataPercent.push({
                x: filteredProductsPercent[i].productName,
                y: [filteredProductsPercent[i].marginPercent]
            });
        }

        $scope.dataPercent = {
            series: ["Margin %"],
            data: chartDataPercent
        };

        $scope.configPercent = {
            title: "Top % Margin Products",
            tooltips: true,
            labels: false,
            mouseover: function(){},
            mouseout: function(){},
            click: function(){},
            legend: {
                display: true,
                position: 'right'
            }
        };

    }
}());