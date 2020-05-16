import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();
const prisma = new PrismaClient();

const JP = 'JP';
const US = 'US';
type Country = 'JP' | 'US';

interface Film {
  releaseYear: number;
  studio: string;
  title: string;
  titleEN: string;
  titleJP: string;
}

// prettier-ignore
const films: { [key: string]: Film } = {
  'castle-in-the-sky': { releaseYear: 1986, studio: 'studio-ghibli', title: '天空の城ラピュタ', titleEN: 'Castle in the Sky', titleJP: '天空の城ラピュタ' },
  'crayon-shinchan-unkokusais-ambition': { releaseYear: 1995, studio: 'shin-ei', title: 'クレヨンしんちゃん 雲黒斎の野望', titleJP: 'クレヨンしんちゃん 雲黒斎の野望', titleEN: 'Crayon Shin-chan: Unkokusai’s Ambition' },
  'from-up-on-poppy-hill': { releaseYear: 2011, studio: 'studio-ghibli', title: 'コクリコ坂から', titleJP: 'コクリコ坂から', titleEN: 'From Up on Poppy Hill' },
  'grave-of-the-fireflies': { releaseYear: 1988, studio: 'studio-ghibli', title: '火垂るの墓', titleJP: '火垂るの墓', titleEN: 'Grave of the Fireflies' },
  'howls-moving-castle': { releaseYear: 2004, studio: 'studio-ghibli', title: 'ハウルの動く城', titleJP: 'ハウルの動く城', titleEN: 'Howl’s Moving Castle' },
  'jin-roh': { releaseYear: 1999, studio: 'production-i-g', title: '人狼', titleJP: '人狼', titleEN: 'Jin-Roh: The Wolf Brigade' },
  'jungle-book': { releaseYear: 1967, studio: 'disney-animation', title: 'The Jungle Book', titleJP: 'ジャングル・ブック', titleEN: 'The Jungle Book' },
  'kikis-delivery-service': { releaseYear: 1989, studio: 'studio-ghibli', title: '魔女の宅急便', titleJP: '魔女の宅急便', titleEN: 'Kiki’s Delivery Service' },
  'lupin-the-third-the-castle-of-cagliostro': { releaseYear: 1979, studio: 'tms-entertainment', title: 'ルパン三世 カリオストロの城', titleEN: 'Lupin the Third: The Castle of Cagliostro', titleJP: 'ルパン三世 カリオストロの城' },
  'my-neighbor-totoro': { releaseYear: 1988, studio: 'studio-ghibli', title: 'となりのトトロ', titleJP: 'となりのトトロ', titleEN: 'My Neighbor Totoro' },
  'my-neighbors-the-yamadas': { releaseYear: 1999, studio: 'studio-ghibli', title: 'ホーホケキョとなりの山田くん', titleJP: 'ホーホケキョとなりの山田くん', titleEN: 'My Neighbors the Yamadas' },
  'nausicaa-of-the-valley-of-the-wind': { releaseYear: 1984, studio: 'topcraft', title: '風の谷のナウシカ', titleEN: 'Nausicaä of the Valley of the Wind', titleJP: '風の谷のナウシカ' },
  'ocean-waves': { releaseYear: 1993, studio: 'studio-ghibli', title: '海がきこえる', titleJP: '海がきこえる', titleEN: 'Ocean Waves' },
  'only-yesterday': { releaseYear: 1991, studio: 'studio-ghibli', title: 'おもひでぽろぽろ', titleJP: 'おもひでぽろぽろ', titleEN: 'Only Yesterday' },
  'pom-poko': { releaseYear: 1994, studio: 'studio-ghibli', title: '平成狸合戦ぽんぽこ', titleJP: '平成狸合戦ぽんぽこ', titleEN: 'Pom Poko' },
  ponyo: { releaseYear: 2008, studio: 'studio-ghibli', title: '崖の上のポニョ', titleJP: '崖の上のポニョ', titleEN: 'Ponyo' },
  'porco-rosso': { releaseYear: 1992, studio: 'studio-ghibli', title: '紅の豚', titleJP: '紅の豚', titleEN: 'Porco Rosso' },
  'princess-mononoke': { releaseYear: 1997, studio: 'studio-ghibli', title: 'もののけ姫', titleJP: 'もののけ姫', titleEN: 'Princess Mononoke' },
  'spirited-away': { releaseYear: 2001, studio: 'studio-ghibli', title: '千と千尋の神隠し', titleJP: '千と千尋の神隠し', titleEN: 'Spirited Away' },
  'tales-from-earthsea': { releaseYear: 2006, studio: 'studio-ghibli', title: 'ゲド戦記', titleJP: 'ゲド戦記', titleEN: 'Tales from Earthsea' },
  'the-cat-returns': { releaseYear: 2002, studio: 'studio-ghibli', title: '猫の恩返し', titleJP: '猫の恩返し', titleEN: 'The Cat Returns' },
  'the-secret-world-of-arrietty': { releaseYear: 2010, studio: 'studio-ghibli', title: '借りぐらしのアリエッティ', titleJP: '借りぐらしのアリエッティ', titleEN: 'The Secret World of Arrietty' },
  'the-tale-of-the-princess-kaguya': { releaseYear: 2013, studio: 'studio-ghibli', title: 'かぐや姫の物語', titleJP: 'かぐや姫の物語', titleEN: 'The Tale of the Princess Kaguya' },
  'the-wind-rises': { releaseYear: 2013, studio: 'studio-ghibli', title: '風立ちぬ', titleJP: '風立ちぬ', titleEN: 'The Wind Rises' },
  'when-marnie-was-there': { releaseYear: 2014, studio: 'studio-ghibli', title: '思い出のマーニー', titleJP: '思い出のマーニー', titleEN: 'When Marnie Was There' },
  'whisper-of-the-heart': { releaseYear: 1995, studio: 'studio-ghibli', title: '耳をすませば', titleJP: '耳をすませば', titleEN: 'Whisper of the Heart' },
};

