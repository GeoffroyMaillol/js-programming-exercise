# REST API

This projects contains the implemation of a REST API to feed user data to a consumer.

It was developed in .Net 10.0.

## Design decisions

Unit tests were not setup for this project, as the logic here is fairly simple and unit tests wouldn't add that much value.

## Initial setup

### Initial database creation

The API runs with a SQLite database to store data.
If missing, it needs to be instatiated with:
```
dotnet tool install --global dotnet-ef

dotnet ef migrations add InitialCreate
dotnet ef database update
```
This can also be used to reset a test database, 
* delete the `app.db` file, and the `Migration` folder
* re-run the above commands.

## Running the API

In order to start the API, open a terminal in the location of the current ReadMe file and run:
```
dotnet run
```

This should run successfully and display:
```
Now listening on: http://localhost:5052
```
This means the API can be accessed at `http://localhost:5052`.
URL `http://localhost:5052/api/users` should return the list (in JSON) of all recorded users.
URL `http://localhost:5052/api/users/1` should return the data (in JSON) for user with Id 1.

Additionally, Swagger has been configured, so the API can be queried at `http://localhost:5052/swagger/`.



