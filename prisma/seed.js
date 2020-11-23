const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { config } = require('dotenv');

const DATA_DIR = path.join(__dirname, 'data');
const films = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'films.json'), 'utf-8'));
const sakugaPosts = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'sakuga.json'), 'utf-8'));
const people = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'people.json'), 'utf-8'));
const studios = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'studios.json'), 'utf-8'));

// prettier-ignore
const PEOPLE_WITH_PHOTOS = ['ambro-hal','anno-hideaki','bancroft-tom','bancroft-tony','baxter-james','becquer-jeremie','bluth-don','braggio-giovanni','cabanac-sam','capote-jorge','carre-cecile','chesworth-andrew','cirillo-simone','cleuzo-sandro','cleworth-eric','crook-daniel','delalande-maxime','fucile-tony','furukawa-hisaki','futaki-makiko','goldman-gary','gourmelen-mael','jewanarom-patt','joe-hisaishi','johnston-ollie','kahl-milt','king-hal','kon-satoshi','kondo-katsuya','larson-eric','lucas-valentin','luzzi-carlos','lounsbery-john','macmanus-dan','martins-sergio','mechanic-bill','miyazaki-goro','miyazaki-hayao','mochizuki-tomomi','montoro-borja','morita-hiroyuki','navarro-pablo','otsuka-shinji','pablos-sergio','reese-slaven','reitherman-woolie','serikawa-yuugo','serrand-kristof','shimizu-horoshi','stanchfield-walt','takahata-isao','tamura-yoshimichi','tanaka-atsuko','thomas-frank','tomonaga-kazuhide','vache-mathilde','valls-marc','vanderwoort-david','vu-alain','williames-matt','yoshinari-yoh','zennaro-alvise'];

config();
const prisma = new PrismaClient();

const images = { animationSequences: {}, films: {}, people: {}, studios: {} };

Object.entries(sakugaPosts).forEach(([filmID, sakugaIDs]) => {
  sakugaIDs.forEach((id) => {
    images.animationSequences[id] = {
      title: `${films[filmID].titleEN}`,
      url: `https://storage.googleapis.com/aniarchive-assets/thumb/${id}.jpg`,
    };
  });
});

Object.entries(films).forEach(([id, film]) => {
  images.films[id] = {
    title: `${film.titleEN} Theatrical Release Poster`,
    url: `https://storage.googleapis.com/aniarchive-assets/film/${id}.jpg`,
  };
});

Object.entries(people)
  .filter(([id]) => PEOPLE_WITH_PHOTOS.includes(id))
  .forEach(([id, person]) => {
    images.people[id] = {
      title: `${person.firstName} ${person.lastName}`,
      url: `https://storage.googleapis.com/aniarchive-assets/person/${id}.jpg`,
    };
  });

Object.entries(studios).forEach(([id, studio]) => {
  images.studios[id] = {
    title: `${studio.name}`,
    url: `https://storage.googleapis.com/aniarchive-assets/studio/${id}${
      id === 'toei' ? `.svg` : `.png`
    }`,
  };
});

async function main() {
  // Images
  const imageQueue = [
    ...Object.values(images.animationSequences),
    ...Object.values(images.films),
    ...Object.values(images.people),
    ...Object.values(images.studios),
  ];
  for (const image of imageQueue) {
    await prisma.image.upsert({ where: { url: image.url }, create: image, update: image });
  }

  // Studios
  const studioQueue = Object.entries(studios).map(([id, studio]) => ({
    id,
    ...studio,
    image: { connect: { url: images.studios[id].url } },
  }));
  for (const studio of studioQueue) {
    await prisma.studio.upsert({ where: { id: studio.id }, create: studio, update: studio });
  }

  // Films
  const filmQueue = Object.entries(films).map(([id, film]) => ({
    id,
    ...film,
    image: { connect: { url: images.films[id].url } },
    studio: { connect: { id: film.studio } },
  }));
  for (const film of filmQueue) {
    await prisma.film.upsert({ where: { id: film.id }, create: film, update: film });
  }

  // Animation Sequences
  const animationSequences = [];
  Object.entries(sakugaPosts).forEach(([film, sakugaIDs]) => {
    sakugaIDs.forEach((id) => {
      animationSequences.push({
        id: `${id}`,
        film: { connect: { id: film } },
        image: { connect: { url: images.animationSequences[id].url } },
        url: `https://www.sakugabooru.com/post/show/${id}`,
      });
    });
  });
  for (let i = 0; i < animationSequences.length; i++) {
    const seq = animationSequences[i];
    await prisma.animationSequence.upsert({ where: { id: seq.id }, create: seq, update: seq });
  }

  // People
  const peopleQueue = Object.entries(people).map(([id, person]) => ({
    id,
    ...person,
    image: images.people[id] ? { connect: { url: images.people[id].url } } : undefined,
    directed: person.directed ? { connect: person.directed.map((id) => ({ id })) } : undefined,
    composed: person.composed ? { connect: person.composed.map((id) => ({ id })) } : undefined,
    wrote: person.wrote ? { connect: person.wrote.map((id) => ({ id })) } : undefined,
    founded: person.founded ? { connect: person.founded.map((id) => ({ id })) } : undefined,
    animated: person.animated
      ? { connect: person.animated.map((id) => ({ id: `${id}` })) }
      : undefined,
  }));
  for (const person of peopleQueue) {
    try {
      await prisma.person.upsert({ where: { id: person.id }, create: person, update: person });
    } catch (err) {
      console.error(`Error on person "${person.id}"`);
      throw err;
    }
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
