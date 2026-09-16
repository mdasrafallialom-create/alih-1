export interface CountryGeoData {
  name: string;
  code: string;
  states: {
    name: string;
    districts: string[];
  }[];
}

export const GEO_COUNTRIES: CountryGeoData[] = [
  {
    name: "Pakistan",
    code: "PK",
    states: [
      {
        name: "Punjab",
        districts: ["Lahore", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala", "Sialkot", "Bahawalpur", "Sargodha", "Sahiwal", "Jhelum", "Gujarat", "Sheikhupura"]
      },
      {
        name: "Sindh",
        districts: ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Mirpur Khas", "Nawabshah", "Thatta", "Badin", "Jacobabad"]
      },
      {
        name: "Khyber Pakhtunkhwa",
        districts: ["Peshawar", "Abbottabad", "Mardan", "Mingora", "Kohat", "Dera Ismail Khan", "Mansehra", "Swat", "Chitral"]
      },
      {
        name: "Balochistan",
        districts: ["Quetta", "Gwadar", "Turbat", "Khuzdar", "Sibi", "Chaman", "Zhob", "Loralai"]
      },
      {
        name: "Islamabad Capital Territory",
        districts: ["Islamabad"]
      },
      {
        name: "Azad Kashmir",
        districts: ["Muzaffarabad", "Mirpur", "Rawalakot", "Kotli", "Bhimber"]
      },
      {
        name: "Gilgit-Baltistan",
        districts: ["Gilgit", "Skardu", "Hunza", "Diamer", "Gizer"]
      }
    ]
  },
  {
    name: "Bangladesh",
    code: "BD",
    states: [
      {
        name: "Dhaka Division",
        districts: ["Dhaka", "Gazipur", "Narayanganj", "Tangail", "Faridpur", "Manikganj", "Munshiganj", "Narsingdi", "Gopalganj", "Madaripur", "Rajbari", "Shariatpur", "Kishoreganj"]
      },
      {
        name: "Chittagong Division",
        districts: ["Chittagong", "Cox's Bazar", "Comilla", "Feni", "Brahmanbaria", "Noakhali", "Chandpur", "Lakshmipur", "Rangamati", "Khagrachhari", "Bandarban"]
      },
      {
        name: "Sylhet Division",
        districts: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"]
      },
      {
        name: "Khulna Division",
        districts: ["Khulna", "Jessore", "Satkhira", "Bagerhat", "Kushtia", "Jhenaidah", "Magura", "Meherpur", "Narail", "Chuadanga"]
      },
      {
        name: "Rajshahi Division",
        districts: ["Rajshahi", "Bogra", "Pabna", "Natore", "Naogaon", "Joypurhat", "Sirajganj", "Chapai Nawabganj"]
      },
      {
        name: "Rangpur Division",
        districts: ["Rangpur", "Dinajpur", "Kurigram", "Gaibandha", "Nilphamari", "Lalmonirhat", "Panchagarh", "Thakurgaon"]
      },
      {
        name: "Barisal Division",
        districts: ["Barisal", "Patuakhali", "Bhola", "Pirojpur", "Barguna", "Jhalokati"]
      },
      {
        name: "Mymensingh Division",
        districts: ["Mymensingh", "Jamalpur", "Sherpur", "Netrokona"]
      }
    ]
  },
  {
    name: "Malaysia",
    code: "MY",
    states: [
      {
        name: "Selangor",
        districts: ["Shah Alam", "Petaling Jaya", "Klang", "Subang Jaya", "Ampang", "Kajang", "Rawang", "Sepang", "Cyberjaya", "Gombak"]
      },
      {
        name: "Kuala Lumpur",
        districts: ["Cheras", "Bukit Bintang", "Kepong", "Setapak", "Bangsar", "Wangsa Maju", "Mont Kiara"]
      },
      {
        name: "Johor",
        districts: ["Johor Bahru", "Batu Pahat", "Muar", "Kluang", "Segamat", "Pontian", "Kota Tinggi", "Kulai"]
      },
      {
        name: "Penang",
        districts: ["Georgetown", "Butterworth", "Bayu Lepas", "Bukit Mertajam", "Perai", "Kepala Batas"]
      },
      {
        name: "Perak",
        districts: ["Ipoh", "Taiping", "Teluk Intan", "Manjung", "Kuala Kangsar", "Batu Gajah", "Kampar"]
      },
      {
        name: "Sabah",
        districts: ["Kota Kinabalu", "Sandakan", "Tawau", "Lahad Datu", "Penampang", "Keningau"]
      },
      {
        name: "Sarawak",
        districts: ["Kuching", "Miri", "Sibu", "Bintulu", "Samarahan", "Limbang", "Sarikei"]
      },
      {
        name: "Kedah",
        districts: ["Alor Setar", "Sungai Petani", "Kulim", "Langkawi", "Kubang Pasu", "Baling"]
      },
      {
        name: "Malacca",
        districts: ["Melaka Tengah", "Alor Gajah", "Jasin"]
      },
      {
        name: "Negeri Sembilan",
        districts: ["Seremban", "Port Dickson", "Jempol", "Tampin", "Kuala Pilah"]
      },
      {
        name: "Pahang",
        districts: ["Kuantan", "Temerloh", "Bentong", "Pekan", "Raub", "Jerantut", "Cameron Highlands"]
      }
    ]
  },
  {
    name: "Indonesia",
    code: "ID",
    states: [
      {
        name: "DKI Jakarta",
        districts: ["Central Jakarta", "South Jakarta", "West Jakarta", "East Jakarta", "North Jakarta"]
      },
      {
        name: "Bali",
        districts: ["Denpasar", "Badung", "Gianyar", "Buleleng", "Tabanan", "Klungkung", "Karangasem"]
      },
      {
        name: "West Java",
        districts: ["Bandung", "Bekasi", "Depok", "Bogor", "Tasikmalaya", "Cimahi", "Cirebon", "Sukabumi"]
      },
      {
        name: "East Java",
        districts: ["Surabaya", "Malang", "Sidoarjo", "Gresik", "Kediri", "Banyuwangi", "Jember", "Madiun"]
      },
      {
        name: "Central Java",
        districts: ["Semarang", "Surakarta", "Yogyakarta", "Sleman", "Bantul", "Magelang", "Pekalongan"]
      },
      {
        name: "North Sumatra",
        districts: ["Medan", "Binjai", "Pematangsiantar", "Deli Serdang", "Toba", "Nias"]
      },
      {
        name: "Banten",
        districts: ["Tangerang", "South Tangerang", "Serang", "Cilegon", "Pandeglang"]
      }
    ]
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    states: [
      {
        name: "Riyadh Region",
        districts: ["Riyadh", "Al Kharj", "Ad Diriyah", "Majmaah", "Wadi ad-Dawasir"]
      },
      {
        name: "Makkah Region",
        districts: ["Makkah", "Jeddah", "Taif", "Rabigh", "Al Qunfudhah"]
      },
      {
        name: "Eastern Province",
        districts: ["Dammam", "Khobar", "Dhahran", "Al Ahsa", "Jubail", "Qatif", "Hafuf"]
      },
      {
        name: "Madinah Region",
        districts: ["Madinah", "Yanbu", "Al-Ula", "Badr"]
      }
    ]
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    states: [
      {
        name: "Emirate of Dubai",
        districts: ["Dubai Marina", "Downtown Dubai", "Deira", "Jumeirah", "Al Barsha", "Bur Dubai"]
      },
      {
        name: "Emirate of Abu Dhabi",
        districts: ["Abu Dhabi City", "Al Ain", "Ruwais", "Yas Island", "Saadiyat Island"]
      },
      {
        name: "Emirate of Sharjah",
        districts: ["Sharjah City", "Khor Fakkan", "Kalba", "Al Dhaid"]
      },
      {
        name: "Emirate of Ajman",
        districts: ["Ajman City"]
      }
    ]
  },
  {
    name: "United States",
    code: "US",
    states: [
      {
        name: "California",
        districts: ["Los Angeles", "San Francisco", "San Jose", "San Diego", "Sacramento", "Oakland"]
      },
      {
        name: "New York",
        districts: ["New York City", "Buffalo", "Rochester", "Albany", "Syracuse", "Yonkers"]
      },
      {
        name: "Texas",
        districts: ["Houston", "Austin", "Dallas", "San Antonio", "Fort Worth", "El Paso"]
      },
      {
        name: "Florida",
        districts: ["Miami", "Orlando", "Tampa", "Jacksonville", "Tallahassee", "Fort Lauderdale"]
      }
    ]
  },
  {
    name: "United Kingdom",
    code: "GB",
    states: [
      {
        name: "England",
        districts: ["London", "Manchester", "Birmingham", "Leeds", "Liverpool", "Bristol", "Newcastle"]
      },
      {
        name: "Scotland",
        districts: ["Edinburgh", "Glasgow", "Aberdeen", "Dundee", "Inverness"]
      },
      {
        name: "Wales",
        districts: ["Cardiff", "Swansea", "Newport", "Bangor"]
      }
    ]
  },
  {
    name: "India",
    code: "IN",
    states: [
      {
        name: "Maharashtra",
        districts: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad"]
      },
      {
        name: "Delhi",
        districts: ["New Delhi", "Dwarka", "Rohini", "Saket", "Karol Bagh"]
      },
      {
        name: "Karnataka",
        districts: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi"]
      },
      {
        name: "West Bengal",
        districts: ["Kolkata", "Howrah", "Darjeeling", "Siliguri", "Durgapur"]
      }
    ]
  },
  {
    name: "Philippines",
    code: "PH",
    states: [
      {
        name: "Metro Manila",
        districts: ["Manila", "Quezon City", "Makati", "Pasay", "Taguig", "Pasig", "Parañaque"]
      },
      {
        name: "Central Visayas",
        districts: ["Cebu City", "Mandaue", "Lapu-Lapu", "Dumaguete", "Tagbilaran"]
      },
      {
        name: "Davao Region",
        districts: ["Davao City", "Tagum", "Digos", "Mati", "Panabo"]
      }
    ]
  },
  {
    name: "Singapore",
    code: "SG",
    states: [
      {
        name: "Central Region",
        districts: ["Downtown Core", "Bukit Merah", "Queenstown", "Geylang", "Toa Payoh", "Novena"]
      },
      {
        name: "East Region",
        districts: ["Tampines", "Bedok", "Pasir Ris", "Changi"]
      },
      {
        name: "West Region",
        districts: ["Jurong East", "Bukit Batok", "Clementi", "Jurong West"]
      }
    ]
  },
  {
    name: "Japan",
    code: "JP",
    states: [
      {
        name: "Kanto",
        districts: ["Tokyo", "Yokohama", "Chiba", "Saitama", "Kawasaki", "Kamakura"]
      },
      {
        name: "Kansai",
        districts: ["Osaka", "Kyoto", "Kobe", "Nara", "Otsu", "Himeji"]
      },
      {
        name: "Chubu",
        districts: ["Nagoya", "Shizuoka", "Niigata", "Kanazawa", "Gifu"]
      }
    ]
  }
];
