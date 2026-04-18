export const getItems = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

export const toggleItem = (key, item, isActive) => {
  const items = JSON.parse(localStorage.getItem(key)) || [];

  if (isActive) {
    const updated = items.filter((i) => i.id !== item.id);
    localStorage.setItem(key, JSON.stringify(updated));
  } else {
    localStorage.setItem(key, JSON.stringify([...items, item]));
  }

  window.dispatchEvent(new Event("storage"));
  return !isActive;
};
