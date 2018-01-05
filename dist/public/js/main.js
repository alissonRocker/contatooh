// public/js/main.js
// Configuração de rotas
angular.module("contatooh", ["ngRoute", "ngResource"]).config(["$routeProvider", function($routeProvider){
    $routeProvider.when("/contatos", {
        templateUrl: "partials/contatos.html",
        controller: "ContatosController"
    });
    $routeProvider.when("/contato", {
        templateUrl: "partials/contato.html",
        controller: "ContatoController"
    });
    $routeProvider.when("/contato/:id", {
        templateUrl: "partials/contato.html",
        controller: "ContatoController"
    });

    $routeProvider.otherwise({redirectTo: "/contatos"});
}]);