// IDs are sakugabooru.com IDs
// prettier-ignore
const sakugaPosts = {
  'castle-in-the-sky': [7861, 7862, 7863, 7864, 15530, 18261, 18262, 18263, 18265, 18266, 18268, 18269, 18270, 18271, 18272, 18273, 18275, 18276, 18277, 18278, 18279, 18582, 38794, 38795, 38796, 38797, 38798, 38799, 38800, 38801, 38802, 38803, 38804, 38805, 38806, 38807, 38808, 38809, 38810, 38811, 38812, 38813, 38814, 38815, 38816, 38817, 38818, 38819, 38820, 38821, 38822, 38823, 38824, 38825, 38826, 38827, 38828],
  'crayon-shinchan-unkokusais-ambition': [26024, 26025, 26026, 26027, 26028, 119380, 119381],
  'from-up-on-poppy-hill': [23766, 23769, 23771, 23772, 23775, 23778, 23779, 23780, 23782, 24902, 24903, 24908, 24909, 110675, 110676, 110677, 114864, 114865, 114866, 114867, 114868, 114869, 114870, 114871, 114872, 114873, 114876, 114877, 114878, 114879, 114880, 114881, 114883, 114885, 114886, 114887, 114889, 114890, 114891, 114892, 114900, 114901, 114902, 114903, 114904, 114905, 114906, 114907, 114908, 114909, 114910, 114911, 114912, 114913, 114914, 114915, 114917, 114918, 114919, 114921, 114922, 114923, 114924, 114926, 114928, 114930, 114932, 114933, 114935, 114936, 114937, 114938, 114939, 114940, 114941, 114942, 114943, 114944, 114945, 114946, 114947, 114948, 114950, 114951, 114952, 114953, 114961, 114962, 114963, 114964, 114965, 114967, 115039, 115041, 115042, 115043, 115044, 115045, 115046, 115047, 115048],
  'grave-of-the-fireflies': [16756, 16757, 16758, 16759, 16760, 45511, 45514, 45515, 45516, 45517, 45518, 45519, 45520, 45521, 45522, 45523, 70599, 110371, 110372, 110373, 110374, 110375, 110376, 110377, 110378, 110379, 110380, 110381, 117542 ],
  'howls-moving-castle': [14750, 14751, 14752, 14753, 14754, 14755, 14766, 14767, 14769, 14770, 14771, 14772, 14773, 14774, 14775, 14776, 14777, 14778, 14779, 14780, 14781, 14783, 14785, 14787, 14790, 14791, 14793, 17671, 17672, 17673, 17674, 61570, 61571, 61572, 61573, 61574, 61575, 61576, 61577, 61578, 61579, 61580, 61581, 61582, 61583, 61584, 61585, 61706, 61707, 61708, 61709, 61710, 61711, 61712, 61714, 61715, 61716, 61717, 61718, 61719, 61720, 61722],
  'jin-roh': [1265, 18040, 42579, 42580, 42581, 42582, 42583, 42584, 42585, 42586, 42587, 42588, 42589, 48699, 48700, 48701, 48702, 48703, 48704, 48705, 48706, 48707, 66241, 66242, 66246, 66248, 66249, 66343, 66344, 118512, 118513, 118577, 118578, 118579, 118691, 118692, 118693, 118694, 118695, 118696, 118697, 118698, 118699, 118700, 118701, 118702, 118703, 118704, 118707, 118727, 118728, 118729, 118730, 118731, 118732, 118733, 118735, 118736, 118737, 118738, 118752, 118753, 118754, 118755, 118756, 118757, 118758, 118759, 118760, 118761, 118762, 118763, 118764, 118765, 118766, 118767, 118768, 118769, 118770, 118771, 118773],
  'jungle-book': [39199, 39215],
  'lupin-the-third-the-castle-of-cagliostro': [8931, 16697, 16698, 16699, 34824, 37513, 37514, 37515, 37516, 37517, 37518, 37519, 37520, 37521, 37522, 37523, 37524, 37525, 37526, 37527, 73328, 73329],
  'my-neighbor-totoro': [16325, 16326, 16327, 16328, 16329, 16330, 16331, 16332, 16333, 16334, 16335, 16336, 16337, 16338, 16339, 16340, 16341, 16342, 18252, 22994, 28098, 28099, 28100, 28101, 28102, 28103, 28104, 28105, 28106, 28107, 28108, 28109, 28110, 28111, 28112, 28113, 28114, 28115, 28116, 70598],
  'nausicaa-of-the-valley-of-the-wind': [10434, 10436, 14038, 14039, 14040, 14041, 14042, 14043, 17012, 17013, 17014, 17015, 17171, 17172, 17173, 17174, 17175, 17176, 17191, 17192, 17193, 17194, 17195, 17196, 17197, 17198, 17199, 17200, 17201, 27365, 34117, 38443, 38444, 38445, 38446, 38447, 38448, 38449, 38450, 38451, 38452, 38453, 38454, 38455, 38456, 38457, 38458, 38459, 38460, 38461, 38462, 38463, 38464, 38465, 38466],
  'princess-mononoke': [13513, 16771, 16772, 16774, 16776, 16777, 16780, 16781, 16782, 16785, 67789, 67822, 67823, 67916, 68061, 68062, 68063, 68064, 68065, 68066, 68067, 68068, 68069, 68070, 68071, 68072, 68073, 68074, 68075, 68076, 68077, 68078, 68079, 68080, 68081, 68082, 68083, 68084, 68085, 68086, 68087, 68088, 68089, 68091, 68092, 68093, 68094, 68095, 68096, 68097, 68098, 68099, 68100, 68101, 68102, 68103]
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
  animated?: string[];
}

