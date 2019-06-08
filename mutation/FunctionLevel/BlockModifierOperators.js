var fs = require('fs');
var solm = require('solmeister');
var path = require('path');
var solparse = require('solparse');

let options = {
	format: {
		indent: {
			style: '\t',
			base: 0
		},
		newline: '\n\n',
		space: ' ',
		quotes: 'double'
	}
};

exports.mutateBlockOperator = function(file, filename) {
    var ast;
    fs.readFile(file, function(err, data) {
        if(err) throw err;

        fileNum = 1;
        let mutCode = solm.edit(data.toString(), function(node) {
            if(node.type === 'BlockStatement') {
                mutOperator = mutOperatorList;

                tmpNode = node.getSourceCode().replace(node.operator, "");

                fs.writeFile("./sol_output/" +  filename + '/' 
                    + path.basename(file).slice(0, -4) + "StmtDelMut"  
                    + fileNum.toString() + ".sol", data.toString().replace(
                    node.getSourceCode(), tmpNode), 'ascii', function(err) {
                        if(err) throw err;
                    }   
                );
                fileNum++
            }


        });

    })
}

