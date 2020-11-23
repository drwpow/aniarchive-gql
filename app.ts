import * as path from 'path';
import { GraphQLServer } from 'graphql-yoga';
import { PrismaClient } from '@prisma/client';
import { makeSchema, queryType, objectType } from '@nexus/schema';
import { nexusPrisma } from 'nexus-plugin-prisma';

const prisma = new PrismaClient();

const filmOptions = {
  filtering: { releaseYear: true },
  ordering: { releaseYear: true, title: true, titleJP: true, titleEN: true },
  pagination: true,
};

const personOptions = {
  filtering: { birthYear: true, country: true },
  ordering: { alias: true, birthYear: true, country: true, firstName: true, lastName: true },
  pagination: true,
};

const studioOptions = {
  ordering: { foundedYear: true, name: true },
  filtering: { country: true, foundedYear: true },
};

new GraphQLServer({
  context: () => ({ prisma }),
  schema: makeSchema({
    typegenAutoConfig: {
      contextType: '{ prisma: PrismaClient.PrismaClient }',
      sources: [{ source: '.prisma/client', alias: 'PrismaClient' }],
    },
    outputs: {
      typegen: path.join(__dirname, 'node_modules/@types/nexus-typegen/index.d.ts'),
    },
    plugins: [nexusPrisma({ experimentalCRUD: true })],
    types: [
      queryType({
        definition(t: any) {
          t.crud.film();
          t.crud.films({
            filtering: { title: true, studio: true, releaseYear: true },
            ordering: { releaseYear: true, title: true, titleJP: true, titleEN: true },
            pagination: true,
          });
          t.crud.people(personOptions);
          t.crud.person();
          t.crud.studio();
          t.crud.studios(studioOptions);
        },
      }),
      objectType({
        name: 'AnimationSequence',
        definition(t: any) {
          t.model.id();
          t.model.film();
          t.model.image();
          t.model.artists(personOptions);
          t.model.url();
          t.model.timestampStart();
          t.model.timestampEnd();
          t.model.notes();
        },
      }),
      objectType({
        name: 'Film',
        definition(t: any) {
          t.model.id();
          t.model.title();
          t.model.titleEN();
          t.model.titleES();
          t.model.titleJP();
          t.model.releaseYear();
          t.model.image();
          t.model.studio();
          t.model.trailer();
          t.model.animationSequences({ pagination: true });
          t.model.composers(personOptions);
          t.model.directors(personOptions);
          t.model.writers(personOptions);
          t.model.releases({
            ordering: { releaseYear: true },
            pagination: true,
          });
        },
      }),
      objectType({
        name: 'Image',
        definition(t: any) {
          t.model.id();
          t.model.copyright();
          t.model.title();
          t.model.url();
        },
      }),
      objectType({
        name: 'Person',
        definition(t: any) {
          t.model.id();
          t.model.lastName();
          t.model.firstName();
          t.model.kanji();
          t.model.alias();
          t.model.image();
          t.model.description();
          t.model.country();
          t.model.birthYear();
          t.model.birthMonth();
          t.model.birthDay();
          t.model.deathYear();
          t.model.deathMonth();
          t.model.deathDay();
          t.model.website();
          t.model.directed(filmOptions);
          t.model.composed(filmOptions);
          t.model.wrote(filmOptions);
          t.model.founded(studioOptions);
          t.model.animated({ pagination: true });
        },
      }),
      objectType({
        name: 'Release',
        definition(t: any) {
          t.model.id();
          t.model.film();
          t.model.images();
          t.model.releaseYear();
          t.model.releaseMonth();
          t.model.releaseDay();
          t.model.country();
          t.model.format();
          t.model.notes();
          t.model.runtime();
        },
      }),
      objectType({
        name: 'Studio',
        definition(t: any) {
          t.model.id();
          t.model.name();
          t.model.image();
          t.model.foundedYear();
          t.model.films(filmOptions);
          t.model.city();
          t.model.country();
          t.model.founders(personOptions);
        },
      }),
    ],
  }) as any,
}).start(({ port }) =>
  console.log(
    `🚀 Server ready at: http://localhost:${port}\n⭐️ See sample queries: http://pris.ly/e/ts/graphql#5-using-the-graphql-api`
  )
);
