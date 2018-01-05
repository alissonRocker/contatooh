// public/js/controllers/ContatoController.js
angular.module("contatooh").controller("ContatoController", function(Contato, $scope, $routeParams) {

    if($routeParams.id) {
        Contato.get({id: $routeParams.id},
            function(contato) {
                $scope.contato = contato;
            },
            function(status) {
                $scope.mensagem = {texto: "Não foi possivel obter o contato"};
                console.log(status);
            }
        ); 
    } else {
        $scope.contato = new Contato();
    }

    $scope.salva = function() {
        // Tem caracteristicas criadas dinamicamente pelo servico Contato (Persistencia) - Vantagem de usar resource
        // a função $save gera uma requisição post
        $scope.contato.$save()
            .then(function() {
                $scope.mensagem = {texto: "Salvo com sucesso"};
                // Limpa o formulario
                $scope.contato = new Contato();
            })
            .catch(function(erro) {
                $scope.mensagem = {texto: "Não foi possivel salvar"};
            });
    }

    Contato.query(function(contatos) {
        $scope.contatos = contatos;
    });
});