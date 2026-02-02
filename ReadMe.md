# Technical test

This projects contains the implemation of a technical test.

The purpose was to build a simple application that stores, displays and allows searching user data.

It consists of a Single Page Application in Next.js / React.js, backed by a .Net 10.0 REST API, to handle data storage.

GenAI was used as a research tool, primarily around modern .Net tooling and challenging design decisions (to ensure the decisions were "the best", a bit like the rubbber duck approach).
All code was updated to the developer's taste.

## General design

The requirements were interpreted as follows:
* Clicking "Go!" with an empty search string should return all entries.
* Clicking "Go!" with a search string entered should return the user data of all matches.
* Clicking "Go!" with a search string that has no matches will display no item.
* When typing in the search box, from 2 characters, autocomplete matches should be returned.
* Searched characters should be highlighted in the matches.
* When clicking a match, the corresponding user data should be displayed as the single result.

## Development environment installation

The application was developed in a Windows environment.
While all technologies should allow development on other platforms, the dev environment set up was only tested on Windows (due to time constraints).

In order to set up a local development environment, the following will need to be installed:
* [.Net 10.0 SDK](https://dotnet.microsoft.com/en-us/download)
* [Node 24](https://nodejs.org/en/download)
* [VS Code](https://code.visualstudio.com/download)

Additionally (or alternately), you can [install Docker](https://docs.docker.com/desktop/setup/install/windows-install/).

## Further documentation

Please refer to the following documents for further details:
* [API documentation](api/ReadMe.md)
* [Web Application documentation](webapp/ReadMe.md)

## Running the application

For the project to function properly, both the REST API and web app need to be running.
Please follow the above documentation to do so.

If you have Docker, you can run:
```
docker-compose up --build
```

The webapp should be available at http://localhost:3000
The REST API at http://localhost:5000


