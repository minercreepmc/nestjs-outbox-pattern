# NestJs Outbox Pattern

This package implement Outbox Pattern with Nestjs, TypeOrm and RabbitMQ

- I'm not write the docs yet

## How to use (In a nutshell)

Simply import `OutboxModule.forRoot(options)` and pass the appropriate options (The options include config for Typeorm, rabbitmq,...)

Don't forget to import `OutboxModel` and put it in TypeOrm Datasource to run the migration for the Outbox table, or you can create for your own
