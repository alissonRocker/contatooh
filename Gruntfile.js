// contatooh/Gruntfile.js
// Tarefas: grunt command
module.exports = function(grunt) {
    // Configuração de tarefas
    grunt.initConfig({
        copy: {
            project: {
                expand: true, // Ativa o mapeamento dinamico
                cwd: ".", // diretorio de trabalho
                src: ["**", "!Gruntfile.js", "!package.json", "!public/bower.json"], // origem (copia mas desconsidera arquivos com !)
                dest: "dist" // destino
            }
        },
        clean: {
            dist: {
                src: "dist"
            }
        },
        usemin: {
            // indica quais paginas serão processadas
            html: "dist/app/views/**/*.ejs"
        },
        // Lê meta dados da pagina e cria as configurações para as tasks concat, uglify, cssmin.
        useminPrepare: {
            options: {
                root: "dist/public",
                dest: "dist/public"
            },
            // indica quais paginas serão processadas
            html: "dist/app/views/**/*.ejs"
        },
        ngAnnotate: {
            scripts: {
                expand: true,
                src: ["dist/public/js/**/*.js"]
            }
        }
    });

    grunt.registerTask("minifica", ["useminPrepare", "ngAnnotate", "concat", "uglify", "cssmin", "usemin"]);
    // registra uma task para executar outras
    grunt.registerTask("dist", ["clean", "copy"]);
    // registra uma task padrao
    grunt.registerTask("default", ["dist", "minifica"]);
    // carrega os plugins do grunt
    grunt.loadNpmTasks("grunt-contrib-copy"); // copy: cria uma copia do projeto
    grunt.loadNpmTasks("grunt-contrib-clean"); // clean: apaga a copia do projeto
    grunt.loadNpmTasks("grunt-contrib-concat"); // concat: concatena arquivos .css e .js apartir de configs do useminPrepare
    grunt.loadNpmTasks("grunt-contrib-uglify"); // uglify: minifica scripts com base nas configs geradas do useminPrepare
    grunt.loadNpmTasks("grunt-contrib-cssmin"); // cssmin: minifica arquivos css com base nas configs geradas do useminPrepare
    grunt.loadNpmTasks("grunt-usemin"); // usemin: altera o html para que aponte aos arquivos concatenados e minificados
    grunt.loadNpmTasks("grunt-ng-annotate"); // altera a sintaxe nos arquivos, assim vinculando os nomes originais com os nomes criados varios, funções, etc...
}
