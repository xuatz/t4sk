# React Slingshot!

[![Build status: Linux](https://img.shields.io/travis/coryhouse/react-slingshot.svg?style=flat-square)](https://travis-ci.org/coryhouse/react-slingshot)
[![Build status: Windows](https://ci.appveyor.com/api/projects/status/ky0npqkot20ieiak?svg=true)](https://ci.appveyor.com/project/coryhouse/react-slingshot/branch/master)
[![Dependency Status](https://david-dm.org/coryhouse/react-slingshot.svg?style=flat-square)](https://david-dm.org/coryhouse/react-slingshot)
[![Coverage Status](https://coveralls.io/repos/github/coryhouse/react-slingshot/badge.svg?branch=master)](https://coveralls.io/github/coryhouse/react-slingshot?branch=master)

## Application Feature

* it's a todolist that helps you identify your key tasks and keep you focused.
* it reminds you to make sure that the key tasks are completed
* incomplete tasks are archived, and will be offered as suggestion for the task for the next day
* targetting desktop and mobile-web currently, native mobile app in future.

## More details about application

### Application usage strategy

Users are prompted every night to come up with 4 tasks that they want to accomplish tomorrow. They may key in brand new tasks, or pick from their own archive of incompleted tasks and saved future tasks (not sure if we need to split them up or put them in the same catergory)

During the course of the next day, the user is free to add new tasks if necessary.

At the end of the day, there will be a report that shows the user what is the task completion rate. This will be a useful reminder for users on the tasks they had forgotten about, or pushed aside due to other obligation. It can help the users to understand that they had spent their time distracted by other minor task, instead of their main tasks. Users may decide to actively say no in the day, to stay focus on their main tasks.

Finally to complete the cycle, the user will be prompted to create the next 4 tasks for the next day, either completely new ones or from their previous tasks.

### Incomplete tasks

There should be a chao sng(temp name) meter, for how long the task have been overdue (based on created date). Can think about some implementation on how to prod the user on these overdue tasks (make the font bigger? bolded? etc)

### 2 types of tasks

1. immediate task
1. future task

1) immediate task is for when the user decide that there is a new task to be added for today. it should be a quite and easy input, single line with task description, shouldn need anything else. Was thinking this can be a modal screen.

2) future task is for something that needs to be done in the near future, but not today. It helps to free the user from the responsibility to remember it, without losing focus for the day. It will appear as an suggestion during the end of the day report. Maybe we can add a checkbox for the add task dialog, so that default will be immediate, else intended it will become a future task.

## Get Started
1. **Initial Machine Setup**. First time running the starter kit? Then complete the [Initial Machine Setup](https://github.com/coryhouse/react-slingshot#initial-machine-setup).
2. **Clone the project**. `git clone https://github.com/coryhouse/react-slingshot.git`.
3. **Run the setup script**. `npm run setup`
4. **Run the example app**. `npm start -s`
This will run the automated build process, start up a webserver, and open the application in your default browser. When doing development with this kit, this command will continue watching all your files. Every time you hit save the code is rebuilt, linting runs, and tests run automatically. Note: The -s flag is optional. It enables silent mode which suppresses unnecessary messages during the build.
5. **Review the example app.** This starter kit includes a working example app that calculates fuel savings. Note how all source code is placed under /src. Tests are placed alongside the file under test. The final built app is placed under /dist. These are the files you run in production.
6. **Delete the example app files.** Once you're comfortable with how the example app works, you can [delete those files and begin creating your own app](https://github.com/coryhouse/react-slingshot/blob/master/docs/FAQ.md#i-just-want-an-empty-starter-kit). 
7. **Having issues?** See "Having Issues?" below.

##Initial Machine Setup
1. **Install [Node 4.0.0 or greater](https://nodejs.org)** - (5.0 or greater is recommended for optimal build performance). Need to run multiple versions of Node? Use [nvm](https://github.com/creationix/nvm).
2. **Install [Git](https://git-scm.com/downloads)**. 
3. **[Disable safe write in your editor](http://webpack.github.io/docs/webpack-dev-server.html#working-with-editors-ides-supporting-safe-write)** to assure hot reloading works properly.
4. On a Mac? You're all set. If you're on Linux or Windows, complete the steps for your OS below.  
 
**On Linux:**  

 * Run this to [increase the limit](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc) on the number of files Linux will watch. [Here's why](https://github.com/coryhouse/react-slingshot/issues/6).    
`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p` 

**On Windows:** 
 
* **Install [Python 2.7](https://www.python.org/downloads/)**. Some node modules may rely on node-gyp, which requires Python on Windows.
* **Install C++ Compiler**. Browser-sync requires a C++ compiler on Windows. [Visual Studio Express](https://www.visualstudio.com/en-US/products/visual-studio-express-vs) comes bundled with a free C++ compiler. Or, if you already have Visual Studio installed: Open Visual Studio and go to File -> New -> Project -> Visual C++ -> Install Visual C++ Tools for Windows Desktop. The C++ compiler is used to compile browser-sync (and perhaps other Node modules).

## Having Issues? Try these things first.
1. Make sure you ran all steps in [Get started](https://github.com/coryhouse/react-slingshot/blob/master/README.md#get-started) including the [initial machine setup](https://github.com/coryhouse/react-slingshot#initial-machine-setup).
2. Run `npm install` - If you forget to do this, you'll see this: `babel-node: command not found`.
3. Install the latest version of Node. Or install [Node 5.12.0](https://nodejs.org/download/release/v5.12.0/) if you're having issues on Windows. Node 6 has issues on some Windows machines.
4. Make sure files with names that begin with a dot (.babelrc, .editorconfig, .eslintrc) are copied to the project directory root. This is easy to overlook is you copy this repository manually.
5. Don't run the project from a symbolic link. It may cause issues with file watches.
6. Delete any .eslintrc that you're storing in your user directory. Also, disable any ESLint plugin / custom rules that you've enabled within your editor. These will conflict with the ESLint rules defined in this project.
