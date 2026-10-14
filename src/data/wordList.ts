/**
 * Bulls and Cows 4-letter English Isograms
 * (Words with 4 distinct, non-repeated letters)
 */

export const SECRET_WORDS: string[] = [
  'ACRE', 'ARCH', 'ARMY', 'ATOM', 'AUNT', 'AUTO', 'BAIL', 'BAKE', 'BALD', 'BARE',
  'BARK', 'BARN', 'BEAK', 'BEAM', 'BEAN', 'BEAR', 'BEAT', 'BELT', 'BEND', 'BIRD',
  'BITE', 'BLOW', 'BLUE', 'BOAT', 'BOIL', 'BOLD', 'BOLT', 'BOND', 'BONE', 'BOWL',
  'BULK', 'BURN', 'BURY', 'BUSH', 'BUSY', 'CAGE', 'CAKE', 'CALM', 'CAMP', 'CAPE',
  'CARD', 'CARE', 'CART', 'CAVE', 'CHIN', 'CHIP', 'CLAP', 'CLAW', 'CLAY', 'CLIP',
  'CLUB', 'COAL', 'COAT', 'COLD', 'CORN', 'CRAB', 'CURE', 'CURL', 'DARK', 'DART',
  'DATE', 'DAWN', 'DEAF', 'DEAL', 'DECK', 'DESK', 'DIAL', 'DIRT', 'DISK', 'DOCK',
  'DOME', 'DOVE', 'DOWN', 'DRAW', 'DRUM', 'DUCK', 'DUST', 'DUTY', 'EARL', 'EARN',
  'ECHO', 'ENVY', 'FAIL', 'FAIR', 'FAME', 'FARM', 'FAST', 'FATE', 'FAWN', 'FEAR',
  'FILE', 'FILM', 'FIND', 'FINE', 'FIRE', 'FIRM', 'FISH', 'FIST', 'FLAG', 'FLAT',
  'FLAW', 'FLOW', 'FOAM', 'FOIL', 'FOLD', 'FOLK', 'FOND', 'FORK', 'FORM', 'FORT',
  'FOUL', 'FROG', 'FUEL', 'GAIN', 'GAME', 'GATE', 'GEAR', 'GIFT', 'GIRL', 'GLAD',
  'GLOW', 'GOAT', 'GOLD', 'GOLF', 'GOWN', 'GRID', 'GRIN', 'GRIP', 'GROW', 'GULF',
  'HALT', 'HARE', 'HARM', 'HATE', 'HAWK', 'HEAP', 'HEAR', 'HEAT', 'HELM', 'HERB',
  'HERO', 'HIDE', 'HINT', 'HOLD', 'HOLE', 'HOLY', 'HOPE', 'HORN', 'HOSE', 'HOST',
  'HUGE', 'HURT', 'HYMN', 'ICON', 'IDLE', 'IRON', 'ISLE', 'ITCH', 'ITEM', 'JADE',
  'JAIL', 'JOKE', 'JOLT', 'JUMP', 'JURY', 'JUST', 'KEPT', 'KIND', 'KING', 'KITE',
  'KNOB', 'KNOT', 'LACE', 'LACK', 'LAID', 'LAKE', 'LAMB', 'LAMP', 'LAND', 'LANE',
  'LARK', 'LAST', 'LATE', 'LEAF', 'LEAP', 'LEFT', 'LEND', 'LENS', 'LIFT', 'LIME',
  'LIMP', 'LINE', 'LION', 'LIPS', 'LOAD', 'LOAF', 'LOAN', 'LOCK', 'LONG', 'LORD',
  'LOSE', 'LOST', 'LOUD', 'LUCK', 'LUMP', 'LUNG', 'LUSH', 'MACK', 'MADE', 'MAID',
  'MAIL', 'MAIN', 'MAKE', 'MALE', 'MANY', 'MARK', 'MASK', 'MATE', 'MAZE', 'MEAL',
  'MEAN', 'MELT', 'MEND', 'MILD', 'MILK', 'MIND', 'MINE', 'MINT', 'MIST', 'MOAN',
  'MOLD', 'MOLE', 'MONK', 'MOON', 'MOST', 'MOTH', 'MOVE', 'MULE', 'MUSE', 'MUST',
  'MUTE', 'NAIL', 'NAME', 'NAVY', 'NEAR', 'NEAT', 'NECK', 'NEST', 'NEWS', 'NEXT',
  'NICE', 'NIGHT', 'NODE', 'NOSE', 'NOTE', 'NUMB', 'NUTS', 'OAKY', 'OARS', 'OATS',
  'OILY', 'ONES', 'ONLY', 'OPAL', 'OPEN', 'ORAL', 'OVAL', 'OVEN', 'OVER', 'PACK',
  'PAGE', 'PAID', 'PAIL', 'PAIN', 'PAIR', 'PALE', 'PALM', 'PANT', 'PARK', 'PART',
  'PAST', 'PATH', 'PEAK', 'PEAR', 'PEST', 'PICK', 'PIKE', 'PILE', 'PINE', 'PINK',
  'PINT', 'PIPE', 'PITY', 'PLAN', 'PLAT', 'PLAY', 'PLEA', 'PLOT', 'PLUG', 'PLUM',
  'POEM', 'POET', 'POKE', 'POLE', 'POND', 'PONY', 'POUR', 'PRAY', 'PULL', 'PUMA',
  'PUMP', 'PURE', 'PUSH', 'QUIZ', 'RACE', 'RACK', 'RAGE', 'RAID', 'RAIL', 'RAIN',
  'RAKE', 'RAMP', 'RANG', 'RANK', 'RARE', 'RASH', 'RATE', 'RAVE', 'READ', 'REAL',
  'REAP', 'RENT', 'REST', 'RICE', 'RICH', 'RIDE', 'RING', 'RINK', 'RIPE', 'RISE',
  'RISK', 'ROAD', 'ROAM', 'ROBE', 'ROCK', 'RODE', 'ROLE', 'ROOF', 'ROPE', 'ROSE',
  'RUBY', 'RUIN', 'RULE', 'RUSH', 'RUST', 'SAFE', 'SAGE', 'SAIL', 'SALT', 'SAME',
  'SAND', 'SAVE', 'SCAN', 'SCAR', 'SEAT', 'SHED', 'SHIP', 'SHOE', 'SHOP', 'SHOT',
  'SHOW', 'SHUT', 'SICK', 'SIDE', 'SIGN', 'SILK', 'SILO', 'SINK', 'SITE', 'SKIN',
  'SKIP', 'SLAM', 'SLAP', 'SLID', 'SLIM', 'SLIP', 'SLOT', 'SLOW', 'SLUG', 'SNAP',
  'SNOW', 'SOAP', 'SOAR', 'SOCK', 'SOFA', 'SOIL', 'SOLD', 'SOLE', 'SOME', 'SONG',
  'SOUP', 'SOUR', 'SPAM', 'SPAN', 'SPAR', 'SPIT', 'SPOT', 'SPUR', 'STAR', 'STEM',
  'STEP', 'STEW', 'STIR', 'STOP', 'SUCH', 'SUIT', 'SURE', 'SURF', 'SWAM', 'SWAN',
  'SWAP', 'SWIM', 'TACK', 'TAIL', 'TAKE', 'TALE', 'TALK', 'TANK', 'TAPE', 'TASK',
  'TEAL', 'TEAM', 'TEAR', 'TERM', 'THIN', 'TIDE', 'TIDY', 'TIED', 'TILE', 'TIME',
  'TINY', 'TOAD', 'TOIL', 'TONE', 'TORE', 'TORN', 'TOUR', 'TRAP', 'TRAY', 'TRIP',
  'TRUE', 'TUBE', 'TUNE', 'TURF', 'TURN', 'TWIG', 'TWIN', 'TYPE', 'UGLY', 'UNIT',
  'UPON', 'URGE', 'USED', 'USER', 'VAIN', 'VALE', 'VAMP', 'VANE', 'VASE', 'VAST',
  'VEIL', 'VEIN', 'VENT', 'VERB', 'VERY', 'VEST', 'VIBE', 'VICE', 'VIEW', 'VINE',
  'VOID', 'VOLT', 'VOTE', 'WADE', 'WAGE', 'WAIL', 'WAIT', 'WAKE', 'WALK', 'WAND',
  'WANT', 'WARD', 'WARM', 'WARN', 'WASP', 'WAVE', 'WEAK', 'WEAR', 'WEST', 'WHIP',
  'WIDE', 'WIFE', 'WILD', 'WIND', 'WINE', 'WING', 'WIPE', 'WIRE', 'WISE', 'WISH',
  'WITH', 'WOLF', 'WOMB', 'WORD', 'WORE', 'WORK', 'WORM', 'WRAP', 'YARD', 'YARN',
  'YEAR', 'YOGA', 'YOKE', 'ZEAL', 'ZERO', 'ZEST', 'ZINC', 'ZONE'
];

