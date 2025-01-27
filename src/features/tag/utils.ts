const generateEmojis = () => {
  const ranges = [
    [0x1f300, 0x1f320], // Misc symbols
    [0x1f330, 0x1f335], // Plant symbols
    [0x1f400, 0x1f43c], // Animal symbols
    [0x1f440, 0x1f444], // Face symbols
    [0x1f600, 0x1f636], // Additional emoticons
    [0x1f680, 0x1f6a0], // Transport symbols
    [0x1f4a0, 0x1f4b0], // Misc symbols
  ];

  return ranges
    .flatMap(([start, end]) =>
      Array.from({ length: end - start + 1 }, (_, i) =>
        String.fromCodePoint(start + i)
      )
    )
    .filter((emoji) => emoji.length === 2); // Filter valid emojis
};

export const EMOJIS = generateEmojis();
