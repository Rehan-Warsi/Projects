Initialize typscript by

        tsc --init


Initialize Project json by

        npm init -y

    Update your Package.json

        Add types by

         "type": "module",
        
    Add bin by

        "bin" : {
            "Calculator" : "index.js" 
        },
        
Update tsconfig.json

        "target": "es2022",

    Update module with 

        "module": "NodeNext", 

    Update module Resolution with 
        
        "moduleResolution": "NodeNext",   

Create index.js // Your Main file

Compile using

        tsc

Download Dev-dependencies

    At command prompt type:

        npm i @types/node -D        
        npm i @types/inquirer -D


Download Dependencies

    At command prompt type:

        npm i inquire

**************YOUR PROJECT IS INITIALIZED DO YOUR CODING***************

Before Deployment AT NPM

    Change the name of Project in Project.json to (in my case) 
        @rehan-warsi/calc

    Test your Project Localy by using
        npx Calculator

    Add shebang at the first line of your main file (in my case its is main.ts)

        #! /usr/bin/env node
    
For Publishing at NPM

   Login to npm by

        npm login

        npm publish --access public

TO INSTALL 
 
    npm i @rehan-warsi/calc

    npx Calculator

*******************HAPPY CODING*****************