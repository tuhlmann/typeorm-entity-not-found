# typeorm-error

This repository demonstrates an error with typeorm packages since version 0.2.24. Typeorm stopped to find entity files,
which makes it impossible to update to the latest version.

To test certain scenarios:

- `npm run dev:server` will compile the code in watch mode, then start bootstrapping the app from the compiled Javascript and will then fail with a message that the User entity was not found
- `npm run dev:server2` will start the app with ts-node-dev and should work as expected

`app.module.ts` contains the Typeorm definition:

```
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "typeorm-error",
      entities: [`${__dirname}/**/*.entity{.ts,.js}`], // entities from dist dir, fails
      // entities: [`${__dirname}/../../../src/server/app/**/*.entity{.ts,.js}`], // entities from source dir, works
      synchronize: true,
    }),
```

If the entities are read from the source directory and sources are compiled first (`npm run dev:server`), the process will fail to find the entities.

If they are read from the target directory of the compiled output, entities are found and the process starts. However in a more involved examples other problems arise so I can't consider that a solution.
