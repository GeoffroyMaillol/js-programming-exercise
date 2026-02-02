# Technical test

This projects contains the implemation of a technical test.

The purpose was to build a simple application that stores, displays and allows searching user data.

It consists of a Single Page Application in Next.js / React.js, backed by a .Net 10.0 REST API, to handle data storage.

GenAI was used as a research tool, primarily around modern .Net tooling and challenging design decisions (to ensure the decisions were "the best", a bit like the rubbber duck approach).
All code was updated to the developer's taste.

## Development environment installation

In order to run the various examples, please follow these steps:
* Install [.Net 10.0 SDK](https://dotnet.microsoft.com/en-us/download)
* Install [Node 24](https://nodejs.org/en/download)
* Install [VS Code](https://code.visualstudio.com/download)
* Open the directory this ReadMe is in with VS Code

## Further documentation

Please refer to the following documents for further details:
* [API documentation](api/ReadMe.md)
* [Web Application documentation](webapp/ReadMe.md)

## Running the application

For the project to function properly, both the REST API and web app need to be running.
Please follow the above documentation to do so.

## Design

The requirements were interpreted as follows:
* Clicking "Go!" with an empty search string should return all entries.
* Clicking "Go!" with a search string entered should return the user data of all matches.
* Clicking "Go!" with a search string that has no matches will display no item.
* When typing in the search box, from 2 characters, autocomplete matches should be returned.
* Searched characters should be highlighted in the matches.
* When clicking a match, the corresponding user data should be displayed as the single result.


