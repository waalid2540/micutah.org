import { Coordinates, PrayerTimes, CalculationMethod, Madhab } from 'adhan';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

// Salt Lake City coordinates
const MASJID_COORDINATES = {
  latitude: 40.7718,
  longitude: -111.9298,
};

// Timezone for Salt Lake City
const TIMEZONE = 'America/Denver';

export interface PrayerTimeData {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  date: string;
  hijriDate: string;
}

export function calculatePrayerTimes(date: Date = new Date()): PrayerTimeData {
  const coordinates = new Coordinates(
    MASJID_COORDINATES.latitude,
    MASJID_COORDINATES.longitude
  );

  // Using Islamic Finder calculation method (ISNA - 15° for Fajr and Isha)
  const params = CalculationMethod.NorthAmerica();
  params.madhab = Madhab.Hanafi; // Hanafi school for Asr timing (later Asr)

  const prayerTimes = new PrayerTimes(coordinates, date, params);

  const formatTime = (time: Date): string => {
    return formatInTimeZone(time, TIMEZONE, 'h:mm a');
  };

  return {
    fajr: formatTime(prayerTimes.fajr),
    sunrise: formatTime(prayerTimes.sunrise),
    dhuhr: formatTime(prayerTimes.dhuhr),
    asr: formatTime(prayerTimes.asr),
    maghrib: formatTime(prayerTimes.maghrib),
    isha: formatTime(prayerTimes.isha),
    date: format(date, 'yyyy-MM-dd'),
    hijriDate: getHijriDate(date),
  };
}

export function getNextPrayer(prayerTimes: PrayerTimeData): {
  name: string;
  time: string;
  isNow: boolean;
} {
  const now = new Date();
  const currentTime = format(now, 'HH:mm');

  const prayers = [
    { name: 'Fajr', time: prayerTimes.fajr },
    { name: 'Sunrise', time: prayerTimes.sunrise },
    { name: 'Dhuhr', time: prayerTimes.dhuhr },
    { name: 'Asr', time: prayerTimes.asr },
    { name: 'Maghrib', time: prayerTimes.maghrib },
    { name: 'Isha', time: prayerTimes.isha },
  ];

  for (const prayer of prayers) {
    if (prayer.time > currentTime) {
      return { ...prayer, isNow: false };
    }
  }

  // If all prayers have passed, next prayer is Fajr tomorrow
  return { name: 'Fajr', time: prayerTimes.fajr, isNow: false };
}

// Simple Hijri date calculation (approximate)
export function getHijriDate(date: Date): string {
  // Using a simple conversion - for production, use a proper Hijri calendar library
  const gregorianYear = date.getFullYear();
  const gregorianMonth = date.getMonth() + 1;
  const gregorianDay = date.getDate();

  // Approximate conversion (not 100% accurate but good for display)
  const jd = Math.floor((1461 * (gregorianYear + 4800 + Math.floor((gregorianMonth - 14) / 12))) / 4) +
    Math.floor((367 * (gregorianMonth - 2 - 12 * Math.floor((gregorianMonth - 14) / 12))) / 12) -
    Math.floor((3 * Math.floor((gregorianYear + 4900 + Math.floor((gregorianMonth - 14) / 12)) / 100)) / 4) +
    gregorianDay - 32075;

  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const lPrime = l - 10631 * n + 354;
  const j = Math.floor((10985 - lPrime) / 5316) * Math.floor((50 * lPrime) / 17719) +
    Math.floor(lPrime / 5670) * Math.floor((43 * lPrime) / 15238);
  const lDoublePrime = lPrime - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const hijriMonth = Math.floor((24 * lDoublePrime) / 709);
  const hijriDay = lDoublePrime - Math.floor((709 * hijriMonth) / 24);
  const hijriYear = 30 * n + j - 30;

  const hijriMonths = [
    'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaban',
    'Ramadan', 'Shawwal', 'Dhul Qadah', 'Dhul Hijjah'
  ];

  return `${hijriDay} ${hijriMonths[hijriMonth - 1]} ${hijriYear} AH`;
}

// Get Ramadan countdown
export function getRamadanCountdown(): { days: number; isRamadan: boolean } {
  // For 2026, Ramadan is expected to start around February 17th
  // This should be updated based on moon sighting
  const ramadanStart = new Date('2026-02-17');
  const ramadanEnd = new Date('2026-03-19');
  const now = new Date();

  if (now >= ramadanStart && now <= ramadanEnd) {
    return { days: 0, isRamadan: true };
  }

  const timeDiff = ramadanStart.getTime() - now.getTime();
  const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return { days: Math.max(0, days), isRamadan: false };
}

// Default Iqamah times (can be overridden from database)
export const DEFAULT_IQAMAH_TIMES = {
  fajr: '06:00',
  dhuhr: '13:30',
  asr: '16:30',
  maghrib: '+10', // 10 minutes after adhan
  isha: '20:30',
};
