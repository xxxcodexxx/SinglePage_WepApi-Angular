var apiUrl = '/api/Categories/';
var list = angular.module('list', ["ngRoute"]);
var read = angular.module('read', ["ngRoute"]);
var edit = angular.module('edit', ["ngRoute"]);
var app = angular.module("Category", ['read', 'list', 'edit'])
        .service('categoryService', function ($http) {
            var getAll = function () {
                return $http.get('/api/Categories/');
            };

            var getById = function (id) {
                return $http.get('/api/Categories/' + id);
            };

            var update = function (category) {
                debugger;
                return $http.put('/api/Categories/' + category.Id, category);
            };

            var create = function (category) {
                return $http.post('/api/Categories/', category);
            };

            var destroy = function (id) {
                debugger;
                return $http.delete('/api/Categories/' + id);
            };

            return {
                getAll: getAll,
                getById: getById,
                update: update,
                create: create,
                delete: destroy
            };
        });
list.controller('CategoryListController', function ($scope, categoryService) {
    categoryService
        .getAll()
        .then(function (res) {
            $scope.categories = res.data;
        });
    $scope.delete = function (category) {
        debugger;
        categoryService.delete(category.Id)
        .then(function () {
            removecategoryById(category.Id)
        });
    };
    var removecategoryById = function (id) {
        for (var i = 0; i < $scope.categories.length; i++) {
            if ($scope.categories[i].Id == id) {
                $scope.categories.splice(i, 1);
                break;
            }
        }
    };
    $scope.create = function () {
        $scope.edit = {
            category: {
                Title: "",
                Supplier: ""
            }
        };
    };
});
read.controller('DetailController', function ($scope, $routeParams, categoryService) {
    var id = $routeParams.id;
    categoryService
        .getById(id)
        .then(function (res) {
            debugger;
            $scope.category = res.data;
        });
    $scope.edit = function () {
        $scope.edit.category = angular.copy($scope.category);
    };
});

edit.controller('EditController', function ($scope, $routeParams, $route, categoryService) {
    var id = $routeParams.id;

    $scope.isEditable = function () {
        return $scope.edit && $scope.edit.category;
    };

    $scope.cancel = function () {
        $scope.edit.category = null;
    };

    $scope.save = function () {
        if ($scope.edit.category.Id) {
            updateCategory();
            $route.reload();
        } else {
            createCategory();
            $route.reload();
        }
    };
    $scope.categories = [];
    var updateCategory = function () {
        categoryService.update($scope.edit.category)
                .then(function () {
                    debugger;
                    angular.extend($scope.category, $scope.edit.category);
                    $scope.edit.category = null;
                });
    };
    var createCategory = function () {
        categoryService.create($scope.edit.category)
               .then(function () {
                   $scope.categories.push($scope.edit.category);
                   $scope.edit.category = null;
               });
    };
});

var config = function ($routeProvider) {
    $routeProvider
    .when("/list",
    { templateUrl: "/CategoryApp/List.html", controller: "CategoryListController" })
    .when("/detail/:id",
    { templateUrl: "/CategoryApp/Detail.html", controller: "DetailController" })
    .when("/add",
    { templateUrl: "/CategoryApp/Edit.html", controller: "EditController" })
    .otherwise(
    { redirectTo: "/list", controller: "CategoryListController" });
    
};
app.config(config);