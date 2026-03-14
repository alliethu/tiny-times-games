export interface CrosswordClue {
  number: number;
  direction: 'across' | 'down';
  clue: string;
  answer: string;
  row: number;
  col: number;
}

export interface CrosswordPuzzle {
  id: number;
  grid: string[][];
  clues: CrosswordClue[];
}

export const CROSSWORD_PUZZLES: CrosswordPuzzle[] = [
  // Puzzle 1 — Animals
  {
    id: 1,
    grid: [
      ['C','A','T','#','#'],
      ['O','N','I','G','H'],
      ['W','T','G','O','A'],
      ['#','S','E','A','L'],
      ['#','#','R','M','E'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'A fluffy pet that purrs', answer: 'CAT', row: 0, col: 0 },
      { number: 4, direction: 'across', clue: 'When the moon is out', answer: 'NIGHT', row: 1, col: 0 },
      { number: 6, direction: 'across', clue: 'An animal that says moo', answer: 'COW', row: 2, col: 0 },
      { number: 7, direction: 'across', clue: 'An animal that swims and claps', answer: 'SEAL', row: 3, col: 1 },
      { number: 1, direction: 'down', clue: 'An animal that says moo', answer: 'COW', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Tiny insects at a picnic', answer: 'ANTS', row: 0, col: 1 },
      { number: 3, direction: 'down', clue: 'A big striped cat', answer: 'TIGER', row: 0, col: 2 },
      { number: 5, direction: 'down', clue: 'A farm animal that eats grass', answer: 'GOAT', row: 1, col: 3 },
      { number: 8, direction: 'down', clue: 'A big wind storm', answer: 'GALE', row: 2, col: 4 },
    ],
  },
  // Puzzle 2 — Food
  {
    id: 2,
    grid: [
      ['P','I','Z','Z','A'],
      ['L','#','#','#','P'],
      ['U','R','I','C','E'],
      ['M','#','#','A','#'],
      ['S','O','U','P','#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Round food with cheese on top', answer: 'PIZZA', row: 0, col: 0 },
      { number: 3, direction: 'across', clue: 'White grains you eat with a fork', answer: 'RICE', row: 2, col: 1 },
      { number: 5, direction: 'across', clue: 'Hot liquid you eat with a spoon', answer: 'SOUP', row: 4, col: 0 },
      { number: 1, direction: 'down', clue: 'A purple fruit', answer: 'PLUMS', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'A red or green fruit from a tree', answer: 'APPLE', row: 0, col: 4 },
      { number: 4, direction: 'down', clue: 'A dessert you eat on your birthday', answer: 'CAKE', row: 2, col: 3 },
    ],
  },
  // Puzzle 3 — School
  {
    id: 3,
    grid: [
      ['B','O','O','K','S'],
      ['#','#','#','I','#'],
      ['D','E','S','K','#'],
      ['#','#','#','S','A'],
      ['R','E','A','D','#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'You read these at school', answer: 'BOOKS', row: 0, col: 0 },
      { number: 3, direction: 'across', clue: 'Where you sit in class', answer: 'DESK', row: 2, col: 0 },
      { number: 5, direction: 'across', clue: 'What you do with a book', answer: 'READ', row: 4, col: 0 },
      { number: 2, direction: 'down', clue: 'What you do to a ball', answer: 'KICKS', row: 0, col: 3 },
      { number: 4, direction: 'down', clue: 'Not happy', answer: 'SAD', row: 3, col: 4 },
    ],
  },
  // Puzzle 4 — Nature
  {
    id: 4,
    grid: [
      ['T','R','E','E','S'],
      ['#','A','#','#','U'],
      ['L','I','L','Y','N'],
      ['A','N','#','#','#'],
      ['K','E','D','G','E'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'They grow tall with leaves', answer: 'TREES', row: 0, col: 0 },
      { number: 3, direction: 'across', clue: 'A pretty white flower', answer: 'LILY', row: 2, col: 0 },
      { number: 5, direction: 'across', clue: 'The border of something', answer: 'EDGE', row: 4, col: 1 },
      { number: 1, direction: 'down', clue: 'Water you swim in', answer: 'LAKE', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'What falls from clouds', answer: 'RAINE', row: 0, col: 1 },
      { number: 4, direction: 'down', clue: 'The bright yellow star in the sky', answer: 'SUN', row: 0, col: 4 },
    ],
  },
  // Puzzle 5 — Colors
  {
    id: 5,
    grid: [
      ['B','L','U','E','#'],
      ['#','#','#','#','#'],
      ['G','R','E','E','N'],
      ['#','E','#','#','#'],
      ['P','I','N','K','S'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'The color of the sky', answer: 'BLUE', row: 0, col: 0 },
      { number: 3, direction: 'across', clue: 'The color of grass', answer: 'GREEN', row: 2, col: 0 },
      { number: 4, direction: 'across', clue: 'A light reddish color', answer: 'PINKS', row: 4, col: 0 },
      { number: 2, direction: 'down', clue: 'The color of a fire truck', answer: 'RED', row: 2, col: 1 },
    ],
  },
  // Puzzle 6 — Sports
  {
    id: 6,
    grid: [
      ['K','I','C','K','S'],
      ['#','#','A','#','W'],
      ['B','A','T','#','I'],
      ['A','#','C','O','M'],
      ['L','I','H','I','T'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'What you do to a soccer ball', answer: 'KICKS', row: 0, col: 0 },
      { number: 3, direction: 'across', clue: 'Used to hit a baseball', answer: 'BAT', row: 2, col: 0 },
      { number: 1, direction: 'down', clue: 'A round toy you throw or bounce', answer: 'BALL', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'You do this to a ball with a bat', answer: 'HIT', row: 2, col: 2 },
      { number: 4, direction: 'down', clue: 'You do this in a pool', answer: 'SWIM', row: 0, col: 4 },
    ],
  },
  // Puzzle 7 — Weather
  {
    id: 7,
    grid: [
      ['R','A','I','N','S'],
      ['#','#','#','#','N'],
      ['W','I','N','D','O'],
      ['#','#','#','#','W'],
      ['H','A','I','L','S'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Water drops from the sky', answer: 'RAINS', row: 0, col: 0 },
      { number: 3, direction: 'across', clue: 'Moving air outside', answer: 'WIND', row: 2, col: 0 },
      { number: 5, direction: 'across', clue: 'Ice balls from the sky', answer: 'HAILS', row: 4, col: 0 },
      { number: 2, direction: 'down', clue: 'Cold white stuff in winter', answer: 'SNOW', row: 0, col: 4 },
    ],
  },
  // Puzzle 8 — Body Parts
  {
    id: 8,
    grid: [
      ['H','A','N','D','S'],
      ['E','#','O','#','#'],
      ['A','R','S','E','#'],
      ['D','#','E','Y','E'],
      ['#','T','O','E','S'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'You wave with these', answer: 'HANDS', row: 0, col: 0 },
      { number: 3, direction: 'across', clue: 'You see with this', answer: 'EYE', row: 3, col: 2 },
      { number: 4, direction: 'across', clue: 'Ten of these on your feet', answer: 'TOES', row: 4, col: 1 },
      { number: 1, direction: 'down', clue: 'At the top of your body', answer: 'HEAD', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Your smelling body part', answer: 'NOSE', row: 0, col: 2 },
    ],
  },
  // Puzzle 9 — Vehicles
  {
    id: 9,
    grid: [
      ['T','R','A','I','N'],
      ['R','#','#','#','#'],
      ['U','#','B','U','S'],
      ['C','A','R','#','H'],
      ['K','#','#','#','E'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'It rides on tracks — choo choo!', answer: 'TRAIN', row: 0, col: 0 },
      { number: 3, direction: 'across', clue: 'A big yellow ride to school', answer: 'BUS', row: 2, col: 2 },
      { number: 4, direction: 'across', clue: 'Mom or Dad drives this', answer: 'CAR', row: 3, col: 0 },
      { number: 1, direction: 'down', clue: 'A big vehicle that carries heavy stuff', answer: 'TRUCK', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'A lady or a he', answer: 'SHE', row: 2, col: 4 },
    ],
  },
  // Puzzle 10 — Space
  {
    id: 10,
    grid: [
      ['S','T','A','R','S'],
      ['#','#','#','#','U'],
      ['M','O','O','N','N'],
      ['A','#','#','#','#'],
      ['P','L','U','T','O'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Twinkle twinkle little...', answer: 'STARS', row: 0, col: 0 },
      { number: 3, direction: 'across', clue: 'It lights up the night sky', answer: 'MOON', row: 2, col: 0 },
      { number: 4, direction: 'across', clue: 'A dwarf planet far away', answer: 'PLUTO', row: 4, col: 0 },
      { number: 1, direction: 'down', clue: 'The big yellow ball in the sky', answer: 'SUN', row: 0, col: 4 },
      { number: 2, direction: 'down', clue: 'A picture of the world', answer: 'MAP', row: 2, col: 0 },
    ],
  },
  // Puzzle 11 — Clothes
  {
    id: 11,
    grid: [
      ['S','H','O','E','S'],
      ['H','A','#','#','O'],
      ['I','T','#','#','C'],
      ['R','S','K','I','K'],
      ['T','#','#','#','S'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'You put these on your feet', answer: 'SHOES', row: 0, col: 0 },
      { number: 3, direction: 'across', clue: 'A piece of clothing for legs (short for skirt)', answer: 'SKI', row: 3, col: 2 },
      { number: 1, direction: 'down', clue: 'You wear this on your chest', answer: 'SHIRT', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'These go on your head', answer: 'HATS', row: 0, col: 1 },
      { number: 4, direction: 'down', clue: 'Things that go on feet', answer: 'SOCKS', row: 0, col: 4 },
    ],
  },
  // Puzzle 12 — Family
  {
    id: 12,
    grid: [
      ['#','M','O','M','S'],
      ['D','A','D','#','I'],
      ['#','M','#','#','S'],
      ['B','A','B','Y','#'],
      ['#','#','R','O','W'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Your mother', answer: 'MOMS', row: 0, col: 1 },
      { number: 2, direction: 'across', clue: 'Your father', answer: 'DAD', row: 1, col: 0 },
      { number: 4, direction: 'across', clue: 'A very little kid', answer: 'BABY', row: 3, col: 0 },
      { number: 5, direction: 'across', clue: 'A line of seats', answer: 'ROW', row: 4, col: 2 },
      { number: 3, direction: 'down', clue: 'Your sibling who is a girl', answer: 'SIS', row: 0, col: 4 },
      { number: 1, direction: 'down', clue: 'Your mama', answer: 'MAMA', row: 0, col: 1 },
    ],
  },
  // Puzzle 13 — Ocean
  {
    id: 13,
    grid: [
      ['W','A','V','E','S'],
      ['H','#','#','#','H'],
      ['A','#','F','I','N'],
      ['L','#','#','#','E'],
      ['E','E','L','S','#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Water rolling at the beach', answer: 'WAVES', row: 0, col: 0 },
      { number: 3, direction: 'across', clue: 'A shark has one on its back', answer: 'FIN', row: 2, col: 2 },
      { number: 4, direction: 'across', clue: 'Snake-like fish', answer: 'EELS', row: 4, col: 0 },
      { number: 1, direction: 'down', clue: 'A really big ocean animal', answer: 'WHALE', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'An ocean animal with a hard shell', answer: 'SHELL', row: 0, col: 4 },
    ],
  },
  // Puzzle 14 — Bugs
  {
    id: 14,
    grid: [
      ['B','E','E','S','#'],
      ['#','#','#','L','#'],
      ['A','N','T','U','G'],
      ['#','#','#','G','#'],
      ['F','L','E','A','S'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Buzzing insects that make honey', answer: 'BEES', row: 0, col: 0 },
      { number: 3, direction: 'across', clue: 'Tiny bug that lives in a hill', answer: 'ANT', row: 2, col: 0 },
      { number: 4, direction: 'across', clue: 'Tiny jumping bugs on dogs', answer: 'FLEAS', row: 4, col: 0 },
      { number: 2, direction: 'down', clue: 'A slimy garden bug', answer: 'SLUG', row: 0, col: 3 },
      { number: 3, direction: 'down', clue: 'A crawly caterpillar becomes this', answer: 'BUG', row: 2, col: 4 },
    ],
  },
  // Puzzle 15 — Toys
  {
    id: 15,
    grid: [
      ['B','A','L','L','#'],
      ['L','#','#','E','#'],
      ['O','#','K','I','T','E'],
      ['C','A','R','S','#'],
      ['K','#','#','#','#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Round toy you bounce or throw', answer: 'BALL', row: 0, col: 0 },
      { number: 3, direction: 'across', clue: 'It flies high on a windy day', answer: 'KITE', row: 2, col: 2 },
      { number: 4, direction: 'across', clue: 'Toy vehicles with wheels', answer: 'CARS', row: 3, col: 0 },
      { number: 1, direction: 'down', clue: 'A toy you build with (rhymes with "rock")', answer: 'BLOCK', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Lego pieces', answer: 'LEIS', row: 0, col: 3 },
    ],
  },
  // Puzzle 16 — Fruit
  {
    id: 16,
    grid: [
      ['P','E','A','R','S'],
      ['L','#','#','#','#'],
      ['U','#','L','I','M','E'],
      ['M','A','N','G','O'],
      ['#','#','#','#','#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Green or yellow fruit shaped like a bell', answer: 'PEARS', row: 0, col: 0 },
      { number: 3, direction: 'across', clue: 'Small green sour citrus fruit', answer: 'LIME', row: 2, col: 2 },
      { number: 4, direction: 'across', clue: 'A sweet tropical orange fruit', answer: 'MANGO', row: 3, col: 0 },
      { number: 1, direction: 'down', clue: 'A round purple fruit', answer: 'PLUM', row: 0, col: 0 },
    ],
  },
  // Puzzle 17 — Home
  {
    id: 17,
    grid: [
      ['D','O','O','R','S'],
      ['#','#','#','O','#'],
      ['B','E','D','O','F'],
      ['#','#','#','M','A'],
      ['L','A','M','P','N'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'You open these to go inside', answer: 'DOORS', row: 0, col: 0 },
      { number: 3, direction: 'across', clue: 'Where you sleep at night', answer: 'BED', row: 2, col: 0 },
      { number: 4, direction: 'across', clue: 'Gives you light on your desk', answer: 'LAMP', row: 4, col: 0 },
      { number: 2, direction: 'down', clue: 'Your bedroom or living ___', answer: 'ROOM', row: 0, col: 3 },
      { number: 5, direction: 'down', clue: 'A thing that blows cool air', answer: 'FAN', row: 2, col: 4 },
    ],
  },
  // Puzzle 18 — Music
  {
    id: 18,
    grid: [
      ['D','R','U','M','S'],
      ['#','#','#','#','O'],
      ['B','E','A','T','N'],
      ['#','#','#','U','G'],
      ['S','I','N','G','S'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'You bang these with sticks', answer: 'DRUMS', row: 0, col: 0 },
      { number: 3, direction: 'across', clue: 'The rhythm of a song', answer: 'BEAT', row: 2, col: 0 },
      { number: 4, direction: 'across', clue: 'Makes music with your voice', answer: 'SINGS', row: 4, col: 0 },
      { number: 2, direction: 'down', clue: 'A type of music', answer: 'SONG', row: 0, col: 4 },
      { number: 3, direction: 'down', clue: 'A guitar has strings to ___', answer: 'TUNE', row: 2, col: 3 },
    ],
  },
  // Puzzle 19 — Dinosaurs
  {
    id: 19,
    grid: [
      ['B','O','N','E','S'],
      ['I','#','#','#','#'],
      ['G','#','D','I','G'],
      ['#','J','A','W','S'],
      ['#','#','#','#','#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Dinosaur fossils are made of these', answer: 'BONES', row: 0, col: 0 },
      { number: 3, direction: 'across', clue: 'What you do to find fossils', answer: 'DIG', row: 2, col: 2 },
      { number: 4, direction: 'across', clue: 'A T-Rex had big ___', answer: 'JAWS', row: 3, col: 1 },
      { number: 1, direction: 'down', clue: 'Really really large', answer: 'BIG', row: 0, col: 0 },
    ],
  },
  // Puzzle 20 — Pets
  {
    id: 20,
    grid: [
      ['#','D','O','G','S'],
      ['C','A','#','#','#'],
      ['A','T','#','#','#'],
      ['G','#','B','I','R','D'],
      ['E','G','G','S','#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Man\'s best friend', answer: 'DOGS', row: 0, col: 1 },
      { number: 3, direction: 'across', clue: 'A pet that flies and sings', answer: 'BIRD', row: 3, col: 2 },
      { number: 4, direction: 'across', clue: 'Chickens lay these', answer: 'EGGS', row: 4, col: 0 },
      { number: 2, direction: 'down', clue: 'A pet you keep in a ___', answer: 'CAGE', row: 1, col: 0 },
      { number: 1, direction: 'down', clue: 'Your pet cat sits on your ___', answer: 'DAT', row: 0, col: 1 },
    ],
  },
  // Puzzle 21 — Numbers
  {
    id: 21,
    grid: [
      ['F','O','U','R','#'],
      ['I','N','E','#','#'],
      ['V','#','#','#','#'],
      ['E','I','G','H','T'],
      ['#','#','#','#','W'],
      ['#','#','#','#','O'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'The number after three', answer: 'FOUR', row: 0, col: 0 },
      { number: 3, direction: 'across', clue: 'The number after seven', answer: 'EIGHT', row: 3, col: 0 },
      { number: 1, direction: 'down', clue: 'The number of fingers on one hand', answer: 'FIVE', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'A single item', answer: 'ONE', row: 0, col: 1 },
      { number: 4, direction: 'down', clue: 'One plus one', answer: 'TWO', row: 3, col: 4 },
    ],
  },
  // Puzzle 22 — Feelings
  {
    id: 22,
    grid: [
      ['H','A','P','P','Y'],
      ['#','#','#','#','#'],
      ['#','S','A','D','#'],
      ['#','#','#','#','#'],
      ['M','A','D','#','#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'When you smile a lot', answer: 'HAPPY', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'When you feel like crying', answer: 'SAD', row: 2, col: 1 },
      { number: 3, direction: 'across', clue: 'When you feel angry', answer: 'MAD', row: 4, col: 0 },
    ],
  },
  // Puzzle 23 — Tools
  {
    id: 23,
    grid: [
      ['S','A','W','#','#'],
      ['#','#','#','#','#'],
      ['N','A','I','L','S'],
      ['#','#','#','#','#'],
      ['H','A','M','M','#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Cuts wood back and forth', answer: 'SAW', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Pointy metal pieces you hammer in', answer: 'NAILS', row: 2, col: 0 },
      { number: 3, direction: 'across', clue: 'You bang nails with this (short)', answer: 'HAMM', row: 4, col: 0 },
    ],
  },
  // Puzzle 24 — Seasons
  {
    id: 24,
    grid: [
      ['F','A','L','L','#'],
      ['#','#','#','#','#'],
      ['#','S','N','O','W'],
      ['#','#','#','#','#'],
      ['S','U','N','#','#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Season when leaves change color', answer: 'FALL', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Cold white stuff in winter', answer: 'SNOW', row: 2, col: 1 },
      { number: 3, direction: 'across', clue: 'It shines bright in summer', answer: 'SUN', row: 4, col: 0 },
    ],
  },
  // Puzzle 25 — Garden
  {
    id: 25,
    grid: [
      ['S','E','E','D','S'],
      ['#','#','#','I','#'],
      ['D','I','R','T','#'],
      ['#','#','#','#','#'],
      ['R','O','S','E','#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Plant these to grow flowers', answer: 'SEEDS', row: 0, col: 0 },
      { number: 3, direction: 'across', clue: 'Brown stuff plants grow in', answer: 'DIRT', row: 2, col: 0 },
      { number: 4, direction: 'across', clue: 'A pretty red flower with thorns', answer: 'ROSE', row: 4, col: 0 },
      { number: 2, direction: 'down', clue: 'You use a shovel to ___', answer: 'DIG', row: 0, col: 3 },
    ],
  },
  // Puzzle 26 — Zoo
  {
    id: 26,
    grid: [
      ['L','I','O','N','S'],
      ['#','#','#','#','#'],
      ['B','E','A','R','S'],
      ['#','#','P','#','#'],
      ['#','#','E','E','L'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'King of the jungle', answer: 'LIONS', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Big furry animals that like honey', answer: 'BEARS', row: 2, col: 0 },
      { number: 3, direction: 'across', clue: 'A snake-like fish', answer: 'EEL', row: 4, col: 2 },
      { number: 2, direction: 'down', clue: 'Monkeys like to eat these', answer: 'APE', row: 2, col: 2 },
    ],
  },
  // Puzzle 27 — Farm
  {
    id: 27,
    grid: [
      ['C','O','W','S','#'],
      ['O','#','#','E','#'],
      ['R','#','H','E','N'],
      ['N','#','#','D','#'],
      ['#','P','I','G','S'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Farm animals that give milk', answer: 'COWS', row: 0, col: 0 },
      { number: 3, direction: 'across', clue: 'A girl chicken', answer: 'HEN', row: 2, col: 2 },
      { number: 4, direction: 'across', clue: 'Pink animals that say oink', answer: 'PIGS', row: 4, col: 1 },
      { number: 1, direction: 'down', clue: 'Yellow vegetable on a cob', answer: 'CORN', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Tiny things you plant', answer: 'SEED', row: 0, col: 3 },
    ],
  },
  // Puzzle 28 — Shapes
  {
    id: 28,
    grid: [
      ['C','O','N','E','#'],
      ['#','#','#','#','#'],
      ['C','U','B','E','S'],
      ['#','#','#','#','#'],
      ['L','I','N','E','S'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Ice cream sits on top of one', answer: 'CONE', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'A box shape with 6 sides', answer: 'CUBES', row: 2, col: 0 },
      { number: 3, direction: 'across', clue: 'Straight marks drawn with a ruler', answer: 'LINES', row: 4, col: 0 },
    ],
  },
  // Puzzle 29 — Camping
  {
    id: 29,
    grid: [
      ['T','E','N','T','#'],
      ['#','#','#','R','#'],
      ['F','I','R','E','#'],
      ['#','#','#','E','#'],
      ['H','I','K','E','#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'You sleep in this when camping', answer: 'TENT', row: 0, col: 0 },
      { number: 3, direction: 'across', clue: 'It keeps you warm and toasts marshmallows', answer: 'FIRE', row: 2, col: 0 },
      { number: 4, direction: 'across', clue: 'A long walk in the woods', answer: 'HIKE', row: 4, col: 0 },
      { number: 2, direction: 'down', clue: 'A big tall plant with branches', answer: 'TREE', row: 0, col: 3 },
    ],
  },
  // Puzzle 30 — Games
  {
    id: 30,
    grid: [
      ['D','I','C','E','#'],
      ['#','#','#','#','#'],
      ['W','I','N','S','#'],
      ['#','#','#','#','#'],
      ['F','U','N','#','#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'You roll these in board games', answer: 'DICE', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'What happens when you beat a game', answer: 'WINS', row: 2, col: 0 },
      { number: 3, direction: 'across', clue: 'Games are lots of ___!', answer: 'FUN', row: 4, col: 0 },
    ],
  },
];
