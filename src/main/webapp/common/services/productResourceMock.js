(function(){
    "use strict";

    var app = angular.module("productResourceMock", ["ngMockE2E"]);

    app.run(["$httpBackend", setupProductResourceMock]);

    function setupProductResourceMock($httpBackend){

        var products = [
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
                "productId":2,
                "productName":"Garden Cart",
                "productCode":"GDN002",
                "releaseDate":"2011-10-30",
                "description":"This car will blow your mind.",
                "cost":5.50,
                "price":119.95,
                "category":"garden",
                "tags":["tag1`","tag2"],
                "imageUrl":"product/garden-cart.jpg"
            },
            {
                "productId":3,
                "productName":"Saw",
                "productCode":"GDN003",
                "releaseDate":"2013-04-30",
                "description":"A deadly weapon.",
                "cost":0.75,
                "price":49.95,
                "category":"garden",
                "tags":["tag1`","tag2"],
                "imageUrl":"product/saw.jpg"
            },
            {
                "productId":5,
                "productName":"Hammer",
                "productCode":"Tool-001",
                "releaseDate":"2012-10-30",
                "description":"A powerful hammer.",
                "cost":1.00,
                "price":11.95,
                "category":"tool",
                "tags":["tag1`","tag2"],
                "imageUrl":"product/hammer.jpg"
            },
            {
                "productId":10,
                "productName":"Video Game Controller",
                "productCode":"GMG-0042",
                "releaseDate":"2012-03-30",
                "description":"A powerful hammer.",
                "cost":11.50,
                "price":31.95,
                "category":"gaming",
                "tags":["tag1`","tag2"],
                "imageUrl":"product/game-controller.jpg"
            }
        ];

        var productUrl = "/api/products";

        $httpBackend.whenGET(productUrl).respond(products);


        var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*", "");

        $httpBackend.whenGET(editingRegex).respond(function(method, url, data){
            var product = {"productId" : 0};
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];

            if(id > 0){
                for(var i=0; i< products.length; i++){
                    if(products[i].productId == id){
                        product = products[i];
                        break;
                    }
                }
            }

            return [200, product, {}];
        });

        $httpBackend.whenPOST(productUrl).respond(function(method, url, data){
            var product = angular.fromJson(data);

            if(!product.productId){
                product.productId = products[products.length - 1].productId + 1;
                products.push(product);
            } else {
                for(var i=0; i<products.length; i++){
                    if(products[i].productId == product.productId){
                        products[i] = product;
                        break;
                    }
                }
            }
            return [200, product, {}];
        });

        $httpBackend.whenGET(/app/).passThrough();
    }


}());