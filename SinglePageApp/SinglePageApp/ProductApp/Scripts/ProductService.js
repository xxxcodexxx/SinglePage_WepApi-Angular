(function (app) {
    var productService = function ($http, productApiUrl) {
        var getAll = function () {
            return $http.get(productApiUrl);
        };

        var getById = function (id) {
            return $http.get(productApiUrl + id);
        };

        var update = function (product) {
            return $http.put(productApiUrl + product.id, product);
        };

        var create = function (product) {
            return $http.post(productApiUrl, product);
        };

        var destroy = function (id) {
            return $http.delete(productApiUrl + id);
        };

        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            delete: destroy
        };
    };
    app.factory("productService", productService);
}(angular.module("Product")));