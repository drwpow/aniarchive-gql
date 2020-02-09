import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();
const prisma = new PrismaClient();

const JP = 'JP' as 'JP';
type Country = 'JP';

interface Film {
  releaseYear: number;
  studio: string;
  title: string;
  titleEN: string;
  titleJP: string;
}

const films: { [key: string]: Film } = {
  'castle-in-the-sky': {
    releaseYear: 1986,
    studio: 'studio-ghibli',
    title: '天空の城ラピュタ',
    titleEN: 'Castle in the Sky',
    titleJP: '天空の城ラピュタ',
  },
  'from-up-on-poppy-hill': {
    releaseYear: 2011,
    studio: 'studio-ghibli',
    title: 'コクリコ坂から',
    titleJP: 'コクリコ坂から',
    titleEN: 'From Up on Poppy Hill',
  },
  'grave-of-the-fireflies': {
    releaseYear: 1988,
    studio: 'studio-ghibli',
    title: '火垂るの墓',
    titleJP: '火垂るの墓',
    titleEN: 'Grave of the Fireflies',
  },
  'howls-moving-castle': {
    releaseYear: 2004,
    studio: 'studio-ghibli',
    title: 'ハウルの動く城',
    titleJP: 'ハウルの動く城',
    titleEN: 'Howl’s Moving Castle',
  },
  'kikis-delivery-service': {
    releaseYear: 1989,
    studio: 'studio-ghibli',
    title: '魔女の宅急便',
    titleJP: '魔女の宅急便',
    titleEN: 'Kiki’s Delivery Service',
  },
  'lupin-the-third-the-castle-of-cagliostro': {
    releaseYear: 1979,
    studio: 'tms-entertainment',
    title: 'ルパン三世 カリオストロの城',
    titleEN: 'Lupin the Third: The Castle of Cagliostro',
    titleJP: 'ルパン三世 カリオストロの城',
  },
  'my-neighbor-totoro': {
    releaseYear: 1988,
    studio: 'studio-ghibli',
    title: 'となりのトトロ',
    titleJP: 'となりのトトロ',
    titleEN: 'My Neighbor Totoro',
  },
  'my-neighbors-the-yamadas': {
    releaseYear: 1999,
    studio: 'studio-ghibli',
    title: 'ホーホケキョとなりの山田くん',
    titleJP: 'ホーホケキョとなりの山田くん',
    titleEN: 'My Neighbors the Yamadas',
  },
  'nausicaa-of-the-valley-of-the-wind': {
    releaseYear: 1984,
    studio: 'topcraft',
    title: '風の谷のナウシカ',
    titleEN: 'Nausicaä of the Valley of the Wind',
    titleJP: '風の谷のナウシカ',
  },
  'ocean-waves': {
    releaseYear: 1993,
    studio: 'studio-ghibli',
    title: '海がきこえる',
    titleJP: '海がきこえる',
    titleEN: 'Ocean Waves',
  },
  'only-yesterday': {
    releaseYear: 1991,
    studio: 'studio-ghibli',
    title: 'おもひでぽろぽろ',
    titleJP: 'おもひでぽろぽろ',
    titleEN: 'Only Yesterday',
  },
  'pom-poko': {
    releaseYear: 1994,
    studio: 'studio-ghibli',
    title: '平成狸合戦ぽんぽこ',
    titleJP: '平成狸合戦ぽんぽこ',
    titleEN: 'Pom Poko',
  },
  ponyo: {
    releaseYear: 2008,
    studio: 'studio-ghibli',
    title: '崖の上のポニョ',
    titleJP: '崖の上のポニョ',
    titleEN: 'Ponyo',
  },
  'porco-rosso': {
    releaseYear: 1992,
    studio: 'studio-ghibli',
    title: '紅の豚',
    titleJP: '紅の豚',
    titleEN: 'Porco Rosso',
  },
  'princess-mononoke': {
    releaseYear: 1997,
    studio: 'studio-ghibli',
    title: 'もののけ姫',
    titleJP: 'もののけ姫',
    titleEN: 'Princess Mononoke',
  },
  'spirited-away': {
    releaseYear: 2001,
    studio: 'studio-ghibli',
    title: '千と千尋の神隠し',
    titleJP: '千と千尋の神隠し',
    titleEN: 'Spirited Away',
  },
  'tales-from-earthsea': {
    releaseYear: 2006,
    studio: 'studio-ghibli',
    title: 'ゲド戦記',
    titleJP: 'ゲド戦記',
    titleEN: 'Tales from Earthsea',
  },
  'the-cat-returns': {
    releaseYear: 2002,
    studio: 'studio-ghibli',
    title: '猫の恩返し',
    titleJP: '猫の恩返し',
    titleEN: 'The Cat Returns',
  },
  'the-secret-world-of-arrietty': {
    releaseYear: 2010,
    studio: 'studio-ghibli',
    title: '借りぐらしのアリエッティ',
    titleJP: '借りぐらしのアリエッティ',
    titleEN: 'The Secret World of Arrietty',
  },
  'the-tale-of-the-princess-kaguya': {
    releaseYear: 2013,
    studio: 'studio-ghibli',
    title: 'かぐや姫の物語',
    titleJP: 'かぐや姫の物語',
    titleEN: 'The Tale of the Princess Kaguya',
  },
  'the-wind-rises': {
    releaseYear: 2013,
    studio: 'studio-ghibli',
    title: '風立ちぬ',
    titleJP: '風立ちぬ',
    titleEN: 'The Wind Rises',
  },
  'when-marnie-was-there': {
    releaseYear: 2014,
    studio: 'studio-ghibli',
    title: '思い出のマーニー',
    titleJP: '思い出のマーニー',
    titleEN: 'When Marnie Was There',
  },
  'whisper-of-the-heart': {
    releaseYear: 1995,
    studio: 'studio-ghibli',
    title: '耳をすませば',
    titleJP: '耳をすませば',
    titleEN: 'Whisper of the Heart',
  },
};

