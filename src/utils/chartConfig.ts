
export const createChartOptions = (showAnimations: boolean) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(102, 126, 234, 0.5)',
      borderWidth: 1,
      callbacks: {
        label: (context: any) => {
          const value = context.parsed;
          const total = context.dataset.data.reduce((sum: number, val: number) => sum + val, 0);
          const percentage = total > 0 ? (value / total * 100).toFixed(1) : 0;
          return `${context.label}: ${percentage}%`;
        }
      }
    }
  },
  animation: showAnimations ? {
    animateRotate: true,
    animateScale: true,
    duration: 1000
  } : false
} as const);

export const createLineChartOptions = (showAnimations: boolean) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(249, 115, 22, 0.5)',
      borderWidth: 1,
    }
  },
  scales: {
    x: {
      title: { display: true, text: 'Tarih', color: '#6B7280' },
      grid: { color: 'rgba(107, 114, 128, 0.1)' },
      ticks: { color: '#6B7280' }
    },
    y: {
      title: { display: true, text: 'Saat', color: '#6B7280' },
      beginAtZero: true,
      suggestedMax: 8,
      grid: { color: 'rgba(107, 114, 128, 0.1)' },
      ticks: { color: '#6B7280' }
    }
  },
  animation: showAnimations ? {
    duration: 1000
  } : false
} as const);
