import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();
const prisma = new PrismaClient();

interface Film {
  releaseYear: number;
  studio: string;
  title: string;
  titleEN: string;
  titleES: string;
  titleJP: string;
}

// prettier-ignore
const films:{[key:string]:Film} = {
  'anastasia':{releaseYear:1997,studio:'fox-animation',title:'Anastasia',titleEN:'Anastasia',titleES:'Anastasia',titleJP:'アナスタシア'},
  'castle-in-the-sky':{releaseYear:1986,studio:'studio-ghibli',title:'天空の城ラピュタ',titleEN:'Castle in the Sky',titleES:'El Castillo en el Cielo',titleJP:'天空の城ラピュタ'},
  'crayon-shinchan-unkokusais-ambition':{releaseYear:1995,studio:'shin-ei',title:'クレヨンしんちゃん 雲黒斎の野望',titleJP:'クレヨンしんちゃん 雲黒斎の野望',titleES:'Crayon Shin-chan: Unkokusai’s Ambition',titleEN:'Crayon Shin-chan: Unkokusai’s Ambition'},
  'emperors-new-groove':{releaseYear:2000,studio:'disney-animation',title:'The Emperor’s New Groove',titleEN:'The Emperor’s New Groove',titleES:'The Emperor’s New Groove',titleJP:'ラマになった王様'},
  'from-up-on-poppy-hill':{releaseYear:2011,studio:'studio-ghibli',title:'コクリコ坂から',titleJP:'コクリコ坂から',titleEN:'From Up on Poppy Hill',titleES:'La Colina de las Amapolas'},
  'grave-of-the-fireflies':{releaseYear:1988,studio:'studio-ghibli',title:'火垂るの墓',titleJP:'火垂るの墓',titleEN:'Grave of the Fireflies',titleES:'La Tumba de las Luciérnagas'},
  'howls-moving-castle':{releaseYear:2004,studio:'studio-ghibli',title:'ハウルの動く城',titleJP:'ハウルの動く城',titleEN:'Howl’s Moving Castle',titleES:'Howl no Ugoku Shiro'},
  'jin-roh':{releaseYear:1999,studio:'production-i-g',title:'人狼',titleJP:'人狼',titleEN:'Jin-Roh: The Wolf Brigade',titleES:'Jin-Roh'},
  'jungle-book':{releaseYear:1967,studio:'disney-animation',title:'The Jungle Book',titleJP:'ジャングル・ブック',titleEN:'The Jungle Book',titleES:'El Libro de la Selva'},
  'kikis-delivery-service':{releaseYear:1989,studio:'studio-ghibli',title:'魔女の宅急便',titleJP:'魔女の宅急便',titleEN:'Kiki’s Delivery Service',titleES:'Majo no Takkyūbin'},
  'klaus':{releaseYear:2019,studio:'the-spa-studios',title:'Klaus',titleEN:'Klaus',titleES:'Klaus',titleJP:'クロース'},
  'lupin-the-third-the-castle-of-cagliostro':{releaseYear:1979,studio:'tms-entertainment',title:'ルパン三世 カリオストロの城',titleEN:'Lupin the Third: The Castle of Cagliostro',titleJP:'ルパン三世 カリオストロの城',titleES:'El Castillo de Cagliostro'},
  'mulan':{releaseYear:1998,studio:'disney-animation',title:'Mulan',titleEN:'Mulan',titleJP:'ムーラン',titleES:'Mulan'},
  'my-neighbor-totoro':{releaseYear:1988,studio:'studio-ghibli',title:'となりのトトロ',titleJP:'となりのトトロ',titleEN:'My Neighbor Totoro',titleES:'Mi Vecino Totoro'},
  'my-neighbors-the-yamadas':{releaseYear:1999,studio:'studio-ghibli',title:'ホーホケキョとなりの山田くん',titleJP:'ホーホケキョとなりの山田くん',titleEN:'My Neighbors the Yamadas',titleES:'Mis Vecinos los Yamada'},
  'nausicaa-of-the-valley-of-the-wind':{releaseYear:1984,studio:'topcraft',title:'風の谷のナウシカ',titleEN:'Nausicaä of the Valley of the Wind',titleJP:'風の谷のナウシカ',titleES:'Nausicaä del Valle del Viento'},
  'ocean-waves':{releaseYear:1993,studio:'studio-ghibli',title:'海がきこえる',titleJP:'海がきこえる',titleEN:'Ocean Waves',titleES:'Puedo Escuchar el Mar'},
  'only-yesterday':{releaseYear:1991,studio:'studio-ghibli',title:'おもひでぽろぽろ',titleJP:'おもひでぽろぽろ',titleEN:'Only Yesterday',titleES:'Recuerdos del Ayer'},
  'paprika':{releaseYear:2006,studio:'madhouse',title:'パプリカ',titleJP:'パプリカ',titleEN:'Paprika',titleES:'Paprika'},
  'pom-poko':{releaseYear:1994,studio:'studio-ghibli',title:'平成狸合戦ぽんぽこ',titleJP:'平成狸合戦ぽんぽこ',titleEN:'Pom Poko',titleES:'Pompoko'},
  ponyo:{releaseYear:2008,studio:'studio-ghibli',title:'崖の上のポニョ',titleJP:'崖の上のポニョ',titleEN:'Ponyo',titleES:'Gake no ue no Ponyo'},
  'porco-rosso':{releaseYear:1992,studio:'studio-ghibli',title:'紅の豚',titleJP:'紅の豚',titleEN:'Porco Rosso',titleES:'Porco Rosso'},
  'prince-of-egypt':{releaseYear:1998,studio:'dreamworks-animation',title:'The Prince of Egypt',titleEN:'The Prince of Egypt',titleJP:'プリンス・オブ・エジプト',titleES:'El Príncipe de Egipto'},
  'princess-mononoke':{releaseYear:1997,studio:'studio-ghibli',title:'もののけ姫',titleJP:'もののけ姫',titleEN:'Princess Mononoke',titleES:'La Princesa Mononoke'},
  'secret-of-nimh':{releaseYear:1982,studio:'don-bluth-productions',title:'The Secret of NIMH',titleEN:'The Secret of NIMH',titleES:'The Secret of NIMH',titleJP:'ニムの秘密'},
  'spirited-away':{releaseYear:2001,studio:'studio-ghibli',title:'千と千尋の神隠し',titleJP:'千と千尋の神隠し',titleEN:'Spirited Away',titleES:'El Viaje de Chihiro'},
  'tales-from-earthsea':{releaseYear:2006,studio:'studio-ghibli',title:'ゲド戦記',titleJP:'ゲド戦記',titleEN:'Tales from Earthsea',titleES:'Cuentos de Terramar'},
  'the-cat-returns':{releaseYear:2002,studio:'studio-ghibli',title:'猫の恩返し',titleJP:'猫の恩返し',titleEN:'The Cat Returns',titleES:'Neko no Ongaeshi'},
  'the-secret-world-of-arrietty':{releaseYear:2010,studio:'studio-ghibli',title:'借りぐらしのアリエッティ',titleJP:'借りぐらしのアリエッティ',titleEN:'The Secret World of Arrietty',titleES:'Karigurashi no Arriety'},
  'the-tale-of-the-princess-kaguya':{releaseYear:2013,studio:'studio-ghibli',title:'かぐや姫の物語',titleJP:'かぐや姫の物語',titleEN:'The Tale of the Princess Kaguya',titleES:'El Cuento de la Princesa Kaguya'},
  'titan-ae':{releaseYear:2000,studio:'fox-animation',title:'Titan A.E.',titleJP:'タイタンA.E.',titleEN:'Titan A.E.',titleES:'Titan A.E.'},
  'the-wind-rises':{releaseYear:2013,studio:'studio-ghibli',title:'風立ちぬ',titleJP:'風立ちぬ',titleEN:'The Wind Rises',titleES:'Kaze Tachinu'},
  'when-marnie-was-there':{releaseYear:2014,studio:'studio-ghibli',title:'思い出のマーニー',titleJP:'思い出のマーニー',titleEN:'When Marnie Was There',titleES:'El Recuerdo de Marnie'},
  'whisper-of-the-heart':{releaseYear:1995,studio:'studio-ghibli',title:'耳をすませば',titleJP:'耳をすませば',titleEN:'Whisper of the Heart',titleES:'Susurros del Corazón'},
};