// IDs are sakugabooru.com IDs
// prettier-ignore
const sakugaPosts = {
  'lupin-the-third-the-castle-of-cagliostro': [
    8931,
    16697, 16698, 16699,
    34824,
    ...Array.from(new Array(15), (_, i) => i + 37513),
    73328, 73329,
  ],
  'princess-mononoke': [
    13513,
    16771, 16772,
    16774,
    16777,
    16780, 16781, 16782,
    16785,
    67789,
    67822, 67823,
    67916,
    ...Array.from(new Array(43), (_, i) => i + 68061).filter(n => n !== 68090),
  ],
};

interface Person {
  alias?: string;
  birthDay?: number;
  birthMonth?: number;
  birthYear?: number;
  country: Country;
  deathDay?: number;
  deathMonth?: number;
  deathYear?: number;
  firstName: string;
  kanji?: string;
  lastName: string;
  wrote?: string[];
  directed?: string[];
  composed?: string[];
  founded?: string[];
}

const people: { [key: string]: Person } = {
  'hara-toru': {
    lastName: 'Hara',
    firstName: 'Toru',
    kanji: '原 徹',
    birthYear: 1935,
    birthMonth: 12,
    birthDay: 26,
    country: JP,
    founded: ['topcraft'],
  },
  'joe-hisaishi': {
    lastName: 'Fujisawa',
    firstName: 'Mamoru',
    kanji: '藤澤 守',
    alias: 'Joe Hisaishi',
    birthYear: 1950,
    birthMonth: 12,
    birthDay: 6,
    country: JP,
    composed: [
      'nausicaa-of-the-valley-of-the-wind',
      'castle-in-the-sky',
      'my-neighbor-totoro',
      'kikis-delivery-service',
      'porco-rosso',
      'princess-mononoke',
      'spirited-away',
      'howls-moving-castle',
      'ponyo',
      'the-tale-of-the-princess-kaguya',
    ],
  },
  'miyazaki-goro': {
    lastName: 'Miyazaki',
    firstName: 'Gorō',
    kanji: '宮崎 吾朗',
    birthYear: 1967,
    birthMonth: 1,
    birthDay: 21,
    country: JP,
    directed: ['from-up-on-poppy-hill', 'tales-from-earthsea'],
    wrote: ['tales-from-earthsea'],
  },
  'miyazaki-hayao': {
    lastName: 'Miyazaki',
    firstName: 'Hayao',
    kanji: '宮崎 駿',
    birthYear: 1941,
    birthMonth: 1,
    birthDay: 5,
    country: JP,
    founded: ['studio-ghibli'],
    directed: [
      'lupin-the-third-the-castle-of-cagliostro',
      'nausicaa-of-the-valley-of-the-wind',
      'castle-in-the-sky',
      'my-neighbor-totoro',
      'kikis-delivery-service',
      'porco-rosso',
      'princess-mononoke',
      'spirited-away',
      'howls-moving-castle',
      'ponyo',
      'the-wind-rises',
    ],
    wrote: [
      'lupin-the-third-the-castle-of-cagliostro',
      'nausicaa-of-the-valley-of-the-wind',
      'castle-in-the-sky',
      'my-neighbor-totoro',
      'kikis-delivery-service',
      'porco-rosso',
      'whisper-of-the-heart',
      'princess-mononoke',
      'spirited-away',
      'howls-moving-castle',
      'ponyo',
      'the-secret-world-of-arrietty',
      'from-up-on-poppy-hill',
      'the-wind-rises',
    ],
  },
  'mochizuki-tomomi': {
    lastName: 'Mochizuki',
    firstName: 'Tomomi',
    kanji: '望月 智充',
    birthYear: 1958,
    birthMonth: 12,
    birthDay: 31,
    country: JP,
    directed: ['ocean-waves'],
  },
  'morita-hiroyuki': {
    lastName: 'Morita',
    firstName: 'Hiroyuki',
    kanji: '森田 宏幸',
    birthYear: 1964,
    birthMonth: 6,
    birthDay: 26,
    country: JP,
    directed: ['the-cat-returns'],
  },
  'takahata-isao': {
    lastName: 'Takahata',
    firstName: 'Isao',
    kanji: '高畑 勲',
    birthYear: 1935,
    birthMonth: 10,
    birthDay: 29,
    deathYear: 2018,
    deathMonth: 4,
    deathDay: 5,
    country: JP,
    directed: [
      'grave-of-the-fireflies',
      'only-yesterday',
      'pom-poko',
      'my-neighbors-the-yamadas',
      'the-tale-of-the-princess-kaguya',
    ],
  },
};

