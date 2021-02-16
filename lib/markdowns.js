var marked = require("marked")
var fs = require("fs")
var crypto = require("crypto")
var argparse = require("argparse").ArgumentParser
var path = require("path")

VERSION = '1.1.6'

var parser = new argparse({
    add_help: true,
    prog: "markdowns",
    description: "Watches and converts Markdown files into HTML files."
})

parser.add_argument("-v", "--version", { action: 'version', version: VERSION })
parser.add_argument("-w", "--watch", { action: "store_true", help: "Watch the current directory for changes." })
parser.add_argument("-p", "--process", { action: "store_true", help: "Process all files in the current directory." })
parser.add_argument("-V", "--verbose", { action: "store_true", help: "Be verbose." })
parser.add_argument("-d", "--debug", { action: "store_true", help: "Show debugging output." })
parser.add_argument("-e", "--extension", { default: "md", help: "Set the file extension of Markdown files. Defaults to md." })
parser.add_argument("-f", "--force", { action: "store_true", help: "Ignore warnings." })
parser.add_argument("-n", "--encoding", { default: "utf8", help: "Set the file encoding of the output files (ascii or utf8). Defaults to utf8." })
parser.add_argument("directory", { default: ".", nargs: "?", help: "The directory to process or watch. Defaults to the current directory." })

var args = parser.parse_args()

if (args.debug) {
    console.log(args)
}

if (!fs.existsSync(args.directory)) {
    return console.error("Error: directory does not exist:", args.directory)
}

if (!fs.statSync(args.directory).isDirectory()) {
    return console.error("Error: not a directory:", args.directory)
}

if (args.extension === "html" && !args.force) {
    return console.warn("Warning: using extension 'html' could result in data loss. If you're sure you want to do this, try --force.")
}

if (args.encoding != "utf8" && args.encoding != "ascii") {
    return console.error("Error: encoding must be ascii or utf8.")
}

if (args.process) {
    console.log("Processing '*." + args.extension + "' files in '" + args.directory + "'...")

    var files = fs.readdirSync(args.directory)

    for (var i in files) {
        var filePath = path.join(args.directory, files[i])

        if (path.extname(filePath) === "." + args.extension) {
            if (args.verbose)
                console.log("Processing:", filePath)

            writeHtmlFile(filePath, fs.readFileSync(filePath))
        }
    }
}

if (args.watch) {
    var cache = {}

    console.log("Watching '*." + args.extension + "' files in '" + args.directory + "'...")

    fs.watch(args.directory, function (event, fileName) {
        if (!fileName || path.extname(fileName) !== "." + args.extension) {
            return
        }

        var filePath = path.join(args.directory, fileName)

        if (args.verbose) {
            console.log("Processing:", filePath)
        }

        var markdown = fs.readFileSync(filePath)
        var sum = sha1(markdown)

        if (cache[filePath] === sum) {
            if (args.verbose) {
                console.log("Nothing to do with", filePath, "(file identical)")
            }

            return
        }

        cache[filePath] = sum

        writeHtmlFile(filePath, markdown)
    })
}

if (!args.watch && !args.process) {
    parser.print_help()
}

function writeHtmlFile(inputFilePath, markdown) {
    var html = marked(markdown.toString("utf8"))
    var outputFilePath = path.join(path.dirname(inputFilePath), path.basename(inputFilePath, path.extname(inputFilePath)) + ".html")

    fs.writeFileSync(outputFilePath, html, args.encoding)
    console.log("Success:", inputFilePath, "->", outputFilePath)
}

function sha1(str) {
    var sha1 = crypto.createHash("sha1")
    sha1.update(str)
    return sha1.digest("hex")
}
