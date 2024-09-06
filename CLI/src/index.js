const { Command } = require('commander');
const fs = require('fs')
const path = require('path');

const program = new Command();

program
  .name('counter')
  .description('CLI to do count based operations on a file')
  .version('0.8.0');

program.command('count')
  .description('Count words or lines in the provided file')
  .argument('<string>', 'file path')
  .option('--word', 'count the words in the given file')
  .option('--line', 'count lines in the given file')
  .action((fileName, options) => {
      fs.readFile(path.join(__dirname,"../data",fileName), 'utf-8', function(err, data){
         if(err){
            console.log(err?.message || "Something went wrong!")
            return;
         }
         
         let delimiter = ' '; // for word
         let count;

         if(options.line){ // count Lines
            delimiter = '\n'
            count = data.trim("\n").split("\n").length
         } 
         else{ // count words
           data = data.replace(/[\n.]+/g, ' ')
           data = data.replace(/\s{2,}/g, ' ')
           data = data.trim()

           count = data.split(delimiter).length
          }
          
          console.log(`There are ${count} ${delimiter === '\n' ? 'lines' : 'words'} in the file ${fileName}`)
      })
  });


program.parse();