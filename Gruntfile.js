const Fs = require("fs");
const Path = require("path");

const PACKAGE = JSON.parse(Fs.readFileSync("package.json", "utf8"));
const ROOT = "./";
const DEST = `./release/${PACKAGE.name}_${PACKAGE.version}/`;

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        // remove some files
        clean: {
            release: [DEST, Path.join(ROOT, "build/**/*")],
            libraries: [Path.join(ROOT, "libraries/*.js")],
        },

        // copy the necessary files
        copy: {
            libraries: {
                files: [
                    {
                        expand: true,
                        cwd: Path.join(ROOT, "node_modules/easeljs/lib/"),
                        src: "easeljs.min.js",
                        dest: Path.join(ROOT, "libraries/"),
                    },
                ],
            },

            release: {
                expand: true,
                cwd: ROOT,
                src: [
                    "libraries/**",
                    "images/**",
                    "index.html",
                    "package.json",
                ],
                dest: DEST,
            },
        },

        // minimize the javascript
        uglify: {
            release: {
                files: [
                    {
                        src: [
                            ROOT + "scripts/utilities.js",
                            ROOT + "scripts/piece.js",
                            ROOT + "scripts/*.js",
                        ],
                        dest: DEST + "min.js",
                    },
                ],
            },
        },

        // minimize the css
        cssmin: {
            release: {
                files: [
                    {
                        expand: true,
                        cwd: ROOT + "css/",
                        src: "*.css",
                        dest: DEST + "css/",
                    },
                ],
            },
            options: {
                advanced: false,
            },
        },
    });

    // load the plugins
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");

    // tasks
    grunt.registerTask("update_libraries", [
        "clean:libraries",
        "copy:libraries",
    ]);
    grunt.registerTask("default", [
        "eslint",
        "clean",
        "copy",
        "uglify",
        "cssmin",
        "processhtml",
    ]);
};
