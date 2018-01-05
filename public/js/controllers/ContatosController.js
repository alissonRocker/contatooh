// public/js/controllers/ContatosController.js

angular.module('contatooh').controller('ContatosController', function(Contato, $scope) {
    
    $scope.contatos = [];
    
    $scope.filtro = "";
    $scope.mensagem = {texto: ""};

    function buscaContatos() {
        // sucess and error
        Contato.query(
            function(contatos) {
                $scope.contatos = contatos;
                $scope.mensagem = {};
            },
            function(status) {
                $scope.mensagem = {texto: "Não foi possivel obter a lista de contatos"};
                console.log(status);
            }
        );
    }
    buscaContatos();

    $scope.remove = function(contato) {
        Contato.delete({id: contato._id}, buscaContatos,
                       function(erro) {
                        $scope.mensagem = {texto: "Não foi possivel remover o contato"};
                            console.log(status);     
                       }
        );
    }
});