// prettier-ignore
const people: { [key: string]: Person } = {
  'ando-masahiro': { animated: ['26024', '26025', '26026'], lastName: 'Ando', firstName: 'Masahiro', kanji: '安藤 真裕', birthYear: 1967, birthMonth: 9, birthDay: 1, country: JP },
  'hara-toru': { lastName: 'Hara', firstName: 'Toru', kanji: '原 徹', birthYear: 1935, birthMonth: 12, birthDay: 26, country: JP, founded: ['topcraft'] },
  'inoue-toshiyuki': { animated: ['118512', '118513'], lastName: 'Inoue', firstName: 'Toshiyuki', kanji: '井上 俊之', country: JP },
  'kigami-yoshiji': { animated: ['26027'], lastName: 'Yoshiji', firstName: 'Kigami', kanji: '木上 益治', birthYear: 1957, birthMonth: 12, birthDay: 28, deathYear: 2019, deathMonth: 7, deathDay: 18, country: JP },
  'joe-hisaishi': { lastName: 'Fujisawa', firstName: 'Mamoru', kanji: '藤澤 守', alias: 'Joe Hisaishi', birthYear: 1950, birthMonth: 12, birthDay: 6, country: JP, composed: [ 'nausicaa-of-the-valley-of-the-wind', 'castle-in-the-sky', 'my-neighbor-totoro', 'kikis-delivery-service', 'porco-rosso', 'princess-mononoke', 'spirited-away', 'howls-moving-castle', 'ponyo', 'the-tale-of-the-princess-kaguya'] },
  'milt-kahl': { animated: ['39199', '39215'], lastName: 'Kahl', firstName: 'Milt', country: US, birthYear: 1909, birthMonth: 3, birthDay: 22, deathYear: 1987, deathMonth: 4, deathDay: 19 },
  'miyazaki-goro': { lastName: 'Miyazaki', firstName: 'Gorō', kanji: '宮崎 吾朗', birthYear: 1967, birthMonth: 1, birthDay: 21, country: JP, directed: ['from-up-on-poppy-hill', 'tales-from-earthsea'], wrote: ['tales-from-earthsea'] },
  'miyazaki-hayao': { lastName: 'Miyazaki', firstName: 'Hayao', kanji: '宮崎 駿', birthYear: 1941, birthMonth: 1, birthDay: 5, country: JP, founded: ['studio-ghibli'], directed: [ 'lupin-the-third-the-castle-of-cagliostro', 'nausicaa-of-the-valley-of-the-wind', 'castle-in-the-sky', 'my-neighbor-totoro', 'kikis-delivery-service', 'porco-rosso', 'princess-mononoke', 'spirited-away', 'howls-moving-castle', 'ponyo', 'the-wind-rises'], wrote: [ 'lupin-the-third-the-castle-of-cagliostro', 'nausicaa-of-the-valley-of-the-wind', 'castle-in-the-sky', 'my-neighbor-totoro', 'kikis-delivery-service', 'porco-rosso', 'whisper-of-the-heart', 'princess-mononoke', 'spirited-away', 'howls-moving-castle', 'ponyo', 'the-secret-world-of-arrietty', 'from-up-on-poppy-hill', 'the-wind-rises'] },
  'mochizuki-tomomi': { lastName: 'Mochizuki', firstName: 'Tomomi', kanji: '望月 智充', birthYear: 1958, birthMonth: 12, birthDay: 31, country: JP, directed: ['ocean-waves'] },
  'morita-hiroyuki': { lastName: 'Morita', firstName: 'Hiroyuki', kanji: '森田 宏幸', birthYear: 1964, birthMonth: 6, birthDay: 26, country: JP, directed: ['the-cat-returns'] },
  'murata-masahiko': { lastName: 'Murata', firstName: 'Masahiko', kanji: 'むらた 雅彦', country: JP },
  'nishimura-hiroyuki': { animated: ['26028'], lastName: 'Nishimura', firstName: 'Hiroyuk', country: JP },
  'takahata-isao': { lastName: 'Takahata', firstName: 'Isao', kanji: '高畑 勲', birthYear: 1935, birthMonth: 10, birthDay: 29, deathYear: 2018, deathMonth: 4, deathDay: 5, country: JP, directed: [ 'grave-of-the-fireflies', 'only-yesterday', 'pom-poko', 'my-neighbors-the-yamadas', 'the-tale-of-the-princess-kaguya'] },
  'takaura-yoshihiko': { animated: ['119380', '119381'], lastName: 'Takaura', firstName: 'Yoshihiko', country: JP, kanji: '高倉 佳彦' },
};

