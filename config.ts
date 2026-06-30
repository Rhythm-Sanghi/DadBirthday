// ============================================================
// config.ts — FILL THIS IN BEFORE DEPLOYING
// ============================================================
// This is the single file you need to edit to personalize the
// birthday OS for your recipient. Everything in the app pulls
// from this configuration.
// ============================================================

import { s } from "framer-motion/client";

export const config = {
  birthday: {
    recipientName: 'Sumit Sanghi',        // Appears everywhere
    recipientFirstName: 'Sumit',          // Used in friendly messages
    recipientAge: 47,                     // FILL ME IN: actual age
    gifterName: 'Rhythm Sanghi',          // Your name
    date: '28th June 2005',            // FILL ME IN: e.g. "July 4th, 2025"
    personalMessage:
      "You're the most amazing person — full of warmth, wisdom, and the kind of energy that lights up every room. This little OS is our way of saying: you are deeply loved.",
    // The year this OS is themed around — the year that shaped him most
    systemYear: '1995',                  // FILL ME IN: e.g. "1995" (when he turned 16)
    // Short phrase shown under the OS logo on boot
    bootSubtitle: 'A year to remember', // FILL ME IN: e.g. "The Year Everything Changed"
  },

  // ============================================================
  // REAL SONGS from his teen/young-adult years — artist names
  // matter most. Replace with the actual tracks he loved.
  // ============================================================
  dadJams: [
    { id: 1, title: 'O Sanam', artist: 'Lucky Ali' },
    { id: 2, title: 'Thanda Thanda Paani', artist: 'Baba Sehgal' },
    { id: 3, title: 'Bolo Ta Ra Ra', artist: 'Daler Mehndi' },
    { id: 4, title: 'Made in India', artist: 'Alisha Chinai' },
    { id: 5, title: 'Closing Credits (With Love)', artist: 'Rhythm Sanghi' },
  ],

  // ============================================================
  // THEN VS NOW table — shown in the terminal via `then_vs_now`
  // ============================================================
  thenVsNow: [
    {
      label: 'Gas price (per litre)',
      then: '₹21',                       // FILL ME IN: actual 1995 price
      now: '₹111',                      // FILL ME IN: current price
    },
    {
      label: '#1 song',
      then: 'O Sanam — Lucky Ali',        // FILL ME IN
      now: 'Whatever is on his phone',   // FILL ME IN
    },
    {
      label: 'He was busy',
      then: 'Complaining about strict parents', // FILL ME IN with a real memory
      now: 'Ahem...',                    // FILL ME IN
    },
    {
      label: 'Mobile phone',
      then: 'What phone?',                // FILL ME IN
      now: 'Anything that has working Teams & WhatsApp!',  // FILL ME IN
    },
  ],

  // ============================================================
  // DAD SKILLS — shown in Control Panel as installed programs.
  // Add real skills / running jokes about him.
  // ============================================================
  dadSkills: [
    {
      name: 'Chai_Brewing.exe',
      version: '47.0',
      status: 'Always running — cannot be paused',
    },
    {
      name: 'Dad_Jokes.dll',
      version: '∞',
      status: 'Cannot be uninstalled. Tried.',
    },
    {
      name: 'Fixing_Things_With_Tape.exe',
      version: '47.0',
      status: 'Runs even when not needed',
    },
    {
      name: 'Early_Riser.exe',
      version: '47.0',
      status: 'Boots before sunrise. Always.',
    },
    {
      name: 'House_Support_Request.dll', // FILL ME IN
      version: '1.0',
      status: 'Awaiting child\'s assistance...',
    },
  ],

  // ============================================================
  // VOICEMAIL — optional audio file for Messages.exe.
  // If the audio file doesn't exist, transcriptFallback is shown
  // as a typewriter effect instead.
  // ============================================================
  voicemail: {
    // Place your audio file at /public/audio/dad-voicemail.mp3
    // Leave as '/audio/dad-voicemail.mp3' if you have the file,
    // or set to '' to always use the text fallback.
    audioPath: '/audio/dad-voicemail.mp3',
    // FILL ME IN: a short heartfelt message, shown line by line
    // if no audio file is present.
    transcriptFallback: [
      `Happy Birthday.`,

    ],
    callerName: 'Rhythm Sanghi',         // FILL ME IN: who left the message
    callerDate: 'May 23, 2006',         // FILL ME IN: e.g. "June 30, 2026"
  },

  insideJokes: [
    'Why is Dad always 15 minutes early to everything? The world may never know.',
    'Dad\'s famous advice: "Beta, always keep a spare pen." (I carrie 7. 😎)',
    'That time he fixed something with just tape, a rubber band, and pure confidence.',
    'His playlist hasn\'t changed since 2003...',
    'Giving the "we should eat healthier" speech, then being the first one to suggest ice cream',
    'His superpower: turning a 5-minute chore into a 2-hour event. A true masterclass in efficiency',
    'Saying "I am ready, let\'s go!" and then spending 15 minutes checking every switch and lock in the house.',
    'The man who can fall asleep anywhere, at any time. His superpower: instant napping.',
  ],

  terminalFacts: [
    'Can detect a running fan or a switched-on AC in an empty room from up to 5 kilometers away.',
    'Flight departs at 8:00 PM. He is fully dressed and guarding the luggage at the front door by 2:30 PM.',
    'Can pack a three-week family vacation into a single suitcase using advanced spatial geometry.',
    'When the Wi-Fi goes down, his first troubleshooting step is loudly asking, "Rhythm what are you doing?"',
    'Successfully calculates compound interest on fixed deposits faster than the bank manager can open Excel.'
  ],

  stories: [
    {
      id: 'intro',
      filename: 'Welcome_To_The_Vault.txt',
      content: `WELCOME TO THE VAULT OF SUMIT SANGHI
======================================

Dear Dad (and anyone else who somehow found this),

This is a collection of stories, memories, and moments 
that make you... well, YOU.

We've been collecting these for years. Some of them 
you've told us. Some of them we witnessed firsthand. 
All of them have made us laugh, think, and feel 
incredibly lucky to have you in our lives.

Navigate through the files on the left to explore.

With all our love,
Rhythm & The Whole Family

P.S. No, you cannot delete these files.
P.P.S. We made backups.`,
    },
    {
      id: 'wisdom',
      filename: 'Dad_Wisdom_101.txt',
      content: `DAD WISDOM 101: A FIELD GUIDE
==============================

Over the years, Dad has dispensed wisdom at the most 
unexpected moments. We have been collecting them.

THE CLASSICS:
─────────────

"Wake up early and half your problems are solved."
  Status: Currently running tests. Results pending.

"Read the map BEFORE you leave, not during."
  Status: Validated by 3 road trips.

"Money doesn't grow on trees, turn off the fan."
  Status: Executed perfectly every time we leave a room.

"Focus on your studies now, enjoy later."
  Status: Successfully compiled into a CS engineering degree.

"Save 20% before you spend a single rupee."
  Status: Financial algorithm operating at peak efficiency.

THE ADVANCED COLLECTION:
─────────────────────────

"A clean car drives better. Don't ask me the physics of it, it just does."

"You don't need a calculator for that, just use your head."

"Never let the petrol tank go below the halfway mark."

"There are no shortcuts in life. Except the one I take to avoid city traffic."

We love you, Dad.
This software runs on your values.`,
    },
    {
      id: 'birthday-roast',
      filename: 'Official_Birthday_Roast.txt',
      content: `OFFICIAL BIRTHDAY ROAST
(With Maximum Love, Minimum Mercy)
====================================

ATTENTION: The following document contains 
mild roasting. Reader discretion advised.

ITEM 1: THE EARLY BIRD
He wakes up before the birds. Before the alarm. 
Before time itself. We have never once beaten 
him downstairs. We never will.

ITEM 2: THE MASTER ENGINEER
Why call a professional when you have Dad, a butter 
knife, and sheer willpower? It might take him three 
days and a lot of heavy sighing, but by God, he 
will fix that leaking pipe.

ITEM 3: THE RESTAURANT AUDITOR
When the bill arrives at a restaurant, the fun stops. 
He puts on his reading glasses. He calculates the GST 
in his head. He checks every single line item. A 5-rupee 
discrepancy is not just a mistake—it is a matter of 
absolute principle.

ITEM 4: THE 10-MINUTE STORY
When Dad says "let me tell you something quickly,"
clear your afternoon. Bring snacks. It's a SAGA.
And we love every word of it.

ITEM 5: THE IMMORTAL T-SHIRT
There is a shirt in his closet that is arguably older 
than I am. We have tried to throw it away. We are not 
allowed. Why? Because "the fabric is still very good" 
and "they don't make cotton like this anymore." It is 
faded. It has a hole. It is his favorite weekend wear.


IN CONCLUSION:
You are the funniest, most loveable, most 
infuriating (in the best way) person we know.

Happy Birthday, Dad.
We would not trade you for ANY other dad.
(Mostly.) 

— Your loving family who roasts you because we adore you`,
    },
    {
      id: 'memories',
      filename: 'The_Best_Moments.txt',
      content: `THE BEST MOMENTS
(A Growing List)
=================

✓ Every road trip where we got "slightly" lost
✓ The silent way you show love by randomly bringing us plates of cut fruit
✓ The quiet sacrifices you made so we could have the loudest victories
✓ The deep comfort of knowing you are always just one phone call away, no matter the time
✓ The advice you gave that we pretended to ignore
  (but actually took every single time)
✓ Family dinners that became legendary dinner conversations
✓ The stories about your childhood that get better each year
✓ The way you remember every small thing about us
✓ Your laugh — which fills up the whole room
✓ Being our safe place, always, no questions asked

The list goes on.
It always will.

Happy Birthday to the man behind all our
best memories.

We love you more than words in a .txt file
can possibly express.

— The whole Sanghi family 💙`,
    },
    {
      id: 'letter',
      filename: 'A_Letter_From_Rhythm.txt',
      content: `A LETTER FROM RHYTHM
=====================

Dear Dad,

I made you a whole operating system for your birthday.
I know. Overachiever. Takes after you.

But here's the thing — nothing I build, write, or 
create will ever quite capture what you mean to us.

You are the person who made everything feel possible.
Who showed up, quietly and completely, every single time.
Who gave advice when asked and (mostly) held back when not.
Who made home feel like home, wherever we were.

This little OS is filled with inside jokes and memories 
and absolutely terrible puns because that's how we love.
Loudly, creatively, with 100% commitment and zero sleep.

You deserve every good thing.
You deserve THIS (a whole computer OS as a gift).

Thank you for being my Dad.
Thank you for being YOU.

Happy Birthday. 

With everything I've got,
Rhythm

P.S. Please don't try to install this on an actual computer.
P.P.S. I'll help you share the link though. Obviously.`,
    },
  ],

  photos: {
    'Early Years': [] as string[],
    'Adventures': [] as string[],
    'Family Moments': [] as string[],
    'Recent Highlights': [] as string[],
  },

  desktopWallpaper: 'teal' as 'teal' | 'bricks' | 'clouds',
}