// IDs are sakugabooru.com IDs
// prettier-ignore
const sakugaPosts = {
  'anastasia':[30641,30642,30643,30644,30645,30651,30653,30660,30686,30687,30688,30689,30690,30691,30693,30694,30695,30696,30697],
  'castle-in-the-sky':[7861,7862,7863,7864,15530,18261,18262,18263,18265,18266,18268,18269,18270,18271,18272,18273,18275,18276,18277,18278,18279,18582,38794,38795,38796,38797,38798,38799,38800,38801,38802,38803,38804,38805,38806,38807,38808,38809,38810,38811,38812,38813,38814,38815,38816,38817,38818,38819,38820,38821,38822,38823,38824,38825,38826,38827,38828],
  'crayon-shinchan-unkokusais-ambition':[26024,26025,26026,26027,26028,119380,119381],
  'emperors-new-groove':[34041,34042,34043,34044,34045,34046,34047,34048,48951],
  'from-up-on-poppy-hill':[23766,23769,23771,23772,23775,23778,23779,23780,23782,24902,24903,24908,24909,110675,110676,110677,114864,114865,114866,114867,114868,114869,114870,114871,114872,114873,114876,114877,114878,114879,114880,114881,114883,114885,114886,114887,114889,114890,114891,114892,114900,114901,114902,114903,114904,114905,114906,114907,114908,114909,114910,114911,114912,114913,114914,114915,114917,114918,114919,114921,114922,114923,114924,114926,114928,114930,114932,114933,114935,114936,114937,114938,114939,114940,114941,114942,114943,114944,114945,114946,114947,114948,114950,114951,114952,114953,114961,114962,114963,114964,114965,114967,115039,115041,115042,115043,115044,115045,115046,115047,115048],
  'grave-of-the-fireflies':[16756,16757,16758,16759,16760,45511,45514,45515,45516,45517,45518,45519,45520,45521,45522,45523,70599,110371,110372,110373,110374,110375,110376,110377,110378,110379,110380,110381,117542],
  'howls-moving-castle':[14750,14751,14752,14753,14754,14755,14766,14767,14769,14770,14771,14772,14773,14774,14775,14776,14777,14778,14779,14780,14781,14783,14785,14787,14790,14791,14793,17671,17672,17673,17674,61570,61571,61572,61573,61574,61575,61576,61577,61578,61579,61580,61581,61582,61583,61584,61585,61706,61707,61708,61709,61710,61711,61712,61714,61715,61716,61717,61718,61719,61720,61722],
  'jin-roh':[1265,18040,42579,42580,42581,42582,42583,42584,42585,42586,42587,42588,42589,48699,48700,48701,48702,48703,48704,48705,48706,48707,66241,66242,66246,66248,66249,66343,66344,118512,118513,118577,118578,118579,118691,118692,118693,118694,118695,118696,118697,118698,118699,118700,118701,118702,118703,118704,118707,118727,118728,118729,118730,118731,118732,118733,118735,118736,118737,118738,118752,118753,118754,118755,118756,118757,118758,118759,118760,118761,118762,118763,118764,118765,118766,118767,118768,118769,118770,118771,118773],
  'jungle-book':[806,1976,27713,27714,27715,27717,27718,27719,27720,29431,39196,39197,39198,39199,39200,39201,39202,39203,39204,39205,39206,39207,39208,39209,39210,39211,39212,39213,39214,39215,39216,41225,43489],
  'kikis-delivery-service':[16197,16198,16199,16200,16201,16202,16203,16204,16215,16235,16236,16237,16238,16239,16240,16241,18584,20913,44916,44917,44918,44920,44921,44922,44923,44924,44925,44926,44927,44928,44929,44930,44931,44932,44933,44934,44936,44937,44938,44939,44940,44941,44942,44943,44944,44945,44946,118530,118531,118532,118533,118534],
  'klaus':[42281,42282,42283,58700,59554,76282,106220,106730,106731,106732,106733,106734,106735,106736,106737,106738,106739,106740,106741,106742,106743,106744,106745,106746,106747,106748,106749,106750,106751,106752,106753,106754,106755,106756,106757,106758,106759,106760,106761,106762,106763,106764,106765,106766,106767,106768,106953,106954,106955,106956,106957,106958,106959,106960,106961,106962,106963,106964,106965,106966,106967,106968,106969,106970,106971,106972,106973,106974,106975,106976,106977,106978,106979,106980,106981,106982,106983,106984,106985,106986,106987,106988,106989,106990,107033,107034,107035,107036,107037,107038,107039,107040,107041,107042,107043,107049,107050,107213,107606,107607,107608,107609,107610,107611,107612,107613,107614,107615,107616,107627,107628,107629,107630,107631,107632,107633,107634,107635,107636,107637,107638,107639,107640,107641,107642,107643,107644,107645,107646,107647,108262,108263,108402,108549,108550,109285,109286,109660,109661,109965,110460,110461,110578,110579,119724,119725,119726,119729,119730,119731,119732,119733,119734,119735,119736,119737],
  'lupin-the-third-the-castle-of-cagliostro':[8931,16697,16698,16699,34824,37513,37514,37515,37516,37517,37518,37519,37520,37521,37522,37523,37524,37525,37526,37527,73328,73329],
  'mulan':[23139,33712,33714,33715,33718,33719,33720,33721,33926,33927,33930,33931,33932,33933,33934,33937],
  'my-neighbor-totoro':[16325,16326,16327,16328,16329,16330,16331,16332,16333,16334,16335,16336,16337,16338,16339,16340,16341,16342,18252,22994,28098,28099,28100,28101,28102,28103,28104,28105,28106,28107,28108,28109,28110,28111,28112,28113,28114,28115,28116,70598],
  'my-neighbors-the-yamadas':[1207,8391,8392,8393,8394,8395,8396,8397,8398,8399,8400,8401,8402,8403,8404,10338,16003,16004,16005,16006,16008,27983,27984,27985,27986,27987,27988,27989,27990,27991,27992,27993],
  'nausicaa-of-the-valley-of-the-wind':[10434,10436,14038,14039,14040,14041,14042,14043,17012,17013,17014,17015,17171,17172,17173,17174,17175,17176,17191,17192,17193,17194,17195,17196,17197,17198,17199,17200,17201,27365,34117,38443,38444,38445,38446,38447,38448,38449,38450,38451,38452,38453,38454,38455,38456,38457,38458,38459,38460,38461,38462,38463,38464,38465,38466],
  'ocean-waves':[16846,16848,33713,78907,119123,119124,119125,119126,119127,119128,119129,119130,119131,119132,119133,119134,119135,119136,119137,119138,119139,119140,119141,119142,119143,119144,119145,119146,119147,119149],
  'only-yesterday':[6182,6185,6186,6187,6188,6242,6243,6244,6245,6246,6247,6248,6249,6250,6251,6252,6253,36632],
  'paprika':[34100,74482,74483,74484,74485,74486,74487,74488,74489,74544,74547,115126,119331,119332,119333,119334,119335,119336,119337,119338,119339,119340,119341,119342,119343,119345,119346,119347,119348,119349,119351,119353,119354,119355,119356,119357,119358,119359,119360,119361,119362,119363,119378,119379],
  'pom-poko':[18354,25516,25517,25518,25519,25520,25521,25524,25525,25526,25528,25529,25531,25533,25534,25535,25536,25537,25538,25539,25540,25542,25543,25544,25546,25547,25548,25549,25550,80233,80234,80235,80236,80237,80238,80239,80240,80241,80242,80243,80244,80245,80246,80248,80250,80251,80252,80254,80255,80256,80257,80258,80259,80261,80262,80263,80264,80265,80266],
  ponyo:[10380,16169,18610,18614,18615,18616,18620,18626,18629,70826,120434,120436,120438,120439,120440,120441,120442,120443,120444,120445,120446,120447,120448,120450,120451,120452,120453,120454,120455,120456,120457,120458,120459,120460,120461,120462,120463,120465,120466,120467,120468,120469,120470,120471,120474,120475,120476,120477,120478,120479,120480,120481,120482,120483,120484,120485,120486,120487,120488,120489,120490,120491,120492,120493,120494,120495,120496,120497,120498,120499,120500,120501,120502,120503,120504,120505,120506,120507,120508,120509,120510,120511,120512,120513,120514,120515,120517,120518,120519,120520,120521,120522,120523],
  'porco-rosso':[6008,6010,6011,6019,6021,28391,28392,28393,28394,28395,28396,28397,28399,28400,28401,28402,28403,28404,28405,28406,28407,28408,28409,28410,28411,28412,28413,28414,28415,28416,28418,28419,28420,28421,28422,28423,28424,28426,28427,28428,28429,28431,28432,28433,28434,28435,40481,40482],
  'prince-of-egypt':[19896,19897,19898,29527,48648,48660,63745,63748,63750,107731,118251],
  'princess-mononoke':[13513,16771,16772,16774,16776,16777,16780,16781,16782,16785,67789,67822,67823,67916,68061,68062,68063,68064,68065,68066,68067,68068,68069,68070,68071,68072,68073,68074,68075,68076,68077,68078,68079,68080,68081,68082,68083,68084,68085,68086,68087,68088,68089,68091,68092,68093,68094,68095,68096,68097,68098,68099,68100,68101,68102,68103,120562,120563,120564,120571,120572,120591,120594,120595],
  'secret-of-nimh':[28063,28067,31066,31067,31068,31069,31070,31071,31072,36472,36473,36474,36475,36850,36851,36852,36853,36854,36855,36856,36857,36858,36859,36860,36861,41227,82170],
  'spirited-away':[13085,13086,13087,13088,13089,13090,13094,13098,13100,13101,13103,13104,13105,13106,13108,13109,13111,13112,13113,13115,13116,13117,13118,13238,30329,30331,30333,30334,30335,30337,30339,30340,30341,30343,30344,30345,30346,30348,30350,30352,30353,30354,30356,30357,30359,30360,30361,30363,30364,30366,30367,30368,30369,30370,30372,30373,30375,30377,36284,70778,121542],
  'tales-from-earthsea':[5519,13568,13569,13570,13571,13572,13573,28465,28466,28470,28471,28472,28473,28474,28475,28476,28477,28478,28479,28480,28481,28482,28510,28511,28512,28514,28515,64413,64414,64415,64416,64417,64419,67052,67053,67054,67055],
  'the-cat-returns':[16593,16594,16595,16596,16597,27932,27933,27934,27935,27936,27937,27938,27939,27941,27945,27946,27947,27948,27949,27950,27951,27952,27953,27954,27955,70779,114838,114839],
  'the-secret-world-of-arrietty':[16647,16648,16649,16650,16651,16652,20230,36426,36427,36428,36429,36430,36435,36436,36437,36438,36439,36440,36441,36442,36443,36444,36445,36446,36447,36448,36449,36450,36451,36452,36453,36454,36455,36456,36457,36458,36459,36460,36461,36462,36463,36464,36465,36466,36467,74789,74790,74791,74792,74793,74794,74822,74825,74844,74845,74846,74889],
  'the-tale-of-the-princess-kaguya':[11663,11671,11675,11676,11677,11678,11680,11681,11684,11699,11700,11701,11702,11703,11704,11709,11710,11711,11712,11713,11729,11730,11739,11740,11743,11744,11748,11817,11818,11819,11820,11821,11822,11823,11824,11825,11826,11827,11828,14090,14091,14321,14322,14391,14392,14393,14394,14395,14396,14397,28180,110580,120275,120276,120277,120278,120280,120281,120378,120397,120398,120399,120400,120401,120402,120403,120404,120789,120790,120791,120797,120798,120801,120803,120806,120809,120811,120812,120813,120814,120815,120816,120817,120818,120825,120830,120831,120837,120838,120839,120840,120842,120848,120849,120850,120852,120853,120862,120959,120961,120962,120963,121010],
  'the-wind-rises':[6545,6870,6871,6874,9247,9249,9250,9251,9252,9253,9254,9255,9257,9258,9259,9260,9261,9262,9273,9274,10367,11891,11892,11893,11894,11895,11896,11897,11898,11899,11962,11963,11964,11965,11966,11967,11968,11969,11970,11971,11972,11973,11974,11975,11976,11977,11978,11980,11981,11982,11983,14126,14127,14313,14315,14316,14317,14318,14319,41534,41535,41536,103688],
  'when-marnie-was-there':[13504,13505,14461,14462,14476,14477,14478,14479,14480,14481,14482,14483,14485,14487,14488,14489,14491,14493,14494,14495,14496,14497,14498,14499,14500,14501,17968,17969,62245,62246,62247,62248,62250,62252,62257,62260,62262,62263,62264,62265,62276,62281],
  'whisper-of-the-heart':[16694,16695,16696,16709,18155,18156,18157,18158,18159,18160,18163,18165,18167,18168,46166,46167,46168,46169,46170,46171,46172,46173,46174,46175,46176,46177,46178,46179,46180,46181,46182,46183,46184,46185,46186,46187,46188,46189,46190,46191,46192,46193,46194,46195,46196,46197,46198,46199,46200,46201,46202,46203,46204,46205,46206],
};

