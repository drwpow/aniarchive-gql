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

const AnimationSequence = objectType({
  name: 'AnimationSequence',
  definition(t) {
    t.model.id();
    t.model.film();
    t.model.image();
    t.model.artists(personOptions);
    t.model.url();
    t.model.timestampStart();
    t.model.timestampEnd();
    t.model.notes();
  },
});

const Film = objectType({
  name: 'Film',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.titleEN();
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
});

const Image = objectType({
  name: 'Image',
  definition(t) {
    t.model.id();
    t.model.copyright();
    t.model.title();
    t.model.url();
  },
});

const Person = objectType({
  name: 'Person',
  definition(t) {
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
    t.model.animationSequences({ pagination: true });
  },
});

const Release = objectType({
  name: 'Release',
  definition(t) {
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
});

const Studio = objectType({
  name: 'Studio',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.image();
    t.model.foundedYear();
    t.model.films(filmOptions);
    t.model.city();
    t.model.country();
    t.model.founders(personOptions);
  },
});

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.film();
    t.crud.films({
      filtering: { releaseYear: true },
      ordering: { releaseYear: true, title: true, titleJP: true, titleEN: true },
      pagination: true,
    });
    t.crud.people(personOptions);
    t.crud.person();
    t.crud.studio();
    t.crud.studios(studioOptions);
  },
});

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneAnimationSequence();
    t.crud.createOneFilm();
    t.crud.createOneImage();
    t.crud.createOnePerson();
    t.crud.createOneRelease();
    t.crud.createOneStudio();
    t.crud.deleteOneAnimationSequence();
    t.crud.deleteOneFilm();
    t.crud.deleteOneImage();
    t.crud.deleteOnePerson();
    t.crud.deleteOneRelease();
    t.crud.deleteOneStudio();
    t.crud.updateOneAnimationSequence();
    t.crud.updateOneFilm();
    t.crud.updateOneImage();
    t.crud.updateOnePerson();
    t.crud.updateOneRelease();
    t.crud.updateOneStudio();
  },
});

export const schema = makeSchema({
  types: [Query, Mutation, AnimationSequence, Country, Film, Image, Person, Release, Studio],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
});
