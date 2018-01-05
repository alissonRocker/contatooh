// contatooh/test/spec/ContatoControllerSpec.js
// Teste utilizando o Jasmine
// Deve conter o mesmo nome deque iremos testar
describe("ContatoController", function() {
    // Armazena o $scope, afim de estar acessivel alem do controller
    var $scope, $httpBackend;

    beforeEach(function() {
        module("contatooh");
        // Injector é um serviço, onde permite instanciar artefatos AngularJS que não sejam serviços
        inject(function($injector, _$httpBackend_) {
            // Cria um novo $scope
            $scope = $injector.get("$rootScope").$new();
            // Usado o underline para nao referenciar a variavel criada
            $httpBackend = _$httpBackend_;
            $httpBackend.when("GET", "/contatos/1").respond({_id: "1"});
            $httpBackend.when("GET", "/contatos").respond([{}]);
        });
    });

    // Parametro
    // 1: expectativa do teste (Oque deve fazer!)
    // 2: função que testa a expectativa
    it("Deve criar um Contato vazio quando nenhum parametro de rota for passado", 
        // Disponibilizado atraves do angular-mocks (FUNÇÃO)
        // Para utilizar controllers dentro de testes (Qualquer artefato injetavel do AngularJS)
        inject(function($controller) {
            // Instanciar um controller (Serviço controller do angular mocks)
            $controller("ContatoController", {"$scope": $scope});
            // A função expect o _id presente no escopo da função ContatoController
            // Para que o teste passe, o _id deve ser undefined
            expect($scope.contato._id).toBeUndefined();
        }
    ));

    it("Deve preencher o  Contato quando parametro de rota for passado", 
        inject(function($controller) {
            $controller("ContatoController", {$routeParams: {contatoId: 1}, "$scope": $scope});
            $httpBackend.flush();
            expect($scope.contato._id);//.toBeDefined();
        }
    ));
});