// prettier-ignore
interface Person {
  alias?: string;
  birthDay?: number;
  birthMonth?: number;
  birthYear?: number;
  country: 'AR' | 'BR' | 'CA' | 'DE' | 'ES' | 'FR' | 'GB' | 'IE' | 'IT' | 'LU' | 'JP' | 'PT' | 'TH' | 'US';
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
  animated?: number[];
}

// prettier-ignore
const people:{[key:string]:Person} = {
  'akahori-shigeo':{animated:[74789],lastName:'Akahori',firstName:'Shigeo',country:'JP'},
  'ambro-hal':{animated:[39208],lastName:'Ambro',firstName:'Hal',birthYear:1913,birthMonth:8,birthDay:1,deathYear:1990,deathMonth:2,deathDay:1,country:'US'},
  'ando-masahiro':{animated:[26024,26025,26026,48699,48703,118578,118579,118691,118769],lastName:'Ando',firstName:'Masahiro',kanji:'安藤 真裕',birthYear:1967,birthMonth:9,birthDay:1,country:'JP'},
  'ando-masashi':{animated:[6010,11817,18158,27985,28180,28399,28427,36284,46173,46174,46175,46202,46204,80246,80255,119140,119333,119339,120378,120399,120797,120798,120852,120959,121010],lastName:'Ando',firstName:'Masashi',country:'JP'},
  'anno-hideaki':{animated:[10434,10436,16760,17013,17014,17015,34117,45518],lastName:'Anno',firstName:'Hideaki',kanji:'庵野 秀明',birthYear:1960,birthMonth:5,birthDay:22,country:'JP'},
  'aoyama-hiroyuki':{animated:[14126,14127,16597,23778,46200,110677,114963,114965],lastName:'Aoyama',firstName:'Hiroyuki',country:'JP'},
  'awada-tsutomu':{animated:[11975,16709,17674,18157,18626,25547,46186,46191,67916,68073,68074,68086,80252,80262,120479,120499,120515],lastName:'Awada',firstName:'Tsutomu',country:'JP'},
  'awao-masahiro':{animated:[27937],lastName:'Awao',firstName:'Masahiro',country:'JP'},
  'azuma-yuuko':{animated:[36449,74789],lastName:'Azuma',firstName:'Yuuko',country:'JP'},
  'baer-dale':{animated:[34047,48951],lastName:'Baer',firstName:'Dale',birthYear:1950,birthMonth:6,birthDay:15,country:'US'},
  'bancroft-tom':{animated:[33714,33715,33718,33926,33927,33930,33931,33932,33933,33934,33937],lastName:'Bancroft',firstName:'Tom',country:'US'},
  'bancroft-tony':{animated:[48951],directed:['mulan'],lastName:'Bancroft',firstName:'Tony',birthYear:1967,birthMonth:7,birthDay:31,country:'US'},
  'baxter-james':{animated:[19896,19897,19898,29527,48648,48660,106220,106768,109285,109660],lastName:'Baxter',firstName:'James',birthYear:1967,birthMonth:5,country:'US'},
  'becquer-jeremie':{animated:[106760,106956,106962,107612],lastName:'Becquer',firstName:'Jeremie',country:'LU'},
  'blaise-aaron':{animated:[23139,33714,33715],lastName:'Blaise',firstName:'Aaron',country:'US'},
  'bluth-don':{animated:[31070,31071],directed:['anastasia','secret-of-nimh','titan-ae'],founded:['don-bluth-productions','fox-animation'],lastName:'Bluth',firstName:'Don',country:'US',birthYear:1937,birthMonth:9,birthDay:13},
  'braggio-giovanni':{animated:[106737,108549],lastName:'Braggio',firstName:'Giovanni',country:'IT'},
  'cabanac-sam':{animated:[106747,106750,106955],lastName:'Cabanac',firstName:'Sam',country:'CA'},
  'capote-jorge':{animated:[42281,107033,107036,107039,107041,107043],lastName:'Capote',firstName:'Jorge',country:'US'},
  'carre-cecile':{animated:[106973],lastName:'Carre',firstName:'Cécile',country:'FR'},
  'chesworth-andrew':{animated:[106953,106955,106969,106988,106990],lastName:'Chesworth',firstName:'Andrew',country:'US'},
  'cirillo-simone':{animated:[106736,106737,106743,106744,106956,106977,106978,106980,107638,107639,107640,107641,107642,107643,107644,107645,107646,107647],lastName:'Cirillo',firstName:'Simone',country:'IT'},
  'cleuzo-sandro':{animated:[34042,107042],lastName:'Cleuzo',firstName:'Sandro',country:'US'},
  'cleworth-eric':{animated:[39203],lastName:'Cleworth',firstName:'Eric',birthYear:1920,birthMonth:12,birthDay:10,deathYear:1999,deathMonth:12,deathDay:10,country:'US'},
  'crook-daniel':{animated:[106743,106746,106751,107050,107627,107634,108262,108263],lastName:'Crook',firstName:'Daniel',country:'GB'},
  'delalande-maxime':{animated:[106754,106765,106958,106962,106964,106973,106975,107606,107607,107608,107609,107610,107611,107612,107613,107614,107615,107616],lastName:'Delalande',firstName:'Maxime',country:'GB'},
  'ebata-ryouma':{animated:[36453],lastName:'Ebata',firstName:'Ryouma',country:'JP'},
  'eguchi-hisashi':{animated:[34100,119347,119355],lastName:'Eguchi',firstName:'Hisashi',country:'JP'},
  'emura-toyoaki':{animated:[38802],lastName:'Emura',firstName:'Toyoaki',country:'JP'},
  'endo-masaaki':{animated:[6246,16240,16696,16772,17173,17175,17176,18265,18266,18269,28099,28111,28405,28428,38804,38809,38813,38814,38825,44922,44923,46177,46190,68078,68095,68102,80251,80259,120562],lastName:'Endo',firstName:'Masaaki',country:'JP'},
  'ens-victor':{animated:[106750,106966,106973,107636],lastName:'Ens',firstName:'Victor',country:'DE'},
  'ewing-john':{animated:[39210],lastName:'Ewing',firstName:'John',birthYear:1928,country:'US'},
  'finn-will':{animated:[36850],lastName:'Finn',firstName:'Will',country:'US'},
  'fucile-tony':{animated:[106753,109286],lastName:'Fucile',firstName:'Tony',birthYear:1964,country:'US'},
  'fujita-shigeru':{animated:[114873],lastName:'Fujita',firstName:'Shigeru',country:'JP'},
  'fukuda-tadashi':{animated:[14039,38447,38452,38464],lastName:'Fukuda',firstName:'Tadashi',country:'JP'},
  'fukushima-atsuko':{animated:[44931],lastName:'Fukushima',firstName:'Atsuko',country:'JP'},
  'furukawa-hisaki':{animated:[118764],lastName:'Furukawa',firstName:'Hisaki',kanji:'古川 尚哉',country:'JP'},
  'furukawa-naoya':{animated:[118764],lastName:'Furukawa',firstName:'Naoya',country:'JP'},
  'furumata-taichi':{animated:[11896,11897,114881,114908,114953],lastName:'Furumata',firstName:'Taichi',country:'JP'},
  'furuya-shougo':{animated:[30363,36436,36446,36454,62262,66248,80234,114883,114928,118697,120397,120467,120497,120498],lastName:'Furuya',firstName:'Shougo',country:'JP'},
  'futaki-makiko':{animated:[6243,6874,7863,11962,14752,14777,16169,16238,16328,16776,18277,18610,22994,23771,25531,25534,25549,28109,28110,28114,28116,28406,28416,28418,30345,30363,36428,36465,38455,38463,38797,38798,38819,44916,44934,44945,44946,46179,46180,46181,62248,114879,114904,114951,118531,120454,120476],lastName:'Futaki',firstName:'Makiko',kanji:'二木 真希子',birthYear:1958,birthMonth:6,birthDay:19,deathYear:2016,deathMonth:5,deathDay:13,country:'JP'},
  'goldman-gary':{directed:['anastasia','titan-ae'],founded:['fox-animation'],lastName:'Goldman',firstName:'Gary',country:'US',birthYear:1944,birthMonth:11,birthDay:17},
  'goncalves-edison':{animated:[30653],lastName:'Goncalves',firstName:'Edison',country:'US'},
  'gordon-steven-e':{animated:[30686],lastName:'Gordon',firstName:'Steven E.',birthYear:1960,birthMonth:3,birthDay:23,country:'US'},
  'gourmelen-mael':{animated:[106740],lastName:'Gourmelen',firstName:'Maël',country:'ES'},
  'hachizaki-kenji':{animated:[61717],lastName:'Hachizaki',firstName:'Kenji',country:'JP'},
  'hamada-takayuki':{animated:[11675,11676,11677,11678,11681,11748,11817,28180,62276,120277,120378,120401,120404,120809,120811,120812,120814,120837,120838,120839],lastName:'Hamada',firstName:'Takayuki',country:'JP'},
  'hamasu-hideki':{animated:[8401,8402,11964,13106,14315,14397,14487,14497,23766,24902,27983,27992,30366,36439,36450,36466,61711,114864,114902,114964,114965,114967,119337,119354,119360,120484,120485,120501,120502],lastName:'Hamasu',firstName:'Hideki',country:'JP'},
  'hane-yukiyoshi':{animated:[6249,44927,118533],lastName:'Hane',firstName:'Yukiyoshi',country:'JP'},
  'hara-toru':{lastName:'Hara',firstName:'Toru',kanji:'原 徹',birthYear:1935,birthMonth:12,birthDay:26,country:'JP',founded:['topcraft']},
  'hashimoto-shinji':{animated:[10338,11663,11671,11710,11730,11739,11740,11744,11822,11823,11824,11827,11828,13505,13573,14091,14393,14395,14396,14462,16003,16004,27990,27991,27993,30363,120825],lastName:'Hashimoto',firstName:'Shinji',country:'JP'},
  'hashimoto-takashi':{animated:[13571,13572,13573,14779,17672,110675,120515],lastName:'Hashimoto',firstName:'Takashi',country:'JP'},
  'hata-ayako':{animated:[11699,11825,11826,27952,120806,120850],lastName:'Hata',firstName:'Ayako',country:'JP'},
  'hiramatsu-tadashi':{animated:[16595,48700,118735,118736],lastName:'Hiramatsu',firstName:'Tadashi',country:'JP'},
  'hirota-shunsuke':{animated:[11713,23766,36463,120467,120489,120503,120813,120831],lastName:'Hirota',firstName:'Shunsuke',country:'JP'},
  'honda-takeshi':{animated:[11976,13569,14488,17968,18629,24909,48706,118766,120521],lastName:'Honda',firstName:'Takeshi',country:'JP'},
  'honma-akira':{animated:[14485,14493,114923,114935,114961],lastName:'Honma',firstName:'Akira',country:'JP'},
  'horiuchi-hiroyuki':{animated:[118728],lastName:'Horiuchi',firstName:'Hiroyuki',kanji:'堀内 博之',country:'JP'},
  'hoshi-kazunobu':{animated:[118577],lastName:'Hoshi',firstName:'Kazunobu',country:'JP'},
  'hoshino-kazuki':{animated:[11968,14318],lastName:'Hoshino',firstName:'Kazuki',country:'JP'},
  'inamura-takeshi':{animated:[11897,13118,14480,14481,14494,27955,30348,30375,36461,46170,46171,61580,67916,68070,70779,114902,114904,120440,120441],lastName:'Inamura',firstName:'Takeshi',country:'JP'},
  'inoue-ei': {animated:[114917,114918,114919,115044,118752,119340,119343,119351,119357,119362,119378],lastName:'Inoue',firstName:'Ei',kanji:'井上 鋭',country:'JP'},
  'inoue-hiroyuki':{animated:[46188],lastName:'Inoue',firstName:'Hiroyuki',country:'JP'},
  'inoue-toshiyuki':{animated:[6187,16236,16239,44924,66241,118513,118534,118727,118753,118761,119331,119349,119378,119379],lastName:'Inoue',firstName:'Toshiyuki',kanji:'井上 俊之',country:'JP'},
  'ishii-kuniyuki':{animated:[6245,30372,45517,46167,46190,46205,68100,80244,80264],lastName:'Ishii',firstName:'Kuniyuki',country:'JP'},
  'ishikado-asami':{animated:[23779,36427,36443,36449,114890,114906,114943],lastName:'Ishikado',firstName:'Asami',country:'JP'},
  'iso-mitsuo':{animated:[6011,6185,28395,28415,33713,36632,78907,119149],lastName:'Iso',firstName:'Mitsuo',country:'JP'},
  'itazu-yoshimi':{animated:[11893,119335,119348,119356,119361],lastName:'Itazu',firstName:'Yoshimi',country:'JP'},
  'ito-nozomu':{animated:[61581],lastName:'Ito',firstName:'Nozomu',country:'JP'},
  'ito-yoshiyuki':{animated:[18040],lastName:'Ito',firstName:'Yoshiyuki',country:'JP'},
  'jewanarom-patt':{animated:[106750,106955,106973],lastName:'Jewanarom',firstName:'Patt',country:'TH'},
  'joe-hisaishi':{lastName:'Fujisawa',firstName:'Mamoru',kanji:'藤澤 守',alias:'Joe Hisaishi',birthYear:1950,birthMonth:12,birthDay:6,country:'JP',composed:['nausicaa-of-the-valley-of-the-wind','castle-in-the-sky','my-neighbor-totoro','kikis-delivery-service','porco-rosso','princess-mononoke','spirited-away','howls-moving-castle','ponyo','the-tale-of-the-princess-kaguya']},
  'johnston-ollie':{animated:[27713,27717,39196,39197,39204,39205,43489],lastName:'Johnston',firstName:'Ollie',birthYear:1912,birthMonth:10,birthDay:31,deathYear:2008,deathMonth:4,deathDay:14,country:'US'},
  'kagawa-megumi':{animated:[6251,6874,8403,8404,11981,13086,13513,14319,14479,14771,14791,16008,16781,17198,18614,28407,38451,38806,38820,44941,46192,46193,46194,46196,61585,68069,68100,114866,114924,114946,115046,120444,120447,120448,120450],lastName:'Kagawa',firstName:'Megumi',country:'JP'},
  'kahl-milt':{animated:[39199,39215],lastName:'Kahl',firstName:'Milton',alias:'Milt Kahl',country:'US',birthYear:1909,birthMonth:3,birthDay:22,deathYear:1987,deathMonth:4,deathDay:19},
  'kaiya-toshihisa':{animated:[118692,118769],lastName:'Kaiya',firstName:'Toshihisa',country:'JP'},
  'kamata-shinpei':{animated:[120398,120818],lastName:'Kamata',firstName:'Shinpei',country:'JP'},
  'kamiishi-emi':{animated:[74845,114903,114947],lastName:'Kamiishi',firstName:'Emi',country:'JP'},
  'kamiya-tomomi':{animated:[120839],lastName:'Kamiya',firstName:'Tomomi',country:'JP'},
  'kanada-yoshinori':{animated:[6011,7861,7864,14038,14040,14041,14042,14043,16237,16241,16325,16329,16332,16333,16785,17012,17192,18261,18262,18582,18584,27365,28106,28113,28404,28414,28416,38446,38450,38801,38815,38816,38817,44936,44942],lastName:'Kanada',firstName:'Yoshinori',country:'JP'},
  'kawaguchi-toshio':{animated:[16696,18269,18275,18276,25516,25533,28100,28115,38810,38811,44940,44944,46176,46203,48702,68063,80233,80240,80254,80265,118530,118699,118773,120398],lastName:'Kawaguchi',firstName:'Toshio',country:'JP'},
  'kawahara-naoko':{animated:[14476,14477],lastName:'Kawahara',firstName:'Naoko',country:'JP'},
  'kawana-kumiko':{animated:[119342,120398,120801],lastName:'Kawana',firstName:'Kumiko',country:'JP'},
  'kawasaki-hirotsugu':{animated:[18263,18279,38803],lastName:'Kawasaki',firstName:'Hirotsugu',country:'JP'},
  'kawauchi-hideo': {animated:[37524],lastName:'Kawauchi',firstName:'Hideo',kanji:'河内 日出夫',country:'JP'},
  'kigami-yoshiji':{animated:[26027],lastName:'Yoshiji',firstName:'Kigami',kanji:'木上 益治',birthYear:1957,birthMonth:12,birthDay:28,deathYear:2019,deathMonth:7,deathDay:18,country:'JP'},
  'kimishima-shigeru':{animated:[27946,30373],lastName:'Kimishima',firstName:'Shigeru',country:'JP'},
  'king-hal':{animated:[39202,39212,39215],lastName:'King',firstName:'Hal',birthYear:1913,birthMonth:5,birthDay:5,deathYear:1986,deathMonth:9,deathDay:28,country:'US'},
  'kise-kazuchika':{animated:[5519],lastName:'Kise',firstName:'Kazuchika',country:'JP'},
  'kobayashi-ikkou':{animated:[17191,17193,38445,38818],lastName:'Kobayashi',firstName:'Ikkou',country:'JP'},
  'kobayashi-masayuki':{animated:[80250,80266,118732],lastName:'Kobayashi',firstName:'Masayuki',country:'JP'},
  'kon-satoshi':{directed:['paprika'],lastName:'Kon',firstName:'Satoshi',kanji:'今 敏',birthYear:1963,birthMonth:10,birthDay:12,deathYear:2010,deathMonth:8,deathDay:24,country:'JP'},
  'kondo-katsuya': {animated:[6188,11969,11977,14750,16197,16198,16201,16202,16203,16204,16327,16331,16333,18252,18272,18273,25543,28102,28413,28420,28421,36444,38808,38821,44926,61710,62260,68096,70598,70599,120442,120443],lastName:'Kondo',firstName:'Katsuya',kanji:'近藤 勝也',country:'JP',birthYear:1963,birthMonth:6,birthDay:2},
  'kondo-yoshifumi':{animated:[16199,16200,16201,16202,16203,16236,16759,18156,18584,25517,25518,25519,25536,25550,28407,28419,28434,28435,44925,68071,68072,68085,80257,80263,119130,119145],lastName:'Kondo',firstName:'Yoshifumi',country:'JP'},
  'konishi-kenichi':{animated:[11702,11703,11820,11821,13108,13109,13112,14499,14787,14790,18159,18160,30368,46182,61720,67822,68067,68080,68093,80245,80259,118768,119336,120461,120462,120463,120514,120571],lastName:'Konishi',firstName:'Kenichi',country:'JP'},
  'konno-fumie':{animated:[36435,74792,74889,114900,114921,114922,120490],lastName:'Konno',firstName:'Fumie',country:'JP'},
  'kotabe-yoichi':{animated:[38466],lastName:'Kotabe',firstName:'Yoichi',country:'JP'},
  'kousaka-kitaro':{animated:[7862,9249,9250,9251,9253,9254,9255,9258,9259,9260,9273,9274,13105,14491,16756,16772,17969,25529,25536,25537,25546,38448,38453,38461,38807,62250,62252,114911,114912,120562,120563],lastName:'Kousaka',firstName:'Kitaro',kanji:'高坂 希太郎',birthYear:1962,birthMonth:2,birthDay:28,country:'JP'},
  'koyama-masahiro':{animated:[118770],lastName:'Koyama',firstName:'Masahiro',country:'JP'},
  'koyasu-misa':{animated:[14476,14477,62265],lastName:'Koyasu',firstName:'Misa',country:'JP'},
  'kubo-masahiko':{animated:[36462],lastName:'Kubo',firstName:'Masahiko',country:'JP'},
  'kurata-misuzu':{animated:[13085,13089,27984,30360],lastName:'Kurata',firstName:'Misuzu',country:'JP'},
  'kuwana-ikuo':{animated:[68094,120594],lastName:'Kuwana',firstName:'Ikuo',country:'JP'},
  'larson-eric':{animated:[39212,39215,39216],lastName:'Larson',firstName:'Eric',birthYear:1905,birthMonth:9,birthDay:3,deathYear:1988,deathMonth:10,deathDay:25,country:'US'},
  'lounsbery-john':{animated:[39210,41225],lastName:'Lounsbery',firstName:'John',birthYear:1911,birthMonth:3,birthDay:11,deathYear:1976,deathMonth:2,deathDay:13,country:'US'},
  'lucas-valentin':{animated:[106749],lastName:'Lucas',firstName:'Valentin',country:'FR'},
  'luzzi-carlos':{animated:[106752,106756,106982],lastName:'Luzzi',firstName:'Carlos',country:'BR'},
  'macmanus-dan':{animated:[39216],lastName:'MacManus',firstName:'Dan',birthYear:1900,birthMonth:6,birthDay:14,deathYear:1990,deathMonth:3,deathDay:10,country:'US'},
  'maeda-mahiro':{animated:[18279,38457],lastName:'Maeda',firstName:'Mahiro',country:'JP'},
  'manabe-johji':{animated:[37522],lastName:'Manabe',firstName:'Johji',kanji:'真鍋 譲二',country:'JP'},
  'martins-sergio':{animated:[106738,106739,106760,106960,106973,109965,110460,110461,110578],lastName:'Martins',firstName:'Sergio',country:'PT'},
  'masuda-hirofumi':{animated:[61708],lastName:'Masuda',firstName:'Hirofumi',country:'JP'},
  'masuda-toshihiko':{animated:[14783,61718],lastName:'Masuda',firstName:'Toshihiko',country:'JP'},
  'masuyama-ryouji':{animated:[36428],lastName:'Masuyama',firstName:'Ryouji',country:'JP'},
  'matsumoto-norio':{animated:[11684,11699,11700,11701,11729,11743,11744,11748,11818,11819,11825,11826,14090,14321,14322,14394,27939,110580,120817],lastName:'Matsumoto',firstName:'Norio',country:'JP'},
  'matsumura-yuka':{animated:[120398],lastName:'Matsumura',firstName:'Yuka',country:'JP'},
  'matsuo-mariko':{animated:[13104,14770,18614,30334,30364,36428,36429,36447,36453,61583,61707,61712,68068,74794,114880,114901,114950,120438,120456,120457,120518],lastName:'Matsuo',firstName:'Mariko',country:'JP'},
  'matsuse-masaru':{animated:[13088,13098,46178,61570,68103,80243,120571],lastName:'Matsuse',firstName:'Masaru',country:'JP'},
  'mechanic-bill':{founded:['fox-animation'],lastName:'Mechanic',firstName:'Bill',birthYear:1950,birthMonth:5,birthDay:12,country:'US'},
  'merideth-joe':{animated:[106973],lastName:'Merideth',firstName:'Joe',country:'US'},
  'mihara-michio':{animated:[16777,27945,68091,74488,74547,118695,118733,119332,119346],lastName:'Mihara',firstName:'Michio',country:'JP'},
  'minowa-hiroko':{animated:[6021,28423,46187,68065,68081,68099,114942,120438,120522],lastName:'Minowa',firstName:'Hiroko',country:'JP'},
  'miura-tomoko':{animated:[24908,36428,36454,36455,114871,114914],lastName:'Miura',firstName:'Tomoko',country:'JP'},
  'miyazaki-goro':{animated:[28475,28476,28477,28478,28479,28480,28481],lastName:'Miyazaki',firstName:'Gorō',kanji:'宮崎 吾朗',birthYear:1967,birthMonth:1,birthDay:21,country:'JP',directed:['from-up-on-poppy-hill','tales-from-earthsea'],wrote:['tales-from-earthsea']},
  'miyazaki-hayao':{
    animated:[8931,9247,9252,9255,9257,9259,9261,9262,15530,16204,16338,16339,16340,16341,16342,16785],
    wrote:['lupin-the-third-the-castle-of-cagliostro','nausicaa-of-the-valley-of-the-wind','castle-in-the-sky','my-neighbor-totoro','kikis-delivery-service','porco-rosso','whisper-of-the-heart','princess-mononoke','spirited-away','howls-moving-castle','ponyo','the-secret-world-of-arrietty','from-up-on-poppy-hill','the-wind-rises'],
    directed:['lupin-the-third-the-castle-of-cagliostro','nausicaa-of-the-valley-of-the-wind','castle-in-the-sky','my-neighbor-totoro','kikis-delivery-service','porco-rosso','princess-mononoke','spirited-away','howls-moving-castle','ponyo','the-wind-rises'],
    founded:['studio-ghibli'],
    lastName:'Miyazaki',firstName:'Hayao',kanji:'宮崎 駿',birthYear:1941,birthMonth:1,birthDay:5,country:'JP'},
  'miyazawa-yasunori':{animated:[118513,118759,118760,118767,119353,119358,119359],lastName:'Miyazawa',firstName:'Yasunori',country:'JP'},
  'mochizuki-tomomi':{lastName:'Mochizuki',firstName:'Tomomi',kanji:'望月 智充',birthYear:1958,birthMonth:12,birthDay:31,country:'JP',directed:['ocean-waves']},
  'momose-yoshiyuki':{animated:[6242,8391,13569,18156,18163,18165,18167,18168,28391,28392,28393,28427,28431,28432,28433,28465,28466,30367,46166,46205,80237,80261,120825],lastName:'Momose',firstName:'Yoshiyuki',country:'JP'},
  'montoro-borja':{animated:[107040],lastName:'Montoro',firstName:'Borja',birthYear:1966,birthMonth:7,country:'ES'},
  'mori-hisashi':{animated:[13103,13108,30367],lastName:'Mori',firstName:'Hisashi',country:'JP'},
  'mori-shinobu':{animated:[27946],lastName:'Mori',firstName:'Shinobu',country:'JP'},
  'morimoto-koji':{animated:[44920,44921,44943],lastName:'Morimoto',firstName:'Koji',country:'JP'},
  'morita-hiroyuki':{lastName:'Morita',firstName:'Hiroyuki',kanji:'森田 宏幸',birthYear:1964,birthMonth:6,birthDay:26,country:'JP',directed:['the-cat-returns']},
  'moritomo-noriko':{animated:[6247,18584,25537,38796,44938,46183,46184,46195,68076,80236,80238,80239,80241],lastName:'Moritomo',firstName:'Noriko',country:'JP'},
  'morohashi-shinji':{animated:[6252,6253,28394],lastName:'Morohashi',firstName:'Shinji',country:'JP'},
  'murata-masahiko':{lastName:'Murata',firstName:'Masahiko',kanji:'むらた 雅彦',country:'JP'},
  'muroi-yasuo':{animated:[36456],lastName:'Muroi',firstName:'Yasuo',country:'JP'},
  'nabeshima-osamu':{animated:[17171,17199,17200,38822,38823,38824],lastName:'Nabeshima',firstName:'Osamu',country:'JP'},
  'nakamura-katsutoshi':{animated:[23772,23780,30329,30350,62246,80242,114889,114915,114926,114948],lastName:'Nakamura',firstName:'Katsutoshi',country:'JP'},
  'nakamura-takashi':{animated:[17172,17173,17174,17194,17195,17196,17197,38444,38458,38459],lastName:'Nakamura',firstName:'Takashi',country:'JP'},
  'nakatake-manabu':{animated:[74793],lastName:'Nakatake',firstName:'Manabu',country:'JP'},
  'nakura-yasuhiro':{animated:[18268],lastName:'Nakura',firstName:'Yasuhiro',country:'JP'},
  'navarro-pablo':{animated:[106743,106973],lastName:'Navarro',firstName:'Pablo',country:'AR'},
  'neriki-masahiro':{animated:[6244],lastName:'Neriki',firstName:'Masahiro',country:'JP'},
  'nishigaki-shouko':{animated:[120814,120830,120853,120961,120962,120963],lastName:'Nishigaki',firstName:'Shouko',country:'JP'},
  'nishimura-hiroyuki':{animated:[26028],lastName:'Nishimura',firstName:'Hiroyuki',kanji:'西村 博之',country:'JP'},
  'nishio-tetsuya':{animated:[13568,16593,16594,27932,118733,118764],lastName:'Nishio',firstName:'Tetsuya',country:'JP'},
  'nishita-tatsuzou':{animated:[11711,11712,14391,14392,120281,120398,120840],lastName:'Nishita',firstName:'Tatsuzou',country:'JP'},
  'nozaki-reiko':{animated:[36448],lastName:'Nozaki',firstName:'Reiko',country:'JP'},
  'ohara-hidekazu':{animated:[17201,38443,38464],lastName:'Ohara',firstName:'Hidekazu',country:'JP'},
  'ohashi-minoru':{animated:[36446,36464,61582,114909,114953,115046,115047],lastName:'Ohashi',firstName:'Minoru',country:'JP'},
  'ohira-shinya':{animated:[6182,6545,11898,11899,11982,13090,13238,14776,16006,28411,28412,30335,61706,103688],lastName:'Ohira',firstName:'Shinya',country:'JP'},
  'okamura-tensai':{animated:[118691],lastName:'Okamura',firstName:'Tensai',country:'JP'},
  'okiura-hiroyuki':{animated:[13504,14461,14495,48707,118770,119363],lastName:'Okiura',firstName:'Hiroyuki',kanji:'沖浦 啓之',country:'JP'},
  'okuda-akiyo':{animated:[14476,14477,114887,115042],lastName:'Okuda',firstName:'Akiyo',country:'JP'},
  'okumura-masashi':{animated:[14750,61583,61584],lastName:'Okumura',firstName:'Masashi',country:'JP'},
  'okuyama-reiko':{animated:[45515],lastName:'Okuyama',firstName:'Reiko',country:'JP'},
  'onoda-kazuyoshi':{animated:[11894,36449,114878,114905,114965,120451,120487,120503],lastName:'Onoda',firstName:'Kazuyoshi',country:'JP'},
  'oshiro-masaru':{animated:[30352],lastName:'Oshiro',firstName:'Masaru',country:'JP'},
  'oshiyama-kiyotaka':{animated:[11963,11970,11982,11983,20230,36442],lastName:'Oshiyama',firstName:'Kiyotaka',country:'JP'},
  'osugi-yoshihiro':{animated:[23779,30363,30375],lastName:'Osugi',firstName:'Yoshihiro',country:'JP'},
  'otani-atsuko':{animated:[6250,11978,44917,46172,62263,68061,68087,68103,80248],lastName:'Otani',firstName:'Atsuko',country:'JP'},
  'otsuka-shinji':{animated:[6008,6253,14313,14483,14774,14775,16005,16200,16201,16202,16203,16235,16330,16596,16651,16652,16771,16774,18270,18271,18278,27934,28098,28101,28112,28400,28401,28402,28424,28433,28434,28435,36426,36460,38805,41536,44932,46206,48701,62264,68066,68088,68098,74822,74844,74846,114872,115042,118730,120468,120478,120511,120512],lastName:'Otsuka',firstName:'Shinji',kanji:'大塚 伸治',birthYear:1955,birthMonth:6,birthDay:28,country:'JP'},
  'otsuka-yasuo':{animated:[8931],lastName:'Otsuka',firstName:'Yasuo',country:'JP'},
  'ozaki-kazutaka':{animated:[27936,120813],lastName:'Ozaki',firstName:'Kazutaka',country:'JP'},
  'pablos-sergio':{animated:[59554,76282,107213],directed:['klaus'],lastName:'Pablos',firstName:'Sergio',birthYear:1967,country:'ES'},
  'pomeroy-john':{animated:[31067,31068,36475,36853,82170,106748,106749],lastName:'Pomeroy',firstName:'John',country:'US'},
  'ranieri-nik':{animated:[34042,48951],lastName:'Ranieri',firstName:'Nik',country:'US'},
  'reese-slaven':{animated:[106958,106959,107610,119724,119725,119726,119729,119730,119731,119732,119733,119734,119735,119736,119737],lastName:'Reese',firstName:'Slaven',country:'GB'},
  'reitherman-woolie':{animated:[39210],lastName:'Reitherman',firstName:'Woolie',birthYear:1909,birthMonth:6,birthDay:26,deathYear:1985,deathMonth:5,deathDay:22,country:'US'},
  'sakano-masako':{animated:[121542],lastName:'Sakano',firstName:'Masako',country:'JP'},
  'sakurai-michiyo':{animated:[38794,38795],lastName:'Sakurai',firstName:'Michiyo',country:'JP'},
  'sasaki-miwa':{animated:[11704,27935,36441,120815,120816,120862],lastName:'Sasaki',firstName:'Miwa',country:'JP'},
  'sasaki-shinsaku':{animated:[46189,68089,120572],lastName:'Sasaki',firstName:'Shinsaku',country:'JP'},
  'sato-masako':{animated:[16647,36455,61572,120458,120470,120500,120503,120513,120838],lastName:'Sato',firstName:'Masako',country:'JP'},
  'sato-yoshiharu':{animated:[16334,16335,16336,16337,36445,44942],lastName:'Sato',firstName:'Yoshiharu',country:'JP'},
  'sekiguchi-jun':{animated:[27933],lastName:'Sekiguchi',firstName:'Jun',country:'JP'},
  'sekino-masahiro':{animated:[44933],lastName:'Sekino',firstName:'Masahiro',country:'JP'},
  'serrand-kristof':{animated:[107731,118251],lastName:'Serrand',firstName:'Kristof',country:'FR'},
  'shigekuni-yuuji':{animated:[28422,40481,40482],lastName:'Shigekuni',firstName:'Yuuji',country:'JP'},
  'shimizu-hiroshi':{animated:[6252,16782,16848,25520,25521,25525,28396,28397,48705,68077,68082,118729,118757,118761],lastName:'Shimizu',firstName:'Hiroshi',kanji:'清水 ひろし',country:'JP'},
  'shimizu-keiko':{animated:[118512],lastName:'Shimizu',firstName:'Keiko',country:'JP'},
  'shimura-emiko':{animated:[27947,36428],lastName:'Shimura',firstName:'Emiko',country:'JP'},
  'shinohara-masako':{animated:[6248,14767,16239,28107,28111,28403,28409,28410,28433,37517,38799,38800,38812,44930,44940,44944,46185,61722,68075,68100,118532,120595],lastName:'Shinohara',firstName:'Masako',country:'JP'},
  'spafford-dave':{animated:[36853],lastName:'Spafford',firstName:'Dave',country:'US'},
  'stanchfield-walt':{animated:[39196,39209],lastName:'Stanchfield',firstName:'Walt',birthYear:1919,birthMonth:7,birthDay:14,deathYear:2000,deathMonth:9,deathDay:3,country:'US'},
  'suetomi-shinji':{animated:[14482,62252],lastName:'Suetomi',firstName:'Shinji',country:'JP'},
  'sueyoshi-yuichiro':{animated:[120480,120493],lastName:'Sueyoshi',firstName:'Yuichiro',country:'JP'},
  'sugino-sachiko':{animated:[6247,14781,28408,44929,61574,61575,61717,68102,114938,120459,120460,120481,120482],lastName:'Sugino',firstName:'Sachiko',country:'JP'},
  'suzuki-makiko':{animated:[36430,36459,114876,114877,114913,114930,114936,114937,120452,120453,120471,120509],lastName:'Suzuki',firstName:'Makiko',kanji:'鈴木 麻紀子',country:'JP'},
  'suzuki-michiyo':{animated:[36430,36459,114876,114877,114913,114930,114936,114937,120452,120453,120471,120509],lastName:'Suzuki',firstName:'Michiyo',country:'JP'},
  'tamura-yoshimichi':{animated:[106731,107213,110579],lastName:'Tamura',firstName:'Yoshimichi',country:'JP'},
  'takahashi-moyo':{animated:[74791,114870,114944],lastName:'Takahashi',firstName:'Moyo',country:'JP'},
  'takahata-isao':{lastName:'Takahata',firstName:'Isao',kanji:'高畑 勲',birthYear:1935,birthMonth:10,birthDay:29,deathYear:2018,deathMonth:4,deathDay:5,country:'JP',directed:[ 'grave-of-the-fireflies','only-yesterday','pom-poko','my-neighbors-the-yamadas','the-tale-of-the-princess-kaguya']},
  'takakura-yoshihiko':{animated:[119380,119381],lastName:'Takakura',firstName:'Yoshihiko',country:'JP',kanji:'高倉 佳彦'},
  'takano-noboru':{animated:[45511,45514],lastName:'Takano',firstName:'Noboru',country:'JP'},
  'takeuchi-nobuyuki':{animated:[14781,18616,30359,30363,61571,114838,114839,120486,120510],lastName:'Takeuchi',firstName:'Nobuyuki',country:'JP'},
  'takiguchi-teiichi':{animated:[27949],lastName:'Takiguchi',firstName:'Teiichi',country:'JP'},
  'tamura-atsushi':{animated:[11713,13111,14751,14755,14766,20230,23766,24908,30333,30361,30364,30369,36438,36452,61578,61707,114901,114905,114914,114915,114926,114928,114930,114944,114962,120446,120474,120520,120801,120803,120818,120837,120840,121542],lastName:'Tamura',firstName:'Atsushi',country:'JP'},
  'tanabe-osamu':{animated:[6186,25535,27986,70778,70826,80256],lastName:'Tanabe',firstName:'Osamu',country:'JP'},
  'tanaka-atsuko': {animated:[6870,6871,6874,11896,11974,13094,13113,13115,14489,14498,14753,14754,14773,14778,14779,14780,16326,16648,16649,16650,16698,16699,16780,17673,18155,18354,20913,25542,25544,28108,28429,30340,30341,30343,30344,30363,30370,36467,37520,37521,46197,46199,61576,61577,61714,61715,61716,68083,68097,73328,110676,114939,114941,114952,115039,115041,115045,120434,120436,120504,120505,120506],lastName:'Tanaka',firstName:'Atsuko',kanji:'田中 敦子',birthYear:1954,birthMonth:11,birthDay:3,country:'JP'},
  'tanaka-yuichi':{animated:[14769,27954,30354,30363],lastName:'Tanaka',firstName:'Yuichi',country:'JP'},
  'tannai-tsukasa':{animated:[28103,28104,28105,34824,37515,37518,38454,38456,38460,38462,68101],lastName:'Tannai',firstName:'Tsukasa',country:'JP'},
  'thomas-frank':{animated:[27713,27714,27718,27719,27720,39198,39199,39204,39205,39206,39208,39209,39213],lastName:'Thomas',firstName:'Frank',birthYear:1912,birthMonth:9,birthDay:5,deathYear:2004,deathMonth:9,deathDay:8,country:'US'},
  'tomizawa-nobuo':{animated:[25538,25539,25540,37514,37519,37520],lastName:'Tomizawa',firstName:'Nobuo',country:'JP'},
  'tomonaga-kazuhide': {animated:[8931,11966,11971,16697,25544,27953,37513,37523,37524,37526,38807,38826,38827,38828,80258],lastName:'Tomonaga',firstName:'Kazuhide',kanji:'友永 和秀',birthYear:1952,birthMonth:4,birthDay:28,country:'JP'},
  'tsuchiya-ryosuke':{animated:[62281],lastName:'Tsuchiya',firstName:'Ryosuke',country:'JP'},
  'tsukamoto-chiyomi':{animated:[11713],lastName:'Tsukamoto',firstName:'Chiyomi',country:'JP'},
  'uratani-chie':{animated:[44937],lastName:'Uratani',firstName:'Chie',country:'JP'},
  'vachet-mathilde':{animated:[106755],lastName:'Vachet',firstName:'Mathilde',country:'IE'},
  'valls-marc':{animated:[106973,106984],lastName:'Valls',firstName:'Marc',country:'ES'},
  'vandervoort-david':{animated:[106736],lastName:'Vandervoort',firstName:'David',country:'US'},
  'vu-alain':{animated:[106739,106760,107628,108550],lastName:'Vu',firstName:'Alain',country:'FR'},
  'wada-naoya':{animated:[62265],lastName:'Wada',firstName:'Naoya',country:'JP'},
  'watanabe-takashi':{animated:[38449],lastName:'Watanabe',firstName:'Takashi',country:'JP'},
  'williames-matt':{animated:[106734,106735,106739,106741,106744,106747,106759,106765,106974,107049,107631,107633,107635,107642],lastName:"Williames",firstName:"Matt",country:'US'},
  'yamada-kenichi':{animated:[14496,16780,18615,36443,36451,46186,61583,68084,74794,114892,115048,120465,120466,120564,120572],lastName:'Yamada',firstName:'Kenichi',country:'JP'},
  'yamada-shinichiro':{animated:[27951,27952,61580,74825],lastName:'Yamada',firstName:'Shinichiro',country:'JP'},
  'yamada-tamami':{animated:[30334],lastName:'Yamada',firstName:'Tamami',country:'JP'},
  'yamagata-atsushi':{animated:[30360,30377,114869,114906],lastName:'Yamagata',firstName:'Atsushi',country:'JP'},
  'yamaguchi-akiko':{animated:[11680,11712,11713,120276,120789,120791,120825,120862],lastName:'Yamaguchi',firstName:'Akiko',country:'JP'},
  'yamakawa-hiroomi':{animated:[6252,25524,25549,30356,44928,44939,80235,114867],lastName:'Yamakawa',firstName:'Hiroomi',country:'JP'},
  'yamamori-eiji':{animated:[14317,14793,18620,23769,23782,30357,30363,30369,61706,62245,62264,68064,114865,120442,120443,120507,120508,120517,120519,120591],lastName:'Yamamori',firstName:'Eiji',country:'JP'},
  'yamashita-akihiko':{animated:[11891,11965,11973,11980,13101,13116,14316,14478,14500,14501,14772,23775,23782,30353,36441,41534,41535,61584,62247,114891,114932,114935,114945,120439,120475,120494,120495,120496],lastName:'Yamashita',firstName:'Akihiko',country:'JP'},
  'yamashita-takaaki':{animated:[13103],lastName:'Yamashita',firstName:'Takaaki',country:'JP'},
  'yamauchi-shojuro':{animated:[37516,37524],lastName:'Yamauchi',firstName:'Shojuro',country:'JP'},
  'yanagida-yoshiaki':{animated:[118701,118702],lastName:'Yanagida',firstName:'Yoshiaki',country:'JP'},
  'yasuda-natsuyo':{animated:[16215,18584,44918],lastName:'Yasuda',firstName:'Natsuyo',country:'JP'},
  'yokobori-hisao':{animated:[27950,46198],lastName:'Yokobori',firstName:'Hisao',country:'JP'},
  'yokota-masafumi':{animated:[36437,61579,61709,114885,114886,114887,114940,120445,120483],lastName:'Yokota',firstName:'Masafumi',country:'JP'},
  'yonebayashi-hiromasa':{animated:[10367,10380,11895,11968,13087,13111,14785,16647,17671,18626,30331,30337,30346,61719,114907,114933,115042,115043,115048,120469,120488,120491,120492],lastName:'Yonebayashi',firstName:'Hiromasa',country:'JP'},
  'yoshida-kenichi':{animated:[6019,8394,16694,16695,16709,16846,25526,25548,46201,68062,119142,119143],lastName:'Yoshida',firstName:'Kenichi',country:'JP'},
  'yoshida-tadakatsu':{animated:[38453,38464],lastName:'Yoshida',firstName:'Tadakatsu',country:'JP'},
  'yoshinari-yoh':{animated:[118767],lastName:'Yoh',firstName:'Yoshinari',kanji:'吉成 曜',country:'JP',birthYear:1971,birthMonth:5,birthDay:6},
  'yoshio-hideaki':{animated:[8392,8393,11892,13100,13108,24903,25528,30339,30352,30353,30363,36440,36457,36458,46168,46169,61573,68079,68092,68100,74790,80241,80261,114869,114910,120455,120477,120523,120562],lastName:'Yoshio',firstName:'Hideaki',country:'JP'},
  'zennaro-alvise':{animated:[58700,107637,108402],lastName:'Zennaro',firstName:'Alvise',country:'IT'},
};

