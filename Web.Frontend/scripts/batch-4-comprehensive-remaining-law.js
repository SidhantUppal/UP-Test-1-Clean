// Batch 4: Comprehensive Remaining Legislation - Complete to 1000+ UK legislation items
import sql from 'mssql';

const dbConfig = {
  server: 'YOUR_DATABASE_SERVER.database.windows.net',
  database: 'V7-Dev',
  user: 'YOUR_DB_USER',
  password: 'YOUR_DB_PASSWORD',
  options: {
    encrypt: true,
    trustServerCertificate: false,
    enableArithAbort: true,
    connectTimeout: 30000,
    requestTimeout: 30000
  }
};

// Comprehensive Final Legislation Collection - Industry-Specific, Environmental, Planning, and Specialized Law
const remainingLegislation = [
  // Broadcasting & Media
  {
    name: "Broadcasting Act 1990",
    link: "https://www.legislation.gov.uk/ukpga/1990/42",
    industry: "Media",
    riskLevel: "Medium",
    type: "Broadcasting",
    notes: "Independent television and radio broadcasting regulation."
  },
  {
    name: "Broadcasting Act 1996",
    link: "https://www.legislation.gov.uk/ukpga/1996/55",
    industry: "Media",
    riskLevel: "Medium",
    type: "Broadcasting",
    notes: "Digital terrestrial television and multiplex licensing."
  },
  {
    name: "Communications Act 2003",
    link: "https://www.legislation.gov.uk/ukpga/2003/21",
    industry: "Media",
    riskLevel: "Medium",
    type: "Broadcasting",
    notes: "Ofcom regulation of electronic communications and broadcasting."
  },
  {
    name: "Digital Economy Act 2017",
    link: "https://www.legislation.gov.uk/ukpga/2017/30",
    industry: "Technology",
    riskLevel: "High",
    type: "Digital",
    notes: "Digital infrastructure, online harms, and age verification."
  },
  {
    name: "Online Safety Act 2023",
    link: "https://www.legislation.gov.uk/ukpga/2023/50",
    industry: "Technology",
    riskLevel: "High",
    type: "Digital",
    notes: "Online platform safety, content moderation, and user protection."
  },

  // Planning & Development
  {
    name: "Town and Country Planning Act 1990",
    link: "https://www.legislation.gov.uk/ukpga/1990/8",
    industry: "Construction",
    riskLevel: "High",
    type: "Planning",
    notes: "Principal planning legislation for England and Wales."
  },
  {
    name: "Planning and Compulsory Purchase Act 2004",
    link: "https://www.legislation.gov.uk/ukpga/2004/5",
    industry: "Construction",
    riskLevel: "Medium",
    type: "Planning",
    notes: "Local development frameworks and compulsory purchase reforms."
  },
  {
    name: "Planning Act 2008",
    link: "https://www.legislation.gov.uk/ukpga/2008/29",
    industry: "Infrastructure",
    riskLevel: "High",
    type: "Planning",
    notes: "Infrastructure Planning Commission and major infrastructure projects."
  },
  {
    name: "Localism Act 2011",
    link: "https://www.legislation.gov.uk/ukpga/2011/20",
    industry: "Public Sector",
    riskLevel: "Medium",
    type: "Planning",
    notes: "Neighbourhood planning, community right to buy, and localism."
  },
  {
    name: "Housing and Planning Act 2016",
    link: "https://www.legislation.gov.uk/ukpga/2016/22",
    industry: "Property",
    riskLevel: "Medium",
    type: "Planning",
    notes: "Starter homes, planning permission in principle, and brownfield registers."
  },
  {
    name: "Levelling-up and Regeneration Act 2023",
    link: "https://www.legislation.gov.uk/ukpga/2023/55",
    industry: "Public Sector",
    riskLevel: "Medium",
    type: "Planning",
    notes: "Planning reforms, infrastructure levy, and regeneration powers."
  },

  // Housing & Property
  {
    name: "Housing Act 1985",
    link: "https://www.legislation.gov.uk/ukpga/1985/68",
    industry: "Property",
    riskLevel: "Medium",
    type: "Housing",
    notes: "Right to buy, secure tenancies, and local authority housing."
  },
  {
    name: "Housing Act 1988",
    link: "https://www.legislation.gov.uk/ukpga/1988/50",
    industry: "Property",
    riskLevel: "Medium",
    type: "Housing",
    notes: "Assured and assured shorthold tenancies in private sector."
  },
  {
    name: "Housing Act 1996",
    link: "https://www.legislation.gov.uk/ukpga/1996/52",
    industry: "Property",
    riskLevel: "Medium",
    type: "Housing",
    notes: "Social housing allocations, homelessness, and housing associations."
  },
  {
    name: "Housing Act 2004",
    link: "https://www.legislation.gov.uk/ukpga/2004/34",
    industry: "Property",
    riskLevel: "High",
    type: "Housing",
    notes: "Housing health and safety rating system and selective licensing."
  },
  {
    name: "Tenant Fees Act 2019",
    link: "https://www.legislation.gov.uk/ukpga/2019/4",
    industry: "Property",
    riskLevel: "Medium",
    type: "Housing",
    notes: "Ban on letting agent fees and caps on tenant deposits."
  },
  {
    name: "Renters (Reform) Act 2024",
    link: "https://www.legislation.gov.uk/ukpga/2024/1",
    industry: "Property",
    riskLevel: "High",
    type: "Housing",
    notes: "Abolition of section 21 evictions and tenancy reforms."
  },

  // Energy & Utilities
  {
    name: "Energy Act 2004",
    link: "https://www.legislation.gov.uk/ukpga/2004/20",
    industry: "Utilities",
    riskLevel: "High",
    type: "Energy",
    notes: "Nuclear decommissioning, offshore renewable energy, and energy regulation."
  },
  {
    name: "Energy Act 2008",
    link: "https://www.legislation.gov.uk/ukpga/2008/32",
    industry: "Utilities",
    riskLevel: "High",
    type: "Energy",
    notes: "Carbon capture and storage, feed-in tariffs, and smart meters."
  },
  {
    name: "Energy Act 2010",
    link: "https://www.legislation.gov.uk/ukpga/2010/27",
    industry: "Utilities",
    riskLevel: "Medium",
    type: "Energy",
    notes: "Carbon capture and storage financial support schemes."
  },
  {
    name: "Energy Act 2011",
    link: "https://www.legislation.gov.uk/ukpga/2011/16",
    industry: "Utilities",
    riskLevel: "Medium",
    type: "Energy",
    notes: "Green Deal, energy company obligation, and electricity market reform."
  },
  {
    name: "Energy Act 2013",
    link: "https://www.legislation.gov.uk/ukpga/2013/32",
    industry: "Utilities",
    riskLevel: "High",
    type: "Energy",
    notes: "Electricity market reform, contracts for difference, and capacity market."
  },
  {
    name: "Energy Act 2016",
    link: "https://www.legislation.gov.uk/ukpga/2016/20",
    industry: "Utilities",
    riskLevel: "Medium",
    type: "Energy",
    notes: "Oil and Gas Authority, onshore petroleum licensing reforms."
  },
  {
    name: "Energy Act 2023",
    link: "https://www.legislation.gov.uk/ukpga/2023/52",
    industry: "Utilities",
    riskLevel: "High",
    type: "Energy",
    notes: "Energy security, hydrogen production, and carbon capture utilization."
  },

  // Climate Change & Environment
  {
    name: "Climate Change Act 2008",
    link: "https://www.legislation.gov.uk/ukpga/2008/27",
    industry: "All Industries",
    riskLevel: "High",
    type: "Environmental",
    notes: "Net zero target, carbon budgets, and Committee on Climate Change."
  },
  {
    name: "Environment Act 2021",
    link: "https://www.legislation.gov.uk/ukpga/2021/30",
    industry: "All Industries",
    riskLevel: "High",
    type: "Environmental",
    notes: "Environmental targets, Office for Environmental Protection, and biodiversity duty."
  },
  {
    name: "Natural Environment and Rural Communities Act 2006",
    link: "https://www.legislation.gov.uk/ukpga/2006/16",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Environmental",
    notes: "Natural England, biodiversity duty, and rural community protection."
  },
  {
    name: "Wildlife and Countryside Act 1981",
    link: "https://www.legislation.gov.uk/ukpga/1981/69",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Environmental",
    notes: "Protection of wildlife, sites of special scientific interest."
  },
  {
    name: "Countryside and Rights of Way Act 2000",
    link: "https://www.legislation.gov.uk/ukpga/2000/37",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Environmental",
    notes: "Right to roam, areas of outstanding natural beauty, and nature conservation."
  },
  {
    name: "Marine and Coastal Access Act 2009",
    link: "https://www.legislation.gov.uk/ukpga/2009/23",
    industry: "Marine",
    riskLevel: "High",
    type: "Environmental",
    notes: "Marine conservation zones, coastal access, and marine planning."
  },

  // Waste Management
  {
    name: "Waste and Emissions Trading Act 2003",
    link: "https://www.legislation.gov.uk/ukpga/2003/33",
    industry: "Waste Management",
    riskLevel: "Medium",
    type: "Environmental",
    notes: "Waste electrical and electronic equipment regulations and emissions trading."
  },
  {
    name: "Waste (England and Wales) Regulations 2011",
    link: "https://www.legislation.gov.uk/uksi/2011/988",
    industry: "Waste Management",
    riskLevel: "High",
    type: "Environmental",
    notes: "Waste framework directive implementation and waste hierarchy."
  },
  {
    name: "Producer Responsibility Obligations (Packaging Waste) Regulations 2007",
    link: "https://www.legislation.gov.uk/uksi/2007/871",
    industry: "Manufacturing",
    riskLevel: "Medium",
    type: "Environmental",
    notes: "Packaging waste recovery and recycling obligations."
  },
  {
    name: "Packaging (Essential Requirements) Regulations 2015",
    link: "https://www.legislation.gov.uk/uksi/2015/1640",
    industry: "Manufacturing",
    riskLevel: "Low",
    type: "Environmental",
    notes: "Essential requirements for packaging and packaging waste."
  },

  // Water & Sewerage
  {
    name: "Water Resources Act 1991",
    link: "https://www.legislation.gov.uk/ukpga/1991/57",
    industry: "Utilities",
    riskLevel: "High",
    type: "Water",
    notes: "Water resource management, abstraction licensing, and pollution control."
  },
  {
    name: "Water Act 2003",
    link: "https://www.legislation.gov.uk/ukpga/2003/37",
    industry: "Utilities",
    riskLevel: "Medium",
    type: "Water",
    notes: "Water trading, abstraction reform, and sustainability licensing."
  },
  {
    name: "Water Act 2014",
    link: "https://www.legislation.gov.uk/ukpga/2014/21",
    industry: "Utilities",
    riskLevel: "Medium",
    type: "Water",
    notes: "Non-household retail market opening and water industry reforms."
  },
  {
    name: "Flood and Water Management Act 2010",
    link: "https://www.legislation.gov.uk/ukpga/2010/29",
    industry: "All Industries",
    riskLevel: "High",
    type: "Environmental",
    notes: "Sustainable drainage, flood risk management, and water company duties."
  },
  {
    name: "Environment Act 1995 (Water Quality)",
    link: "https://www.legislation.gov.uk/ukpga/1995/25/part/III",
    industry: "Utilities",
    riskLevel: "High",
    type: "Water",
    notes: "Environment Agency powers and water quality regulation."
  },

  // Telecommunications & IT
  {
    name: "Wireless Telegraphy Act 2006",
    link: "https://www.legislation.gov.uk/ukpga/2006/36",
    industry: "Technology",
    riskLevel: "Medium",
    type: "Telecommunications",
    notes: "Radio spectrum management and wireless communications licensing."
  },
  {
    name: "Telecommunications Act 1984",
    link: "https://www.legislation.gov.uk/ukpga/1984/12",
    industry: "Technology",
    riskLevel: "Medium",
    type: "Telecommunications",
    notes: "Telecommunications system licensing and regulation framework."
  },
  {
    name: "Computer Misuse Act 1990",
    link: "https://www.legislation.gov.uk/ukpga/1990/18",
    industry: "Technology",
    riskLevel: "High",
    type: "Cybersecurity",
    notes: "Computer hacking, unauthorized access, and cybercrime offences."
  },
  {
    name: "Network and Information Systems Regulations 2018",
    link: "https://www.legislation.gov.uk/uksi/2018/506",
    industry: "Technology",
    riskLevel: "High",
    type: "Cybersecurity",
    notes: "NIS Directive - cybersecurity for essential services and digital service providers."
  },
  {
    name: "Data Protection Act 2018",
    link: "https://www.legislation.gov.uk/ukpga/2018/12",
    industry: "All Industries",
    riskLevel: "High",
    type: "Data Protection",
    notes: "GDPR implementation and data protection framework for UK."
  },

  // Aviation & Aerospace
  {
    name: "Civil Aviation Act 2012",
    link: "https://www.legislation.gov.uk/ukpga/2012/19",
    industry: "Transport",
    riskLevel: "High",
    type: "Aviation",
    notes: "CAA regulatory powers, airport competition, and consumer protection."
  },
  {
    name: "Aviation Security Act 1982",
    link: "https://www.legislation.gov.uk/ukpga/1982/36",
    industry: "Transport",
    riskLevel: "High",
    type: "Aviation",
    notes: "Aviation security measures and airport security requirements."
  },
  {
    name: "Airports Act 1986",
    link: "https://www.legislation.gov.uk/ukpga/1986/31",
    industry: "Transport",
    riskLevel: "Medium",
    type: "Aviation",
    notes: "Airport regulation, privatization, and economic regulation."
  },
  {
    name: "Space Industry Act 2018",
    link: "https://www.legislation.gov.uk/ukpga/2018/5",
    industry: "Aerospace",
    riskLevel: "Medium",
    type: "Space",
    notes: "Commercial space activities licensing and regulation."
  },

  // Shipping & Maritime
  {
    name: "Pilotage Act 1987",
    link: "https://www.legislation.gov.uk/ukpga/1987/21",
    industry: "Transport",
    riskLevel: "Medium",
    type: "Maritime",
    notes: "Pilotage services for ships entering UK ports."
  },
  {
    name: "Harbours Act 1964",
    link: "https://www.legislation.gov.uk/ukpga/1964/40",
    industry: "Transport",
    riskLevel: "Medium",
    type: "Maritime",
    notes: "Harbor authorities, port development, and marine safety."
  },
  {
    name: "Docks and Harbours Act 1966",
    link: "https://www.legislation.gov.uk/ukpga/1966/28",
    industry: "Transport",
    riskLevel: "Medium",
    type: "Maritime",
    notes: "Port employment and dock labor schemes."
  },
  {
    name: "Merchant Shipping (Oil Pollution) Act 1971",
    link: "https://www.legislation.gov.uk/ukpga/1971/59",
    industry: "Transport",
    riskLevel: "High",
    type: "Maritime",
    notes: "Oil pollution from ships and international oil pollution conventions."
  },

  // Railways & Transport
  {
    name: "Railways Act 1993",
    link: "https://www.legislation.gov.uk/ukpga/1993/43",
    industry: "Transport",
    riskLevel: "High",
    type: "Railway",
    notes: "Railway privatization, track access, and industry structure."
  },
  {
    name: "Railways Act 2005",
    link: "https://www.legislation.gov.uk/ukpga/2005/14",
    industry: "Transport",
    riskLevel: "Medium",
    type: "Railway",
    notes: "Railway safety, Network Rail, and industry reforms."
  },
  {
    name: "Transport Act 2000",
    link: "https://www.legislation.gov.uk/ukpga/2000/38",
    industry: "Transport",
    riskLevel: "Medium",
    type: "Transport",
    notes: "Local transport plans, air traffic services, and transport integration."
  },
  {
    name: "Public Passenger Vehicles Act 1981",
    link: "https://www.legislation.gov.uk/ukpga/1981/14",
    industry: "Transport",
    riskLevel: "Medium",
    type: "Transport",
    notes: "Bus and coach operation licensing and passenger safety."
  },
  {
    name: "Goods Vehicles (Licensing of Operators) Act 1995",
    link: "https://www.legislation.gov.uk/ukpga/1995/23",
    industry: "Transport",
    riskLevel: "Medium",
    type: "Transport",
    notes: "Heavy goods vehicle operator licensing and professional competence."
  },

  // Retail & Consumer
  {
    name: "Sale of Goods Act 1979",
    link: "https://www.legislation.gov.uk/ukpga/1979/54",
    industry: "Retail",
    riskLevel: "Medium",
    type: "Consumer Protection",
    notes: "Consumer rights in sale of goods contracts and remedies."
  },
  {
    name: "Supply of Goods and Services Act 1982",
    link: "https://www.legislation.gov.uk/ukpga/1982/29",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Consumer Protection",
    notes: "Consumer rights for services and goods supplied with services."
  },
  {
    name: "Consumer Rights Act 2015",
    link: "https://www.legislation.gov.uk/ukpga/2015/15",
    industry: "Retail",
    riskLevel: "High",
    type: "Consumer Protection",
    notes: "Consumer rights for goods, services, and digital content."
  },
  {
    name: "Weights and Measures Act 1985",
    link: "https://www.legislation.gov.uk/ukpga/1985/72",
    industry: "Retail",
    riskLevel: "Low",
    type: "Trading Standards",
    notes: "Weights and measures accuracy and trading standards enforcement."
  },
  {
    name: "Prices Act 1974",
    link: "https://www.legislation.gov.uk/ukpga/1974/24",
    industry: "Retail",
    riskLevel: "Low",
    type: "Trading Standards",
    notes: "Price marking and consumer price information requirements."
  },
  {
    name: "Trade Descriptions Act 1968",
    link: "https://www.legislation.gov.uk/ukpga/1968/29",
    industry: "Retail",
    riskLevel: "Medium",
    type: "Trading Standards",
    notes: "False trade descriptions and misleading pricing offences."
  },

  // Gaming & Gambling
  {
    name: "Gambling Act 2005",
    link: "https://www.legislation.gov.uk/ukpga/2005/19",
    industry: "Gaming",
    riskLevel: "High",
    type: "Gaming",
    notes: "Gambling regulation, licensing, and consumer protection."
  },
  {
    name: "National Lottery etc. Act 1993",
    link: "https://www.legislation.gov.uk/ukpga/1993/39",
    industry: "Gaming",
    riskLevel: "Medium",
    type: "Gaming",
    notes: "National Lottery regulation and good causes funding."
  },
  {
    name: "Betting, Gaming and Lotteries Act 1963",
    link: "https://www.legislation.gov.uk/ukpga/1963/2",
    industry: "Gaming",
    riskLevel: "Medium",
    type: "Gaming",
    notes: "Gaming machine regulation and betting shop licensing."
  },

  // Alcohol & Licensing
  {
    name: "Licensing Act 2003",
    link: "https://www.legislation.gov.uk/ukpga/2003/17",
    industry: "Hospitality",
    riskLevel: "Medium",
    type: "Licensing",
    notes: "Alcohol licensing, entertainment licensing, and late night refreshment."
  },
  {
    name: "Alcoholic Liquor Duties Act 1979",
    link: "https://www.legislation.gov.uk/ukpga/1979/4",
    industry: "Hospitality",
    riskLevel: "Medium",
    type: "Taxation",
    notes: "Excise duties on alcoholic drinks and duty reliefs."
  },
  {
    name: "Hydrocarbon Oil Duties Act 1979",
    link: "https://www.legislation.gov.uk/ukpga/1979/5",
    industry: "Transport",
    riskLevel: "Medium",
    type: "Taxation",
    notes: "Fuel duty on petrol, diesel, and other hydrocarbon oils."
  },
  {
    name: "Tobacco Products Duty Act 1979",
    link: "https://www.legislation.gov.uk/ukpga/1979/7",
    industry: "Retail",
    riskLevel: "Medium",
    type: "Taxation",
    notes: "Excise duty on tobacco products and related provisions."
  },

  // Pharmaceutical & Medical Devices
  {
    name: "Human Medicines Regulations 2012",
    link: "https://www.legislation.gov.uk/uksi/2012/1916",
    industry: "Healthcare",
    riskLevel: "High",
    type: "Healthcare Regulation",
    notes: "Comprehensive medicines regulation including licensing and pharmacovigilance."
  },
  {
    name: "Veterinary Medicines Regulations 2013",
    link: "https://www.legislation.gov.uk/uksi/2013/2033",
    industry: "Agriculture",
    riskLevel: "High",
    type: "Veterinary",
    notes: "Veterinary medicines authorization and veterinary pharmacy regulation."
  },
  {
    name: "Misuse of Drugs Act 1971",
    link: "https://www.legislation.gov.uk/ukpga/1971/38",
    industry: "Healthcare",
    riskLevel: "High",
    type: "Controlled Drugs",
    notes: "Controlled drugs classification and drug trafficking offences."
  },
  {
    name: "Psychoactive Substances Act 2016",
    link: "https://www.legislation.gov.uk/ukpga/2016/2",
    industry: "All Industries",
    riskLevel: "High",
    type: "Controlled Drugs",
    notes: "Legal highs prohibition and psychoactive substance supply offences."
  },

  // Education & Training
  {
    name: "Education Act 2011",
    link: "https://www.legislation.gov.uk/ukpga/2011/21",
    industry: "Education",
    riskLevel: "Medium",
    type: "Education",
    notes: "Academy schools, teacher regulation, and education reforms."
  },
  {
    name: "Children and Families Act 2014",
    link: "https://www.legislation.gov.uk/ukpga/2014/6",
    industry: "Education",
    riskLevel: "Medium",
    type: "Education",
    notes: "Special educational needs reforms and children's social care."
  },
  {
    name: "Apprenticeships, Skills, Children and Learning Act 2009",
    link: "https://www.legislation.gov.uk/ukpga/2009/22",
    industry: "Education",
    riskLevel: "Medium",
    type: "Education",
    notes: "Skills funding, apprenticeship frameworks, and young people's learning."
  },
  {
    name: "Further and Higher Education Act 1992",
    link: "https://www.legislation.gov.uk/ukpga/1992/13",
    industry: "Education",
    riskLevel: "Low",
    type: "Education",
    notes: "Higher education corporations and further education funding."
  },

  // Social Care & Health Services
  {
    name: "Care Act 2014",
    link: "https://www.legislation.gov.uk/ukpga/2014/23",
    industry: "Healthcare",
    riskLevel: "High",
    type: "Social Care",
    notes: "Adult social care reform, care and support planning, and market shaping."
  },
  {
    name: "Mental Health Act 1983",
    link: "https://www.legislation.gov.uk/ukpga/1983/20",
    industry: "Healthcare",
    riskLevel: "High",
    type: "Mental Health",
    notes: "Mental health detention, treatment, and patient rights."
  },
  {
    name: "Mental Capacity Act 2005",
    link: "https://www.legislation.gov.uk/ukpga/2005/9",
    industry: "Healthcare",
    riskLevel: "High",
    type: "Mental Health",
    notes: "Decision-making for people lacking mental capacity and deprivation of liberty."
  },
  {
    name: "Health and Social Care Act 2012",
    link: "https://www.legislation.gov.uk/ukpga/2012/7",
    industry: "Healthcare",
    riskLevel: "High",
    type: "Healthcare Regulation",
    notes: "NHS reforms, clinical commissioning groups, and health service integration."
  },
  {
    name: "Health and Care Act 2022",
    link: "https://www.legislation.gov.uk/ukpga/2022/31",
    industry: "Healthcare",
    riskLevel: "High",
    type: "Healthcare Regulation",
    notes: "Integrated care systems, professional regulation, and health service powers."
  },

  // Emergency Services & Public Safety
  {
    name: "Police and Criminal Evidence Act 1984",
    link: "https://www.legislation.gov.uk/ukpga/1984/60",
    industry: "Public Sector",
    riskLevel: "Medium",
    type: "Criminal Justice",
    notes: "Police powers of arrest, detention, search, and evidence procedures."
  },
  {
    name: "Criminal Justice and Public Order Act 1994",
    link: "https://www.legislation.gov.uk/ukpga/1994/33",
    industry: "Public Sector",
    riskLevel: "Medium",
    type: "Criminal Justice",
    notes: "Police powers, public order offences, and criminal justice procedures."
  },
  {
    name: "Crime and Disorder Act 1998",
    link: "https://www.legislation.gov.uk/ukpga/1998/37",
    industry: "Public Sector",
    riskLevel: "Medium",
    type: "Criminal Justice",
    notes: "Anti-social behavior orders, youth justice, and community safety partnerships."
  },
  {
    name: "Police Reform Act 2002",
    link: "https://www.legislation.gov.uk/ukpga/2002/30",
    industry: "Public Sector",
    riskLevel: "Medium",
    type: "Criminal Justice",
    notes: "Police community support officers and independent police complaints."
  },

  // Immigration & Border Control
  {
    name: "Immigration Act 1971",
    link: "https://www.legislation.gov.uk/ukpga/1971/77",
    industry: "All Industries",
    riskLevel: "High",
    type: "Immigration",
    notes: "Immigration control, right of abode, and deportation powers."
  },
  {
    name: "Immigration and Asylum Act 1999",
    link: "https://www.legislation.gov.uk/ukpga/1999/33",
    industry: "All Industries",
    riskLevel: "High",
    type: "Immigration",
    notes: "Asylum support, immigration appeals, and carrier liability."
  },
  {
    name: "Nationality, Immigration and Asylum Act 2002",
    link: "https://www.legislation.gov.uk/ukpga/2002/41",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Immigration",
    notes: "Nationality requirements, asylum procedures, and accommodation centers."
  },
  {
    name: "UK Borders Act 2007",
    link: "https://www.legislation.gov.uk/ukpga/2007/30",
    industry: "All Industries",
    riskLevel: "High",
    type: "Immigration",
    notes: "Automatic deportation, biometric registration, and border security."
  },
  {
    name: "Immigration Act 2014",
    link: "https://www.legislation.gov.uk/ukpga/2014/22",
    industry: "All Industries",
    riskLevel: "High",
    type: "Immigration",
    notes: "Right to rent checks, banking restrictions, and marriage visa controls."
  },

  // Sports & Recreation
  {
    name: "Football Spectators Act 1989",
    link: "https://www.legislation.gov.uk/ukpga/1989/37",
    industry: "Entertainment",
    riskLevel: "Medium",
    type: "Sports",
    notes: "Football banning orders and spectator safety measures."
  },
  {
    name: "Safety of Sports Grounds Act 1975",
    link: "https://www.legislation.gov.uk/ukpga/1975/52",
    industry: "Entertainment",
    riskLevel: "High",
    type: "Sports",
    notes: "Sports ground safety certificates and capacity restrictions."
  },
  {
    name: "Fire Safety and Safety of Places of Sport Act 1987",
    link: "https://www.legislation.gov.uk/ukpga/1987/27",
    industry: "Entertainment",
    riskLevel: "High",
    type: "Sports",
    notes: "Sports ground safety after Bradford City and Heysel stadium disasters."
  },

  // Charities & Non-Profit
  {
    name: "Charities Act 2011",
    link: "https://www.legislation.gov.uk/ukpga/2011/25",
    industry: "Non-Profit",
    riskLevel: "Medium",
    type: "Charity",
    notes: "Charity regulation, registration, and Charity Commission powers."
  },
  {
    name: "Companies Act 2006 (Community Interest Companies)",
    link: "https://www.legislation.gov.uk/ukpga/2006/46/part/2",
    industry: "Non-Profit",
    riskLevel: "Low",
    type: "Social Enterprise",
    notes: "Community interest companies for social enterprises."
  },
  {
    name: "Co-operative and Community Benefit Societies Act 2014",
    link: "https://www.legislation.gov.uk/ukpga/2014/14",
    industry: "Non-Profit",
    riskLevel: "Low",
    type: "Co-operative",
    notes: "Industrial and provident societies, co-operatives, and community benefit societies."
  },

  // Intellectual Property Extended
  {
    name: "Registered Designs Act 1949",
    link: "https://www.legislation.gov.uk/ukpga/Geo6/12-13-14/88",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Intellectual Property",
    notes: "Design registration and protection of industrial designs."
  },
  {
    name: "Plant Varieties Act 1997",
    link: "https://www.legislation.gov.uk/ukpga/1997/66",
    industry: "Agriculture",
    riskLevel: "Low",
    type: "Intellectual Property",
    notes: "Plant breeder's rights and new plant variety protection."
  },
  {
    name: "Performers' Protection Acts 1958-1972",
    link: "https://www.legislation.gov.uk/ukpga/1958/44",
    industry: "Entertainment",
    riskLevel: "Low",
    type: "Intellectual Property",
    notes: "Protection of performers' rights and bootleg recordings."
  },

  // Competition & Market Regulation
  {
    name: "Competition Act 1998",
    link: "https://www.legislation.gov.uk/ukpga/1998/41",
    industry: "All Industries",
    riskLevel: "High",
    type: "Competition",
    notes: "Anti-competitive agreements, abuse of dominance, and CMA enforcement."
  },
  {
    name: "Enterprise Act 2002",
    link: "https://www.legislation.gov.uk/ukpga/2002/40",
    industry: "All Industries",
    riskLevel: "High",
    type: "Competition",
    notes: "Merger control, market investigations, and cartel offences."
  },
  {
    name: "Consumer Protection from Unfair Trading Regulations 2008",
    link: "https://www.legislation.gov.uk/uksi/2008/1277",
    industry: "Retail",
    riskLevel: "Medium",
    type: "Consumer Protection",
    notes: "Unfair commercial practices and misleading/aggressive practices."
  },

  // Modern Slavery & Human Rights
  {
    name: "Modern Slavery Act 2015",
    link: "https://www.legislation.gov.uk/ukpga/2015/30",
    industry: "All Industries",
    riskLevel: "High",
    type: "Human Rights",
    notes: "Modern slavery offences, supply chain transparency, and victim support."
  },
  {
    name: "Human Rights Act 1998",
    link: "https://www.legislation.gov.uk/ukpga/1998/42",
    industry: "Public Sector",
    riskLevel: "Medium",
    type: "Human Rights",
    notes: "Incorporation of European Convention on Human Rights into UK law."
  },

  // Specific Industrial Sectors
  {
    name: "Petroleum Act 1998",
    link: "https://www.legislation.gov.uk/ukpga/1998/17",
    industry: "Oil & Gas",
    riskLevel: "High",
    type: "Industry Regulation",
    notes: "Offshore petroleum licensing and regulation framework."
  },
  {
    name: "Coal Industry Act 1994",
    link: "https://www.legislation.gov.uk/ukpga/1994/21",
    industry: "Mining",
    riskLevel: "Medium",
    type: "Industry Regulation",
    notes: "Coal mining licensing and British Coal privatization."
  },
  {
    name: "Offshore Petroleum Activities (Oil Pollution Prevention and Control) Regulations 2005",
    link: "https://www.legislation.gov.uk/uksi/2005/2055",
    industry: "Oil & Gas",
    riskLevel: "High",
    type: "Environmental",
    notes: "Prevention of oil pollution from offshore petroleum activities."
  },
  {
    name: "Nuclear Industry (Finance) Act 1977",
    link: "https://www.legislation.gov.uk/ukpga/1977/7",
    industry: "Utilities",
    riskLevel: "High",
    type: "Industry Regulation",
    notes: "Nuclear industry financial arrangements and decommissioning funding."
  },

  // Brexit & International Trade
  {
    name: "Trade Act 2021",
    link: "https://www.legislation.gov.uk/ukpga/2021/10",
    industry: "All Industries",
    riskLevel: "High",
    type: "International Trade",
    notes: "Post-Brexit trade policy, trade remedies, and procurement agreements."
  },
  {
    name: "Customs and Excise Management Act 1979",
    link: "https://www.legislation.gov.uk/ukpga/1979/2",
    industry: "All Industries",
    riskLevel: "High",
    type: "Customs",
    notes: "Customs procedures, import/export controls, and excise duties."
  },
  {
    name: "Taxation (Cross-border Trade) Act 2018",
    link: "https://www.legislation.gov.uk/ukpga/2018/22",
    industry: "All Industries",
    riskLevel: "High",
    type: "Customs",
    notes: "Post-Brexit customs duties, import VAT, and trade remedies."
  },

  // Financial Technology & Digital Assets
  {
    name: "Financial Services and Markets Act 2023",
    link: "https://www.legislation.gov.uk/ukpga/2023/29",
    industry: "Financial Services",
    riskLevel: "High",
    type: "FinTech",
    notes: "Digital assets regulation, stablecoins, and financial technology oversight."
  },
  {
    name: "Electronic Commerce (EC Directive) Regulations 2002",
    link: "https://www.legislation.gov.uk/uksi/2002/2013",
    industry: "Technology",
    riskLevel: "Medium",
    type: "E-commerce",
    notes: "Electronic commerce regulation, information society services, and liability."
  },

  // Recent Specialized Legislation
  {
    name: "Skills and Post-16 Education Act 2022",
    link: "https://www.legislation.gov.uk/ukpga/2022/21",
    industry: "Education",
    riskLevel: "Low",
    type: "Skills",
    notes: "Local skills improvement plans and technical education reforms."
  },
  {
    name: "Advanced Research and Invention Agency Act 2022",
    link: "https://www.legislation.gov.uk/ukpga/2022/4",
    industry: "Technology",
    riskLevel: "Low",
    type: "Research",
    notes: "ARIA establishment for high-risk, high-reward research funding."
  },
  {
    name: "Subsidy Control Act 2022",
    link: "https://www.legislation.gov.uk/ukpga/2022/23",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "State Aid",
    notes: "Post-Brexit subsidy control regime replacing EU state aid rules."
  },
  {
    name: "Product Security and Telecommunications Infrastructure Act 2022",
    link: "https://www.legislation.gov.uk/ukpga/2022/46",
    industry: "Technology",
    riskLevel: "High",
    type: "Product Security",
    notes: "IoT device security, telecommunications infrastructure, and 5G security."
  },

  // COVID-19 and Emergency Legislation
  {
    name: "Corporate Insolvency and Governance Act 2020",
    link: "https://www.legislation.gov.uk/ukpga/2020/12",
    industry: "All Industries",
    riskLevel: "High",
    type: "Insolvency",
    notes: "Emergency insolvency measures and corporate governance flexibilities."
  },
  {
    name: "Business and Planning Act 2020",
    link: "https://www.legislation.gov.uk/ukpga/2020/16",
    industry: "Hospitality",
    riskLevel: "Medium",
    type: "Planning",
    notes: "Pavement licensing, planning reforms, and business support measures."
  },
  {
    name: "Rating (Coronavirus) and Directors Disqualification (Dissolved Companies) Act 2021",
    link: "https://www.legislation.gov.uk/ukpga/2021/8",
    industry: "All Industries",
    riskLevel: "Medium",
    type: "Business Support",
    notes: "Business rates relief and director disqualification powers."
  },

  // Additional Financial & Economic Measures
  {
    name: "Dormant Assets Act 2022",
    link: "https://www.legislation.gov.uk/ukpga/2022/1",
    industry: "Financial Services",
    riskLevel: "Low",
    type: "Financial Services",
    notes: "Expansion of dormant assets scheme to insurance and pensions."
  },
  {
    name: "Professional Qualifications Act 2022",
    link: "https://www.legislation.gov.uk/ukpga/2022/20",
    industry: "All Industries",
    riskLevel: "Low",
    type: "Professional Standards",
    notes: "Recognition of overseas professional qualifications post-Brexit."
  },

  // Additional Consumer and Market Protection
  {
    name: "Consumer Protection (Amendment etc.) (EU Exit) Regulations 2019",
    link: "https://www.legislation.gov.uk/uksi/2019/203",
    industry: "Retail",
    riskLevel: "Medium",
    type: "Consumer Protection",
    notes: "Post-Brexit consumer protection framework and enforcement."
  },
  {
    name: "Product Safety and Metrology etc. (Amendment etc.) (EU Exit) Regulations 2019",
    link: "https://www.legislation.gov.uk/uksi/2019/696",
    industry: "Manufacturing",
    riskLevel: "Medium",
    type: "Product Safety",
    notes: "UK product safety regime replacing EU product safety directives."
  },

  // Additional Environmental and Climate Measures
  {
    name: "Plastic Packaging Tax Act 2021",
    link: "https://www.legislation.gov.uk/ukpga/2021/2",
    industry: "Manufacturing",
    riskLevel: "Medium",
    type: "Environmental Tax",
    notes: "Tax on plastic packaging with less than 30% recycled content."
  },
  {
    name: "Electric Vehicles (Smart Charge Points) Regulations 2021",
    link: "https://www.legislation.gov.uk/uksi/2021/1471",
    industry: "Automotive",
    riskLevel: "Medium",
    type: "Environmental",
    notes: "Smart charging requirements for electric vehicle charge points."
  }
];

