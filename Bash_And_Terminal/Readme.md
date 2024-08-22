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
    - `ls -l` --> to see details like file permissions, size, owner, last modified timestamp etc
    - 3 types of permissions
        - read
        - write
        - execute
    - `ls -R textFolder`
    - `-t flag` --> last modified
    - We can combine multiple options i.e `ls -lt textFolder`
    - `-a` --> To see hidden files
    - `-R` -->  recursive
    - `-r` --> reverse - ?
    - To see hidden files recursively(within subdirectories) `ls -lRa textFolder`
    - `-s` --> size
    - `ls -lR testDir | grep .json` --> Recursively looking all the directories and subdirectories inside testDir and lists all .json files
    - `ls *.txt` -->  list all txt files
4. `mkdir` - Make Directory
        - `mkdir -p dir/subdir` --> Recursively creates directories
5. `touch` - Creates a new (empty) file
6. `cat` - Prints the content of the file
    - `cat > a.txt` --> Update a.txt
        - type whatever text you want and press `ctrl+d`
        - Now run cat a.txt; content have been changed
    - `cat >> a.txt` --> append in a.txt
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
        - `mv a.txt b.txt` --> Rename a.txt to b.txt
9. `cp` - Copy file
    - cp source destination
    - e.g cp c.txt textFolder
    - `-r` (recursive flag) --> In case we need to copy all subdirectories and files of particular directory
        - cp -r folder1 otherFolder - Copy  all the content of folder1 inside otherFolder
10. `clear` or `ctrl+l` - Clear teminal
11. `chmod` - Change File permissions. We need to tell following things
    - Setting the permissions for
        - user (u)
        - group (g)
        - other (o)
    - Add (+) or remove(-) permission
    - read(r), write(r) or execute(x)
    - -R for folders
12. `echo` --> Print message on console
    - echo "Hello World"
    - echo $PATH
13. `head` --> first 10 rows of the file
    - head a.txt
    - head -20 a.txt --> First 20 rows
14. `tail` --> last 10 rows of the file
    - tail a.txt
15. `&&` --> combine commands
16. `|` --> output of 1 flows into 2nd command
17. `wc` --> line count, word count and character count
18.  `grep` --> find patterns, words or phrases in file, directories etc
19. `history` --> all commands that we ran
20. `sed` -->  similar to grep but its popular bcz of substitue functionality
    - sed substitute command
    - sed s/pattern/replacement FILE

### Bash Script
- On the first line of our script, we must specify which interpreter we would like to parse our script. In case of bash, we must put `shebang` in the first line of our script
    - shebang --> `#!/bin/bash`

1. Create file newScript.sh
    - touch newScript.sh
2. Add the following content (using vi)
    - ```
        #!/bin/bash
        #echo "Hello World!"
        #mkdir automated_dir
        #cd automated_dir && touch newscript_file.txt
        #echo "new File Created!"
    ```
3. Run the file
    - bash newScript.sh