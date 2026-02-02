pushd ./api
Remove-Item -Path "app.db" -ErrorAction SilentlyContinue
Remove-Item -Path "Migrations" -Recurse -Force -ErrorAction SilentlyContinue
dotnet tool install --global dotnet-ef
dotnet restore --no-cache
dotnet ef migrations add InitialCreate
popd

