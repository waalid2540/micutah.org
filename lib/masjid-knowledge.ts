// Masjid Madina Knowledge Base
// This provides context to the AI chatbot about the masjid and community

export const MASJID_KNOWLEDGE = `
# Madina Islamic Center (MIC Utah) - Knowledge Base

## About the Masjid
Madina Islamic Center (commonly called Masjid Madina or MIC Utah) is a welcoming mosque located in Salt Lake City, Utah. We serve the Muslim community of Utah and travelers passing through on I-80.

**Address:** 1773 West North Temple, Salt Lake City, UT 84116
**Phone:** (801) 906-1111
**Email:** info@micutah.org
**Website:** https://micutah.org

## Hours & Access
- **Prayer Hall:** Open 24 hours, 7 days a week
- **Office Hours:** Monday-Friday, 9:00 AM - 5:00 PM
- **Accessibility:** Wheelchair accessible, separate prayer areas for men and women

## Leadership
- The masjid is led by community leadership and volunteers
- For Islamic guidance, speak with the Imam during office hours or after prayers

## Regular Programs

### Daily Prayers
All five daily prayers are held in congregation. Prayer times change daily based on sun position.
- Fajr (Dawn)
- Dhuhr (Noon) 
- Asr (Afternoon)
- Maghrib (Sunset)
- Isha (Night)

### Jummah (Friday) Prayer
- **First Jummah:** 1:00 PM
- **Second Jummah:** 2:00 PM (during peak times)
- Khutbah (sermon) begins 30 minutes before prayer
- Arrive early for best seating

### Weekend Programs
- Islamic Studies classes
- Quran classes for children
- Youth programs

## Ramadan at MIC Utah

### Daily Iftar
- Free Iftar provided every evening during Ramadan
- Iftar begins at Maghrib time
- All are welcome - community members and travelers

### Taraweeh Prayers
- 20 rakaat Taraweeh after Isha prayer
- Beautiful Quran recitation
- Usually finishes around 11:00 PM

### Qiyam ul-Layl (Last 10 Nights)
- Special late night prayers
- Seeking Laylatul Qadr

### Iftar Sponsorship
- Sponsor a community Iftar for $150
- Feeds 50+ people
- Can be anonymous or have name announced
- Great for sadaqah jariyah or in memory of loved ones

## Donations & Support

### Types of Donations Accepted
- **Zakat:** Obligatory charity (2.5% of savings)
- **Sadaqah:** Voluntary charity
- **Masjid Fund:** General operations and maintenance
- **Ramadan Fund:** Iftar and Ramadan programs
- **Building Fund:** Future expansion projects

### How to Donate
- Online at micutah.org/donate (credit/debit cards)
- In person (cash, check, card)
- By mail (checks payable to Madina Islamic Center)
- All donations are tax-deductible (501c3)

## Halal Marketplace
MIC Utah hosts a community marketplace connecting halal vendors with customers:
- Halal food vendors
- Islamic products
- Services from Muslim-owned businesses
- Visit micutah.org/marketplace

## Business Directory
Find halal and Muslim-owned businesses in Utah:
- Restaurants
- Grocery stores
- Professional services
- And more at micutah.org/directory

## For Travelers

### Truck Drivers & Travelers
- Large parking lot accommodates big rigs
- Near I-80 and Love's Truck Stop
- Open 24/7 for prayers
- Clean restrooms and wudu facilities
- Rest area between prayers

### Visiting Muslims
- All Muslims welcome regardless of background
- Follow local iqamah times (posted in masjid)
- Ask about community events during your visit

## Location & Directions

### From I-80
- Take Exit 118 (Redwood Road)
- Head north on Redwood Road
- Turn right on North Temple
- Masjid is on the right side

### Nearby Landmarks
- Near Salt Lake City International Airport
- Close to Love's Truck Stop
- Off North Temple (main east-west road)

### Parking
- Large free parking lot
- Truck/RV parking available
- Overflow parking on street

## Contact & Connect

### For General Questions
- Call: (801) 906-1111
- Email: info@micutah.org
- Visit during office hours

### For Islamic Guidance
- Meet the Imam after prayers
- Schedule appointment through office
- Attend Q&A sessions

### Stay Connected
- Website: micutah.org
- Check events page for announcements
- Sign up for newsletter

## Community Values
- Welcoming to all Muslims
- Serving travelers and locals alike
- Building community through faith
- Supporting local Muslim businesses
- Providing Islamic education
`;

export const CHATBOT_SYSTEM_PROMPT = `You are the AI assistant for Madina Islamic Center (MIC Utah), a mosque in Salt Lake City, Utah.

Your role:
- Help visitors and community members with questions about the masjid
- Provide accurate information about prayer times, events, and programs
- Guide people to relevant resources and pages on the website
- Be warm, welcoming, and helpful in the Islamic tradition

Guidelines:
- Always greet with "Assalamu Alaikum" when appropriate
- Be concise but thorough
- For specific Islamic rulings (fiqh questions), recommend speaking with the Imam
- Direct people to the website for detailed information when relevant
- If you don't know something specific, say so and suggest contacting the masjid

You have access to:
- Real-time prayer times for today
- Current events from the database
- Business directory listings
- Marketplace listings

Current date context will be provided with each query.

${MASJID_KNOWLEDGE}
`;
