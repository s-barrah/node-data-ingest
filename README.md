
## Installation

```bash
yarn install
```

## Architecture 

This section outlines the core areas of the application and the logic used when implemented.

- [Data Layer](#data-layer)
- [Importers](#importers)
- [Resolvers](#resolvers)

### Data Layer
The application uses MongoDB as it's data layer, implemented with [mongoose](https://mongoosejs.com/) for data modelling.

#### Importers

The `FileImporter` service handles the parsing of data from the external file, returning a response object containing all valid entries and also all errors, including the line number and type of error.

#### Resolvers

Handles modelling of the track data into a resolved object.

## Local Development

For local development you will need the following packages installed locally,

- Node JS (8 or higher)
- Yarn

You will need to rename `.env.example` to `.env` and set values for `PORT`, `BASE_URL`, `MONGODB_URI` and `MONGODB_URI_TEST`

Then you can simulate an API endpoint locally after running 
the following command.

```bash
yarn start
```

## Testing

Tests are located in the `tests` folder and can be invoked by running `yarn unit-test` to run the unit tests and `yarn feature-test` to run the API tests. These tests will invoke the defined 
actions in a wrapper, where the response can then be tested.
