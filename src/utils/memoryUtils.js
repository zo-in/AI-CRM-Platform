export function resolveMemoryConflicts(existing, incoming) {
  const merged = [];

  const now = new Date();

  incoming.forEach((newEntry) => {
    const conflict = existing.find(
      (old) => old.type === newEntry.type && old.content !== newEntry.content
    );

    if (!conflict) {
      merged.push(newEntry);
      return;
    }

    const daysOld = (date) => (now - new Date(date)) / (1000 * 60 * 60 * 24);
    const confidenceWeight = 0.7;
    const recencyWeight = 0.3;

    const score = (entry) => {
      const recencyFactor = Math.max(0, 1 - daysOld(entry.createdAt) / 30);
      return (
        entry.confidence * confidenceWeight + recencyFactor * recencyWeight
      );
    };

    const better = score(newEntry) >= score(conflict) ? newEntry : conflict;
    merged.push(better);
  });

  return merged;
}
