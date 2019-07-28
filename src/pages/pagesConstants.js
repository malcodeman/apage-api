import nanoid from "nanoid";

export const DEFAULT_CARD_PAGE = {
  location: "Berlin",
  name: "Lena Meyer",
  tagline: "Singer",
  template: "card",
  title: "Card",
  ctaButtonText: "Get in Touch",
  ctaButtonLink: "mailto:hi@templates.com",
  mainImageURL: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5",
  profileImageURL: "https://i.imgur.com/fMSDhI2.jpg"
};

export function getDefaultCardPage() {
  return {
    ...DEFAULT_CARD_PAGE,
    id: nanoid(),
    domain: nanoid(),
    createdAt: Date.now(),
    socialLinks: [
      { id: nanoid(), url: "https://www.instagram.com/lenameyerlandrut" },
      { id: nanoid(), url: "https://www.facebook.com/lenameyerlandrut" }
    ]
  };
}