// Expanded lookup dictionary of valid 4-letter isograms for user guesses
const ADDITIONAL_VALID_ISOGRAMS: string[] = [
  'ABLY', 'ACID', 'ACME', 'AFAR', 'AGED', 'AHEM', 'AIDE', 'AIMS', 'AIRS', 'AIRY',
  'AJAR', 'AKIN', 'ALIT', 'ALMS', 'ALSO', 'AMEN', 'AMID', 'AMOK', 'AMPS', 'AMUR',
  'ANTE', 'ANTI', 'APEX', 'APSE', 'ARCS', 'ARIA', 'AVID', 'AWLS', 'AXES', 'AXIS',
  'AXLE', 'BADE', 'BAGS', 'BAIT', 'BALE', 'BANG', 'BANS', 'BARD', 'BATE', 'BATH',
  'BATS', 'BAWD', 'BEAD', 'BEGS', 'BENT', 'BERG', 'BETA', 'BETS', 'BEVY', 'BIAS',
  'BIDE', 'BIDS', 'BIER', 'BIKE', 'BILE', 'BINS', 'BLED', 'BLOT', 'BOGS', 'BOLA',
  'BONY', 'BOPS', 'BOSH', 'BOTE', 'BOWL', 'BOYS', 'BRAD', 'BRAG', 'BRAN', 'BRAT',
  'BRAY', 'BRED', 'BREW', 'BRIG', 'BRIM', 'BROG', 'BROU', 'BUCK', 'BUDS', 'BUGS',
  'BUNG', 'BUNK', 'BUNS', 'BUNT', 'BUOY', 'BURG', 'BURL', 'BURP', 'BUST', 'BUZZ',
  'BYRE', 'BYTE', 'CABS', 'CADS', 'CAFE', 'CAFS', 'CAGY', 'CALF', 'CALX', 'CAMS',
  'CANS', 'CANT', 'CAPS', 'CARB', 'CARP', 'CARS', 'CAST', 'CATS', 'CAUL', 'CHAD',
  'CHAM', 'CHAP', 'CHAR', 'CHAT', 'CHEF', 'CHID', 'CHIT', 'CHOP', 'CHUM', 'CINE',
  'CION', 'CIST', 'CITE', 'CLAN', 'CLEF', 'CLOD', 'CLOG', 'CLOT', 'CLUE', 'COAX',
  'COBS', 'CODS', 'COED', 'COGS', 'COIF', 'COIL', 'COIN', 'COIR', 'COLA', 'COLS',
  'COLT', 'CONE', 'CONK', 'CONS', 'CONY', 'COPS', 'CORD', 'CORE', 'COVE', 'COWL',
  'COWS', 'COZY', 'CRAM', 'CRAP', 'CRAW', 'CREW', 'CRIB', 'CROP', 'CROW', 'CRUD',
  'CRUX', 'CUBS', 'CUED', 'CUES', 'CUFF', 'CULM', 'CUPS', 'CURB', 'CURD', 'CURS',
  'CURT', 'CUSP', 'CUTE', 'CUTS', 'CYAN', 'CYST', 'CZAR', 'DABS', 'DACE', 'DAIS',
  'DALE', 'DAME', 'DAMP', 'DAMS', 'DANK', 'DASH', 'DAUB', 'DAWS', 'DAZE', 'DAYS',
  'DEAN', 'DEAR', 'DEBT', 'DECO', 'DECO', 'DEFI', 'DEFT', 'DEFY', 'DELI', 'DELS',
  'DELT', 'DEMO', 'DENS', 'DENT', 'DENY', 'DEUX', 'DIAM', 'DICE', 'DIES', 'DIET',
  'DIGS', 'DIKE', 'DIME', 'DIMS', 'DINE', 'DING', 'DINT', 'DIPS', 'DIRE', 'DISC',
  'DISH', 'DIVA', 'DIVE', 'DOCS', 'DOER', 'DOES', 'DOGS', 'DOLE', 'DOLT', 'DONS',
  'DORK', 'DORM', 'DORY', 'DOSE', 'DOTE', 'DOTS', 'DOUR', 'DOWN', 'DOZE', 'DRAB',
  'DRAG', 'DRAY', 'DREG', 'DREW', 'DRIP', 'DROP', 'DRUB', 'DRUG', 'DUAL', 'DUCE',
  'DUCS', 'DUEL', 'DUES', 'DUET', 'DUGS', 'DUKE', 'DULL', 'DULY', 'DUMP', 'DUNE',
  'DUNG', 'DUNK', 'DUNS', 'DUOS', 'DUPE', 'DURN', 'DUSK', 'DYER', 'DYES', 'DYKE',
  'EASY', 'EATS', 'ECHT', 'EDGY', 'EDIT', 'EGOS', 'ELAN', 'ELMS', 'ELKS', 'EMIR',
  'EMUS', 'ENDS', 'EPIC', 'ETCH', 'EUROS', 'EXAM', 'EXEC', 'EXPO', 'EYAS', 'FACT',
  'FADE', 'FADS', 'FAIN', 'FAKE', 'FANG', 'FANO', 'FANS', 'FARD', 'FARE', 'FART',
  'FATS', 'FAUX', 'FAWN', 'FAZE', 'FEAT', 'FEDS', 'FEED', 'FEEL', 'FEET', 'FELL',
  'FELT', 'FEND', 'FERN', 'FEST', 'FETA', 'FEUD', 'FIAT', 'FIBS', 'FIGS', 'FLAK',
  'FLAN', 'FLAP', 'FLEA', 'FLED', 'FLEE', 'FLEX', 'FLIC', 'FLIP', 'FLIT', 'FLOE',
  'FLOG', 'FLOP', 'FLUB', 'FLUE', 'FLUX', 'FOAL', 'FOCI', 'FOES', 'FOGS', 'FOGY',
  'FORD', 'FORE', 'FORK', 'FORT', 'FOWL', 'FOXY', 'FRAU', 'FRAY', 'FRED', 'FRET',
  'FROZ', 'FRUG', 'FUME', 'FUMY', 'FUNK', 'FURL', 'FURS', 'FURY', 'FUSE', 'FUSY',
  'FUTZ', 'FUZE', 'GABS', 'GAEL', 'GAFF', 'GAGE', 'GAGS', 'GALA', 'GALE', 'GALL',
  'GALS', 'GAMY', 'GANG', 'GAOL', 'GAPE', 'GAPS', 'GARB', 'GARS', 'GASH', 'GASP',
  'GAUD', 'GAUN', 'GAUR', 'GAVE', 'GAWK', 'GAWP', 'GAYS', 'GAZE', 'GEAN', 'GECK',
  'GEDS', 'GEED', 'GEEK', 'GEEP', 'GEES', 'GEEZ', 'GELD', 'GELS', 'GELT', 'GENA',
  'GENE', 'GENS', 'GENT', 'GENU', 'GERM', 'GETS', 'GEUM', 'GHAT', 'GHEE', 'GIBE',
  'GIBS', 'GIDS', 'GIED', 'GIEN', 'GIES', 'GIFT', 'GIGA', 'GIGS', 'GILA', 'GILD',
  'GILL', 'GILT', 'GIMP', 'GINK', 'GINS', 'GIRD', 'GIRL', 'GIRN', 'GIRO', 'GIRT',
  'GIST', 'GITE', 'GITS', 'GIVE', 'GIZM', 'GJUS', 'GLAD', 'GLAM', 'GLED', 'GLEE',
  'GLEN', 'GLEY', 'GLIA', 'GLIB', 'GLIM', 'GLOB', 'GLOM', 'GLOP', 'GLOW', 'GLUE',
  'GLUG', 'GLUM', 'GLUT', 'GNAR', 'GNAT', 'GNAW', 'GNUS', 'GOAD', 'GOAL', 'GOAS',
  'GOAT', 'GOBI', 'GOBO', 'GOBS', 'GOBY', 'GODS', 'GOEL', 'GOER', 'GOES', 'GOEY',
  'GOFF', 'GOGO', 'GOLD', 'GOLE', 'GOLF', 'GOLP', 'GONE', 'GONG', 'GONK', 'GOOD',
  'GOOF', 'GOOG', 'GOON', 'GOOP', 'GOOR', 'GOOS', 'GORE', 'GORI', 'GORM', 'GORP',
  'GORY', 'GOSH', 'GOTH', 'GOUT', 'GOWD', 'GOWK', 'GOWL', 'GOWN', 'GRAB', 'GRAD',
  'GRAM', 'GRAN', 'GRAT', 'GRAY', 'GREW', 'GREY', 'GRID', 'GRIG', 'GRIM', 'GRIN',
  'GRIP', 'GRIS', 'GRIT', 'GROG', 'GROT', 'GROW', 'GRUB', 'GRUE', 'GRUM', 'GUAN',
  'GUAR', 'GUCK', 'GUDE', 'GUES', 'GUFF', 'GUGA', 'GUID', 'GULA', 'GULE', 'GULF',
  'GULL', 'GULP', 'GULY', 'GUMP', 'GUMS', 'GUNG', 'GUNK', 'GUNS', 'GUPP', 'GURG',
  'GURL', 'GURN', 'GURR', 'GURS', 'GURU', 'GUSH', 'GUST', 'GUTS', 'GUVS', 'GUYS',
  'GYBE', 'GYMP', 'GYMS', 'GYNO', 'GYNY', 'GYPO', 'GYPS', 'GYRE', 'GYRI', 'GYRO',
  'GYVE', 'HACK', 'HADE', 'HADJ', 'HAED', 'HAEM', 'HAEN', 'HAES', 'HAET', 'HAFF',
  'HAFT', 'HAGS', 'HAHA', 'HAHS', 'HAIK', 'HAIL', 'HAIN', 'HAIR', 'HAJI', 'HAJJ',
  'HAKA', 'HAKE', 'HAKU', 'HALE', 'HALF', 'HALL', 'HALM', 'HALO', 'HALT', 'HAME',
  'HAMS', 'HAND', 'HANG', 'HANK', 'HANT', 'HAPS', 'HARD', 'HARE', 'HARK', 'HARL',
  'HARM', 'HARN', 'HARO', 'HARP', 'HART', 'HASH', 'HASK', 'HASP', 'HAST', 'HATE',
  'HATH', 'HATS', 'HAUD', 'HAUF', 'HAUL', 'HAUN', 'HAUT', 'HAVE', 'HAVO', 'HAWK',
  'HAWM', 'HAWS', 'HAYS', 'HAZE', 'HAZY', 'HEAD', 'HEAL', 'HEAP', 'HEAR', 'HEAT',
  'HECK', 'HEED', 'HEEL', 'HEFT', 'HEID', 'HEIL', 'HEIR', 'HELD', 'HELE', 'HELL',
  'HELM', 'HELP', 'HEME', 'HEMP', 'HEMS', 'HEND', 'HENS', 'HENT', 'HEPS', 'HERB',
  'HERD', 'HERE', 'HERL', 'HERM', 'HERN', 'HERO', 'HERS', 'HERY', 'HESP', 'HEST',
  'HETE', 'HETS', 'HEWN', 'HEWS', 'HEYS', 'HICK', 'HIDE', 'HIED', 'HIES', 'HIGH',
  'HIKE', 'HILA', 'HILI', 'HILL', 'HILT', 'HIMS', 'HIND', 'HING', 'HINK', 'HINS',
  'HINT', 'HIOI', 'HIPS', 'HIRE', 'HISH', 'HISN', 'HISS', 'HIST', 'HITS', 'HIVE',
  'HIYA', 'HIZZ', 'HOAR', 'HOAS', 'HOAX', 'HOBO', 'HOBS', 'HOCK', 'HODS', 'HOED',
  'HOER', 'HOES', 'HOGG', 'HOGH', 'HOGS', 'HOHA', 'HOHS', 'HOIK', 'HOKA', 'HOKE',
  'HOKI', 'HOLD', 'HOLE', 'HOLK', 'HOLM', 'HOLP', 'HOLS', 'HOLT', 'HOLY', 'HOMA',
  'HOME', 'HOMO', 'HOMS', 'HOMY', 'HOND', 'HONE', 'HONG', 'HONK', 'HONS', 'HOOD',
  'HOOF', 'HOOK', 'HOON', 'HOOP', 'HOOT', 'HOPE', 'HOPS', 'HORA', 'HORE', 'HORI',
  'HORN', 'HORS', 'HOSE', 'HOSS', 'HOST', 'HOTE', 'HOTS', 'HOUF', 'HOUR', 'HOUT',
  'HOVE', 'HOWE', 'HOWF', 'HOWK', 'HOWL', 'HOWS', 'HOYA', 'HOYS', 'HUBS', 'HUCK',
  'HUED', 'HUER', 'HUES', 'HUFF', 'HUGE', 'HUGS', 'HUGY', 'HUIA', 'HUIC', 'HUIS',
  'HULA', 'HULE', 'HULK', 'HULL', 'HUMP', 'HUMS', 'HUNG', 'HUNH', 'HUNK', 'HUNS',
  'HUNT', 'HURA', 'HURL', 'HURR', 'HURT', 'HUSH', 'HUSK', 'HUSO', 'HUSS', 'HUTS',
  'HWYL', 'HYED', 'HYEN', 'HYER', 'HYES', 'HYKE', 'HYLA', 'HYLE', 'HYMN', 'HYPE',
  'HYPO', 'HYPS', 'HYTE', 'IAMB', 'IBEX', 'IBIS', 'ICED', 'ICES', 'ICHS', 'ICON',
  'IDEA', 'IDEM', 'IDES', 'IDLE', 'IDLY', 'IDOL', 'IDYL', 'IFFY', 'IGLU', 'IKAN',
  'IKAT', 'IKON', 'ILEA', 'ILEX', 'ILIA', 'ILKA', 'ILKS', 'ILLS', 'ILLY', 'IMAM',
  'IMID', 'IMMY', 'IMPI', 'IMPS', 'INBY', 'INCH', 'INCL', 'INDO', 'INFO', 'INGA',
  'INIA', 'INKS', 'INKY', 'INLY', 'INNS', 'INRO', 'INTI', 'INTO', 'IONS', 'IOTA',
  'IRED', 'IRES', 'IRIS', 'IRKS', 'IRON', 'ISBA', 'ISIT', 'ISLE', 'ISMS', 'ISNA',
  'ISOS', 'ITCH', 'ITEM', 'ITER', 'IXIA', 'IXNA', 'JACK', 'JADE', 'JAGG', 'JAGS',
  'JAIL', 'JAKE', 'JAKS', 'JAMB', 'JAMS', 'JANE', 'JANN', 'JAPE', 'JAPS', 'JARK',
  'JARL', 'JARS', 'JASP', 'JASS', 'JASY', 'JATO', 'JAUK', 'JAUP', 'JAVA', 'JAWS',
  'JAXY', 'JAYS', 'JAZZ', 'JEAN', 'JEAT', 'JEDO', 'JEED', 'JEEL', 'JEEP', 'JEER',
  'JEES', 'JEEZ', 'JEFE', 'JEFF', 'JEHU', 'JELL', 'JEON', 'JERK', 'JERU', 'JESS',
  'JEST', 'JETE', 'JETS', 'JEUX', 'JEWS', 'JIAO', 'JIBB', 'JIBE', 'JIBS', 'JICE',
  'JIFF', 'JIGS', 'JILL', 'JILT', 'JIMP', 'JINK', 'JINN', 'JINS', 'JINX', 'JIRD',
  'JISM', 'JIVE', 'JIVY', 'JIZZ', 'JOBS', 'JOCK', 'JOCO', 'JOES', 'JOEY', 'JOGS',
  'JOHN', 'JOIN', 'JOKE', 'JOKY', 'JOLE', 'JOLL', 'JOLS', 'JOLT', 'JOMO', 'JONG',
  'JOOK', 'JORP', 'JOSH', 'JOSS', 'JOTA', 'JOTS', 'JOUK', 'JOWL', 'JOWS', 'JOYS',
  'JUBA', 'JUBE', 'JUCO', 'JUDO', 'JUDS', 'JUDY', 'JUGA', 'JUGS', 'JUJU', 'JUKE',
  'JUKU', 'JUMP', 'JUNK', 'JUPE', 'JURA', 'JURE', 'JURY', 'JUST', 'JUTE', 'JUTS',
  'JUVE', 'JUXT', 'KABS', 'KADI', 'KAFS', 'KAGU', 'KAIA', 'KAIF', 'KAIK', 'KAIL',
  'KAIM', 'KAIN', 'KAIS', 'KAKA', 'KAKI', 'KALE', 'KALI', 'KAMA', 'KAME', 'KAMI',
  'KANA', 'KANE', 'KANG', 'KANS', 'KANT', 'KAON', 'KAPA', 'KAPH', 'KARA', 'KARK',
  'KARN', 'KARO', 'KART', 'KATA', 'KATI', 'KATS', 'KAVA', 'KAWS', 'KAYO', 'KAYS',
  'KAZI', 'KBAR', 'KEAS', 'KEBO', 'KECK', 'KEDS', 'KEEF', 'KEEK', 'KEEL', 'KEEN',
  'KEEP', 'KEET', 'KEFS', 'KEGS', 'KEIR', 'KELE', 'KELP', 'KELT', 'KEMB', 'KEMP',
  'KENO', 'KENS', 'KENT', 'KEPI', 'KEPS', 'KEPT', 'KERB', 'KERF', 'KERN', 'KERO',
  'KESI', 'KEST', 'KETA', 'KETE', 'KETO', 'KHAF', 'KHAN', 'KHAT', 'KHED', 'KHIS',
  'KIBE', 'KIBI', 'KICK', 'KIDS', 'KIEF', 'KIER', 'KIEV', 'KIFS', 'KIKE', 'KILD',
  'KILL', 'KILN', 'KILO', 'KILP', 'KILT', 'KINA', 'KIND', 'KINE', 'KING', 'KINK',
  'KINO', 'KINS', 'KIPE', 'KIPS', 'KIRK', 'KIRN', 'KIRS', 'KISH', 'KISS', 'KIST',
  'KITE', 'KITH', 'KITS', 'KIVA', 'KIWI', 'KLAP', 'KLIK', 'KLOP', 'KNAG', 'KNAP',
  'KNAR', 'KNEE', 'KNEW', 'KNIT', 'KNOB', 'KNOP', 'KNOT', 'KNOW', 'KNUB', 'KNUR',
  'KOAN', 'KOAS', 'KOBO', 'KOBS', 'KOEL', 'KOFF', 'KOHA', 'KOHL', 'KOIS', 'KOJI',
  'KOKA', 'KOLA', 'KOLO', 'KOND', 'KONK', 'KOOK', 'KOPH', 'KOPS', 'KORA', 'KORE',
  'KORO', 'KORS', 'KORU', 'KOSS', 'KOTO', 'KRAI', 'KRAY', 'KRIS', 'KSAR', 'KUDU',
  'KUEH', 'KUES', 'KUFI', 'KUIA', 'KUKU', 'KULA', 'KULI', 'KUNA', 'KUNE', 'KURI',
  'KURU', 'KUTA', 'KUTU', 'KUZU', 'KYAK', 'KYAR', 'KYAT', 'KYBO', 'KYLE', 'KYND',
  'KYNE', 'KYPE', 'KYTE', 'LABS', 'LACE', 'LACK', 'LACS', 'LACY', 'LADE', 'LADS',
  'LADY', 'LAER', 'LAGS', 'LAHR', 'LAIC', 'LAID', 'LAIK', 'LAIN', 'LAIR', 'LAKE',
  'LAKH', 'LAKY', 'LALL', 'LAMA', 'LAMB', 'LAME', 'LAMP', 'LAMS', 'LAND', 'LANE',
  'LANG', 'LANK', 'LANT', 'LAPS', 'LARD', 'LARE', 'LARI', 'LARK', 'LARN', 'LARS',
  'LASH', 'LASS', 'LAST', 'LATE', 'LATH', 'LATI', 'LATS', 'LATU', 'LAUD', 'LAVA',
  'LAVE', 'LAVS', 'LAWK', 'LAWN', 'LAWS', 'LAYS', 'LAZE', 'LAZY', 'LEAD', 'LEAF',
  'LEAK', 'LEAM', 'LEAN', 'LEAP', 'LEAR', 'LEAS', 'LEAT', 'LECH', 'LEEK', 'LEEP',
  'LEER', 'LEES', 'LEET', 'LEFT', 'LEGS', 'LEHR', 'LEIR', 'LEIS', 'LEKE', 'LEKS',
  'LEKU', 'LEME', 'LEND', 'LENG', 'LENO', 'LENS', 'LENT', 'LEPS', 'LEPT', 'LERE',
  'LERP', 'LESS', 'LEST', 'LETS', 'LEUD', 'LEVA', 'LEVE', 'LEVO', 'LEVS', 'LEVY',
  'LEWD', 'LEYI', 'LEYS', 'LIAR', 'LIAS', 'LIBS', 'LICE', 'LICH', 'LICK', 'LIDO',
  'LIDS', 'LIED', 'LIEF', 'LIEN', 'LIER', 'LIES', 'LIEU', 'LIFE', 'LIFT', 'LIGS',
  'LIKE', 'LILL', 'LILO', 'LILT', 'LILY', 'LIMA', 'LIMB', 'LIME', 'LIMN', 'LIMO',
  'LIMP', 'LIMY', 'LINA', 'LINE', 'LING', 'LINK', 'LINN', 'LINO', 'LINS', 'LINT',
  'LINY', 'LION', 'LIPA', 'LIPE', 'LIPO', 'LIPS', 'LIRA', 'LIRE', 'LIRI', 'LISK',
  'LISP', 'LIST', 'LITE', 'LITS', 'LITU', 'LIVE', 'LOAD', 'LOAF', 'LOAM', 'LOAN',
  'LOBE', 'LOBI', 'LOBO', 'LOBS', 'LOCH', 'LOCI', 'LOCK', 'LOCO', 'LODE', 'LOFT',
  'LOGE', 'LOGO', 'LOGS', 'LOGY', 'LOID', 'LOIN', 'LOIR', 'LOKE', 'LOLL', 'LOMA',
  'LOME', 'LONE', 'LONG', 'LOOF', 'LOOK', 'LOOM', 'LOON', 'LOOP', 'LOOR', 'LOOS',
  'LOOT', 'LOPE', 'LOPS', 'LORD', 'LORE', 'LORN', 'LORY', 'LOSE', 'LOSH', 'LOSS',
  'LOST', 'LOTA', 'LOTE', 'LOTH', 'LOTI', 'LOTO', 'LOTS', 'LOUD', 'LOUN', 'LOUP',
  'LOUR', 'LOUT', 'LOVE', 'LOWE', 'LOWN', 'LOWP', 'LOWS', 'LOWT', 'LOYS', 'LUAU',
  'LUBE', 'LUCE', 'LUCK', 'LUDE', 'LUDO', 'LUDS', 'LUES', 'LUFF', 'LUGE', 'LUGS',
  'LULL', 'LULU', 'LUMA', 'LUMP', 'LUMS', 'LUNA', 'LUNE', 'LUNG', 'LUNK', 'LUNT',
  'LUPR', 'LURE', 'LURK', 'LURS', 'LUSH', 'LUSK', 'LUST', 'LUTE', 'LUTZ', 'LUVS',
  'LUXE', 'LYAM', 'LYCH', 'LYES', 'LYME', 'LYMS', 'LYNE', 'LYNX', 'LYRA', 'LYRE',
  'LYSE', 'LYTE'
];

