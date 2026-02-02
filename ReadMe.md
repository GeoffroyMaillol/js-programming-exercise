# Technical test

This projects contains the implementation of a technical test.

The purpose was to build a simple application that stores, displays and allows searching for user data.

It consists of a Single Page Application in Next.js / React.js, backed by a .Net 10.0 REST API, to handle data storage.

GenAI was used as a research tool, primarily around modern .Net tooling and challenging design decisions (to ensure the decisions were "the best", a bit like the rubbber duck approach).
All code was updated to the developer's taste.

## General design

The requirements were interpreted as follows:
* Clicking "Go!" with an empty search string should return all available entries.
* Clicking "Go!" with a search string entered should return the user data of all matches.
* Clicking "Go!" with a search string that has no matches should display no item.
* When typing in the search box, from 2 characters, autocomplete matches should be returned.
* Searched characters should be highlighted in the autocomplete matches.
* When clicking a match, the corresponding user data should be displayed as the single result.
* When adding a new entry, first name, last name & email are mandatory.
* Phone number should be validated.
* Email should be validated.
* When saving a new user fails, the form data will be retained if the user clicks "Cancel".
* When saving a new user succeeds, the form data is cleared.


## Development environment installation

The application was developed in a Windows environment.
While all technologies used should allow development on other platforms, the dev environment set up was only tested on Windows (due to time constraints).
Docker setup was tested on a fresh Git clone, on the save development machine.

In order to set up a local development environment, the following will need to be installed:
* [.Net 10.0 SDK](https://dotnet.microsoft.com/en-us/download)
* [Node 24](https://nodejs.org/en/download)
* [VS Code](https://code.visualstudio.com/download)

Additionally you can [install Docker](https://docs.docker.com/desktop/setup/install/windows-install/).

## Further documentation

Please refer to the following documents for further details:
* [API documentation](api/ReadMe.md)
* [Web Application documentation](webapp/README.md)

## Running the application

For the project to function properly, both the REST API and web app need to be running.

If you have installed Docker, open a powershell terminal in the folder of this ReadMe and run:
```
.\Initialise-Database.ps1
docker-compose up --build
```
This should initialise a test database, create and run the required components in Docker containers.

The webapp should then be available at http://localhost:3000, and the REST API at http://localhost:5000.

The components can also be run separately, without Docker, please follow the above documentation (for Webapp / API) to do so.


## Further potential development

Potential further improvements:
* Allow the web app to delete and update existing data.
* It would feel appropriate to extend the unit tests to ensure more coverage of the app's behaviour is validated.
* Implementing a "proper" database would probably then be next, with an additional Docker container using for example PostgreSQL.
* The Docker setup is also rudimentary, and only intended to be used for development purposes. Productionising it would be valuable.
* The UI could probably also use a bit more flair, with better transitions on load / unload (only minimal effort was involved in this development run).
* We should probably have a pass at vulnerability testing, the app *should* generally be safe (the technologies used should be safe), but this wasn't tested in anger. 
