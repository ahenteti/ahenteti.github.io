const fs = require('fs');
const path = require('path');
const glob = require('glob');

class DeclareComponentsPlugin {
    _throwError(error, result) {
        if (error) throw error;
    }

    apply(compiler) {
        compiler.plugin('compile', function(params) {
            const componentsFile = './src/components/components.js';
            fs.writeFileSync(componentsFile, '');
            let componentsContent = '';
            glob.sync('./src/components/**/app-*.js').forEach(file => {
                componentsContent += `import '${path
                    .relative('.', file)
                    .replace(/\\/g, '/')
                    .replace('src/components', '.')}';\n`;
            });
            fs.writeFileSync(componentsFile, componentsContent);
        });

        compiler.plugin('done', function() {
            fs.unlink('./src/components/components.js', err => console.log(err));
        });
    }
}

module.exports = DeclareComponentsPlugin;
