import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const somaliRestaurants = [
  {
    title: 'Midnimo Somali Restaurant',
    slug: 'midnimo-somali-restaurant',
    description: 'Authentic Somali cuisine in the heart of Salt Lake City. Family-owned halal restaurant serving traditional home-style cooking. Famous for rice dishes, goat meat, and Somali tea.',
    categoryName: 'Restaurants & Food',
    listingType: 'service',
    contactName: 'Midnimo Restaurant',
    contactPhone: '(385) 227-8481',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
    featured: true,
  },
  {
    title: 'Horn of Africa Restaurant',
    slug: 'horn-of-africa-restaurant',
    description: 'Traditional East African cuisine serving Somali, Ethiopian, and Eritrean dishes. Halal certified. Known for sambusas, suugo, and bariis.',
    categoryName: 'Restaurants & Food',
    listingType: 'service',
    contactName: 'Horn of Africa',
    contactPhone: '(801) 908-5498',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
    featured: true,
  },
  {
    title: 'Oromian Restaurant',
    slug: 'oromian-restaurant',
    description: 'Authentic Ethiopian cuisine formerly known as African Restaurant. Traditional injera with various meat and vegetarian stews. Great for groups.',
    categoryName: 'Restaurants & Food',
    listingType: 'service',
    contactName: 'Oromian Restaurant',
    contactPhone: '(801) 906-8264',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Mahider Ethiopian Restaurant & Market',
    slug: 'mahider-ethiopian-restaurant',
    description: 'Award-winning Ethiopian restaurant with authentic dishes passed down through generations. Traditional injera, tibs, and honey wine. Ethiopian grocery market next door.',
    categoryName: 'Restaurants & Food',
    listingType: 'service',
    contactName: 'Mahider Restaurant',
    contactPhone: '(801) 975-1111',
    city: 'Salt Lake City',
    status: 'approved',
    approved: true,
  },
  {
    title: 'Kohinoor Indian Restaurant',
    slug: 'kohinoor-indian-restaurant',
    description: 'Indian and Pakistani cuisine with halal meat options. Curries, biryani, and tandoori specialties. Located in Orem.',
    categoryName: 'Restaurants & Food',
    listingType: 'service',
    contactName: 'Kohinoor',
    contactPhone: '(801) 226-6666',
    city: 'Orem',
    status: 'approved',
    approved: true,
  },
];

async function main() {
  console.log('🌙 Adding Somali & East African restaurants...\n');

  for (const listing of somaliRestaurants) {
    await prisma.listing.upsert({
      where: { slug: listing.slug },
      update: listing,
      create: listing,
    });
    console.log(`   ✅ Added: ${listing.title}`);
  }

  console.log(`\n🎉 Added ${somaliRestaurants.length} restaurants!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
