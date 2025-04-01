// This file contains the Canva premium links that can be updated daily

export interface CanvaLinkData {
  id: number;
  link: string;
  color: "green" | "purple" | "blue" | "pink" | "teal" | "orange" | "yellow" | "red" | "cyan" | "amber";
}

// IMPORTANT: To update Canva link, just change this single constant
export const CANVA_INVITE_LINK = "https://www.canva.com/brand/join?token=fLENdDtInlKHSW3ScxEwGA&referrer=team-invite";

// These links use the single Canva invite link
export const canvaLinks: CanvaLinkData[] = [
  {
    id: 1,
    link: CANVA_INVITE_LINK,
    color: "green"
  },
  {
    id: 2,
    link: CANVA_INVITE_LINK,
    color: "purple"
  },
  {
    id: 3,
    link: CANVA_INVITE_LINK,
    color: "blue"
  },
  {
    id: 4,
    link: CANVA_INVITE_LINK,
    color: "pink"
  },
  {
    id: 5,
    link: CANVA_INVITE_LINK,
    color: "teal"
  },
  {
    id: 6,
    link: CANVA_INVITE_LINK,
    color: "orange"
  },
  {
    id: 7,
    link: CANVA_INVITE_LINK,
    color: "yellow"
  },
  {
    id: 8,
    link: CANVA_INVITE_LINK,
    color: "red"
  },
  {
    id: 9,
    link: CANVA_INVITE_LINK,
    color: "cyan"
  },
  {
    id: 10,
    link: CANVA_INVITE_LINK,
    color: "amber"
  }
];