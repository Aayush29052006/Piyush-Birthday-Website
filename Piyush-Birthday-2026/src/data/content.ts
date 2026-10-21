// ALL EDITABLE TEXT LIVES HERE. Facts used: Aayush and Piyush have been friends for ten years,
// from 5th standard until now in engineering. Edit any text below to personalise it.
export const BIRTHDAY_ISO = '2026-10-31T00:00:00+05:30' // 31 Oct 2026, 12:00 AM IST

export const intro = {
  line1: 'Some friendships deserve more than a message.',
  line2: 'THIS ONE IS FOR YOU, PIYUSH.',
  title: 'A Birthday Film',
  button: 'ENTER OUR STORY',
}

export const hero = {
  headline: ['Happy', 'Birthday,', 'Piyush.'],
  dateLabel: '31 October 2026',
  eyebrow: 'A birthday film by Aayush',
  photoCaption: 'Ten years later, still side by side.',
  invite: 'Come walk through our memories',
  tagline: 'Ten years. 5th standard to engineering.',
}

export const countdownCopy = {
  label: 'Until your day',
  today: 'It is your birthday, Piyush. Go enjoy every second of it.',
  after: 'Your birthday has passed, but the memories stay. Happy Birthday again, Piyush.',
}

// One short quote per page, shown above the page buttons. Edit freely.
export const pageQuotes: Record<string, string> = {
  welcome: 'Ten years in, and I still would not pick anyone else for the next ten.',
  story: 'From 5th standard to engineering, the plan kept changing. The friend never did. Piyush stood by me through all of it.',
  memories: 'A photograph freezes a second. A friendship fills the ten years around it.',
  timeline: 'Some people pass through your timeline. Piyush is the thread running through it, in good days and bad ones.',
  funny: 'Ten years of friendship, and the laughs are still the best evidence.',
  scrapbook: 'Some memories need no filter, just a little tape. And a friend who is still here ten years later.',
  letter: 'Thank you for staying, from 5th standard until now. Thank you for standing with me in every condition.',
  cake: 'One more year older. Same friend, still the best part of it. Make a wish. You deserve all of them.',
  surprise: 'Ten years in, and there is still room for surprises. You are family to me, Piyush.',
}

// photoId 'none' shows a quote card instead of a photo. Other ids come from public/memories/manifest.json.
export const chapters = [
  { title: 'Chapter One', heading: 'It started in 5th standard', text: 'Two kids in 5th standard with no idea they were starting something that would last ten years. Back then it was just a friend to sit next to. Today he is my brother.', photoId: 'none', big: '10' },
  { title: 'Chapter Two', heading: 'Every year since', text: 'From school to engineering, a lot changed: classes, plans, even the way we look. The friendship stayed. Piyush has stood with me in every condition, whether things were going great or going wrong, and he never once made me feel alone.', photoId: 'i85', big: '' },
  { title: 'Chapter Three', heading: 'Still going', text: 'Ten years in, still making new memories and still finding reasons to take another photo together. A best friend forever is not a figure of speech for us. It is just the truth.', photoId: 'i51', big: '' },
]

// Timeline is built automatically from the trips in the photo manifest (oldest to newest).
// Add a note for any trip here; leave it out and the card just shows the photo count. Only write true things.
export const timelineIntro = { title: '5th standard', caption: 'Where it all began, ten years ago.', label: 'Ten years ago' }
export const tripNotes: Record<string, string> = {
  'Bike ride': 'Wind, helmets and good company.',
  'The burger shop': 'Ten years later, still sitting side by side.',
  'Dhule trip': 'Hotel lifts and a restaurant.',
}

export const funny = {
  heading: 'Funny Moments',
  sub: 'Evidence. Admissible in the court of friendship.',
  // Only things that really happened, taken from your own captions. Tap a card to reveal it.
  insideJokes: [
    { joke: '"Bro is trying to do magic."', note: 'Bibi Ka Maqbara. The photo does not lie.' },
    { joke: 'Just our shadows.', note: 'The best photo from the Sambhajinagar trip, apparently.' },
    { joke: 'Hotel lift photos, twice.', note: 'Dhule, November 2025. We clearly never learn.' },
  ],
}

