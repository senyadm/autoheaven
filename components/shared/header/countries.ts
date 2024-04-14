export const euCountries = [
  { code: "AT", name: "Austria" },
  { code: "BE", name: "Belgium" },
  { code: "BG", name: "Bulgaria" },
  { code: "HR", name: "Croatia" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czechia" },
  { code: "DK", name: "Denmark" },
  { code: "EE", name: "Estonia" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "GR", name: "Greece" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" }, // Non-EU Schengen
  { code: "IE", name: "Ireland" },
  { code: "IT", name: "Italy" },
  { code: "LV", name: "Latvia" },
  { code: "LI", name: "Liechtenstein" }, // Non-EU Schengen
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MT", name: "Malta" },
  { code: "NL", name: "Netherlands" },
  { code: "NO", name: "Norway" }, // Non-EU Schengen
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "RO", name: "Romania" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "ES", name: "Spain" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" }, // Non-EU Schengen
  { code: "UA", name: "Ukraine" }
];
  
  export const euCountriesCities: Record<string, string[]> = {
    "AT": ["Vienna", "Graz", "Linz", "Salzburg", "Innsbruck", "Klagenfurt", "Villach", "Wels", "Sankt Pölten", "Dornbirn",    "Wiener Neustadt", "Steyr", "Feldkirch", "Bregenz", "Wolfsberg", "Baden bei Wien", "Klosterneuburg", "Leoben", "Krems an der Donau", "Traun",    "Amstetten", "Leonding", "Kapfenberg", "Mödling", "Lustenau"], // Austria
    "BE": ["Brussels", "Antwerp", "Ghent", "Bruges", "Liege", "Leuven", "Namur", "Mons", "Mechelen", "Aalst",    "La Louvière", "Kortrijk", "Hasselt", "Ostend", "Sint-Niklaas", "Tournai", "Genk", "Seraing", "Roeselare", "Verviers"], // Belgium
    "BG": ["Sofia", "Plovdiv", "Varna", "Burgas", "Ruse", "Stara Zagora", "Pleven", "Sliven", "Dobrich", "Shumen",    "Haskovo", "Pazardzhik", "Blagoevgrad", "Veliko Tarnovo", "Gabrovo", "Vratsa", "Yambol", "Pernik", "Kyustendil", "Vidin"], // Bulgaria
    "CY": [    "Nicosia", "Limassol", "Larnaca", "Paphos", "Famagusta", "Kyrenia", "Morphou", "Aradippou", "Paralimni", "Lefka"]
    , // Cyprus
    "CZ": ["Prague", "Brno", "Ostrava", "Plzen", "Liberec", "Olomouc", "Hradec Králové", "Usti nad Labem", "Pardubice", "Zlin",    "Ceske Budejovice", "Havirov", "Kladno", "Most", "Opava", "Frydek-Mistek", "Karvina", "Jihlava", "Teplice", "Decin"]
    , // Czech Republic
    "DE": [    "Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Düsseldorf", "Dortmund", "Essen", "Leipzig",    "Bremen", "Dresden", "Hanover", "Nuremberg", "Duisburg", "Bochum", "Wuppertal", "Bielefeld", "Bonn", "Münster",    "Karlsruhe", "Mannheim", "Augsburg", "Wiesbaden", "Gelsenkirchen", "Mönchengladbach", "Braunschweig", "Chemnitz", "Kiel", "Aachen",    "Halle (Saale)", "Magdeburg", "Freiburg im Breisgau", "Krefeld", "Lübeck", "Oberhausen", "Erfurt", "Rostock", "Mainz", "Kassel"],    // Germany
    "DK": [    "Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg", "Randers", "Kolding", "Horsens", "Vejle", "Roskilde",    "Helsingør", "Herning", "Silkeborg", "Næstved", "Greve Strand", "Tårnby", "Frederiksberg", "Albertslund", "Hillerød", "Slagelse",    "Holstebro", "Sønderborg", "Hjørring", "Hørsholm", "Holbæk", "Glostrup", "Ringsted", "Hvidovre", "Birkerød", "Farum",    "Nykøbing Falster", "Køge", "Viborg", "Kolding", "Elsinore", "Nørresundby", "Haderslev", "Skive", "Ringkøbing", "Stenløse"], // Denmark
    "EE": [    "Tallinn", "Tartu", "Narva", "Pärnu", "Kohtla-Järve", "Viljandi", "Rakvere", "Sillamäe", "Maardu", "Kuressaare",    "Võru", "Valga", "Haapsalu", "Jõhvi", "Keila", "Paide", "Türi", "Elva", "Saue", "Haapsalu",    "Jõgeva", "Rapla", "Põlva", "Põltsamaa", "Kiviõli", "Tapa", "Paldiski", "Narva-Jõesuu", "Kunda", "Võhma"], // Estonia
    "ES": [    "Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Málaga", "Murcia", "Palma de Mallorca", "Las Palmas de Gran Canaria", "Bilbao",    "Alicante", "Córdoba", "Valladolid", "Vigo", "Gijón", "L'Hospitalet de Llobregat", "Vitoria-Gasteiz", "La Coruña", "Granada", "Elche",    "Oviedo", "Tarragona", "Badalona", "Cartagena", "Jaén", "Sabadell", "Getafe", "Santa Cruz de Tenerife", "Móstoles", "Albacete",    "Alcalá de Henares", "Fuenlabrada", "Pamplona", "Almería", "Leganés", "Santander", "Burgos", "Castellón de la Plana", "Alcorcón", "San Cristóbal de La Laguna"], // Spain
    "FI": [    "Helsinki", "Espoo", "Tampere", "Vantaa", "Turku", "Oulu", "Lahti", "Kuopio", "Jyväskylä", "Pori",    "Lappeenranta", "Vaasa", "Kotka", "Joensuu", "Hämeenlinna", "Porvoo", "Mikkeli", "Hyvinkää", "Nurmijärvi", "Lohja",    "Rauma", "Kerava", "Kajaani", "Salo", "Rovaniemi", "Kokkola", "Järvenpää", "Tornio", "Savonlinna", "Imatra"]
    , // Finland
    "FR": [    "Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille",    "Rennes", "Reims", "Le Havre", "Cergy", "Saint-Étienne", "Toulon", "Angers", "Grenoble", "Dijon", "Nîmes",    "Aix-en-Provence", "Saint-Quentin-en-Yvelines", "Brest", "Le Mans", "Amiens", "Tours", "Limoges", "Clermont-Ferrand", "Villeurbanne", "Besançon"]
    , // France
    "GR": [    "Athens", "Thessaloniki", "Patras", "Heraklion", "Larissa", "Volos", "Ioannina", "Chania", "Serres", "Drama",    "Kavala", "Komotini", "Alexandroupoli", "Xanthi", "Lamia", "Rhodes", "Katerini", "Kozani", "Veria", "Trikala",    "Sparti", "Karditsa", "Corinth", "Agrinio", "Pyrgos", "Mytilene", "Chalkida", "Salamis", "Tripoli", "Chios"], // Greece
    "HR": [    "Zagreb", "Split", "Rijeka", "Osijek", "Zadar", "Slavonski Brod", "Pula", "Karlovac", "Sisak", "Varaždin",    "Šibenik", "Dubrovnik", "Bjelovar", "Kaštela", "Vinkovci", "Vukovar", "Požega", "Samobor", "Koprivnica", "Solin",    "Čakovec", "Virovitica", "Makarska", "Kutina", "Knin", "Slatina", "Krapina", "Metković", "Sisak", "Novi Marof"]
    , // Croatia
    "HU": [    "Budapest", "Debrecen", "Szeged", "Miskolc", "Pécs", "Győr", "Nyíregyháza", "Kecskemét", "Székesfehérvár", "Szombathely",    "Szolnok", "Tatabánya", "Kaposvár", "Érd", "Veszprém", "Békéscsaba", "Zalaegerszeg", "Sopron", "Eger", "Nagykanizsa",    "Dunaújváros", "Hódmezővásárhely", "Szekszárd", "Szeghalom", "Pápa", "Salgótarján", "Vác", "Szekszárd", "Mosonmagyaróvár", "Baja"]
    , // Hungary
    "IE": [    "Dublin", "Cork", "Limerick", "Galway", "Waterford", "Drogheda", "Dundalk", "Swords", "Bray", "Navan",    "Ennis", "Tralee", "Carlow", "Kilkenny", "Naas", "Sligo", "Greystones", "Clonmel", "Malahide", "Leixlip",    "Balbriggan", "Wexford", "Newbridge", "Maynooth", "Letterkenny", "Athlone", "Dun Laoghaire", "Shannon", "Celbridge", "Lifford"]
    , // Ireland
    "IT": [    "Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna", "Florence", "Bari", "Catania",    "Venice", "Verona", "Messina", "Padua", "Trieste", "Taranto", "Brescia", "Prato", "Modena", "Reggio Calabria",    "Reggio Emilia", "Perugia", "Livorno", "Ravenna", "Cagliari", "Foggia", "Rimini", "Salerno", "Ferrara", "Sassari",    "Pescara", "Latina", "Monza", "Ancona", "Vicenza", "Terni", "Forlì", "Novara", "Udine", "Piacenza",    "Arezzo", "Trento", "Cesena", "Lecce", "Pesaro", "Barletta", "Alessandria", "La Spezia", "Pisa", "Catanzaro"]
    , // Italy
    "LT": [    "Vilnius", "Kaunas", "Klaipėda", "Šiauliai", "Panevėžys", "Alytus", "Marijampolė", "Mažeikiai", "Jonava", "Utena",    "Kėdainiai", "Telšiai", "Visaginas", "Tauragė", "Ukmergė", "Plungė", "Kretinga", "Šilutė", "Radviliškis", "Palanga",    "Gargždai", "Druskininkai", "Rokiškis", "Biržai", "Kuršėnai", "Elektrėnai", "Jurbarkas", "Garliava", "Raseiniai", "Naujoji Akmenė"]
    , // Lithuania
    "LU": [    "Luxembourg City", "Esch-sur-Alzette", "Differdange", "Dudelange", "Ettelbruck", "Diekirch", "Wiltz", "Echternach", "Rumelange", "Grevenmacher",    "Remich", "Vianden", "Schifflange", "Mersch", "Redange-sur-Attert", "Kayl", "Ettelbruck", "Steinsel", "Walferdange", "Schieren",    "Junglinster", "Colmar-Berg", "Mamer", "Troisvierges", "Beaufort", "Bettembourg", "Garnich", "Capellen", "Sandweiler", "Bascharage",    "Niedercorn", "Eischen", "Soleuvre", "Mondorf-les-Bains", "Strassen", "Bertrange", "Weiler-la-Tour", "Larochette", "Contern", "Dippach"]
    , // Luxembourg
    "LV": [    "Riga", "Daugavpils", "Liepāja", "Jelgava", "Jūrmala", "Ventspils", "Rēzekne", "Valmiera", "Jēkabpils", "Ogre",    "Tukums", "Salaspils", "Bolderāja", "Cēsis", "Kuldīga", "Saldus", "Dobele", "Talsi", "Krustpils", "Sigulda",    "Limbazi", "Gulbene", "Madona", "Preiļi", "Ādaži", "Olaine", "Lielvārde", "Ķekava", "Iecava", "Aizkraukle",    "Smiltene", "Aizpute", "Rūjiena", "Līvāni", "Viļāni", "Saulkrasti", "Pāvilosta", "Līgatne", "Ērgļi", "Ragana"]
    , // Latvia
    "MT": [    "Valletta", "Mdina", "Birkirkara", "Qormi", "Sliema", "Mosta", "Żabbar", "San Ġwann", "Żejtun", "Rabat",    "Naxxar", "Fgura", "Żurrieq", "Pembroke", "Attard", "Swieqi", "Marsaskala", "Marsa", "Kirkop", "Xagħra",    "Gżira", "Għaxaq", "Birżebbuġa", "Ħamrun", "Dingli", "Xewkija", "Mellieħa", "Munxar", "Marsaxlokk", "Ta' Xbiex"]
    , // Malta
    "NL": [    "Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Tilburg", "Groningen", "Almere", "Breda", "Nijmegen",    "Apeldoorn", "Haarlem", "Arnhem", "Zaanstad", "Amersfoort", "'s-Hertogenbosch", "Hoofddorp", "Maastricht", "Leiden", "Dordrecht",    "Zoetermeer", "Zwolle", "Deventer", "Born", "Delft", "Alkmaar", "Heerlen", "Roosendaal", "Purmerend", "Oss",    "Schiedam", "Spijkenisse", "Emmen", "Vlaardingen", "Venlo", "Hoorn", "Leeuwarden", "Hilversum", "Amstelveen", "Roermond",    "Hengelo", "Alphen aan den Rijn", "Leidschendam", "Sittard", "Nieuwegein", "Doetinchem", "Woerden", "Culemborg", "Gorinchem", "Lelystad"]
    , // Netherlands
    "PL": [    "Warsaw", "Krakow", "Lodz", "Wroclaw", "Poznan", "Gdansk", "Szczecin", "Bydgoszcz", "Lublin", "Katowice",    "Bialystok", "Gdynia", "Czestochowa", "Sosnowiec", "Radom", "Mokotow", "Torun", "Kielce", "Gliwice", "Bytom",    "Zabrze", "Bielsko-Biala", "Olsztyn", "Rzeszow", "Ruda Slaska", "Rybnik", "Nowe Tychy", "Dabrowa Gornicza", "Opole", "Elblag",    "Plock", "Walbrzych", "Gorzow Wielkopolski", "Wloclawek", "Chorzow", "Tarnow", "Koszalin", "Kalisz", "Legnica", "Grudziadz",    "Slupsk", "Jaworzno", "Jastrzebie Zdroj", "Nowy Sacz", "Ostrowiec Swietokrzyski", "Siemianowice Slaskie", "Ostrow Wielkopolski", "Pabianice", "Gniezno", "Suwalki"]
    , // Poland
    "PT": [    "Lisbon", "Porto", "Vila Nova de Gaia", "Amadora", "Braga", "Funchal", "Coimbra", "Setúbal", "Almada", "Aveiro",    "Viseu", "Evora", "Queluz", "Faro", "Barreiro", "Amora", "Seixal", "Rio Tinto", "Aveiro", "Vila Nova de Famalicão",    "Faro", "Loures", "Leiria", "Odivelas", "Guimarães", "Ermesinde", "Portimão", "Cascais", "Maia", "Viana do Castelo",    "Bragança", "Póvoa de Varzim", "Vila Real", "Viseu", "Matosinhos", "Funchal", "Castelo Branco", "Azeitão", "Covilhã", "Fafe",    "Barcelos", "Tomar", "Vila Franca de Xira", "Beja", "Lagos", "Albufeira", "Sintra", "Vila do Conde", "Ponte de Lima"]
    , // Portugal
    "RO": [    "Bucharest", "Cluj-Napoca", "Timișoara", "Iași", "Constanța", "Craiova", "Brașov", "Galați", "Ploiești", "Oradea",    "Brăila", "Arad", "Pitesti", "Sibiu", "Bacau", "Târgu Mureș", "Baia Mare", "Buzău", "Botoșani", "Satu Mare",    "Râmnicu Vâlcea", "Piatra Neamț", "Suceava", "Drobeta-Turnu Severin", "Târgu Jiu", "Focșani", "Tulcea", "Alba Iulia", "Giurgiu", "Bistrița",    "Slatina", "Fălticeni", "Câmpina", "Turda", "Deva", "Slobozia", "Roman", "Medgidia", "Reșița", "Zalău"]
    , // Romania
    "SE": [    "Stockholm", "Gothenburg", "Malmö", "Uppsala", "Västerås", "Örebro", "Linköping", "Helsingborg", "Jönköping", "Norrköping",    "Lund", "Umeå", "Gävle", "Borås", "Södertälje", "Kista", "Huddinge", "Nacka", "Solna", "Lidingö",    "Växjö", "Kalmar", "Karlstad", "Sundsvall", "Täby", "Eskilstuna", "Trollhättan", "Luleå", "Halmstad", "Bromma",    "Värmdö", "Tumba", "Östersund", "Sollentuna", "Falun", "Upplands Väsby", "Skövde", "Karlskrona", "Kristianstad", "Ystad",    "Piteå", "Hässleholm", "Mölndal", "Kungsbacka", "Skellefteå", "Vallentuna", "Sundbyberg", "Landskrona", "Örnsköldsvik", "Alingsås",    "Kiruna", "Nässjö", "Katrineholm", "Boden", "Vänersborg", "Enköping", "Härnösand", "Gustavsberg", "Nyköping", "Ljungby"]
    , // Sweden
    "SI": [    "Ljubljana", "Maribor", "Celje", "Kranj", "Velenje", "Novo Mesto", "Koper", "Nova Gorica", "Ptuj", "Trbovlje",    "Kamnik", "Jesenice", "Domžale", "Izola", "Murska Sobota", "Kočevje", "Postojna", "Logatec", "Sežana", "Kranjska Gora",    "Ravne na Koroškem", "Žalec", "Slovenj Gradec", "Krško", "Slovenska Bistrica", "Ajdovščina", "Bled", "Radovljica", "Idrija", "Gornja Radgona",    "Črnomelj", "Trebnje", "Metlika", "Škofja Loka", "Lenart", "Brezice", "Sevnica", "Vrhnika", "Slovenske Konjice", "Beltinci"]
    , // Slovenia
    "SK":[    "Bratislava", "Košice", "Prešov", "Žilina", "Nitra", "Banská Bystrica", "Trnava", "Martin", "Trenčín", "Poprad",    "Prievidza", "Zvolen", "Považská Bystrica", "Michalovce", "Spišská Nová Ves", "Levice", "Komárno", "Humenné", "Bardejov", "Piešťany",    "Lučenec", "Nové Zámky", "Senica", "Hlohovec", "Topoľčany", "Rimavská Sobota", "Vranov nad Topľou", "Kysucké Nové Mesto", "Púchov", "Dunajská Streda", "Brezno",    "Snina", "Detva", "Stará Ľubovňa", "Turčianske Teplice", "Stropkov", "Gelnica", "Šaľa", "Vrútky", "Štúrovo", "Liptovský Mikuláš"],
    // Slovaki
    "LI": ["Vaduz", "Schaan", "Triesen", "Balzers", "Eschen", "Mauren", "Triesenberg", "Ruggell", "Gamprin", "Schellenberg", "Planken", "Malbun", "Steg"], // Liechtenstein
    "NO": ["Oslo", "Bergen", "Stavanger", "Trondheim", "Drammen", "Fredrikstad", "Kristiansand", "Sandnes", "Tromsø", "Sarpsborg", "Skien", "Ålesund", "Sandefjord", "Haugesund", "Tønsberg", "Moss", "Porsgrunn", "Bodø", "Arendal", "Hamar", "Ytrebygda", "Larvik", "Halden", "Steinkjer", "Harstad"], // Norway
    "CH": ["Zurich", "Geneva", "Basel", "Lausanne", "Bern", "Winterthur", "Lucerne", "St. Gallen", "Lugano", "Biel/Bienne", "Thun", "Köniz", "La Chaux-de-Fonds", "Schaffhausen", "Fribourg", "Chur", "Neuchâtel", "Vernier", "Sion", "Uster", "Emmen", "Lancy", "Yverdon-les-Bains", "Zug", "Dübendorf"], // Switzerland
    "UA": ["Kyiv", "Kharkiv", "Odesa", "Dnipro", "Donetsk", "Zaporizhzhia", "Lviv", "Kryvyi Rih", "Mykolaiv", "Mariupol", "Luhansk", "Vinnytsia", "Makiivka", "Sevastopol", "Simferopol", "Kherson", "Poltava", "Chernihiv", "Cherkasy", "Sumy", "Zhytomyr", "Khmelnytskyi", "Chernivtsi", "Gorlovka", "Rivne"] // Ukraine

  };
  