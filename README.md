# Uruchomienie projektu

**1. Instalacja node.js**

   ```
    https://nodejs.org/en

    lub:
   
    nvm install
   ```

**2. Instalacja Angular CLI:**

   ```
    npm install -g @angular/cli
   ```

**3. Aby móc uruchomić aplikację trzeba dodać katalog node_modules:**
   ```
    cd car_rental
   
    npm install
   ```

**4. Uruchomienie aplikacji:**
   ```
    cd car_rental
   
    ng serve --open
   ```

# Praca z json-server

> [!NOTE]
> db.json stanowi bazę danych możliwe do swobodnej modyfikacji

**1. Instalacja json-server:**

   ```
    npm install -g json-server
   ```

**3. Uruchomienie REST API:**

   ```
    cd json-server
   
    json-server db.json
   ```

**5. W konsoli pojawi się komunikat z linkiem do localhosta**

**6. Testy REST API można przeprowadzić za pomocą np. Postmana**


# Generowanie przykładowych danych

> [!NOTE]
> Skrypt znajduje w pliku generate.js w katalogu json-server. Przydatne, bo nie modyfikuje bazy db.json.


**1. Konieczne zainstalowanie dodatkowych bibiliotek**
   ```
    cd json-server
   
    npm install faker lodash
   ```

**2. Uruchomienie serwera z wygenerowaną bazą danych**

   ```
    cd json-server
   
    json-server generate.js
   ```

**3. Ponownie wyświetli się komunikat z linkiem do localhosta**

  > [!WARNING]
  > W przypadku problemów z uruchomieniem skryptu generującego należy naprawić błąd za pomocą

        npm audit fix --force