// prettier-ignore
const studios = {
  'disney-animation': { city: 'Burbank, CA', country: US, foundedYear: 1923, name: 'Walt Disney Animation Studios' },
  'tms-entertainment': { country: JP, foundedYear: 1964, name: 'TMS Entertainment Co., Ltd.' },
  topcraft: { country: JP, foundedYear: 1971, name: 'Topcraft' },
  'shin-ei': { city: 'Nishitōkyō, Tokyo', country: JP, foundedYear: 1976, name: 'Shin-Ei Animation' },
  'kyoto-animation': { country: JP, foundedYear: 1981, name: 'Kyoto Animation', },
  'studio-ghibli': { city: 'Koganei, Tokyo', country: JP, foundedYear: 1985, name: 'Studio Ghibli' },
  'production-i-g': { city: 'Kokubunji, Tokyo', foundedYear: 1987, country: JP, name: 'Production I.G'},
};

// prettier-ignore
const images: { [key: string]: { [key: string]: { title: string; url: string } } } = {
  animationSequences: Object.entries(sakugaPosts).reduce((obj, [filmID, sakugaIDs]) => ({ ...obj, ...sakugaIDs.reduce( (idObj, id) => ({ ...idObj, [id]: { title: `${films[filmID].titleEN}`, url: `https://storage.googleapis.com/aniarchive-thumbs/${id}.jpg` }}), {}), }), {}),
  films: Object.entries(films).reduce((obj, [id, film]) => ({ ...obj, [id]: { title: `${film.titleEN} Theatrical Release Poster`, url: `https://storage.googleapis.com/aniarchive-films/${id}.jpg` }}), {}),
  people: Object.entries(people).reduce((obj, [id, person]) => ({ ...obj, [id]: { title: `${person.firstName} ${person.lastName}`, url: `https://storage.googleapis.com/aniarchive-people/${id}.jpg` }}), {}),
  studios: Object.entries(studios).reduce((obj, [id, studio]) => ({ ...obj, [id]: { title: `${studio.name}`, url: `https://storage.googleapis.com/aniarchive-studios/${id}.png`, /* PNG! */ }}), {}),
};

