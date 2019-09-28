module.exports = (message, channel) => {
    let adjectives = [
        "SuperDuper",
        "Boring",
        "Sorry",
        "Hot",
        "Used",
        "Afraid",
        "Tall",
        "Large",
        "Terrible",
        "Curious",
        "Pregnant",
        "Useful",
        "Decent",
        "Asleep",
        "Cultural",
        "Exciting",
        "Healthy",
        "Logical",
        "Popular",
        "Unhappy",
        "Known",
        "Critical",
        "Ugly",
        "Legal",
        "Powerful",
        "Hungry",
        "Angry",
        "Aware",
        "Scared",
        "Tiny",
        "Wooden",
        "Informal",
        "Happy",
        "Strict",
        "Obvious",
        "Federal",
        "Nice",
        "Every",
        "Relevant",
        "Friendly",
        "Distinct",
        "Unlikely",
        "Odd",
        "Weak",
        "Suitable",
        "Severe",
        "Capable",
        "Unfair",
        "Lonely",
        "Entire",
        "Similar",
        "Obscure",
        "Redundant",
        "Intelligent",
        "Yellow",
        "Sinister",
        "Spectacular",
        "Mint",
        "Fuzzy",
        "Squishy",
        "Corrupted",
        "Super",
        "Sharp",
        "Junior",
        "Riveting",
        "Perfect",
        "EX",
        "Supreme",
        "Dark",
        "Colorful",
        "Flimsy",
        "Silly",
        "Shin",
        "Denjin",
        "Surprising",
        "Optimal",
        "Suboptimal",
        "Ultra",
        "Powerful",
        "Cowardly",
        "Hairy",
        "Rage",
        "Vegan",
        "Epic",
        "Turbo",
        "Undead",
        "Chill",
        "True",
        "Moody",
        "Frozen",
        "Flawless",
        "Pointless"
    ];
    let nouns = [
        "Saiyan",
        "Turtle",
        "Ranger",
        "Whip",
        "Slayer",
        "Vampire",
        "Zombie",
        "Skeleton",
        "Zerg",
        "Terran",
        "Protoss",
        "Spark",
        "Steel",
        "Rage",
        "Connection",
        "Radiator",
        "Alien",
        "Dog",
        "Cat",
        "Setup",
        "Shoryuken",
        "Fireball",
        "Fist",
        "Force",
        "Star",
        "Bug",
        "Beard",
        "Moustache",
        "Junior",
        "Planet",
        "Mist",
        "Wolf",
        "Bat",
        "Armor",
        "Axe",
        "Sword",
        "Boss",
        "Seed",
        "Alien",
        "Cable",
        "Soup",
        "Poem",
        "Cheek",
        "Girl",
        "Fortune",
        "Drawing",
        "Grocery",
        "Airport",
        "Election",
        "Leader",
        "Setting",
        "Security",
        "Office",
        "Agency",
        "User",
        "Resource",
        "Policy",
        "Love",
        "Extent",
        "Week",
        "Employee",
        "Climate",
        "Unit",
        "Union",
        "Person",
        "Painting",
        "Analysis",
        "Night",
        "City",
        "Church",
        "Surgery",
        "Police",
        "Finding",
        "Member",
        "Patience",
        "Computer",
        "Movie",
        "Argument",
        "Virus",
        "Courage",
        "Debt",
        "Engine",
        "Tooth",
        "Wife",
        "Employer",
        "Gate",
        "Accident",
        "Warning",
        "Dinner",
        "Avocado",
        "Banana",
        "Cherry",
        "Celery",
        "Proton",
        "Neutron",
        "Apple",
        "Button",
        "Monitor",
        "Controller",
        "Potential"
    ];

    let adjective = adjectives[Math.floor(Math.random() * Math.floor(adjectives.length - 1))];
    let noun = nouns[Math.floor(Math.random() * Math.floor(nouns.length - 1))];
    let number = Math.floor(Math.random() * Math.floor(99));

    let seed = 'https://sotn.io/?' + adjective + noun + number;

    if (channel) {
        channel.send(seed).then().catch(console.error);
    }
    if (message) {
        message.delete().then().catch(console.error);
    }
    return seed;
};