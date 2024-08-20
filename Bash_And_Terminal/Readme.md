### For windows 
- Install `wsl` (Windows Subsystem for Linux) because all `bash` commands won't work the same way in windows as they work in ubuntu or mac

### Terminal 
- It's nothing but just another way to do things on your machine(like we do from GUI)

### First open `wsl` from cmd or powershell
- type `wsl`

### Basic Bash Commands
1. `pwd` - Present Working Directory
2. `cd` - Change Directory
3. `ls` - Listing files
    - `ls -l` --> to see details
    - `ls -R textFolder`
    - `-t flag` --> last modified
    - We can combine multiple options i.e `ls -lt textFolder`
    - `-a` --> To see hidden files
    - `-R` -->  recursive
    - To see hidden files recursively(within subdirectories) `ls -lRa textFolder`
4. `mkdir` - Make Directory
5. `touch` - Creates a new (empty) file
6. `cat` - Prints the content of the file
7. `vi`
    - The default editor that comes with the Linux/UNIX operating system is called `vi (visual editor)`. Using vi editor, we can `edit` an existing file or `create` a new file from scratch. we can also use this editor to just `read` a text file. The advanced version of the vi editor is the `vim` editor. 
    - By default in command mode
    - Type `i` to enter insert mode
    - `Esc` to come back to command mode
    - `:q` or `:q!` --> To close vi
    - `:wq!` --> Close with `saving` the changes
    - [Learn More](https://www.geeksforgeeks.org/vi-editor-unix/)
8. `mv` - Move file from one directory to other
    - mv source(folder/file) destination(folder/file)
9. `cp` - Copy file
    - cp source destination
    - e.g cp c.txt textFolder
    - `-r` (recursive flag) --> In case we need to copy all subdirectories and files of particular directory
        - cp -r folder1 otherFolder - Copy  all the content of folder1 inside otherFolder
10. `clear` or `ctrl+l` - Clear teminal