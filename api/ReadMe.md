# REST API

This projects contains the implemation of a REST API to feed user data to a consumer.

It was developed in .Net 10.0.

## Design decisions

A basic Entity Framework set up was used, backed by SQLite, for flexibility.

Unit tests were not setup for this project, as the logic here is fairly simple and unit tests wouldn't add that much value.

Update and delete methods were added to the API, despite the fact that the UI doesn't use them.
In the context of the exercise, it felt like it allowed some flexibility around managing test data.
Obviously, for a proper system, it may not be appropriate to add such a back door, as it could be exploited.

No specific instruction was provided for user uniqueness, it was therefore decided that only the email should be unique (as people can have the same first name / last name combination).

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

