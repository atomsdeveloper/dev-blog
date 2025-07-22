export const formatDateWithHours = (date: Date | string): string => {
  return new Date(date)
    .toLocaleString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(", ", " às ");
};

export const formatDistanceToNow = (date: Date | string): string => {
  const now = new Date();
  const pastDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} segundos atrás`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minuto${minutes > 1 ? "s" : ""} atrás`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hora${hours > 1 ? "s" : ""} atrás`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} dia${days > 1 ? "s" : ""} atrás`;
  }
};
