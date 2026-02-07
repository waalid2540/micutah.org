import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Sample Muslim/Halal businesses in Utah
const categories = [
  { name: 'Restaurants & Food', slug: 'restaurants-food', icon: '🍽️', order: 1 },
  { name: 'Grocery & Halal Meat', slug: 'grocery-halal-meat', icon: '🥩', order: 2 },
  { name: 'Services', slug: 'services', icon: '🔧', order: 3 },
  { name: 'Clothing & Fashion', slug: 'clothing-fashion', icon: '👗', order: 4 },
  { name: 'Health & Beauty', slug: 'health-beauty', icon: '💆', order: 5 },
  { name: 'Education & Tutoring', slug: 'education-tutoring', icon: '📚', order: 6 },
  { name: 'Real Estate', slug: 'real-estate', icon: '🏠', order: 7 },
  { name: 'Professional Services', slug: 'professional-services', icon: '💼', order: 8 },
  { name: 'Home Services', slug: 'home-services', icon: '🏡', order: 9 },
  { name: 'Automotive', slug: 'automotive', icon: '🚗', order: 10 },
];

const sampleListings = [
  // RESTAURANTS & FOOD
  {
    title: 'Shahrazad Market & Restaurant',
    slug: 'shahrazad-market-restaurant',
    description: 'Locally owned Middle Eastern restaurant, marketplace, and Halal butcher shop. Serving authentic Mediterranean cuisine with fresh halal meats.',
    categoryName: 'Restaurants & Food',
    listingType: 'service',
    contactName: 'Shahrazad',
    contactPhone: '(801) 975-7635',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Shawarma Shack',
    slug: 'shawarma-shack',
    description: 'Authentic shawarma and Middle Eastern favorites. All meat is 100% halal certified.',
    categoryName: 'Restaurants & Food',
    listingType: 'service',
    contactName: 'Shawarma Shack',
    contactPhone: '(801) 924-9700',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Curry Fried Chicken',
    slug: 'curry-fried-chicken',
    description: 'Halal fried chicken with a South Asian twist. Crispy, flavorful, and 100% halal.',
    categoryName: 'Restaurants & Food',
    listingType: 'service',
    contactName: 'Curry Fried Chicken',
    contactPhone: '(385) 528-0786',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Habibi Grill',
    slug: 'habibi-grill',
    description: 'Mediterranean and Middle Eastern cuisine. Fresh kabobs, hummus, and falafel. Halal certified.',
    categoryName: 'Restaurants & Food',
    listingType: 'service',
    contactName: 'Habibi Grill',
    contactPhone: '(801) 413-2288',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },
  {
    title: "O'Falafel Etc",
    slug: 'ofalafel-etc',
    description: 'Fresh falafel, shawarma, and Mediterranean classics. Vegetarian-friendly with halal meat options.',
    categoryName: 'Restaurants & Food',
    listingType: 'service',
    contactName: "O'Falafel",
    contactPhone: '(801) 521-5753',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Beirut Cafe',
    slug: 'beirut-cafe',
    description: 'Authentic Lebanese cuisine in the heart of Salt Lake. Halal meats and vegetarian options.',
    categoryName: 'Restaurants & Food',
    listingType: 'service',
    contactName: 'Beirut Cafe',
    contactPhone: '(801) 363-4436',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Kabob Bros',
    slug: 'kabob-bros',
    description: 'Fresh grilled kabobs and Mediterranean favorites. Family-owned halal restaurant.',
    categoryName: 'Restaurants & Food',
    listingType: 'service',
    contactName: 'Kabob Bros',
    contactPhone: '(801) 565-9300',
    city: 'West Jordan',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Kabob Stop',
    slug: 'kabob-stop',
    description: 'Quick-service halal kabobs and wraps. Perfect for lunch or dinner.',
    categoryName: 'Restaurants & Food',
    listingType: 'service',
    contactName: 'Kabob Stop',
    city: 'South Salt Lake',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Saffron Valley',
    slug: 'saffron-valley',
    description: 'Award-winning Indian restaurant with multiple Utah locations. Curries, kebabs, and biryani. Halal options available.',
    categoryName: 'Restaurants & Food',
    listingType: 'service',
    contactName: 'Saffron Valley',
    contactPhone: '(801) 203-3325',
    city: 'Multiple Locations',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Sumac Restaurant',
    slug: 'sumac-restaurant',
    description: 'Upscale Middle Eastern dining in Cottonwood Heights. Fresh, locally-sourced halal ingredients.',
    categoryName: 'Restaurants & Food',
    listingType: 'service',
    contactName: 'Sumac',
    city: 'Cottonwood Heights',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Alibaba Restaurant SLC',
    slug: 'alibaba-restaurant-slc',
    description: 'Traditional Middle Eastern and Mediterranean cuisine. Generous portions, halal certified.',
    categoryName: 'Restaurants & Food',
    listingType: 'service',
    contactName: 'Alibaba',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Good Pie Pizzeria',
    slug: 'good-pie-pizzeria',
    description: 'Halal pizza made with quality ingredients. Family-friendly with vegetarian options.',
    categoryName: 'Restaurants & Food',
    listingType: 'service',
    contactName: 'Good Pie',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Afghan Kitchen',
    slug: 'afghan-kitchen',
    description: 'Authentic Afghan cuisine featuring kabobs, rice dishes, and traditional bread. 100% halal.',
    categoryName: 'Restaurants & Food',
    listingType: 'service',
    contactName: 'Afghan Kitchen',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Zeitoon Cafe',
    slug: 'zeitoon-cafe',
    description: 'Persian and Mediterranean cuisine. Fresh kebabs, stews, and rice dishes. Halal certified.',
    categoryName: 'Restaurants & Food',
    listingType: 'service',
    contactName: 'Zeitoon Cafe',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },

  // GROCERY & HALAL MEAT
  {
    title: 'Halal Meat Market',
    slug: 'halal-meat-market',
    description: 'Fresh halal meat including beef, lamb, goat, and chicken. Competitive prices and friendly service.',
    categoryName: 'Grocery & Halal Meat',
    listingType: 'product',
    contactName: 'Halal Meat Market',
    contactPhone: '(801) 952-0786',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Halal Market',
    slug: 'halal-market',
    description: 'Full-service halal grocery store with fresh meats, spices, and imported goods from the Middle East.',
    categoryName: 'Grocery & Halal Meat',
    listingType: 'product',
    contactPhone: '(801) 952-0786',
    city: 'West Valley City',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Safa Halal Market',
    slug: 'safa-halal-market',
    description: 'Halal groceries, fresh meat, and international foods. Serving the West Valley community.',
    categoryName: 'Grocery & Halal Meat',
    listingType: 'product',
    contactName: 'Safa Market',
    city: 'West Valley City',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Abdi Bros Market',
    slug: 'abdi-bros-market',
    description: 'Somali and East African grocery store. Fresh halal meats and African specialty items.',
    categoryName: 'Grocery & Halal Meat',
    listingType: 'product',
    contactName: 'Abdi Bros',
    city: 'South Salt Lake',
    status: 'approved',
    approved: true,
  },
  {
    title: 'African Star Market',
    slug: 'african-star-market',
    description: 'African groceries and halal products. Specialty items from East Africa.',
    categoryName: 'Grocery & Halal Meat',
    listingType: 'product',
    contactName: 'African Star',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Mediterranean Market & Deli',
    slug: 'mediterranean-market-deli',
    description: 'Mediterranean and Middle Eastern groceries. Fresh deli items and imported products.',
    categoryName: 'Grocery & Halal Meat',
    listingType: 'product',
    contactName: 'Mediterranean Market',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Namaste Nanglo Groceries',
    slug: 'namaste-nanglo-groceries',
    description: 'South Asian grocery store with halal meats and specialty spices.',
    categoryName: 'Grocery & Halal Meat',
    listingType: 'product',
    contactName: 'Namaste Nanglo',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Shaku Maku Market',
    slug: 'shaku-maku-market',
    description: 'Middle Eastern market with fresh halal meats, groceries, and prepared foods.',
    categoryName: 'Grocery & Halal Meat',
    listingType: 'product',
    contactName: 'Shaku Maku',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Apna Bazaar',
    slug: 'apna-bazaar',
    description: 'Indian and Pakistani grocery store. Halal meats, spices, and imported goods.',
    categoryName: 'Grocery & Halal Meat',
    listingType: 'product',
    contactName: 'Apna Bazaar',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Qaderi Sweetz',
    slug: 'qaderi-sweetz',
    description: 'Afghan and Middle Eastern sweets and pastries. Perfect for celebrations and gifts.',
    categoryName: 'Grocery & Halal Meat',
    listingType: 'product',
    contactName: 'Qaderi Sweetz',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },

  // SERVICES
  {
    title: 'Muslim Funeral Services Utah',
    slug: 'muslim-funeral-services-utah',
    description: 'Islamic funeral and burial services according to Shariah. Compassionate care for families during difficult times.',
    categoryName: 'Services',
    listingType: 'service',
    contactName: 'Islamic Funeral Services',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Islamic Marriage Services',
    slug: 'islamic-marriage-services',
    description: 'Nikah services, premarital counseling, and marriage certificates. Licensed Islamic officiants.',
    categoryName: 'Services',
    listingType: 'service',
    contactName: 'Imam Services',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },

  // EDUCATION
  {
    title: 'Quran Academy Utah',
    slug: 'quran-academy-utah',
    description: 'Online and in-person Quran classes for all ages. Tajweed, memorization, and Arabic language.',
    categoryName: 'Education & Tutoring',
    listingType: 'service',
    contactName: 'Quran Academy',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Arabic Language Tutoring',
    slug: 'arabic-language-tutoring',
    description: 'Private Arabic lessons for beginners to advanced. Modern Standard Arabic and Quranic Arabic.',
    categoryName: 'Education & Tutoring',
    listingType: 'service',
    contactName: 'Arabic Tutor',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },

  // PROFESSIONAL SERVICES
  {
    title: 'Halal Financial Consulting',
    slug: 'halal-financial-consulting',
    description: 'Islamic finance consulting. Shariah-compliant investments, mortgages, and business financing.',
    categoryName: 'Professional Services',
    listingType: 'service',
    contactName: 'Islamic Finance',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Muslim Real Estate Agent',
    slug: 'muslim-real-estate-agent',
    description: 'Helping Muslim families find their dream home. Knowledgeable about halal financing options.',
    categoryName: 'Real Estate',
    listingType: 'service',
    contactName: 'Muslim Realtor',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },
];

async function main() {
  console.log('🌙 Seeding MIC Utah Halal Marketplace...\n');

  // Create categories
  console.log('📁 Creating categories...');
  for (const category of categories) {
    await prisma.listingCategory.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }
  console.log(`   ✅ ${categories.length} categories created\n`);

  // Create listings
  console.log('🏪 Creating sample listings...');
  for (const listing of sampleListings) {
    const slug = listing.slug;
    
    // Find category
    const category = await prisma.listingCategory.findUnique({
      where: { name: listing.categoryName },
    });

    await prisma.listing.upsert({
      where: { slug },
      update: {
        ...listing,
        categoryId: category?.id,
      },
      create: {
        ...listing,
        categoryId: category?.id,
      },
    });
  }
  console.log(`   ✅ ${sampleListings.length} listings created\n`);

  console.log('🎉 Marketplace seeding complete!');
  console.log(`   📁 ${categories.length} categories`);
  console.log(`   🏪 ${sampleListings.length} business listings`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