// prettier-ignore
const studios = {
  'disney-animation':{city:'Burbank, CA',country:'US',foundedYear:1923,name:'Walt Disney Animation Studios'},
  'don-bluth-productions':{city:'Van Nuys, CA',country:'US',foundedYear:1979,name:'Don Bluth Productions'},
  'tms-entertainment':{country:'JP',foundedYear:1964,name:'TMS Entertainment Co.,Ltd.'},
  topcraft:{country:'JP',foundedYear:1971,name:'Topcraft'},
  madhouse:{country:'JP',foundedYear:1972,name:'Madhouse'},
  'shin-ei':{city:'Nishitōkyō, Tokyo',country:'JP',foundedYear:1976,name:'Shin-Ei Animation'},
  'kyoto-animation':{country:'JP',foundedYear:1981,name:'Kyoto Animation',},
  'studio-ghibli':{city:'Koganei, Tokyo',country:'JP',foundedYear:1985,name:'Studio Ghibli'},
  'the-spa-studios':{city:'Madrid, ES',foundedYear:2019,country:'ES',name:'The SPA Studios'},
  'production-i-g':{city:'Kokubunji, Tokyo',foundedYear:1987,country:'JP',name:'Production I.G'},
  'dreamworks-animation':{city:'Glendale, CA',country:'US',foundedYear:1994,name:'Dreamworks Animation'},
  'fox-animation':{city:'Phoenix, AZ',country:'US',foundedYear:1994,name:'Fox Animation Studios',},
};