const studios = {
  'tms-entertainment': {
    country: JP,
    foundedYear: 1964,
    name: 'TMS Entertainment Co., Ltd.',
  },
  topcraft: {
    country: JP,
    foundedYear: 1971,
    name: 'Topcraft',
  },
  'studio-ghibli': {
    city: 'Koganei, Tokyo',
    country: JP,
    foundedYear: 1985,
    name: 'Studio Ghibli',
  },
};

const images: { [key: string]: { [key: string]: { title: string; url: string } } } = {
  animationSequences: Object.entries(sakugaPosts).reduce(
    (obj, [filmID, sakugaIDs]) => ({
      ...obj,
      ...sakugaIDs.reduce(
        (idObj, id) => ({
          ...idObj,
          [id]: {
            title: `${films[filmID].titleEN}`,
            url: `https://storage.googleapis.com/aniarchive-thumbs/${id}.jpg`,
          },
        }),
        {}
      ),
    }),
    {}
  ),
  films: Object.entries(films).reduce(
    (obj, [id, film]) => ({
      ...obj,
      [id]: {
        title: `${film.titleEN} Theatrical Release Poster`,
        url: `https://storage.googleapis.com/aniarchive-films/${id}.jpg`,
      },
    }),
    {}
  ),
  people: Object.entries(people).reduce(
    (obj, [id, person]) => ({
      ...obj,
      [id]: {
        title: `${person.firstName} ${person.lastName}`,
        url: `https://storage.googleapis.com/aniarchive-people/${id}.jpg`,
      },
    }),
    {}
  ),
  studios: Object.entries(studios).reduce(
    (obj, [id, studio]) => ({
      ...obj,
      [id]: {
        title: `${studio.name}`,
        url: `https://storage.googleapis.com/aniarchive-studios/${id}.png`, // PNG!
      },
    }),
    {}
  ),
};

async function main() {
  // Images
  await Promise.all(
    [
      ...Object.values(images.animationSequences),
      ...Object.values(images.films),
      ...Object.values(images.people),
      ...Object.values(images.studios),
    ].map(img => prisma.image.upsert({ where: { url: img.url }, create: img, update: img }))
  );

  // Studios
  await Promise.all(
    Object.entries(studios)
      .map(([id, studio]) => ({
        id,
        ...studio,
        image: { connect: { url: images.studios[id].url } },
      }))
      .map(studio =>
        prisma.studio.upsert({ where: { id: studio.id }, create: studio, update: studio })
      )
  );

  // Films
  await Promise.all(
    Object.entries(films)
      .map(([id, film]) => ({
        id,
        ...film,
        image: { connect: { url: images.films[id].url } },
        studio: { connect: { id: film.studio } },
      }))
      .map(film => prisma.film.upsert({ where: { id: film.id }, create: film, update: film }))
  );

  // Animation Sequences
  const animationSequences: {
    id: string;
    film: { connect: { id: string } };
    image: { connect: { url: string } };
    url: string;
  }[] = [];
  Object.entries(sakugaPosts).forEach(([film, sakugaIDs]) => {
    sakugaIDs.forEach(id => {
      animationSequences.push({
        id: `${id}`,
        film: { connect: { id: film } },
        image: { connect: { url: images.animationSequences[id].url } },
        url: `https://www.sakugabooru.com/post/show/${id}`,
      });
    });
  });
  await Promise.all(
    animationSequences.map(seq =>
      prisma.animationSequence.upsert({ where: { id: seq.id }, create: seq, update: seq })
    )
  );

  // People
  await Promise.all(
    Object.entries(people)
      .map(([id, person]) => ({
        id,
        ...person,
        image: { connect: { url: images.people[id].url } },
        directed: person.directed ? { connect: person.directed.map(id => ({ id })) } : {},
        composed: person.composed ? { connect: person.composed.map(id => ({ id })) } : {},
        wrote: person.wrote ? { connect: person.wrote.map(id => ({ id })) } : {},
        founded: person.founded ? { connect: person.founded.map(id => ({ id })) } : {},
      }))
      .map(person =>
        prisma.person.upsert({ where: { id: person.id }, create: person, update: person })
      )
  );
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.disconnect();
  });
