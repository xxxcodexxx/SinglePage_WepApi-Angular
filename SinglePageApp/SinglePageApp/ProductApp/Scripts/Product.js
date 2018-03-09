var apiUrl = '/api/Products/';
var list = angular.module('list', ["ngRoute"]);
var read = angular.module('read', ["ngRoute"]);
var edit = angular.module('edit', ["ngRoute"]);
var app = angular.module("Product", ['read', 'list', 'edit'])
        .service('productService', function ($http) {
            var getAll = function () {
                return $http.get('/api/Products/');
            };

            var getById = function (id) {
                return $http.get('/api/Products/' + id);
            };

            var update = function (product) {
                debugger;
                return $http.put('/api/Products/' + product.Id, product);
            };

            var create = function (product) {
                return $http.post('/api/Products/', product);
            };

            var destroy = function (id) {
                debugger;
                return $http.delete('/api/Products/' + id);
            };

            return {
                getAll: getAll,
                getById: getById,
                update: update,
                create: create,
                delete: destroy
            };
        });
list.controller('ProductListController', function ($scope, productService) {
    productService
        .getAll()
        .then(function (res) {
            $scope.products = res.data;
        });
    $scope.delete = function (product) {
        debugger;
        productService.delete(product.Id)
        .then(function () {
            removeProductById(product.Id)
        });
    };
    var removeProductById = function (id) {
        for (var i = 0; i < $scope.products.length; i++) {
            if ($scope.products[i].Id == id) {
                $scope.products.splice(i, 1);
                break;
            }
        }
    };
    $scope.create = function () {
        $scope.edit = {
            product: {
                Name: "",
                CategoryId: 0,
                Price: 0,
                ReleaseDate: new Date
            }
        };
    };
});
read.controller('DetailController', function ($scope, $routeParams, productService) {
    var id = $routeParams.id;
    productService
        .getById(id)
        .then(function (res) {
            $scope.product = res.data;
        });
    $scope.edit = function () {
        $scope.edit.product = angular.copy($scope.product);
    };
});

edit.controller('EditController', function ($scope, $routeParams, $route, productService) {
    var id = $routeParams.id;
    $scope.create = function () {
        $scope.edit = {
            product: {
                Name: "",
                CategoryId: 0,
                Price: 0,
                ReleaseDate: new Date
            }
        };
    };
    $scope.isEditable = function () {
        return $scope.edit && $scope.edit.product;
    };

    $scope.cancel = function () {
        debugger;
        $scope.edit.product = null;
    };

    $scope.save = function () {
        debugger;
        if ($scope.edit.product.Id) {
            debugger;
            updateProduct();
            $route.reload();
        } else {
            debugger;
            createProduct();
            $route.reload();
        }
    };
    $scope.products = [];
    var updateProduct = function () {
        productService.update($scope.edit.product)
                .then(function () {
                    angular.extend($scope.product, $scope.edit.product);
                    $scope.Status = false;
                    $scope.edit.product = null;
                });
    };
    var createProduct = function () {
        productService.create($scope.edit.product)
               .then(function () {
                   $scope.products.push($scope.edit.product);
                   $scope.Status = true;
                   $scope.edit.product = null;
               });
    };
});

////get list product
//var ProductListController = function ($scope, $http) {
//    $http.get("/api/Products").then(function (res) {
//        debugger;
//        $scope.products = res.data;
//    })
//};
//app.controller("ProductListController", ProductListController)

//get list product using service
//var ProductListController = function ($scope, productService) {
//    productService.getAll().success(function (res) {
//        $scope.products = res.data;
//    })
//};
//app.controller("ProductListController", ProductListController)

////get detail product
//var DetailController = function ($scope, $http, $routeParams) {
//    var id = $routeParams.id;
//    $http.get("/api/Products/" + id).then(function (res) {
//        $scope.product = res.data;
//    })
//};
//app.controller("DetailController", DetailController)



var config = function ($routeProvider) {
    $routeProvider
    .when("/list",
    { templateUrl: "/ProductApp/List.html", controller: "ProductListController" })
    .when("/detail/:id",
    { templateUrl: "/ProductApp/Detail.html", controller: "DetailController" })
    .when("/add",
    { templateUrl: "/ProductApp/Edit.html", controller: "EditController" })
    .otherwise(
    { redirectTo: "/list", controller: "ProductListController" })
};
app.config(config);