// prettier-ignore
const images:{[key:string]:{[key:string]:{title:string; url:string}}} = {
  animationSequences:Object.entries(sakugaPosts).reduce((obj,[filmID,sakugaIDs]) => ({...obj,...sakugaIDs.reduce( (idObj,id) => ({...idObj,[id]:{title:`${films[filmID].titleEN}`,url:`https://storage.googleapis.com/aniarchive-assets/thumb/${id}.jpg`}}),{}),}),{}),
  films:Object.entries(films).reduce((obj,[id,film]) => ({...obj,[id]:{title:`${film.titleEN} Theatrical Release Poster`,url:`https://storage.googleapis.com/aniarchive-assets/film/${id}.jpg`}}),{}),
  people:Object.entries(people).filter(([id]) =>
    ['ambro-hal','anno-hideaki','bancroft-tom','bancroft-tony','baxter-james','becquer-jeremie','bluth-don','braggio-giovanni','cabanac-sam','capote-jorge','carre-cecile','chesworth-andrew','cirillo-simone','cleuzo-sandro','cleworth-eric','crook-daniel','delalande-maxime','fucile-tony','furukawa-hisaki','futaki-makiko','goldman-gary','gourmelen-mael','jewanarom-patt','joe-hisaishi','johnston-ollie','kahl-milt','king-hal','kon-satoshi','kondo-katsuya','larson-eric','lucas-valentin','luzzi-carlos','lounsbery-john','macmanus-dan','martins-sergio','mechanic-bill','miyazaki-goro','miyazaki-hayao','mochizuki-tomomi','montoro-borja','morita-hiroyuki','navarro-pablo','otsuka-shinji','pablos-sergio','reese-slaven','reitherman-woolie','serrand-kristof','shimizu-horoshi','stanchfield-walt','takahata-isao','tamura-yoshimichi','tanaka-atsuko','thomas-frank','tomonaga-kazuhide','vache-mathilde','valls-marc','vanderwoort-david','vu-alain','williames-matt','yoshinari-yoh','zennaro-alvise'].includes(id))
    .reduce((obj,[id,person]) => ({...obj,[id]:{title:`${person.firstName} ${person.lastName}`,url:`https://storage.googleapis.com/aniarchive-assets/person/${id}.jpg`}}),{}),
  studios:Object.entries(studios).reduce((obj,[id,studio]) => ({...obj,[id]:{title:`${studio.name}`,url:`https://storage.googleapis.com/aniarchive-assets/studio/${id}.png`,/* PNG! */}}),{}),
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
    image: images.people[id] ? { connect: { url: images.people[id].url } } : undefined,
    directed: person.directed ? { connect: person.directed.map((id) => ({ id })) } : undefined,
    composed: person.composed ? { connect: person.composed.map((id) => ({ id })) } : undefined,
    wrote: person.wrote ? { connect: person.wrote.map((id) => ({ id })) } : undefined,
    founded: person.founded ? { connect: person.founded.map((id) => ({ id })) } : undefined,
    animated: person.animated
      ? { connect: person.animated.map((id) => ({ id: `${id}` })) }
      : undefined,
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
