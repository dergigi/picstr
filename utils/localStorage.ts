export const getKindFromLocalStorage = () => {
  if (typeof window === 'undefined') {
    return 33888;
  }

  const kind = window.localStorage.getItem('kind');
  if (kind) {
    return +kind;
  } else {
    return 33888;
  }
};

export const setKindInLocalStorage = (kind: number) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('kind', kind.toString());
  }
};
