// public/js/services/ContatoService.js
// Criação de um serviço
angular.module("contatooh").factory("Contato", ["$resource", function($resource) {
    return $resource("/contatos/:id");
}]);