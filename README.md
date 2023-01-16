# Altsys

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.1.

<br />  
 
## Table of Content

1. Getting Started 
2. Fire It Up
3. CLI Commands
4. Directory structure
5. How To Configure A Multi Node Environment

<br />

**************************************************

<br />

## Getting Started

<br />

**Note:** This workspace was built using the latest version of Angular 16. If you need to manage applications built using an older version of Angular, you will want to setup a multi-toggle environment. See `How To Configure A Multi Node Environment` towards the bottom on this page.

<br />

### Step 1: Set up Development Environment:
 
<br />

In Terminal/Command Line, run the following commands:
  
<br />  

```sh
$ npm -v                                 : will return current version
$ node -v
```

<br />

If the **npm** version is `6.9.0` or higher, skip this step. Otherwise run the following command to update.

<br />

```sh
$ npm install npm@latest -g
```

<br />

**Note:** If presented with an error during install – prefix the above command with `sudo`.

<br />

If the **node** version is `10.16.0` or higher, then proceed to Step 2. Or, if you don't have Node installed on your machine – click on the following link to download the latest.

<br />

+ [Node v10.16.0](https://nodejs.org/download/release/v10.16.0/): follow the link and click the button

<br />

**MAC USERS**
<br />
If downgrade/upgrade is needed, you'll want to run the following commands pre install.

```sh
$ sudo npm cache clean -f                 : will clean NPM cache on your machine.

$ sudo npm install -g n                   : installs Node helper (n) globally (Note: This is a one time install)

$ sudo n (stable or lts)                  : designate which version you would like to install (Note: Its one or the other – not both)
```

<br />

**WINDOWS USERS**
<br />
If downgrade/upgrade is needed, you'll want to run the following commands pre install.

```sh
$ npm cache clean -f                      : will clean NPM cache on your machine.

$ npm install -g npm@6.9.0                : will install v5.6.0 globally on your machine.
```

<br />

**Remember:** 

Depending on your permissions setup, you might need to prefix each command with `sudo` (use with caution).

Verify that you are running at least node 6.9.x and npm 3.x.x by running node -v and npm -v in a terminal/console window. Older versions produce errors, but newer versions are fine.

<br />

**************************************************

<br />

### Step 2: Install the Angular CLI
<br />

**Note:** You can skip this step if already installed.

<br />

In Terminal/Command Line, run the following command:

```sh
$ npm install -g @angular/cli
```

The above will install the CLI globally with npm.


You can verify the install was successful by running...

```sh
$ ng --version                           : should return Angular CLI: 8.1.2 or higher
or
$ npm list -g @angular/cli --depth=0
```

<br />

**************************************************

<br />

### Step 3: Clone Project 

You'll need to clone this repository so that its on your local machine.

<br />
In Terminal/Command Line, run the following commands:

```sh
$ cd /path/to/your/repo

$ git clone git@github.com:Altsys-Technologies/altsys_frontend.git (SSH Method) **Recommended**

$ git clone https://github.com/Altsys-Technologies/altsys_frontend.git (HTTPS Method)

```

<br />

#### Git Commands:

```sh
$ git add -A                              : stages all files to commit (locally)

$ git commit -am "Commit message"         : commits all files with a description

$ git push origin {branch name}           : push committed files to repository

$ git branch {new branch}                 : creates a new working branch

$ git checkout branch                     : switches you to your new branch

```

<br />

**************************************************

<br />

### Step 4: Install Peer Dependencies

With your environment all set up, you're now ready to install the required node modules needed to build and manage the workspace.

<br />

In Terminal/Command Line, navigate to the root directory (same level as package.json)

```sh 
$ npm install                             : installs wordspace dependencies and places them in our root node_modules
```

**************************************************

<br />

## Fire It Up:
In the same directory, run the following commands:

<br />

```sh
$ npm run start                             : will spin up the server and open the project in your default browser
```

<br />

App will open up at `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

<br />

**************************************************

<br />

## CLI Commands:

<br />

**Code scaffolding**

```sh
$ ng generate component component-name      : to generate a new component

$ ng generate directive directive-name      : to generate a new directive   

$ ng generate pipe pipe-name                : to generate a new pipe

$ ng generate service service-name          : to generate a new service

$ ng generate class class-name              : to generate a new class

$ ng generate module module-name            : to generate a new module
```

<br />

**Build**

```sh
$ npm run build                               : to build the project using the --aot flag
$ npm run build:prod                          : to build the project using the --prod flag
```

**Note:** The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

<br />

**Running unit tests**

```sh
$ npm run test                                 : to execute the unit tests via Karma locally
```

More info on [Karma](https://karma-runner.github.io)

<br />

**Running end-to-end tests**

```sh
$ ng e2e                                     : to execute the end-to-end tests via Protractor
```

**Important!** Before running the tests make sure you are serving the app via `ng serve`.

More info on [Protractor](http://www.protractortest.org/).

<br />

**Further help**

```sh
$ ng help                                     : to get more help on the Angular CLI 

$ ng doc                                      : will take you to the official Angular website  
```    

You can also check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

<br />

<br />

## Directory Structure

Once more, this project is based off [Modular Design](http://en.wikipedia.org/wiki/Modular_design).

Files are grouped by feature rather than type, making it easier to find files related to a feature, which can help speed up the development cycle and minimize confusion.

<br />

```sh
	┌── .gitignore                               # Used to ignore certain files and/or directories when push to remote repo
	├── package.json                             # Use to install node dependencies
	├── node_modules                             # Repository for node modules
	|   ├── @angular
	├── src 
	|   ├── app                                  # Application logic 
	|   ├── assets                               # A folder where you can put images and anything else to be copied wholesale when you build your application.
	|   |   └── images
	|   ├── styles                              # Global style and imports
	|   |   └── style.scss                      
	|   ├── index.html                          # The main HTML page that is served when someone visits the site.
	|   ├── main.ts                             # The main entry point for your app. Compiles the application with the 
	├── README.md                               # used to shared helpful information about the project                 
```

<br />

**************************************************

<br />

## How To Configure A Multi Node Environment

<br />

### Mac/Linux

**NOTE:** This is only needed if you manage other applications built using an older version of Angular (i.e. Pre Angular 8)

<br />

#### Step 1: Remove any NPM installation


```sh
$ sudo npm uninstall npm -g
```

<br />

#### Step 2: Install Xcode command line tools

```sh
$ xcode-select --install
```

<br />

#### Step 3: Install NVM using cURL

```sh
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```
<br />

#### Step 4: Installing multiple Node versions

```sh
Install Node v8.11.2


Run: $ nvm install 8.11.2

 -> Then install all environment deps:

    1. npm install -g @angular/cli@7.3.9                <— Needs to be installed with 7.3.9 to support ‘ui-packages’ legacy code
    2. npm install --global gulp-cli
    3. npm i -g @compodoc/compodoc
    4. npm install -g http-server


Note: This step needs to be repeated for each new install.


Install Node v10.16.0

Run: $ nvm install 10.16.0

 -> Then install all environment deps:

    1. npm install -g @angular/cli@8.1.2                 <— Needs to be installed with 8.1.2 to support upgraded code
    2. npm install --global gulp-cli
    3. npm i -g @compodoc/compodoc
    4. npm install -g http-server
```

<br />

**Toggle Sequence:**

```sh
$ nvm use x.x.x                               : switches the environment to use that version of node
$ nvm current                                 : return current version in use
```

<br />

**Other Commands:**

```sh
$ nvm alias default 8.1.2                     : Set default node version on a shell
```

<br />

### Windows

While there is a package called NVM for Windows, there were issues trying to run NPM installs after installing it. However, a package called [nodist](https://github.com/nullivex/nodist) has worked very smoothly on Windows 10.

<br />

1. Download the latest version [here](https://github.com/nullivex/nodist/releases).
2. Use the following commands to manage your versions:

* ```nodist``` lists all installed versions
* ```nodist global x.x.x``` will make whichever version you specify your global Node version
* ```nodist local x.x.x``` will set a local version of Node for the project you're currently in (make sure you run it in the root of your project).

<br />

**NOTE:** Nodist will create a **.node-version** file when you run ```nodist local x.x.x```.