async function main() {
  // Images
  const imageQueue = [
    ...Object.values(images.animationSequences),
    ...Object.values(images.films),
    ...Object.values(images.people),
    ...Object.values(images.studios),
  ];
  for (let i = 0; i < imageQueue.length; i++) {
    const image = imageQueue[i];
    await prisma.image.upsert({ where: { url: image.url }, create: image, update: image });
  }

  // Studios
  const studioQueue = Object.entries(studios).map(([id, studio]) => ({
    id,
    ...studio,
    image: { connect: { url: images.studios[id].url } },
  }));
  for (let i = 0; i < studioQueue.length; i++) {
    const studio = studioQueue[i];
    await prisma.studio.upsert({ where: { id: studio.id }, create: studio, update: studio });
  }

  // Films
  const filmQueue = Object.entries(films).map(([id, film]) => ({
    id,
    ...film,
    image: { connect: { url: images.films[id].url } },
    studio: { connect: { id: film.studio } },
  }));
  for (let i = 0; i < filmQueue.length; i++) {
    const film = filmQueue[i];
    await prisma.film.upsert({ where: { id: film.id }, create: film, update: film });
  }

  // Animation Sequences
  const animationSequences: {
    id: string;
    film: { connect: { id: string } };
    image: { connect: { url: string } };
    url: string;
  }[] = [];
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
    image: { connect: { url: images.people[id].url } },
    directed: person.directed ? { connect: person.directed.map((id) => ({ id })) } : {},
    composed: person.composed ? { connect: person.composed.map((id) => ({ id })) } : {},
    wrote: person.wrote ? { connect: person.wrote.map((id) => ({ id })) } : {},
    founded: person.founded ? { connect: person.founded.map((id) => ({ id })) } : {},
    animated: person.animated ? { connect: person.animated.map((id) => ({ id })) } : {},
  }));
  for (let i = 0; i < peopleQueue.length; i++) {
    const person = peopleQueue[i];
    await prisma.person.upsert({ where: { id: person.id }, create: person, update: person });
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.disconnect();
  });
