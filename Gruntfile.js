const Fs = require("fs");
const Path = require("path");
const Glob = require("glob");
const Terser = require("terser");
const ChildProcess = require("child_process");

const PACKAGE = JSON.parse(Fs.readFileSync("package.json", "utf8"));
const ROOT = "./";
const DEST = `./release/${PACKAGE.name}_${PACKAGE.version}/`;

module.exports = function (grunt) {
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

    /**
     * Run the javascript minimizer task.
     */
    grunt.registerTask("terser", function () {
        const files = Glob.sync(ROOT + "build/**/*.js");

        for (let a = 0; a < files.length; a++) {
            const filePath = files[a];
            const destPath = Path.join(DEST, filePath);
            const directoryPath = Path.dirname(destPath);

            const code = Fs.readFileSync(filePath, "utf8");
            const result = Terser.minify(code, {
                ecma: 8,
            });

            if (result.error) {
                throw new Error(result.error.message);
            }

            if (!Fs.existsSync(directoryPath)) {
                Fs.mkdirSync(directoryPath, { recursive: true });
            }

            Fs.writeFileSync(destPath, result.code);
        }
    });

    /**
     * Run the typescript compiler.
     */
    grunt.registerTask("typescript", function () {
        ChildProcess.execSync("tsc");
    });

    // load the plugins
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-cssmin");

    // tasks
    grunt.registerTask("update_libraries", [
        "clean:libraries",
        "copy:libraries",
    ]);
    grunt.registerTask("default", [
        "clean:release",
        "typescript",
        "update_libraries",
        "copy:release",
        "terser",
        "cssmin",
    ]);
};
