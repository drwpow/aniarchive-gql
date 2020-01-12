import { nexusPrismaPlugin } from 'nexus-prisma';
import { makeSchema, objectType, enumType } from 'nexus';

const filmOptions = {
  filtering: { releaseYear: true },
  ordering: { releaseYear: true, title: true, titleJP: true, titleEN: true },
  pagination: true,
};

const personOptions = {
  filtering: {
    birthYear: true,
    country: true,
  },
  ordering: {
    alias: true,
    birthYear: true,
    country: true,
    firstName: true,
    lastName: true,
  },
  pagination: true,
};

const studioOptions = {
  ordering: { foundedYear: true, name: true },
  filtering: { country: true, foundedYear: true },
};

const Country = enumType({
  name: 'Country',
  members: ['AU', 'BR', 'CA', 'CN', 'ES', 'FR', 'GB', 'IT', 'JP', 'MX', 'NZ', 'TR', 'UA', 'US'],
});

const Film = objectType({
  name: 'Film',
  definition(t) {
    t.model.id();
    t.model.animators(personOptions);
    t.model.composers(personOptions);
    t.model.directors(personOptions);
    t.model.image();
    t.model.releases({
      ordering: { releaseYear: true },
      pagination: true,
    });
    t.model.releaseYear();
    t.model.studio();
    t.model.title();
    t.model.titleEN();
    t.model.titleJP();
  },
});

const Image = objectType({
  name: 'Image',
  definition(t) {
    t.model.id();
    t.model.copyright();
    t.model.name();
    t.model.url();
  },
});

const Person = objectType({
  name: 'Person',
  definition(t) {
    t.model.id();
    t.model.animated(filmOptions);
    t.model.birthDay();
    t.model.birthMonth();
    t.model.birthYear();
    t.model.composed(filmOptions);
    t.model.country();
    t.model.deathDay();
    t.model.deathMonth();
    t.model.deathYear();
    t.model.description();
    t.model.directed(filmOptions);
    t.model.firstName();
    t.model.founded(studioOptions);
    t.model.image();
    t.model.kanji();
    t.model.lastName();
  },
});

const Release = objectType({
  name: 'Release',
  definition(t) {
    t.model.id();
    t.model.country();
    t.model.film();
    t.model.format();
    t.model.images();
    t.model.notes();
    t.model.region();
    t.model.releaseDay();
    t.model.releaseMonth();
    t.model.releaseMonth();
    t.model.releaseYear();
    t.model.runtime();
  },
});

const Studio = objectType({
  name: 'Studio',
  definition(t) {
    t.model.id();
    t.model.city();
    t.model.country();
    t.model.foundedYear();
    t.model.founders(personOptions);
    t.model.image();
    t.model.name();
  },
});

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.film();
    t.crud.films(filmOptions);
    t.crud.people(personOptions);
    t.crud.person();
    t.crud.studio();
    t.crud.studios(studioOptions);
  },
});

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.upsertOneFilm();
    t.crud.upsertOneRelease();
    t.crud.upsertOnePerson();
    t.crud.upsertOneStudio();
  },
});

export const schema = makeSchema({
  types: [Query, Mutation, Country, Film, Image, Person, Release, Studio],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/photon',
        alias: 'photon',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
});
