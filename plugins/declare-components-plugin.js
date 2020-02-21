const fs = require('fs');
const path = require('path');
const glob = require('glob');

class DeclareComponentsPlugin {
  _throwError(error, result) {
    if (error) throw error;
  }

  apply(compiler) {
    compiler.plugin('compile', function(params) {
      const componentsFile = './src/common/components/webcomponents/webcomponents.js';
      fs.writeFileSync(componentsFile, '');
      let componentsContent = '';
      glob.sync('./src/common/components/**/*webcomponent.js').forEach(file => {
        componentsContent += `import '${path
          .relative('.', file)
          .replace(/\\/g, '/')
          .replace('src/common/components/webcomponents', '.')}';\n`;
      });
      fs.writeFileSync(componentsFile, componentsContent);
    });

    compiler.plugin('done', function() {
      fs.unlink('./src/common/components/webcomponents/webcomponents.js', err => console.log(err));
    });
  }
}

module.exports = DeclareComponentsPlugin;
