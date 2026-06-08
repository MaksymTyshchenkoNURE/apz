# Етап 1: Збірка (Build)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Копіюємо файли проєкту та відновлюємо залежності
COPY ["SmartWarehouse.API/SmartWarehouse.API.csproj", "SmartWarehouse.API/"]
RUN dotnet restore "SmartWarehouse.API/SmartWarehouse.API.csproj"

# Копіюємо весь інший код і збираємо реліз
COPY . .
WORKDIR "/src/SmartWarehouse.API"
RUN dotnet publish "SmartWarehouse.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Етап 2: Виконання (Runtime)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 8080

# Копіюємо зібраний додаток з попереднього етапу
COPY --from=build /app/publish .

# Запуск сервера
ENTRYPOINT ["dotnet", "SmartWarehouse.API.dll"]