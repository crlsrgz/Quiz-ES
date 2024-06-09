type UserIdentifierId = string;

type quizInfo = {
    quote: string;
    answer: number;
    authors: string[];
    author_bio: authorBio;
};

type dayQuote = {
    0: quizInfo;
    1: quizInfo;
    2: quizInfo;
    3: quizInfo;
};

type authorBio = {
    authorId: string;
    authorName: string;
    authorBorn: string | null;
    authorDeath: string | null;
    authorCountryName: string | null;
    professionOne: string | null;
    professionTwo: string | null;
    professionThree: string | null;
    professionFour: string | null;
};

const test = {
    "0": {
        quote: "Que es víbora enfurecida la mujer despreciada.",
        answer: 0,
        authors: [
            "Flavio Magno Aurelio Casiodoro",
            "San Pablo",
            "Pierre Joseph Proudhon",
            "Ernest Wilfrid Lecouve",
        ],
        author_bio: {
            authorId: "987",
            authorName: "Flavio Magno Aurelio Casiodoro",
            authorBorn: "480",
            authorDeath: "575",
            authorCountryName: "Imperio Romano, acte. Italia",
            professionOne: "escritor",
            professionTwo: null,
            professionThree: null,
            professionFour: null,
        },
    },
    "1": {
        quote: "A poco que se reflexione se verá que después de nuestras propias necesidades, lo que más nos liga a los demás es la gratitud.",
        answer: 0,
        authors: [
            "Manuel Alcántara",
            "Edward R Murrow",
            "Abu Beker El-Zobeidí",
            "Manès Sperber",
        ],
        author_bio: {
            authorId: "1339",
            authorName: "Manuel Alcántara",
            authorBorn: "1928",
            authorDeath: null,
            authorCountryName: "España",
            professionOne: "periodista",
            professionTwo: "poeta",
            professionThree: null,
            professionFour: null,
        },
    },
    "2": {
        quote: "Quien no sabe mostrarse cortés, va al encuentro de los castigos de la soberbia.",
        answer: 0,
        authors: ["Fedro", "Marlene Dietrich", "Javier Sádaba", "Tito Livio"],
        author_bio: {
            authorId: "271",
            authorName: "Fedro",
            authorBorn: null,
            authorDeath: null,
            authorCountryName: "Grecia",
            professionOne: "filósofo",
            professionTwo: null,
            professionThree: null,
            professionFour: null,
        },
    },
};

type quizData = typeof test;

type GameState = {
    isGameOver: boolean;
    isGameOfDayOver: boolean;
    answerTries: number;
    todayScore: number;
    todaysGamesPlayed: number;
    totalGamesPlayed: number;
    totalScore: number;
};
