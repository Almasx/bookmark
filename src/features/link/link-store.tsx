import { create, useStore } from "zustand";
import type { Link } from "./types";
import { createContext, useContext, useRef } from "react";

type Status = "idle" | "adding_link" | "deleting_link" | "updating_link";

interface LinksProps {
  links: Link[];
  status: Status;
}

interface LinksState extends LinksProps {
  setLinks: (links: Link[]) => void;
  addLink: (link: Link) => void;
  updateLink: (link: Partial<Link>) => void;
  deleteLink: (id: string) => void;
  updateStatus: (status: Status) => void;
  emptyLinks: () => void;
}

const DEFAULT_LINKS: LinksProps = {
  links: [],
  status: "idle",
};

// Main store

const createLinksStore = (initialLinks?: Partial<LinksProps>) =>
  create<LinksState>((set) => ({
    ...DEFAULT_LINKS,
    ...initialLinks,
    updateStatus: (status) => set({ status }),
    setLinks: (links) => set({ links }),
    addLink: (link) => set((state) => ({ links: [link, ...state.links] })),
    updateLink: (link) =>
      set((state) => ({
        links: state.links.map((l) =>
          l.id === link.id ? { ...l, ...link } : l
        ),
      })),
    deleteLink: (id) =>
      set((state) => ({ links: state.links.filter((l) => l.id !== id) })),
    emptyLinks: () => set({ links: [] }),
  }));

type LinksStore = ReturnType<typeof createLinksStore>;

// Context

export const LinksContext = createContext<LinksStore | null>(null);

type LinksProviderProps = React.PropsWithChildren<Partial<LinksProps>>;

export function LinksProvider({ children, ...props }: LinksProviderProps) {
  const storeRef = useRef<LinksStore>(null);
  if (!storeRef.current) {
    storeRef.current = createLinksStore(props);
  }
  return (
    <LinksContext.Provider value={storeRef.current}>
      {children}
    </LinksContext.Provider>
  );
}

// Hooks

export function useLinks<T>(selector: (state: LinksState) => T): T {
  const store = useContext(LinksContext);
  if (!store) throw new Error("Missing LinksContext.Provider in the tree");
  return useStore(store, selector);
}