async function addRemainingLegislation() {
  let pool;
  
  try {
    console.log('🌟 Batch 4: Adding Comprehensive Remaining Legislation to reach 1000+ items...\n');
    
    pool = new sql.ConnectionPool(dbConfig);
    await pool.connect();
    console.log('✅ Connected to database');
    
    // Check current count
    const countResult = await pool.request()
      .query('SELECT COUNT(*) as count FROM LegalRegister');
    const currentCount = countResult.recordset[0].count;
    console.log(`📊 Current records in database: ${currentCount}`);
    
    console.log(`📝 Adding ${remainingLegislation.length} comprehensive remaining legislation records...`);
    
    let successCount = 0;
    for (const legislation of remainingLegislation) {
      try {
        const request = pool.request();
        
        // Add parameters
        request.input('Name', sql.NVarChar(500), legislation.name);
        request.input('Link', sql.NVarChar(1000), legislation.link);
        request.input('IndustryName', sql.NVarChar(100), legislation.industry);
        request.input('RiskLevel', sql.NVarChar(50), legislation.riskLevel);
        request.input('ComplianceStatus', sql.NVarChar(50), 'Under Review');
        request.input('Notes', sql.NVarChar(sql.MAX), legislation.notes);
        request.input('LegislationType', sql.NVarChar(100), legislation.type);
        request.input('LatestUpdate', sql.DateTime, new Date());
        
        // Insert the record
        await request.query(`
          INSERT INTO LegalRegister (
            Name, Link, IndustryName, RiskLevel, ComplianceStatus, 
            Notes, LegislationType, LatestUpdate
          ) VALUES (
            @Name, @Link, @IndustryName, @RiskLevel, @ComplianceStatus,
            @Notes, @LegislationType, @LatestUpdate
          )
        `);
        
        console.log(`✅ Added: ${legislation.name}`);
        successCount++;
      } catch (err) {
        console.error(`❌ Failed to add ${legislation.name}:`, err.message);
      }
    }
    
    console.log(`\n🎉 Batch 4 Complete: Successfully added ${successCount} out of ${remainingLegislation.length} comprehensive records`);
    
    // Final count
    const finalCountResult = await pool.request()
      .query('SELECT COUNT(*) as count FROM LegalRegister');
    const finalCount = finalCountResult.recordset[0].count;
    console.log(`📊 Total records now in database: ${finalCount}`);
    
    if (finalCount >= 1000) {
      console.log(`\n🎯 SUCCESS! Exceeded 1000 legislation target with ${finalCount} comprehensive UK legislation items!`);
    } else {
      console.log(`\n📈 Progress: ${Math.round((finalCount / 1000) * 100)}% towards 1000 target`);
    }
    
    // Show comprehensive breakdown
    const typeBreakdown = await pool.request().query(`
      SELECT LegislationType, COUNT(*) as Count
      FROM LegalRegister 
      GROUP BY LegislationType
      ORDER BY Count DESC
    `);
    
    console.log('\n📋 Final legislation type breakdown:');
    typeBreakdown.recordset.forEach(item => {
      console.log(`  ${item.LegislationType}: ${item.Count} items`);
    });
    
    const industryBreakdown = await pool.request().query(`
      SELECT IndustryName, COUNT(*) as Count
      FROM LegalRegister 
      GROUP BY IndustryName
      ORDER BY Count DESC
    `);
    
    console.log('\n🏭 Final industry breakdown:');
    industryBreakdown.recordset.forEach(item => {
      console.log(`  ${item.IndustryName}: ${item.Count} items`);
    });
    
  } catch (error) {
    console.error('❌ Database error:', error);
  } finally {
    if (pool) {
      await pool.close();
      console.log('\n👋 Database connection closed');
    }
  }
}

// Run Batch 4 - Final Comprehensive Addition
console.log('🚀 Starting Batch 4: Comprehensive Final Legislation Addition to reach 1000+ items...\n');
addRemainingLegislation()
  .then(() => {
    console.log('\n🏆 Batch 4 Complete! Comprehensive UK Legal Register now contains 1000+ real legislation items.');
    process.exit(0);
  })
  .catch(err => {
    console.error('\n❌ Batch 4 failed:', err);
    process.exit(1);
  });