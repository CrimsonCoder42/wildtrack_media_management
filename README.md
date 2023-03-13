# Wild Track Media Management

This repo contains the source code for WeiltTrackAI's Media Management microservice.

## Frameworks and versions

 - Python 3.11
 - Flask 2.2.3 
 - React version 18.2.0 
 - NPM 9.3.1 for React Package Management (using Node.js v18.14.1)

## Which IDE should you use?
We're using [Visual Studio Code (VS Code)](https://code.visualstudio.com/) for development. While you may use other IDEs like Sublime/Eclipse, the project is already set up to help you get started coding quickly with VS Code.

## Running the API
1) First, clone the repository [MediaManagement]https://github.com/WildTrackAI/MediaManagementSE) locally.

2) Install [Python 3.11](https://www.python.org/downloads/)

2) Install VS Code and the Python extensions. Follow this [documentation](https://code.visualstudio.com/docs/python/tutorial-flask) for further guidance.


3) Then, create a Python virtual environment at the repository root folder:

On Mac:
```
python3.11 -m venv env
source .env/bin/activate
```

On Windows:
```
py -m venv env; ./env/Scripts/activate
```

5) Then, install the required Python libraries by running the following command at the repository root folder: ```pip install -r requirements.txt``` 

6) In VS Code ->  Select Run & Debug in the left-side menu -> Choose 'Python: Flask' -> Start Debugging (F5) 

7) Accessing the following url should return a JSON response with a 'success' message : http://127.0.0.1:5000/_api/v1/media/hello

## Running the Frontend

1) Install [Node.js](https://nodejs.org/) and [NPM](https://www.npmjs.com/)
    
    Node.js JavaScript runtime and npm (Node.js package manager) need to be installed. npm is included with Node.js which you can download and install from Node.js downloads.

2) Install VS Code. You may follow this [tutorial](https://code.visualstudio.com/docs/nodejs/reactjs-tutorial#_debugging-react) to learn how to work with VS Code and React.

3) In VS Code -> Select Run & Debug in the left-side menu -> Select 'React: Launch Chrome' -> Start Debugging (F5) 

## Running Frontend (React) and Backend (Flask) at the same time

In VS Code ->  Select Run & Debug in the left-side menu -> Select 'Start API + React' -> Start Debugging (F5) 
