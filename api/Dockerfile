FROM mcr.microsoft.com/dotnet/sdk:10.0
WORKDIR /src

COPY . .

EXPOSE 5000
CMD ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:5000"]

