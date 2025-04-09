# BlueNucleusWebApp

## Contributing
Available scripts are defined in /frontend/package.json
```
npm run lint:fix     # fixes eslint errors & lists remaining
npm run prettier:fix # fixes prettier errors & lists remaining
```

## Setup / Local Dev

#### Frontend
```
cd frontend
npm install 
npm run dev
```

#### Backend
Build and run the backend
```
cd backend
./gradlew build    # builds the project
./gradlew bootRun  # runs the project
```

#### MySQL Example Usage
```
# Connect to MySQL with the root user
mysql -u root -p

# Use the bluenucleus database
use bluenucleus;

# Describes the users table
desc users;

# Select statement to inspect the users table
SELECT * FROM users WHERE username = 'testuser12345';
```

## Related Projects

[BlueNucleusWiki](https://github.com/maxmulder03/BlueNucleus/BlueNucleusWiki)