// Birthday reels. These clips belong to their creators; each one is credited with a link to their profile.
export const reels = {
  heading: 'Birthday reels',
  sub: 'A couple of messages the internet made for you, bhai.',
  items: [
    { src: 'reels/kitten-hello.mp4', poster: 'reels/kitten-hello.jpg', w: 720, h: 720, caption: 'Hello, birthday boy!', handle: '_loaf.kitten', url: 'https://www.instagram.com/_loaf.kitten/' },
    { src: 'reels/bhai-birthday.mp4', poster: 'reels/bhai-birthday.jpg', w: 1080, h: 608, caption: 'Bhai birthday Mubarak. Hak banta hai!', handle: 'baba_tillu__no_1', url: 'https://www.instagram.com/baba_tillu__no_1/' },
  ],
}

export const scrapbook = { heading: 'The Scrapbook', sub: 'Pinned, taped and never thrown away.' }

export const letter = {
  heading: 'A letter, from me to you',
  // Written by Aayush (lightly edited). **text** is shown in bold.
  salute: 'Piyush,',
  paragraphs: [
    'I could have sent you a quick birthday message today and made you smile for a moment. But ten years of friendship deserve more than a few words on a screen. You deserve something made with the same love and care that you have given me all these years. So, I built this for you.',
    'We started our journey back in 5th standard. Who would have thought that two kids back then would grow up, find their way into engineering, and still be standing beside each other after all these years? Life has changed in so many ways since then. We have grown up, made memories, faced challenges, and stepped into new chapters of our lives. But through all those changes, one thing has remained constant. **You have always been there.**',
    'You are not just my best friend. You are my brother from another mother, my forever person, and someone I know I can count on no matter what life throws at me.',
    'Some people stay around when life is good. But the people who stay when things get difficult, when nothing seems to be going right, and when you need someone the most, are the ones who truly matter. You have been that person for me. You have stood beside me through every kind of situation, and I hope you know how much that means to me. I may not always say it, but I will never take your presence in my life for granted.',
    'Ten years is a long time. We have shared countless laughs, random conversations, trips, photographs, and moments that might seem ordinary to everyone else but mean the world to me. And honestly, I think that is what makes our friendship so special. It is not just about the big moments. It is about all the little ones that became unforgettable simply because we lived them together.',
    'If there is one thing I am genuinely grateful for, it is that life gave me a friend like you. Someone who has seen different versions of me and stayed. Someone I can be myself with, without having to explain everything. A friendship like ours is rare, and I hope we never lose what we have built over these ten years.',
    'As you begin another year of your life, I wish you more than just happiness on your birthday. I hope you find success in everything you work hard for. I hope your dreams become plans, your plans become reality, and all the things you have been wishing for slowly find their way to you. I hope life gives you countless reasons to smile, people who genuinely care about you, and memories that make you proud of the person you are becoming.',
    'And no matter where life takes us, how busy we get, or how much things change, I want you to remember one thing. **You will always have me in your corner.** Through the good days, the difficult ones, the unexpected turns, and every new chapter that awaits us. Just as you have stood beside me, I will always stand beside you.',
    'This is not the end of a ten-year journey. It is just another chapter in a friendship I hope we get to celebrate for decades to come. There are more trips to take, more photographs to capture, more stupid things to laugh about, more dreams to chase, and so many memories we have not made yet.',
    'And I cannot wait to make them all with you, bro.',
  ],
  closing: ['Happy Birthday, Piyush! ❤️🎂', 'Thank you for being more than a friend. Thank you for being family.', '**Ten years down, forever to go.**'],
  signoff: 'Your best friend,',
  from: 'Aayush',
  asideNote: 'Ten years down, forever to go.',
}

export const cake = {
  prompt: 'Close your eyes. Make a wish.',
  button: 'Blow out the candles',
  reveal: 'May every wish you made find its way to you. Happy Birthday, Piyush!',
}

export const surprise = {
  prompt: 'There is something here for you…',
  button: 'Open it',
  title: 'One more thing',
  message: 'Ten years, countless trips, and a phone full of photos of us doing nothing in particular. Thank you for standing with me in every condition, Piyush. Here is to the next ten, and every one after that.',
}

export const finale = {
  headline: 'Happy Birthday, Piyush!',
  message: 'Ten years, and I would still pick you as my friend. Thank you for always standing with me.',
  replay: 'Replay the story',
  back: 'Back to the memories',
}

export const easterEggs = {
  konami: 'You found the secret. Piyush always was the curious one.',
  logoClicks: 'Five taps on the P. Piyush has fans everywhere.',
}
