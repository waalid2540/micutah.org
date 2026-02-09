export function getRamadanPlannerWelcomeEmail(firstName: string): { subject: string; html: string } {
  const subject = "🌙 Your Ramadan Planner 2026 is here!";
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Ramadan Planner</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1a5f4a 0%, #1a1a2e 100%); padding: 40px 30px; text-align: center;">
      <div style="font-size: 60px; margin-bottom: 15px;">🌙</div>
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
        Your Ramadan Planner is Here!
      </h1>
      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
        2026 Edition
      </p>
    </div>
    
    <!-- Content -->
    <div style="padding: 40px 30px;">
      <p style="font-size: 18px; color: #1a1a2e; margin: 0 0 20px 0;">
        Assalamu Alaikum ${firstName}! 👋
      </p>
      
      <p style="font-size: 16px; color: #4a5568; line-height: 1.6; margin: 0 0 20px 0;">
        Ramadan Mubarak (or almost Mubarak if you're getting ahead of things 😊)
      </p>
      
      <p style="font-size: 16px; color: #4a5568; line-height: 1.6; margin: 0 0 30px 0;">
        Your <strong>Ultimate Ramadan Planner 2026</strong> is ready. Click below to download:
      </p>
      
      <!-- Download Buttons -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://micutah.org/downloads/ramadan-planner-2026.pdf" 
           style="display: inline-block; background-color: #1a5f4a; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 18px; font-weight: bold;">
          📄 Download PDF (Print Version)
        </a>
      </div>
      
      <div style="text-align: center; margin: 20px 0;">
        <a href="https://micutah.org/downloads/ramadan-planner-notion.zip" 
           style="display: inline-block; background-color: #6366f1; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-size: 16px; font-weight: bold;">
          📱 Download Notion Template (Digital)
        </a>
      </div>
      
      <div style="text-align: center; margin: 20px 0;">
        <a href="https://micutah.org/downloads/30-duas-complete.pdf" 
           style="display: inline-block; background-color: #c9a227; color: #1a1a2e; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-size: 16px; font-weight: bold;">
          🤲 Download 30 Daily Duas
        </a>
      </div>
      
      <p style="text-align: center; font-size: 14px; color: #6b7280;">
        <strong>PDF</strong> = Best for printing &nbsp;|&nbsp; <strong>Notion</strong> = Best for phone/tablet/computer
      </p>
      
      <!-- What's Inside -->
      <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin: 30px 0;">
        <h3 style="color: #1a5f4a; margin: 0 0 15px 0; font-size: 18px;">
          📋 What's Inside Your Planner:
        </h3>
        <ul style="color: #4a5568; margin: 0; padding-left: 20px; line-height: 1.8;">
          <li>30-day daily planner pages</li>
          <li>30 powerful duas with Arabic + meanings</li>
          <li>Quran completion tracker</li>
          <li>Last 10 nights battle plan</li>
          <li>Meal planning templates</li>
          <li>Kids activities section</li>
          <li>Eid preparation checklist</li>
        </ul>
      </div>
      
      <!-- Quick Tips -->
      <h3 style="color: #1a5f4a; margin: 30px 0 15px 0; font-size: 18px;">
        🚀 Quick tips to get started:
      </h3>
      <ol style="color: #4a5568; margin: 0; padding-left: 20px; line-height: 1.8;">
        <li><strong>Print the planner</strong> and put it somewhere visible</li>
        <li><strong>Complete the pre-Ramadan checklist</strong> before Day 1</li>
        <li><strong>Set your goals</strong> on the goals page</li>
        <li><strong>Use one daily page each day</strong> — consistency is key!</li>
      </ol>
      
      <!-- Who We Are -->
      <div style="border-top: 1px solid #e2e8f0; margin-top: 40px; padding-top: 30px;">
        <h3 style="color: #1a5f4a; margin: 0 0 10px 0; font-size: 16px;">
          Who are we?
        </h3>
        <p style="color: #4a5568; font-size: 14px; line-height: 1.6; margin: 0;">
          We're <strong>Madina Islamic Center (MIC Utah)</strong> — a community masjid in Salt Lake City. 
          We believe Islamic resources should be accessible to Muslims everywhere. That's why this toolkit is 100% free.
        </p>
      </div>
      
      <!-- What's Coming -->
      <div style="background-color: #fef3c7; border-radius: 12px; padding: 20px; margin: 30px 0;">
        <p style="color: #92400e; margin: 0; font-size: 14px;">
          <strong>📬 Coming soon:</strong> We'll send you helpful reminders and tips throughout Ramadan. 
          Stay tuned for Day 1 of Ramadan, Last 10 Nights special, and more!
        </p>
      </div>
      
    </div>
    
    <!-- Footer -->
    <div style="background-color: #1a5f4a; padding: 30px; text-align: center;">
      <p style="color: rgba(255,255,255,0.9); margin: 0 0 10px 0; font-size: 14px;">
        May Allah accept your fasting, prayers, and good deeds this Ramadan. 🤲
      </p>
      <p style="color: #c9a227; margin: 0; font-weight: bold; font-size: 16px;">
        — Your brothers and sisters at MIC Utah
      </p>
      <div style="margin-top: 20px;">
        <a href="https://micutah.org" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px;">
          micutah.org
        </a>
      </div>
    </div>
    
    <!-- Unsubscribe -->
    <div style="text-align: center; padding: 20px;">
      <p style="color: #a0aec0; font-size: 12px; margin: 0;">
        You received this email because you signed up for the Ramadan Planner at micutah.org.<br>
        <a href="https://micutah.org/unsubscribe" style="color: #a0aec0;">Unsubscribe</a>
      </p>
    </div>
    
  </div>
</body>
</html>
  `.trim();
  
  return { subject, html };
}
