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
  today: 'It is your birthday, Piyush. Go enjoy every second of it, brother.',
  after: 'Your birthday has passed, but the memories stay. Happy Birthday again, Piyush.',
}

// One short quote per page, shown above the page buttons. Edit freely.
export const pageQuotes: Record<string, string> = {
  welcome: 'Ten years in, and I still would not pick anyone else for the next ten. He is my brother from another mother.',
  story: 'From 5th standard to engineering, the plan kept changing. The friend never did. Piyush stood by me through all of it.',
  memories: 'A photograph freezes a second. A friendship fills the ten years around it. Every one of these has my brother in it.',
  timeline: 'Some people pass through your timeline. Piyush is the thread running through it, in good days and bad ones.',
  funny: 'Ten years of friendship, and the laughs are still the best evidence. Nobody makes me laugh like my brother does.',
  scrapbook: 'Some memories need no filter, just a little tape. And a friend who is still here ten years later.',
  letter: 'Thank you for staying, from 5th standard until now. Thank you for standing with me in every condition.',
  cake: 'One more year older. Same friend, still the best part of it. Make a wish, brother. You deserve all of them.',
  surprise: 'Ten years in, and there is still room for surprises. You are family to me, Piyush.',
}

// photoId 'none' shows a quote card instead of a photo. Other ids come from public/memories/manifest.json.
export const chapters = [
  { title: 'Chapter One', heading: 'It started in 5th standard', text: 'Two kids in 5th standard with no idea they were starting something that would last ten years. Back then it was just a friend to sit next to. Today he is my brother from another mother.', photoId: 'none', big: '10' },
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
    { src: 'reels/bhai-birthday.mp4', poster: 'reels/bhai-birthday.jpg', w: 720, h: 406, caption: 'Bhai birthday Mubarak. Hak banta hai!', handle: 'baba_tillu__no_1', url: 'https://www.instagram.com/baba_tillu__no_1/' },
  ],
}

export const scrapbook = { heading: 'The Scrapbook', sub: 'Pinned, taped and never thrown away.' }

export const letter = {
  heading: 'A letter, from me to you',
  // Written from the facts you gave (ten years, 5th standard to engineering). It invents no events.
  paragraphs: [
    'Piyush,',
    'I could have sent you a quick message today, and you would have smiled. But ten years of friendship deserves more than a quick message, so I built you this.',
    'We started in 5th standard. Somewhere between then and now, we both grew up, changed plans, and ended up in engineering. The one thing that never changed was you being there.',
    'You are my best friend, and I mean forever. You are my brother from another mother. Some friends are there for the good days. You have been there for me in every condition, and I do not take that for granted, not for a single day.',
    'When things were easy, you were laughing next to me. When things were hard, you stood next to me and did not leave. That is rare, and I know it. A friend like you does not come twice in a lifetime.',
    'Thank you for every laugh, every trip and every photograph. Thank you for being the kind of friend who makes ordinary days feel like they were worth having.',
    'I hope this year is gentle with you and generous too. I hope the things you are working towards finally fall into place, and that you are as happy as you make the people around you. Whatever comes, I will be standing right beside you, the same way you always stood beside me.',
    'I am already looking forward to the memories we have not made yet.',
    'Happy Birthday, my brother.',
  ],
  signoff: 'Your friend,',
  from: 'Aayush',
}

export const cake = {
  prompt: 'Close your eyes. Make a wish.',
  button: 'Blow out the candles',
  reveal: 'May every wish you made find its way to you, brother. You have always been there for me, and I will always be there for you. Happy Birthday, Piyush!',
}

export const surprise = {
  prompt: 'There is something here for you…',
  button: 'Open it',
  title: 'One more thing',
  message: 'Ten years, countless trips, and a phone full of photos of us doing nothing in particular. You are my best friend forever and my brother from another mother. Thank you for standing with me in every condition, Piyush. Here is to the next ten, and every one after that.',
}

export const finale = {
  headline: 'Happy Birthday, Piyush!',
  message: 'Ten years, and I would still pick you as my friend. My best friend forever, my brother from another mother. Thank you for always standing with me. Happy Birthday, Piyush.',
  replay: 'Replay the story',
  back: 'Back to the memories',
}

export const easterEggs = {
  konami: 'You found the secret. Piyush always was the curious one.',
  logoClicks: 'Five taps on the P. Piyush has fans everywhere.',
}