// All valid unique 4-letter words
export const ALL_VALID_WORDS_SET = new Set<string>([
  ...SECRET_WORDS,
  ...ADDITIONAL_VALID_ISOGRAMS
]);

/**
 * Checks if a string has exactly 4 characters and no duplicate letters.
 */
export function isFourLetterIsogram(word: string): { valid: boolean; reason?: string } {
  const clean = word.trim().toUpperCase();
  if (clean.length !== 4) {
    return { valid: false, reason: `Word must be exactly 4 letters (currently ${clean.length})` };
  }
  if (!/^[A-Z]{4}$/.test(clean)) {
    return { valid: false, reason: 'Word must contain letters only (A-Z)' };
  }
  const seen = new Set<string>();
  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];
    if (seen.has(ch)) {
      return { valid: false, reason: `Duplicate letter '${ch}' not allowed! All 4 letters must be unique.` };
    }
    seen.add(ch);
  }
  return { valid: true };
}

/**
 * Validates word against dictionary (or allows any isogram if strict mode is disabled)
 */
export function validateGuess(
  guess: string,
  strictDictionary: boolean = true
): { valid: boolean; reason?: string } {
  const isogramCheck = isFourLetterIsogram(guess);
  if (!isogramCheck.valid) {
    return isogramCheck;
  }
  const upper = guess.toUpperCase();
  if (strictDictionary && !ALL_VALID_WORDS_SET.has(upper)) {
    return {
      valid: false,
      reason: `'${upper}' is not in the 4-letter dictionary. Try another 4-letter word.`
    };
  }
  return { valid: true };
}

/**
 * Calculate Bulls (exact letter in exact index) and Cows (letter present in word but different index).
 */
export function calculateBullsAndCows(
  guess: string,
  secret: string
): {
  bulls: number;
  cows: number;
  details: { letter: string; status: 'bull' | 'cow' | 'miss' }[];
} {
  const g = guess.toUpperCase();
  const s = secret.toUpperCase();

  let bulls = 0;
  let cows = 0;
  const details: { letter: string; status: 'bull' | 'cow' | 'miss' }[] = [];

  for (let i = 0; i < 4; i++) {
    const gChar = g[i];
    if (gChar === s[i]) {
      bulls++;
      details.push({ letter: gChar, status: 'bull' });
    } else if (s.includes(gChar)) {
      cows++;
      details.push({ letter: gChar, status: 'cow' });
    } else {
      details.push({ letter: gChar, status: 'miss' });
    }
  }

  return { bulls, cows, details };
}

/**
 * Pick a random secret 4-letter isogram
 */
export function getRandomSecretWord(): string {
  const pool = SECRET_WORDS.filter(w => isFourLetterIsogram(w).valid);
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}
